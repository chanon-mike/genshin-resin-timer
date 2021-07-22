var MAX_RESIN = 160;
var RECHARGE_INTERVAL = 8;
var hideText;


// ----------------------------------------------------------------------------------
// ------------------------------ 1) Start Calculation ------------------------------
// ----------------------------------------------------------------------------------
function startCount(){
    // Retrieve current resin value
    var currentResin = document.getElementById("current-resin").value;

    // Check if number in range or not
    if (Number(currentResin) >= 0 && Number(currentResin) <= 159) {
        // Calculate time left to full resin and disable calculate button
        var minutesToRefill = (MAX_RESIN - currentResin) * RECHARGE_INTERVAL;
        document.getElementById("btn-calculation").disabled = true;

        // Calculate time for each resin 20,40,60,80,100,120,140,160
        calculateEachResin(currentResin);
        // Calculate time to max resin and countdown
        calculation(minutesToRefill);
    }
    else {
        alert("Please enter resin value from 0-159")
    }
}


// ----------------------------------------------------------------------------
// ------------------------------ 2) Calculation ------------------------------
// ----------------------------------------------------------------------------
function calculation(minLeft){
    // https://stackoverflow.com/questions/532553/javascript-countdown
    // Init variable
    var now = Date.now();
    var fullResinDate = new Date(now + minLeft * 60 * 1000);

    // Change the result display
    display(fullResinDate, "full-at");

    count = setInterval(function(){
        // Init these variable every second
        var thisDate = Date.parse(new Date());
        var daysLeft = parseInt((fullResinDate-thisDate)/86400000);
        var hoursLeft = parseInt((fullResinDate-thisDate)/3600000); 
        var minutesLeft = parseInt((fullResinDate-thisDate)/60000);
        var secondsLeft = parseInt((fullResinDate-thisDate)/1000);

        // Calculate time left
        seconds = minutesLeft*60;
        seconds = secondsLeft-seconds;

        minutes = hoursLeft*60;
        minutes = minutesLeft-minutes;

        hours = daysLeft*24;
        hours = (hoursLeft-hours) < 0 ? 0 : hoursLeft-hours;
        
        // Update the visible 
        hideText.style.display = "block"
        // Display countdown time every second
        document.getElementById("full-countdown").textContent = hours + "h " + minutes + "m " + seconds + "s";
    }, 1000);
}


// ----------------------------------------------------------------------------------
// ---------------------- 3) Calculate until 20,40,60,... resin ---------------------
// ----------------------------------------------------------------------------------
function calculateEachResin(currentResin) {
    var allResin = [20, 40, 60, 80, 100, 120, 140, 160];

    for (i = 0; i < allResin.length; i++) {
        // Receive value of each textcontent and calculate minutes until full (20,40,60,...)
        let minutesToRefill = (allResin[i] - currentResin) * RECHARGE_INTERVAL;
        let fullResinTime = new Date(Date.now() + minutesToRefill * 60 * 1000);

        // Change value of placeholder A.M. to the time
        if (minutesToRefill > 0) {
            display(fullResinTime, "resin"+allResin[i]);
        }
        else {
            document.getElementById("resin"+allResin[i]).textContent = "#####################";
        }
        
    }
}


// ---------------------------------------------------------------------------
// ---------------------- 4) Display the calculated time ---------------------
// ---------------------------------------------------------------------------
function display(fullResinDate, id) {
    // Display value only one time
    var fullResinText = fullResinDate.toDateString() + ", " + fullResinDate.toLocaleTimeString();
    document.getElementById(id).textContent = fullResinText;
}


// -----------------------------------------------------------
// ---------------------- 5) Reset Timer ---------------------
// -----------------------------------------------------------
function resetTimer() {
    clearInterval(count);
    document.getElementById("full-countdown").textContent = "0h 0m 0s";
    document.getElementById("btn-calculation").disabled = false;
}


// --------------------------------------------------------------
// ---------------------- 0) Run on loading ---------------------
// --------------------------------------------------------------
window.onload = function() {
    // Hide result text by default
    hideText = document.getElementById("result");
    hideText.style.display = "none";
}

