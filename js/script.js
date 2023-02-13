{
  let tasks = [];

  let hideDoneTasks = true;
  let showAllTasks = true;
  // let toggleAllTasks = false;

  let buttons = [
    {
      content: "Ukryj wszystkie",
      active: true,
      class: "js-hide",
    },
    {
      content: "Pokaż wszystkie",
      active: false,
      class: "js-show",
    },
    {
      content: "Ukończ wszystkie",
      active: true,
      class: "js-toggle",
    },
  ];

  const focusOnAddTaskInput = () => {
    const newTaskInput = document.querySelector(".js-newTask");
    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    focusOnAddTaskInput();
  };

  const toggleAllTasksDone = () => {
    console.log("Odchaczam zadania!");
  };

  const toggleDoneTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleDoneTask(index);
      });
    });
    console.log(tasks);
  };

  const switchButtons = () => {
    buttons.forEach((button) => {
      if (button.class === "js-hide") {
        button.active = !button.active;
      } else if (button.class === "js-show") {
        button.active = !button.active;
      }
    });
    console.log("Zamieniam buttona!");
  };

  const hideTasks = () => {
    const hideDoneTasks = document.querySelector(".js-toggle");

    console.log("Hiduje!");
  };

  const showTasks = () => {
    console.log("Pokazałem wszystkie zadania!");
  };

  const toggleTasksDone = () => {
    tasks.map((task) => {
      task.done = true;
    });
    console.log("Toggle ;D");
  };

  // TESTOWE FUNKCJE

  const bindButtonsEvents = () => {
    if (tasks.length > 0) {
      for (const button of buttons) {
        if (button.active) {
          const buttonTask = document.querySelector(`.${button.class}`);
          buttonTask.addEventListener("click", () => {
            button.class !== "js-toggle" && switchButtons();
            render();
          });
        }
      }

      const toggleAllTasksDone = document.querySelector(`.js-toggle`);
      toggleAllTasksDone.addEventListener("click", () => {
        toggleTasksDone();
        render();
      });
    }

    // ukryj wszystkie skonczone

    // pokaz wszystkie ukonczone
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <div class="list__itemRow">
            <button class="list__button js-done">
            ${task.done ? "&#10004;" : ""}
            </button>
            <li class="list__itemContent ${
              task.done ? " list__itemContent--done" : ""
            }">
            ${task.content}
            </li>
            <button class="list__button list__button--remove js-remove">&#128465;
            </button>
            </div>
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    if (tasks.length > 0) {
      let htmlString = "";

      for (const button of buttons) {
        if (button.active) {
          htmlString += `
          <div class="button__itemRow ">
          <button class="button ${button.class}"> ${button.content} </button>
          </div>
          `;
        }
      }

      document.querySelector(".js-buttons").innerHTML = htmlString;
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonsEvents();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
