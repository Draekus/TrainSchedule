
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDRB-wRyqLgE8qVsvbrzThwCrb4yi_Eb_w",
    authDomain: "trainschedule-5812d.firebaseapp.com",
    databaseURL: "https://trainschedule-5812d.firebaseio.com",
    projectId: "trainschedule-5812d",
    storageBucket: "trainschedule-5812d.appspot.com",
    messagingSenderId: "542746791286"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();


  var nameInput = "";
  var destinationInput = "";
  var startInput = 0;
  var frequencyInput = 0;

  $("#submitButton").on("click", function (event) {
    event.preventDefault();

    nameInput = $("#nameInput").val().trim();
    destinationInput = $("#destinationInput").val().trim();
    startInput = $("#startInput").val().trim();
    frequencyInput = $("#frequencyInput").val().trim();

    database.ref().push({

        name: nameInput,
        destination: destinationInput,
        start: startInput,
        frequency: frequencyInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
})

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

    var sv = snapshot.val();

    var emptyTR = $("<tr>")
    
    
    var nameTD = $("<td>").text(sv.name);
    var destinationTD = $("<td>").text(sv.role);
    var startTD = $("<td>").text(sv.startDate);
    var frequencyTD = $("<td>").text("$" + sv.monthlyRate);
    

    emptyTR.append(nameTD);
    emptyTR.append(destinationTD);
    emptyTR.append(startTD);
    emptyTR.append(frequencyTD);
   
    $("tbody").append(emptyTR);



})