let moneyLeftDisplay = document.getElementById("money_left");

let money = 100000000; //The money you start with

let interval = 10;

let amounts = {
    bigmac: 0,
    cola: 0,
    fries: 0,
    hotdog: 0,
    coffeemug: 0,
    notebook: 0,
    earbuds: 0,
    kettle: 0,
    smartphone: 0,
    laptop: 0,
    camera: 0,
    watch: 0,
    used_car: 0,
    speedboat: 0,
    rv: 0,
    small_airplane: 0,
    luxury_car: 0,
    small_yacht: 0,
    private_island: 0,
    luxury_home: 0
};

function reloadPage() {
    const inputDisplays = document.getElementsByClassName("amount");
    for (let i = 0; i < inputDisplays.length; i++) {
        inputDisplays[i].value = "0";
    }
    moneyLeftDisplay.textContent = `$${money}`;
    updateText(money, money)
}

let currentUpdateInterval = null; // Global variable to track the active interval

function updateText(startval, endval) {
    let diff = startval - endval;
    let steps = Math.abs(diff); // Total steps to reach the target
    let stepSize = Math.max(Math.ceil(steps / 30), 1); // Calculate step size (higher for larger diffs)

    // Clear any ongoing interval before starting a new one
    if (currentUpdateInterval !== null) {
        clearInterval(currentUpdateInterval);
        moneyLeftDisplay.textContent = `$${startval}`;
        currentUpdateInterval = null;
    }

    // Start a new interval
    currentUpdateInterval = setInterval(function () {
        if (diff > 0) {
            startval -= Math.min(stepSize, Math.abs(diff)); // Decrease with stepSize, but not more than needed
            moneyLeftDisplay.textContent = `$${startval}`;
            diff = startval - endval; // Recalculate diff
        } else if (diff < 0) {
            startval += Math.min(stepSize, Math.abs(diff)); // Increase with stepSize, but not more than needed
            moneyLeftDisplay.textContent = `$${startval}`;
            diff = startval - endval; // Recalculate diff
        } else {
            console.log("Money didn't change");
        }

        if (startval === endval) {
            clearInterval(currentUpdateInterval);
            moneyLeftDisplay.textContent = `$${startval}`;
            currentUpdateInterval = null; // Reset the global variable when done
        }
    }, interval);

    const buttons = document.getElementsByClassName('btn');

    for (let button of buttons) {
        // Access specific attributes
        const type = button.getAttribute('data-type-bt');

        if (type == "buy") {
            const itemPrice = button.getAttribute('data-price-bt');

            if (money >= itemPrice) {
                button.classList.remove('disabledButton');
                button.classList.add('buyButton');
            } else {
                button.classList.remove('buyButton');
                button.classList.add('disabledButton');
            }
        }

        if (type == "sell") {
            const item = button.getAttribute('data-item-bt');
            let itemAmount = amounts[item];

            if (itemAmount > 0) {
                button.classList.remove('disabledButton');
                button.classList.add('sellButton');
            } else {
                button.classList.remove('sellButton');
                button.classList.add('disabledButton');
            }
        }
    }

}



function buyItem(item, price) {
    let idName = `amount_${item}`; //Id name
    let inputDisplay = document.getElementById(idName); //Imports input element with help of idName
    let moneyBeforeBuy = money;

    if (money >= price) { //Checks if you have enough money
        money -= price;
        if (inputDisplay) { 
            amounts[item] = parseInt(inputDisplay.value) || 0; //sets amounts[item] to the number in inputDisplay
            amounts[item]++;
            inputDisplay.value = amounts[item];
        }
        else {
            console.log(`Element with id ${idName} not found`);
        }
    }
    else {
        console.log("Not enough money");
    }
    updateText(moneyBeforeBuy, money); //updates moneyDisplay
}


function sellItem(item, price) {
    let idName = `amount_${item}`; //id name
    let inputDisplay = document.getElementById(idName); //Imports input element with help of idName
    let moneyBeforeSell = money;

    if (inputDisplay && parseInt(inputDisplay.value) > 0) { //Tjeker om inputDisplay value er større end 0
        money += price;
        if (inputDisplay) {
            amounts[item] = parseInt(inputDisplay.value) || 0; //sets amounts[item] to the number in inputDisplay
            amounts[item]--;
            inputDisplay.value = amounts[item];
        }
        else {
            console.log(`Element with id ${idName} not found`);
        }
    }
    else {
        console.log("Not enough items");
    }
    updateText(moneyBeforeSell, money); //updates moneyDisplay
}

document.addEventListener('input', function (e) {
    // Check if the event comes from a element with data-attributes
    if (e.target.hasAttribute('data-price') && e.target.hasAttribute('data-item')) {
        let itemName = e.target.getAttribute('data-item'); // imports itemName
        let itemPrice = parseInt(e.target.getAttribute('data-price')); // imports price
        let newAmount = parseInt(e.target.value) || 0; // Users input
        let currentAmount = amounts[itemName]; // current amount
        let difference = newAmount - currentAmount; // calulates the difference
        let moneyBefore = money;

        if (difference > 0) {
            // More
            for (let i = 0; i < difference; i++) {
                if (money >= itemPrice) {
                    money -= itemPrice;
                    amounts[itemName]++;
                } else {
                    break; // Stop if user dosent have enough money
                }
            }
        } else if (difference < 0) {
            // Less
            for (let i = 0; i < Math.abs(difference); i++) {
                if (amounts[itemName] > 0) {
                    money += itemPrice;
                    amounts[itemName]--;
                } else {
                    break; // Stop if user dosent have enough items
                }
            }
        }

        // updates the inputDisplay
        e.target.value = amounts[itemName];
        updateText(moneyBefore, money);
    }

});
