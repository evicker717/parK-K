const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { firestore } = require("firebase-admin");
const { channel } = require("diagnostics_channel");
admin.initializeApp();

exports.removeExpiredDocuments = functions.pubsub.schedule("every 1 hours").onRun(async (context) => {
  const db = admin.firestore();
  const now = new Date().getTime();
  const ts = now - 86400000; // 24 hours in milliseconds = 86400000

  const snap = await db.collection("Submissions").where("timestamp", "<", ts).get();
  console.log(snap)
  let promises = [];
  snap.forEach((snap) => {
    promises.push(snap.ref.delete());
  });
  return Promise.all(promises);
});


