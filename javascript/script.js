var PLAN = {
    calories: 1875,
    protein: 183,
    carbs: 177,
    fat: 45,
    weeklyLoss: 2.5
};

function trackCut() {
    var name = document.getElementById("user-name").value.trim();
    var currentWeightStr = document.getElementById("current-weight").value;
    var goalWeightStr = document.getElementById("goal-weight").value;
    var resultBox = document.getElementById("cut-result");

    if (name === "" || currentWeightStr === "" || goalWeightStr === "") {
        resultBox.innerHTML =
            "<p class='result-empty'>Please enter your name, current weight, and goal weight.</p>";
        return;
    }

    var currentWeight = Number(currentWeightStr);
    var goalWeight = Number(goalWeightStr);

    if (currentWeight <= 0 || goalWeight <= 0 || currentWeight > 500 || goalWeight > 500) {
        resultBox.innerHTML =
            "<p class='result-empty'>Please enter realistic weights in pounds.</p>";
        return;
    }

    if (goalWeight >= currentWeight) {
        resultBox.innerHTML =
            "<p class='result-empty'>Your goal weight should be lower than your current weight for a cut estimate.</p>";
        return;
    }

    var poundsToLose = Math.round((currentWeight - goalWeight) * 10) / 10;
    var weeksLeft = Math.ceil(poundsToLose / PLAN.weeklyLoss);

    var today = new Date();
    var goalDate = new Date();
    goalDate.setDate(today.getDate() + (weeksLeft * 7));

    var goalDateStr = goalDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    var statusMessage = "";

    if (poundsToLose <= 5) {
        statusMessage = "You are close to your goal. Stay consistent and finish strong.";
    } else if (poundsToLose <= 15) {
        statusMessage = "This is a realistic short-to-medium cut. Stay patient and trust the process.";
    } else if (poundsToLose <= 30) {
        statusMessage = "This is a serious cut, but still very doable with consistency, training, and recovery.";
    } else {
        statusMessage = "This is a long cut. Focus on weekly progress, not perfection.";
    }

    var html = "";
    html += "<h3>Hey " + name + ", here is your estimate</h3>";

    html += "<div class='progress-row'>";
    html += "  <div class='progress-card'>";
    html += "    <p class='pc-label'>CURRENT</p>";
    html += "    <p class='pc-value'>" + currentWeight + " lbs</p>";
    html += "  </div>";
    html += "  <div class='progress-card'>";
    html += "    <p class='pc-label'>GOAL</p>";
    html += "    <p class='pc-value'>" + goalWeight + " lbs</p>";
    html += "  </div>";
    html += "  <div class='progress-card'>";
    html += "    <p class='pc-label'>TO LOSE</p>";
    html += "    <p class='pc-value'>" + poundsToLose + " lbs</p>";
    html += "  </div>";
    html += "  <div class='progress-card'>";
    html += "    <p class='pc-label'>WEEKS LEFT</p>";
    html += "    <p class='pc-value'>" + weeksLeft + "</p>";
    html += "  </div>";
    html += "</div>";

    html += "<p class='status-msg'>" + statusMessage + "</p>";
    html += "<p class='date-line'>At about 2.5 lbs/week, your estimated goal date is <strong>" + goalDateStr + "</strong>.</p>";

    html += "<h3 class='macro-heading'>Example Daily Macros From My Current Cut</h3>";
    html += "<div class='macro-result-row'>";
    html += "  <div class='macro-result mr-protein'>";
    html += "    <p class='mr-label'>PROTEIN</p>";
    html += "    <p class='mr-value'>" + PLAN.protein + "g</p>";
    html += "    <p class='mr-sub'>" + (PLAN.protein * 4) + " cal</p>";
    html += "  </div>";
    html += "  <div class='macro-result mr-carbs'>";
    html += "    <p class='mr-label'>CARBS</p>";
    html += "    <p class='mr-value'>" + PLAN.carbs + "g</p>";
    html += "    <p class='mr-sub'>" + (PLAN.carbs * 4) + " cal</p>";
    html += "  </div>";
    html += "  <div class='macro-result mr-fat'>";
    html += "    <p class='mr-label'>FAT</p>";
    html += "    <p class='mr-value'>" + PLAN.fat + "g</p>";
    html += "    <p class='mr-sub'>" + (PLAN.fat * 9) + " cal</p>";
    html += "  </div>";
    html += "</div>";

    html += "<p class='total-line'>My current coaching plan: <strong>" + PLAN.calories + " calories</strong> &nbsp;|&nbsp; <strong>183g of Protein | 177g of Carbs | 45g of Fat</strong></p>";

    resultBox.innerHTML = html;
}

function resetTracker() {
    document.getElementById("user-name").value = "";
    document.getElementById("current-weight").value = "";
    document.getElementById("goal-weight").value = "";
    document.getElementById("cut-result").innerHTML =
        "<p class='result-empty'>Enter your name, current weight, and goal weight to see your estimate.</p>";
}

var schedule = {
    monday: {
        title: "Monday - Session 1",
        focus: "Upper Pull Focus",
        lifts: [
            { name: "Dumbbell One-Arm Rows", scheme: "4 sets x 12-15 reps" },
            { name: "Dumbbell Twist Fly", scheme: "4 sets x 12-15 reps" },
            { name: "Lat Pulldown (Close Grip)", scheme: "4 sets x 12-15 reps" },
            { name: "Dumbbell Skull Crushers", scheme: "4 sets x 12-15 reps" },
            { name: "One-Arm Cable Rear Delt Fly", scheme: "4 sets x 12-15 reps" }
        ],
        cardio: "30 minutes steady-state cardio after lifting",
        notes: "Heaviest lifts first. Keep rest around 60-90 seconds between sets."
    },
    tuesday: {
        title: "Tuesday - Cardio Day",
        focus: "Active Recovery",
        lifts: [],
        cardio: "15 minutes of cardio (incline walk or light intervals)",
        notes: "No lifting. Mobility, hydration, sleep. Let Monday's session recover."
    },
    wednesday: {
        title: "Wednesday - Session 2",
        focus: "Legs",
        lifts: [
            { name: "Dumbbell Goblet Squats", scheme: "4 sets x 12-15 reps" },
            { name: "Romanian Deadlifts (Dumbbell)", scheme: "4 sets x 12-15 reps" },
            { name: "Leg Press", scheme: "4 sets x 12-15 reps" },
            { name: "Seated Leg Curls", scheme: "4 sets x 12-15 reps" },
            { name: "Standing Calf Raises", scheme: "4 sets x 12-15 reps" }
        ],
        cardio: "30 minutes steady-state cardio after lifting",
        notes: "Hardest day of the week. Eat extra carbs pre-workout. Don't rush sets."
    },
    thursday: {
        title: "Thursday - Cardio Day",
        focus: "Active Recovery",
        lifts: [],
        cardio: "15 minutes of cardio (incline walk or light intervals)",
        notes: "Legs will be sore. Walking actually helps - keeps the blood moving."
    },
    friday: {
        title: "Friday - Session 3",
        focus: "Upper Push Focus",
        lifts: [
            { name: "Dumbbell Bench Press", scheme: "4 sets x 12-15 reps" },
            { name: "Dumbbell Shoulder Press", scheme: "4 sets x 12-15 reps" },
            { name: "Incline Dumbbell Press", scheme: "4 sets x 12-15 reps" },
            { name: "Lateral Raises", scheme: "4 sets x 12-15 reps" },
            { name: "Cable Triceps Pushdowns", scheme: "4 sets x 12-15 reps" }
        ],
        cardio: "30 minutes steady-state cardio after lifting",
        notes: "Last lifting day of the week. Push hard on the first 2 exercises."
    },
    saturday: {
        title: "Saturday - Cardio Day",
        focus: "Active Recovery",
        lifts: [],
        cardio: "15 minutes of cardio (incline walk or light intervals)",
        notes: "Last cardio of the week. Easy pace. Tomorrow is total rest."
    },
    sunday: {
        title: "Sunday - Full Rest",
        focus: "Total Recovery",
        lifts: [],
        cardio: "No cardio today",
        notes: "Real rest day. Sleep in. Meal prep for the week. No guilt about the couch."
    }
};

function pickWorkout() {
    var day = document.getElementById("workout-day").value;
    var resultBox = document.getElementById("workout-result");

    if (day === "") {
        resultBox.innerHTML =
            "<p class='result-empty'>Pick a day from the dropdown to see the plan.</p>";
        return;
    }

    var plan = schedule[day];

    var html = "";
    html += "<div class='workout-card'>";
    html += "  <h3>" + plan.title + "</h3>";
    html += "  <p class='workout-focus'>Focus: <strong>" + plan.focus + "</strong></p>";

    if (plan.lifts.length > 0) {
        html += "  <table class='lift-table'>";
        html += "    <thead><tr><th>Exercise</th><th>Sets &amp; Reps</th></tr></thead>";
        html += "    <tbody>";
        for (var i = 0; i < plan.lifts.length; i++) {
            html += "<tr>";
            html += "  <td>" + plan.lifts[i].name + "</td>";
            html += "  <td>" + plan.lifts[i].scheme + "</td>";
            html += "</tr>";
        }
        html += "    </tbody>";
        html += "  </table>";
    } else {
        html += "  <p class='no-lifts'>No lifting today.</p>";
    }

    html += "  <p class='cardio-line'><strong>Cardio:</strong> " + plan.cardio + "</p>";
    html += "  <p class='note-line'><em>" + plan.notes + "</em></p>";
    html += "</div>";

    resultBox.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("track-btn").addEventListener("click", trackCut);
    document.getElementById("reset-btn").addEventListener("click", resetTracker);
    document.getElementById("workout-btn").addEventListener("click", pickWorkout);
});