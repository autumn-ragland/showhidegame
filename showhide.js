let clicks = 0;
let targets = 0;
let hits = 0;
//win/lose counter
var wincount = 0;
var losscount = 0;
var backgroundImg = "";

// Point of Entry called from HTML when page is loaded
function letsRock() {
    let theGo = document.getElementById("goGetIt");
    //set background choice
    $("#forest").on("click", back1);
    function back1(){
        $("table").removeClass("back2");
        $("table").removeClass("back3");
        $("table").addClass("back1");
        backgroundImg = "forest"
    }
    $("#city").on("click", back2);
    function back2(){
        $("table").removeClass("back1");
        $("table").removeClass("back3");
        $("table").addClass("back2");
        backgroundImg = "city"
    }
    $("#sea").on("click",back3);
    function back3(){
        $("table").removeClass("back1");
        $("table").removeClass("back2");
        $("table").addClass("back3");
        backgroundImg = "sea"
    }


    theGo.onclick = function () {
        // Get random number of targets and do setup
        const targetKount = document.getElementById("numberOfTargets").value;
        $("#howmanyclicks").text(targetKount);
        // Don't allow more than 50 targets as that's all the TDs we have
        if (targetKount > 50)
        {
            alert("Maximum number of targets is 50!");
            return;
        }
        const targetTime = document.getElementById("displayTime").value;
        // Now start the game!
        setUpTargetsAndPlay(parseInt(targetKount), parseInt(targetTime));
    };
}
// Utility function to get a random table cell number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function gets called if player hits a target
function clickedTarget(e) {
    console.log(e.target);
    // Let's get the hit item and store in a variable
    let hit = e.target.querySelector("img");

    /*  Do some sanity checks making sure there is an image and it has the 'display' style
        before we try to change the display property.
    */
    if (hit != null && hit.style.display != null) {
        // Make hit target image visible again
        e.target.querySelector("img").style.display = 'block';
    }
    console.log("Got a Hit!");
    // Update their hit score
    hits += 1;
}

function testThis(el) {
    console.log(el);
}
// The main function that sets up targets and starts a game
function setUpTargetsAndPlay(numberOfTargets, displayTimeMs) {
    clicks = 0;
    targets = numberOfTargets;
    hits = 0;
    // Clear any target images from prior game (FIXME: Sometimes doesn't remove them all :-(
    $(".targetImg").remove();
    // Setup click detection for the entire table
    $("table").on("click", function () {
        clicks += 1;
        //how many guesses does the user have left
        $("#howmanyclicks").text(targets - clicks);
        console.log("clicked = " + clicks + " Max = " + targets);
        if (clicks === targets) {  // Player out of clicks!
            // FIXME: Sometime at end of game hits are more than 5 for some reason which should be impossible
            alert("No more clicks! You got " + hits + " out of " + targets);
            if(hits===targets){
                $("#winLose").text("WINNER");
                wincount++
            }
            else{
                $("#winLose").text("LOSER");
                losscount++
            }
            //show winner or loser and add to win/loss count
            $("#winLose2").removeAttr("hidden");
            $("#count1").text(wincount);
            $("#count2").text(losscount);
            // Turn off click detection
            $("td").off("click");
            $("table").off("click");
            $(".targetImg").show(); // Show where all the targets were hidden
        }
    });

    console.log("setting up " + targets + " targets");
    // Get the number of targets specified and randomly picks cells to display them in for the target table
    for (let x = 0; x < targets; x++) {
        let targetNum = getRandomInt(1, 50); // Pick a random table cell
        console.log("Table cell selected for target = " + targetNum);
        let tdID = "td" + targetNum;
        let imgID = "img" + targetNum;

        // Set an IMG for each randomly selected cell along with 'click' event handler
        function backgroundIcon() {
            if(backgroundImg === "sea"){
                $('#' + tdID).append("<img id = " + imgID + " class= 'targetImg' src='boat.png'>");
            }
            else if(backgroundImg === "city") {
                $('#' + tdID).append("<img id = " + imgID + " class= 'targetImg' src='car.png'>");
            }
            else if(backgroundImg === "forest"){
                $('#' + tdID).append("<img id = " + imgID + " class= 'targetImg' src='bird.png'>");
            }
            else if(backgroundImg === "none"){
                $('#' + tdID).append("<img id = " + imgID + " class= 'targetImg' src='circle.png'>");
            }
            else
                console.log("Not working now")
        }
        backgroundIcon();
        // $('#' + imgID).delay(2000).show(0); // Wait 2 seconds then show the targets
        $('#' + imgID).delay(displayTimeMs).hide(0); // Setup a callback that will hide the images after the specified time
        $('#' + tdID).on("click", clickedTarget);
    }

}

