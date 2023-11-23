// Function for adding user input to the list
function addItemToList() {
  var inputValue = document.getElementById("itemInput").value;
  var categoryValue = document.getElementById("categoryInput").value;

  if (inputValue.trim() !== "") {
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(inputValue));
    listItem.setAttribute("data-category", categoryValue);

    
    var markImportantButton = document.createElement("button");
    var image2 =new Image();
    image2.src = './images/important.png';
    markImportantButton.appendChild(image2);
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
    
    // adding image icon on delete button
    const image = new Image();
    image.src = "./images/delete.png";
    

    var deleteButton = document.createElement("button");
    deleteButton.appendChild(image);
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
      deleteItem(listItem);

      
    };

    var editTaskButton = document.createElement("button");
    var image3 = new Image();
    image3.src = './images/edit.png';
    editTaskButton.appendChild(image3);
    editTaskButton.classList.add("edit-task-btn");
    editTaskButton.onclick = function () {
      editTask(listItem);
    };
    listItem.appendChild(deleteButton);
    listItem.appendChild(editTaskButton);

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
      var impimage = new Image();
      impimage.src = './images/important.png';
      markImportantButton.appendChild(impimage);
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

      var delimage=  new Image();
      delimage.src = './images/delete.png';
      var deleteButton = document.createElement("button");
      deleteButton.appendChild(delimage);
      deleteButton.classList.add("delete-btn");
      deleteButton.onclick = function () {
        deleteItem(listItem);
      };

      var editTaskButton = document.createElement("button");
      var editimage = new Image();
      editimage.src = './images/edit.png';
      editTaskButton.appendChild(editimage);
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
  // Get the index of the item to be deleted
  var index = Array.from(list.children).indexOf(item);

  // Retrieve tasks from local storage
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Remove the corresponding task from the tasks array
  tasks.splice(index, 1);

  // Save the updated tasks array back to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));


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


