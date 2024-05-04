import { getMessaging , getToken} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js"

const firebaseConfig = { 
    apiKey: "AIzaSyBp_zqXnC5fO0-HLdPqCy-fPpc0weOBbiM", 
    authDomain: "incidentreporting-91be7.firebaseapp.com", 
    databaseURL: "https://incidentreporting-91be7-default-rtdb.firebaseio.com", 
    projectId: "incidentreporting-91be7",
    storageBucket: "incidentreporting-91be7.appspot.com", 
    messagingSenderId: "952441251953", 
    appId: "1:952441251953:web:d3e7001303b47e8b0953d0" 
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Reference Database
var incidentFormDB = firebase.database().ref('IncidentForm');

document.getElementById('incidentForm').addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    var location = getElementVal('location');
    var date = getElementVal('date');
    var descContent = getElementVal('descContent');
    var sectionPhilly = getElementVal('sectionPhilly');

    if (location === "") {
        location = "<i>No Location Provided<i>";
    }

    if (date === "") {
        date = "<i>No Date Provided<i>";
    }

    if (descContent === "") {
        descContent = "<i>No Description Provided<i>"
    }

    if (sectionPhilly === "") {
        sectionPhilly = "<i>No Section Provided<i>"
    }

    // console.log(location, date, descContent);
    saveMessages(location, date, descContent, sectionPhilly);

    // Enable Alert
    document.querySelector('.alert').style.display = 'block';

    // Remove Alert & Reset Form
    setTimeout(() => {
        document.querySelector('.alert').style.display = 'none';
        window.location.reload(true);
    }, 2500);

    document.getElementById("incidentForm").reset();

}

const saveMessages = (location, date, descContent, sectionPhilly) => {
    var newIncidentForm = incidentFormDB.push();
    newIncidentForm.set({
        location: location,
        sectionPhilly: sectionPhilly,
        date: date,
        descContent: descContent,
    });

    var tableBody = document.getElementById('incidentTableBody');
    var newRow = tableBody.insertRow(0);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    cell1.innerHTML = location;
    cell2.innerHTML = sectionPhilly;
    cell3.innerHTML = date;
    cell4.innerHTML = descContent;
};


const getElementVal = (id) => {
    return document.getElementById(id).value;
};

/* Insert To table */
var tableBody = document.getElementById('incidentTableBody');

incidentFormDB.on('value', function (snapshot) {
    tableBody.innerHTML = '';
    var rows = [];

    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();

        var row = tableBody.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = childData.location;
        cell2.innerHTML = childData.sectionPhilly;
        cell3.innerHTML = childData.date;
        cell4.innerHTML = childData.descContent;

        rows.push(row);
    });

    for (var i = rows.length - 1; i >= 0; i--) {
        tableBody.appendChild(rows[i]);
    }
});


/* Close and Open Report Form */
const openFormBtn = document.getElementById("openFormButton");
const closeFormBtn = document.getElementById('closeFormBtn');
const table = document.getElementById("tableContainer");

window.openForm = function () {
    var formContainer = document.getElementById('container');
    formContainer.style.display = 'block';
    openFormBtn.style.display = 'none';

    formContainer.style.transition = 'opacity 0.5s';
    formContainer.style.opacity = 0;
    formContainer.offsetHeight;
    formContainer.style.opacity = 1;

    table.classList.add('disappear');

}

window.closeForm = function () {
    var formContainer = document.getElementById('container');
    formContainer.style.display = 'none';
    openFormBtn.style.display = 'block'

    formContainer.classList.add('fade-out');

    setTimeout(() => {
        formContainer.style.display = 'none';
        formContainer.classList.remove('fade-out');
    }, 500);

    table.classList.remove('disappear');

}


/* Loading */
/*
var preloader = document.getElementById("preloader")

window.addEventListener("load", removePreloader);

function removePreloader() {
    preloader.classList.add("removePreloader");
}
*/

/* Send Notifictation */

/* Notif */
const messaging = getMessaging(app);

navigator.serviceWorker.register("sw.js").then(registration => {
    getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey: 'BE8VhuGOAZPYQQl-RPfkbjbM7yrctWZ3NJyF4cJx5-E0pjXmqAiOhPvHAA5LoN8fb0SNdgiRNV-j_Yn-BNZE9hE'}).then((currentToken) => {
        if (currentToken) {
            console.log("Token: " + currentToken);
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });
});