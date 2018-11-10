//******* Firebase

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB9-h1SlSEHYVvQJTKPpJYkw0-PWAqhEZs",
    authDomain: "timesheet-5bc14.firebaseapp.com",
    databaseURL: "https://timesheet-5bc14.firebaseio.com",
    projectId: "timesheet-5bc14",
    storageBucket: "timesheet-5bc14.appspot.com",
    messagingSenderId: "955023597019"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Initial Values 
var name = "";
var role = "";
var startDate = "";
var monthlyRate = 0;

$("#add-employee").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    role = $("#role-input").val().trim();
    startDate = $("#startDate").val().trim();
    monthlyRate = $("#monthlyRate").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() 
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.monthlyRate);

    // Change the HTML to reflect
    $("#name-display").text(sv.name);
    $("#role-display").text(sv.role);
    $("#startDate-display").text(sv.startDate);
    $("#monthlyRate-display").text(sv.monthlyRate);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});