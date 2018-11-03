
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
        frequency: frequencyInput
        
    });
})

database.ref().on("child_added", function(snapshot){

    var sv = snapshot.val();

    var emptyTR = $("<tr>")
    
    let frequency = sv.frequency
    let currenttime = moment()
    let start = sv.start

    var startConverted = moment(start, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(startConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    var nameTD = $("<td>").text(sv.name);
    var destinationTD = $("<td>").text(sv.destination);
    var frequencyTD = $("<td>").text(sv.frequency);
    var nextTrainTD = $("<td>").text(moment(nextTrain).format("HH:mm"))
    var minUntilTD = $("<td>").text(tMinutesTillTrain)
    

    emptyTR.append(nameTD);
    emptyTR.append(destinationTD);
    
    emptyTR.append(frequencyTD);
    emptyTR.append(nextTrainTD)
    emptyTR.append(minUntilTD)
   
    $("tbody").append(emptyTR);



})