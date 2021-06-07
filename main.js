//-------------------------
// Defining Variables
//-------------------------

// Variables for Typewriter Function
var typewriter = {
    i: 0,
    speed: 75,
}

// Strings to be fed into typewriter
var txt = {
    one: "Destination reached.",
    two: "Restoring Station AI to full functionality.",
    three: "WARNING: LOW POWER",
    four: "Manual power generation required.",
    five: "Sufficient power stored.",
    six: "Unfold solar panel?",
    seven: "Solar panel unfolded.",
    eight: "Automatic power generation enabled.",
}

// How much do I have of a resource?
var inv = {
    power: 0,
}


// How many times have I upgraded a generator?

var upgrade = {
    panel: 0,
    hound: 0,
}

// How much does the upgrade change the amount generated?

var upgradeChange = {
    panel: [0.3, 0.5, 1],
}

// How much does the generator cost?
var cost = {
    panel: 10,
    panelUpgradePower: [25, 100, 500, 5000],
    hound: 1000,
}

// How many generators do I have?
var gen = {
    panel: 0,
    hound: 0,
}

// How much of a resource do generators produce?
var prod = {
    panel: 0.2,
}

// What is the overall change for the resource?
var change = {
    power: 0,
}

// Cost Multiplication Factor

var costMulti = 1.2;

// Check whether intro can be skipped

var storyPosition = 0;

//-------------------------
// Purchase Generators
//-------------------------

function panelBuy() {
    switch (gen.panel) {
        case 4:
            gen.panel += 1;
            storyPosition += 1;
            inv.power -= cost.panel;
            cost.panel = Math.floor(cost.panel*costMulti);
            document.getElementById("panelUpgrade").classList.remove("hidden");
            break;
        default:
            gen.panel += 1;
            inv.power -= cost.panel;
            cost.panel = Math.floor(cost.panel*costMulti);
            break;
    }
}

function houndBuy() {
    gen.hound += 1;
}
//-------------------------
// Purchase Upgrades
//-------------------------

function panelUpgradeOne() {
    prod.panel = Math.round(prod.panel*1e12 + upgradeChange.panel[upgrade.panel]*1e12)/1e12;
    inv.power -= cost.panelUpgradePower[upgrade.panel];
    upgrade.panel += 1;
    document.getElementById("trayLeftBottom").classList.remove("hidden");
}

//-------------------------
// Generator Functions
//-------------------------

function powerAuto() {
    inv.power = Math.round(inv.power*1e12 + change.power*1e12)/1e12;
    document.getElementById("powerInv").innerHTML = inv.power  + "  <img src='images/powerIcon.png'  height='15' width='15'>";
}

//-------------------------
// Functions to Show Changes
//-------------------------

function resourceChange() {
    change.power = Math.round(gen.panel*1e12*prod.panel)/1e12;
    if (change.power >= 0) {
        document.getElementById("powerChange").innerHTML = "+" + change.power;
    } else {
        document.getElementById("powerChange").innerHTML = change.power;
    }
}

//-------------------------
// Functions to enable/disable buttons
//-------------------------

function buttonEnableDisable() {
    if (inv.power < cost.panel) {
        document.getElementById("panelBuy").classList.add("disabled");
        document.getElementById("panelBuy").disabled = true;
    } else {
        document.getElementById("panelBuy").classList.remove("disabled");
        document.getElementById("panelBuy").disabled = false;
    }
    if (inv.power < cost.panelUpgradePower[upgrade.panel]) {
        document.getElementById("panelUpgrade").classList.add("disabled");
        document.getElementById("panelUpgrade").disabled = true;
    } else {
        document.getElementById("panelUpgrade").classList.remove("disabled");
        document.getElementById("panelUpgrade").disabled = false;
    }
}

//-------------------------
// Functions for the introduction
//-------------------------

function introCheck() {
    var storyTemp = JSON.parse(localStorage.getItem("storyPosition"));
    if (storyTemp !== null) {
        storyPosition = storyTemp;
    }
    switch (storyPosition) {
        case 0:
            introOne();
            break;
        default:
            gen.panel += 1;
            cost.panel = Math.floor(cost.panel * costMulti);
            document.getElementById("title").classList.remove("hidden");
            document.getElementById("inv").classList.remove("hidden");
            document.getElementById("feed").classList.remove("hidden");
            document.getElementById("tray").classList.remove("hidden");
            document.getElementById("powerClick").disabled = false;
            break;
    }
}

function introOne() {
    typeWriter(txt.one, "story");
    setTimeout(introTwo, 3000);
}

function introTwo() {
    typewriter.i = 0;
    document.getElementById("story").innerHTML = "";
    typeWriter(txt.two, "story");
    setTimeout(introThree, 5000);
}

function introThree() {
    typewriter.i = 0;
    document.getElementById("story").innerHTML = "";
    typeWriter(txt.three, "story");
    setTimeout(introFour, 3000);
}

function introFour() {
    typewriter.i = 0;
    document.getElementById("story").innerHTML = "";
    typeWriter(txt.four, "story");
    setTimeout(function(){document.getElementById("introButton").classList.remove("hidden"); document.getElementById("storyPower").classList.remove("hidden");
    document.getElementById("introButton").disabled=false}, 4000);
}

function introButtonOne() {
    if (inv.power == 9) {
        inv.power += 1;
        typewriter.i = 0;
        document.getElementById("introButton").classList.add("hidden");
        document.getElementById("introButton").disabled = true;
        document.getElementById("storyPower").innerHTML = inv.power;
        document.getElementById("story").innerHTML = "";
        typeWriter(txt.five, "story");
        setTimeout(function(){document.getElementById("story").innerHTML = ""; typewriter.i = 0; typeWriter(txt.six, "story"); 
            document.getElementById("introButton").onclick = introButtonTwo;},3500);
        setTimeout(function(){document.getElementById("introButton").innerHTML = "Unfold Panel"; document.getElementById("introButton").classList.remove("hidden");
            document.getElementById("introButton").disabled = false},5000);
    } else {
        inv.power += 1;
        document.getElementById("storyPower").innerHTML = inv.power;
    }    
}

function introButtonTwo() {
    gen.panel += 1;
    inv.power -= cost.panel;
    cost.panel = Math.floor(cost.panel*costMulti);
    typewriter.i = 0;
    storyPosition = 1;
    document.getElementById("introButton").classList.add("hidden");
    document.getElementById("storyPower").classList.add("hidden");
    document.getElementById("storyPower").innerHTML = inv.power;
    document.getElementById("introButton").disabled = true;
    document.getElementById("story").innerHTML = "";
    typeWriter(txt.seven, "story");
    setTimeout(function(){document.getElementById("story").innerHTML = ""; typewriter.i = 0; typeWriter(txt.eight, "story")},3500);
    setTimeout(function(){document.getElementById("story").innerHTML = ""; typewriter.i = 0; typeWriter(txt.two, "story")}, 7500);
    setTimeout(function(){document.getElementById("storyIntro").classList.add("hidden"); document.getElementById("title").classList.remove("hidden");
        document.getElementById("inv").classList.remove("hidden"); document.getElementById("feed").classList.remove("hidden");
        document.getElementById("tray").classList.remove("hidden"); document.getElementById("powerClick").disabled = false}, 11500);
}

//-------------------------
// Time Loops
//-------------------------

// Functions to run every half-second
var SecondLoop = window.setInterval(function() {
    powerAuto();
    buttonEnableDisable();
}, 1000)

// Functions to run every tenth of a second
var tenthSecondLoop = window.setInterval(function() {
    resourceChange()
}, 100)

// Every 15 seconds, make an autosave
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("storyPosition", JSON.stringify(storyPosition))
}, 15000)

//-------------------------
// Misc Functions
//-------------------------

// Provides typewriter effect with string as parameter one, and target id as parameter two
function typeWriter(text, target) {
    if (typewriter.i < text.length) {
      document.getElementById(target).innerHTML += text.charAt(typewriter.i);
      typewriter.i++;
      setTimeout(function(){typeWriter(text, target)}, typewriter.speed);
    }
}

// Resets local data - turn into new game button at some point?
function reset() {
    storyPosition = 0;
    localStorage.setItem("storyPosition", JSON.stringify(storyPosition))
    location.reload();
}