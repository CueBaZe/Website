const choices = ["sten", "saks", "papir"] //Set the choices the computer have
const playerDisplay = document.getElementById("playerDisplay")
const computerDisplay = document.getElementById("computerDisplay")
const resualtDisplay = document.getElementById("resualtDisplay")
const playerScoreDisplay = document.getElementById("playerNumber")
const computerScoreDisplay = document.getElementById("computerNumber")
let playerScore = 0;
let computerScore = 0;

function playgame(playerchoice) {
    //Makes the computer chose one of the choices
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    //Makes a variable named "resualt"
    let resualt = "";
    //Check if the computer and player chose the same thing
    if (playerchoice === computerChoice) {
        resualt = "DET BLEV UAFGJORT"
    }
    else {
        switch(playerchoice) {
            //When player chose "sten" it check if the computer chose "saks",
            //if not the computer wins.
            case "sten":
                resualt = (computerChoice === "saks") ? "DU VANDT!" : "DU TABTE!";
                break
            //When player chose "saks" it check if the computer chose "papir",
            //if not the computer wins.
            case "saks":
                resualt = (computerChoice === "papir") ? "DU VANDT!" : "DU TABTE!";
                break
            //When player chose "papir" it check if the computer chose "sten",
            //if not the computer wins.
            case "papir":
                resualt = (computerChoice === "sten") ? "DU VANDT!" : "DU TABTE!";
                break
        }
    }
    //it updates the text
    playerDisplay.textContent = `Player: ${playerchoice}`;
    computerDisplay.textContent = `Computer: ${computerChoice}`;
    resualtDisplay.textContent = resualt;
    //Removes the class "greentext" and "redtext" from resualtDisplay
    resualtDisplay.classList.remove("greentext", "redtext");


    switch(resualt) {
        //Checks if player won if not it go to the next case
        case "DU VANDT!":
            //Adds the class "greentext" to resualtDisplay
            resualtDisplay.classList.add("greentext");
            //Give the player 1 point
            playerScore++;
            //Updates the playerScoreDisplay
            playerScoreDisplay.textContent = playerScore;
            break
        //Checks if the player lost
        case "DU TABTE!":
            //Adds the class "redtext" to resualtDisplay
            resualtDisplay.classList.add("redtext");
            //Give the computer 1 point
            computerScore++
            //Updates the computerScoreDisplay
            computerScoreDisplay.textContent = computerScore;
            break
    }
}