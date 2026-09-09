// =====================================================
// EPIC TALENT CENTER - FIREBASE CONFIG
// =====================================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    runTransaction
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =====================================================
// FIREBASE CONFIG - EPIC WEBSITE
// =====================================================

const firebaseConfig = {
    apiKey: "AIzaSyBJyw2rj-Oc4VlA8r0OQbCveLQtoDBwvtA",
    authDomain: "epic-talent-center-a151f.firebaseapp.com",
    projectId: "epic-talent-center-a151f",
    storageBucket: "epic-talent-center-a151f.firebasestorage.app",
    messagingSenderId: "1098613467234",
    appId: "1:1098613467234:web:a0ffa003f57f13d5c4893b",
    measurementId: "G-35TTB9DLFS"
};


// =====================================================
// KHỞI TẠO FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// =====================================================
// EXPORT
// =====================================================

export {
    app,
    auth,
    db,

    // Authentication
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

    // Firestore
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    runTransaction
};
