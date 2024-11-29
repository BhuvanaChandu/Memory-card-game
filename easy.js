var btnNo = ["1", "2", "3", "4","5","6"];
var image = ["shubman.jpeg", "virat.jpeg","rohit.jpeg"];
var timer; // Timer variable
var time = 0; // Time in seconds
var isGameActive = false; // To check if the game has started
var start = true; // To control the game state
var pre; // Previous card clicked
var preid; // ID of the previous card clicked
var x = 0; // Count matched pairs
var score = 0; // Initialize score variable
var attempts = 0; // Initialize attempts variable

// Function to start the timer
function startTimer() {
    timer = setInterval(function() {
        time++;
        document.getElementById("time").innerText = time; // Update timer display
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to reset the timer
function resetTimer() {
    time = 0;
    document.getElementById("time").innerText = time; // Reset display
}

// Assign images to buttons randomly
for (var i = 0; i < 3; i++) {
    var choose1 = Math.floor(Math.random() * (btnNo.length));
    document.getElementById(btnNo[choose1]).style.backgroundImage = "url(" + image[i] + ")";
    btnNo.splice(choose1, 1);
    var choose2 = Math.floor(Math.random() * (btnNo.length));
    document.getElementById(btnNo[choose2]).style.backgroundImage = "url(" + image[i] + ")";
    btnNo.splice(choose2, 1);
}

// Main game function when a card is clicked
function game(clicked_id) {
    if (!isGameActive) {
        isGameActive = true; // Mark game as active
        startTimer(); // Start the timer when the game begins
    }

    // Increment attempts on every card click
    attempts++; // Increment attempts count

    if (start === true) {
        document.getElementById(clicked_id).style.transform = "rotateY(180deg)";
        preid = clicked_id;
        document.getElementById(clicked_id).style.transition="transform 0.8s";
        var url = document.getElementById(document.getElementById(clicked_id).lastElementChild.id).style.backgroundImage;
        pre = url.substring(4, url.length - 1);
        start = false; // Set start to false after first click
    } else {
        document.getElementById(clicked_id).style.transform = "rotateY(180deg)";
        document.getElementById(clicked_id).style.transition="transform 0.8s";
        setTimeout(() => {
            var url = document.getElementById(document.getElementById(clicked_id).lastElementChild.id).style.backgroundImage;
            if (url.substring(4, url.length - 1) === pre) {
                document.getElementById(preid).remove(); // Remove matched cards
                document.getElementById(clicked_id).remove();
                x += 2; // Increase matched count
                score++; // Increment score for a correct match
                if (x === 6) {
                    stopTimer(); // Stop timer when game is completed
                    displayCompletion(); // Call function to display completion message and score
                }
                start = true; // Reset for next turn
            } else {
                // Flip cards back if not matched
                document.getElementById(preid).style.transform = "rotateY(0deg)";
                document.getElementById(clicked_id).style.transform = "rotateY(0deg)";
                start = true; // Reset for next turn
            }
        }, 800);
    }
}

// Function to display the completion message and score
function displayCompletion() {
    document.getElementById("table").innerHTML = "GAME COMPLETED !!<br/>Your Score: " + score + "<br/>Attempts: " + attempts + "<br/>Time Taken: " + time + " seconds";
    document.getElementById("table").style.fontSize = "xxx-large";
    document.getElementById("table").style.textAlign = "Center";
    document.getElementById("table").style.color = "deeppink";
    document.getElementById("table").style.fontWeight = "bolder";
    document.getElementById("resetBtn").style.display = "block";
}

// Initialize the timer when the game loads
resetTimer();

