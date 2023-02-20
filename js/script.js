{
  let tasks = [];
  let hideDoneTasks = false;
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
      disabled: "",
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

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    focusOnAddTaskInput();
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
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const disableToggleButton = () => {
    buttons.forEach((button) => {
      if (button.class === "js-toggle") {
        button.disabled = "disabled";
      }
    });
  };

  const toggleAllTasksDone = () => {
    tasks.map((task) => {
      task.done = true;
    });
    render();
  };

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

      const toggleAllTasksDoneButton = document.querySelector(`.js-toggle`);
      toggleAllTasksDoneButton.addEventListener("click", () => {
        toggleAllTasksDone();
        disableToggleButton();
        render();
      });

      const hideAllDoneTasks = document.querySelector(`.js-hide`);
      if (hideAllDoneTasks) {
        hideAllDoneTasks.addEventListener("click", () => {
          toggleHideDoneTasks();
          render();
        });
      }

      const showAllDoneTasks = document.querySelector(`.js-show`);
      if (showAllDoneTasks) {
        showAllDoneTasks.addEventListener("click", () => {
          toggleHideDoneTasks();
          render();
        });
      }
    }
  };

  const renderTasks = () => {
    let taskHTML = "";

    for (const task of tasks) {
      taskHTML += `
            <div class="list__itemRow ${
              hideDoneTasks && task.done ? "list__itemRow--hidden" : ""
            }">
            <button class="list__button js-done ">
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

    document.querySelector(".js-tasks").innerHTML = taskHTML;
  };

  const renderButtons = () => {
    if (tasks.length > 0) {
      let buttonHTML = "";

      for (const button of buttons) {
        if (button.active) {
          buttonHTML += `
          <div class="button__itemRow">
          <button class="button ${button.class}" ${button.disabled}> ${button.content} </button>
          </div>
          `;
        }
      }

      document.querySelector(".js-buttons").innerHTML = buttonHTML;
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
