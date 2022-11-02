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
  console.log(snap)
  let promises = [];
  snap.forEach((snap) => {
    promises.push(snap.ref.delete());
  });
  return Promise.all(promises);
});
exports.resetAvg = functions.pubsub.schedule("every 1 hours").onRun(async (context) => {
  const db = admin.firestore();
  const now = new Date().getTime();
  const ts = now - 43200000; // 12 hours in milliseconds = 43200000
  const snap = await db.collection("Lots").where("lastTimestamp", "<", ts).get();
  console.log(snap)
  let promises = [];
  snap.forEach((snap) =>{
    promises.push(snap.ref.update({
      avg: null,
      lastTimestamp: now
    }));
  } )
  return Promise.all(promises);
});

/*
exports.setAvg = functions.firestore.document('Submissions/{docID}').onWrite((change, context) => {
    const now = new Date().getTime();
    const newValue = change.after.data();
    const name = newValue.data()['name'];
    const lotRef = db.collection('Lots');
    const queryRef = await lotRef.where('name', '==', name).get();
    if (queryRef.empty) {
      console.log('No matching documents.');
      return;
    }
    snapshot.forEach(doc => {
      var total = 0
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      var temp = doc.data().fill
      console.log(temp)
      total = temp + total
      console.log(total)
      doc.update({ 
        avg: total,
        lastTimestamp: now
       });
  ;
    });

  });
*/

