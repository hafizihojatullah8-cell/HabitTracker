let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit.name;
    if (habit.done) li.classList.add("done");
    li.onclick = () => {
      habits[index].done = !habits[index].done;
      saveHabits();
      renderHabits();
    };
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    };
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function addHabit() {
  const input = document.getElementById("habitInput");
  const name = input.value.trim();
  if (name) {
    habits.push({ name, done: false });
    saveHabits();
    renderHabits();
    input.value = "";
  }
}

renderHabits();
