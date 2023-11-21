//function for adding user input to the list
function addItemToList() {
    // Get the input value
    var inputValue = document.getElementById("itemInput").value;

    // Check if the input value is not empty
    if (inputValue.trim() !== "") {
      // Create a new list item
      var listItem = document.createElement("li");

      // Set the text content of the list item
      listItem.appendChild(document.createTextNode(inputValue));

      // Append the list item to the ul
      document.getElementById("itemList").appendChild(listItem);

      // Clear the input field
      document.getElementById("itemInput").value = "";

      // Add a delete button to each list item
      var deleteButton = document.createElement("button");
      deleteButton.appendChild(document.createTextNode("X"));
      deleteButton.classList.add("delete-btn")
      deleteButton.onclick = function () {
        deleteItem(listItem);
      };

      listItem.appendChild(deleteButton);
      // Add a button to mark the task as important
      var markImportantButton = document.createElement("button");
      markImportantButton.appendChild(document.createTextNode("Important"));
      markImportantButton.classList.add("mark-important-btn");
      markImportantButton.onclick = function () {
          markAsImportant(listItem);
      };

      // Add a checkbox to mark the task as completed
      var markCompletedCheckbox = document.createElement("input");
      markCompletedCheckbox.type = "checkbox";
      markCompletedCheckbox.classList.add("mark-completed-checkbox");
      markCompletedCheckbox.onclick = function () {
          markAsCompleted(listItem);
      };

      // Append the button and checkbox to the list item
      listItem.appendChild(markImportantButton);
      listItem.appendChild(markCompletedCheckbox);

      document.getElementById("itemList").appendChild(listItem);
      document.getElementById("itemInput").value = "";
      //  // Append the button to the list item
      //  listItem.appendChild(markImportantButton);

      //  document.getElementById("itemList").appendChild(listItem);
      //  document.getElementById("itemInput").value = "";
    } else {
      alert("Please enter a valid item.");
    }

    // Function to delete a list item
    function deleteItem(item) {
        var list = document.getElementById("itemList");
        list.removeChild(item);
      }
       // Function to mark a task as important
       function markAsImportant(task) {
        task.classList.toggle('important-task');
    }

    // Function to mark a task as completed
    function markAsCompleted(task) {
        task.classList.toggle('completed-task');
    }
}

//function that displays current day in to do list app
function displayCurrentDay() {
    // Array of days
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the current date
    var currentDate = new Date();

    // Get the current day of the week (0-6)
    var currentDayIndex = currentDate.getDay();

    // Get the name of the current day
    var currentDayName = daysOfWeek[currentDayIndex];

    // Display the current day in the paragraph with id "currentDay"
    document.getElementById('to-day').innerHTML =  currentDayName+ ' ' + 'Tasks : ';
    // alert(currentDayName+ ' ' + 'Tasks : ')
}