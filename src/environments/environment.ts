// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyApMvh7ntfvClQsAAdcNN5GjWSGgRqaQFM",
    authDomain: "resume-kanban.firebaseapp.com",
    databaseURL: "https://resume-kanban-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "resume-kanban",
    storageBucket: "resume-kanban.appspot.com",
    messagingSenderId: "486033173496",
    appId: "1:486033173496:web:679375cdd40390e7fb440d",
    measurementId: "G-E2C77GS2J1",
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false,
  }
};
// Initialize Firebase
const app = initializeApp(environment.firebase);
const database = getDatabase(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
