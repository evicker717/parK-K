const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { firestore } = require("firebase-admin");
const { channel } = require("diagnostics_channel");
admin.initializeApp();

exports.removeExpiredDocuments = functions.pubsub.schedule("every 1 hours").onRun(async (context) => {
  const db = admin.firestore();
  const now = new Date().getTime();
  const ts = now - 86400000; // 24 hours in milliseconds = 86400000

  const snap = await db.collection("Submissions").where("datetime.getTime()", "<", ts).get();
  let promises = [];
  snap.forEach((snap) => {
    promises.push(snap.ref.delete());
  });
  return Promise.all(promises);
});

exports.getAvg = functions.firestore.document('/Submissions/{documentId}/').onCreate((snap, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const newValue = snap.data();

      // access a particular field as you would any JS property
      const name = newValue.name;
      console.log(name)
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    });