// Function for adding user input to the list
function addItemToList() {
  var inputValue = document.getElementById("itemInput").value;
  var categoryValue = document.getElementById("categoryInput").value;

  if (inputValue.trim() !== "") {
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(inputValue));
    listItem.setAttribute("data-category", categoryValue);

    var markImportantButton = document.createElement("button");
    markImportantButton.appendChild(document.createTextNode("Important"));
    markImportantButton.classList.add("mark-important-btn");
    markImportantButton.onclick = function () {
      markAsImportant(listItem);
    };

    var markCompletedCheckbox = document.createElement("input");
    markCompletedCheckbox.type = "checkbox";
    markCompletedCheckbox.classList.add("mark-completed-checkbox");
    markCompletedCheckbox.onclick = function () {
      markAsCompleted(listItem);
    };

    listItem.appendChild(markCompletedCheckbox);

    var deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("X"));
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
      deleteItem(listItem);
    };

    var editTaskButton = document.createElement("button");
    editTaskButton.appendChild(document.createTextNode("Edit"));
    editTaskButton.classList.add("edit-task-btn");
    editTaskButton.onclick = function () {
      editTask(listItem);
    };

    listItem.appendChild(editTaskButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(markImportantButton);

    document.getElementById("itemList").appendChild(listItem);

    // Reorganize the list to move important tasks to the top
    sortImportantTasksToTop();
    // Save the tasks to local storage
    saveTasksToLocalStorage();
    document.getElementById("itemInput").value = "";
  } else {
    alert("Please enter a valid item.");
  }
}

// Function to sort important tasks to the top of the list
function sortImportantTasksToTop() {
  var list = document.getElementById("itemList");
  var items = Array.from(list.children);

  items.sort((a, b) => {
    var isAImportant = a.classList.contains("important-task");
    var isBImportant = b.classList.contains("important-task");

    if (isAImportant && !isBImportant) {
      return -1;
    } else if (!isAImportant && isBImportant) {
      return 1;
    } else {
      return 0;
    }
  });

  items.forEach((item) => list.removeChild(item));
  items.forEach((item) => list.appendChild(item));
}
// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  var tasks = Array.from(document.getElementById("itemList").children);
  var tasksData = [];

  tasks.forEach(function (task) {
    tasksData.push({
      text: task.firstChild.textContent,
      isImportant: task.classList.contains("important-task"),
      isCompleted: task.classList.contains("completed-task"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

// Function to retrieve tasks from local storage
function retrieveTasksFromLocalStorage() {
  var tasksData = JSON.parse(localStorage.getItem("tasks"));

  if (tasksData) {
    tasksData.forEach(function (taskData) {
      var listItem = document.createElement("li");
      listItem.appendChild(document.createTextNode(taskData.text));

      if (taskData.isImportant) {
        listItem.classList.add("important-task");
      }

      if (taskData.isCompleted) {
        listItem.classList.add("completed-task");
      }

      // Add buttons to each reconstructed task
      var markImportantButton = document.createElement("button");
      markImportantButton.appendChild(document.createTextNode("Important"));
      markImportantButton.classList.add("mark-important-btn");
      markImportantButton.onclick = function () {
        markAsImportant(listItem);
      };

      var markCompletedCheckbox = document.createElement("input");
      markCompletedCheckbox.type = "checkbox";
      markCompletedCheckbox.classList.add("mark-completed-checkbox");
      markCompletedCheckbox.onclick = function () {
        markAsCompleted(listItem);
      };

      var deleteButton = document.createElement("button");
      deleteButton.appendChild(document.createTextNode("X"));
      deleteButton.classList.add("delete-btn");
      deleteButton.onclick = function () {
        deleteItem(listItem);
      };

      var editTaskButton = document.createElement("button");
      editTaskButton.appendChild(document.createTextNode("Edit"));
      editTaskButton.classList.add("edit-task-btn");
      editTaskButton.onclick = function () {
        editTask(listItem);
      };

      listItem.appendChild(markCompletedCheckbox);
      listItem.appendChild(deleteButton);
      listItem.appendChild(markImportantButton);
      listItem.appendChild(editTaskButton);

      document.getElementById("itemList").appendChild(listItem);
    });
  }
}


// Function to mark a task as important
function markAsImportant(task) {
  task.classList.toggle("important-task");
  // Reorganize the list after marking as important
  sortImportantTasksToTop();
}

// Function to mark a task as completed
function markAsCompleted(task) {
  task.classList.toggle("completed-task");
}

// Function to delete a list item
function deleteItem(item) {
  var list = document.getElementById("itemList");
  list.removeChild(item);
}

// Function to edit a task
function editTask(listItem) {
  var newText = prompt("Edit task:", listItem.firstChild.textContent);

  if (newText !== null && newText.trim() !== "") {
    listItem.firstChild.textContent = newText;
  }
}

//function that displays current day in to do list app
function displayCurrentDay() {
  // Array of days
  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the current date
  var currentDate = new Date();

  // Get the current day of the week (0-6)
  var currentDayIndex = currentDate.getDay();

  // Get the name of the current day
  var currentDayName = daysOfWeek[currentDayIndex];

  // Display the current day in the paragraph with id "currentDay"
  document.getElementById("to-day").innerHTML =
    currentDayName + " " + "Tasks : ";
  // alert(currentDayName+ ' ' + 'Tasks : ')
}

// Function to filter tasks by category
function filterTasksByCategory() {
  var selectedCategory = document.getElementById("filterCategory").value;
  var tasks = document.getElementById("itemList").getElementsByTagName("li");

  for (var i = 0; i < tasks.length; i++) {
    var taskCategory = tasks[i].getAttribute("data-category");

    if (selectedCategory === "all" || taskCategory === selectedCategory) {
      tasks[i].style.display = "block";
    } else {
      tasks[i].style.display = "none";
    }
  }
}
