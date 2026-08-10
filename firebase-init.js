/* ============================================================
   CODEX — initialisation Firebase (SDK "compat", pas de bundler)
   Doit être chargé après les scripts firebase-*-compat.js
   et AVANT shared/data.js
   ============================================================ */

firebase.initializeApp({
  apiKey: "AIzaSyC4oRNmOqavWNrLS7FpDMACjGNrkaSLw9k",
  authDomain: "world-builder-d2b83.firebaseapp.com",
  projectId: "world-builder-d2b83",
  storageBucket: "world-builder-d2b83.firebasestorage.app",
  messagingSenderId: "758643181946",
  appId: "1:758643181946:web:fe0fad6fbccbd548a9aec3",
  measurementId: "G-7C11VBT0TP"
});

const db = firebase.firestore();
