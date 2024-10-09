var input = document.getElementById('inputs');
var addbtn = document.getElementById('add');
var resetbtn = document.getElementById('reset');
var todoItem = document.getElementById('todoItem');
var searchInput = document.getElementById('searchInput');

// Add click event listener to the "Add" button
addbtn.addEventListener('click', () => {
    let input_text = input.value.trim();

    // If input is empty, show Toastify notification
    if (input_text === '') {
        Toastify({
            text: `<i class="fa-solid fa-exclamation-triangle"></i> Input is empty! Please enter a task.`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
            stopOnFocus: true,
            escapeMarkup: false 
        }).showToast();
    } else {
        // Create a new task item
        let taskItem = document.createElement('div');
        taskItem.className = 'items';

        taskItem.innerHTML = `
            <p>${input_text}</p>
            <ul>
                <li class="timer"><i class="fa-solid fa-clock"></i></li>
                <li class="edit"><i class="fa-solid fa-pen-to-square"></i></li>
                <li class="trash"><i class="fa-solid fa-trash"></i></li>
            </ul>
            <div class="countdown" style="display:none;">
                <span id="countdownDisplay"></span>
                <span id="completedMessage" style="display:none; color: green;">Your time is over!</span>
            </div>
        `;


        todoItem.appendChild(taskItem);


        input.value = '';


        taskItem.querySelector('.trash').addEventListener('click', () => {
            taskItem.remove();
            Toastify({
                text: `<i class="fa-solid fa-trash"></i> Task deleted successfully!`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336",
                stopOnFocus: true,
                escapeMarkup: false
            }).showToast();
        });


        taskItem.querySelector('.edit').addEventListener('click', () => {
            input.value = taskItem.querySelector('p').textContent;
            taskItem.remove();
            Toastify({
                text: `<i class="fa-solid fa-pen-to-square"></i> Edit the task and re-add!`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#FFC107",
                stopOnFocus: true,
                escapeMarkup: false
            }).showToast();
        });


        taskItem.querySelector('.timer').addEventListener('click', () => {
            const countdownDiv = taskItem.querySelector('.countdown');
            const countdownDisplay = countdownDiv.querySelector('#countdownDisplay');
            const completedMessage = countdownDiv.querySelector('#completedMessage');


            const hours = parseInt(prompt("Enter hours:") || 0);
            const minutes = parseInt(prompt("Enter minutes:") || 0);
            const seconds = parseInt(prompt("Enter seconds:") || 0);


            let totalTime = hours * 3600 + minutes * 60 + seconds;


            countdownDiv.style.display = 'flex';


            const countdownInterval = setInterval(() => {
                if (totalTime <= 0) {
                    clearInterval(countdownInterval);
                    countdownDisplay.textContent = "Time's up!";
                    completedMessage.style.display = 'block'; // Show the completion message
                    return;
                }

                const hoursLeft = Math.floor(totalTime / 3600);
                const minutesLeft = Math.floor((totalTime % 3600) / 60);
                const secondsLeft = totalTime % 60;

                countdownDisplay.textContent = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
                totalTime--;
            }, 1000);
        });
        Toastify({
            text: `<i class="fa-solid fa-plus"></i> Task "${input_text}" added successfully!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4CAF50",
            stopOnFocus: true,
            escapeMarkup: false
        }).showToast();
    }
});

resetbtn.addEventListener('click', () => {
    const taskCount = todoItem.childElementCount;

    if (taskCount > 0) {
        todoItem.innerHTML = '';
        Toastify({
            text: `<i class="fa-solid fa-eraser"></i> All tasks reset successfully!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
            stopOnFocus: true,
            escapeMarkup: false
        }).showToast();
    } else {
        Toastify({
            text: `<i class="fa-solid fa-eraser"></i> No tasks to reset!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336",
            stopOnFocus: true,
            escapeMarkup: false
        }).showToast();
    }
});