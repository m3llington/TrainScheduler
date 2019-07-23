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
    var trainFequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainTime,
      rate: trainFequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
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
    var trainTime = childSnapshot.val().start;
    var trainFequency = childSnapshot.val().rate;
  
    // Train info check
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFequency);
  
    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainTime),
      $("<td>").text(trainFequency)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });