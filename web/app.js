
 // lesson 7 - dom and events

const countText = document.querySelector("#count");

const plusBtn = document.querySelector("#plusBtn");
const minusBtn = document.querySelector("#minusBtn");
const resetBtn = document.querySelector("#resetBtn");

let count = 0;

// increasing the count
plusBtn.addEventListener("click", () => {
    count++;
    countText.textContent = count;
});

// minus button, don't go below zero
minusBtn.addEventListener("click", () => {
    if (count > 0) {
        count--;
    }
    countText.textContent = count;
});

// back to zero
resetBtn.addEventListener("click", () => {
    count = 0;
    countText.textContent = count;
});


// now trying to add tasks

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

addBtn.addEventListener("click", () => {

    const task = taskInput.value.trim();

    // checking if anything is entered
    if (task === "") {
        return;
    }

    const li = document.createElement("li");
    li.textContent = task;

    // adding remove button for each task
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";

    removeBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = "";
});
