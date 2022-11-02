const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { firestore } = require("firebase-admin");
const { channel } = require("diagnostics_channel");
const { timeStamp } = require("console");
admin.initializeApp();

exports.removeExpiredDocuments = functions.pubsub.schedule("every 1 hours").onRun(async (context) => {
  const db = admin.firestore();
  const now = new Date().getTime();
  const ts = now - 43200000; // 12 hours in milliseconds = 43200000

  const snap = await db.collection("Submissions").where("timestamp", "<", ts).get();
  const lotRef = await db.collection("Lots").where("lastTimeStamp", "<", ts).get();
  console.log(snap)
  let promises = [];
  snap.forEach((snap) => {
    promises.push(snap.ref.delete());
  });
  lotRef.forEach((lotRef) =>{
    setDoc(lotRef, {avg: null}, {lastUpdated: null})
  } )
  return Promise.all(promises);
});


