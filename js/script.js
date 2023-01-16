{



    const tasks = [
        {
            content: "nagrać lekcję",
            done: false,
        },
        {
            content: "zjeść obiad",
            done: false,
        },
    ]

    const focusOnAddTaskInput = () => {
        const newTaskInput = document.querySelector(".js-newTask");
        newTaskInput.value = "";
        newTaskInput.focus();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        renderListItems();
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        renderListItems();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        focusOnAddTaskInput();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        renderListItems();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDoneTask(index);
            })
        })
    }

    const renderListItems = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <div class="list__itemRow">
            <button class="list__button js-done">
            ${task.done ? "&#10004;" : ""}
            </button>
            <li class="list__itemContent ${task.done ? " list__itemContent--done" : ""}">
            ${task.content}
            </li>
            <button class="list__button list__button--remove js-remove">&#128465;
            </button>
            </div>
            `;
        }
        
        document.querySelector(".js-tasks").innerHTML = htmlString;



        bindEvents();
    };




    const init = () => {
        renderListItems();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();


}