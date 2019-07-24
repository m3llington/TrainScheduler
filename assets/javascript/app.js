var firebaseConfig = {
    apiKey: "AIzaSyCSrjvqR9ThQVfPbKAS5j9sLGVWlHzwm-M",
    authDomain: "test-project-fb-4d21a.firebaseapp.com",
    databaseURL: "https://test-project-fb-4d21a.firebaseio.com",
    projectId: "test-project-fb-4d21a",
    storageBucket: "test-project-fb-4d21a.appspot.com",
    messagingSenderId: "794404636042",
    appId: "1:794404636042:web:9a4bd8ec88bc5cee"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

   var tFrequency = parseInt(trainFrequency);
   console.log(tFrequency);
   
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);
   
    //current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var timeRemainder = diffTime % tFrequency;
    console.log(timeRemainder);

    // Minute Until next train arrives
    var tMinutesTillTrain = tFrequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // The  time the next train arrives
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //make sure to format actual variable, and resave value
    nextTrain = (moment(nextTrain).format("HH:mm"));
    console.log(nextTrain);

  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      arrival: nextTrain,
      frequency: trainFrequency,
      ttime: tMinutesTillTrain
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.arrival);
    console.log(newTrain.frequency);
    console.log(newTrain.ttime);
  
    alert("Train Added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var nextTrain = childSnapshot.val().arrival;
    var trainFrequency = childSnapshot.val().frequency;
    var tMinutesTillTrain = childSnapshot.val().ttime;
  
    // Train info check
    console.log(trainName);
    console.log(trainDestination);
    console.log(nextTrain);
    console.log(trainFrequency);
    console.log(tMinutesTillTrain);
  

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(nextTrain),
      $("<td>").text(trainFrequency),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });