//Getting all required elements
const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

//we will call this function while adding,editing, deleting and checking-unchecking the task
function allTasks() {

  let tasks = document.querySelectorAll(".pending");

  //if tasks' length is 0 then pending num text content will be no, if not then pending num value will be task's length
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
  saveTasks();

}

//add task while we put value in text area and press enter
inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim(); // Trim removes spaces from the input value
  // If the Enter key is pressed and the input value length is greater than 0.
  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = ` <li class="list pending" onclick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${inputVal}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)" style="margin-right: 20px;"></i>
          <i class="uil uil-edit" onclick="editTask(this)" style="margin-left: 5px;"></i>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag);
    inputField.value = ""; // Clear input field after adding task
    updateUI();
  }
});

//checking and unchecking the chekbox while we click on the task
function handleStatus(e) {
  const checkbox = e.querySelector("input"); //getting checkbox
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  allTasks();
}


// Deleting task while we click on the delete icon, with a confirmation prompt
function deleteTask(e) {
  const confirmation = confirm("Do you want to delete this item?");
  if (confirmation) {
    e.parentElement.remove(); // Remove the parent element
    allTasks(); // Update UI after deletion
  }
}
function editTask(editIcon) {
  const taskItem = editIcon.closest(".list"); // Get the parent task item
  const taskText = taskItem.querySelector('.task'); // Get the task text span
  const newText = prompt('Edit task:', taskText.textContent);
  if (newText !== null && newText.trim() !== '') {
    taskText.textContent = newText;
    updateUI();
  }
}


//deleting all the tasks while we click on the clear button.
clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();
});
// It will kept the data same on page reloading
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    todoLists.innerHTML = savedTasks;
  }
  allTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', todoLists.innerHTML);
}
function updateUI() {
    allTasks(); // Update pending tasks count and UI visibility based on tasks
}

document.addEventListener('DOMContentLoaded', loadTasks);
// Call saveTasks() when the page unloads (e.g., when the user refreshes or navigates away)
window.addEventListener('unload', saveTasks);

