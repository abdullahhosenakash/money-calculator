// get the input value 
function getIputValue(inputId) {
    const inputValueText = document.getElementById(inputId).value;
    const inputValue = parseFloat(inputValueText);
    if (isNaN(inputValue)) {
        return 'inputNaN';
    }
    else if (inputValueText.length != inputValue.toString().length) {
        alert('Please input correctly!');
    }
    else {
        return inputValue;
    }
}

// get inner text value
function getAmountTextValue(textId, updatedAmount) {
    const amountText = document.getElementById(textId);
    amountText.innerText = updatedAmount;
}

// calculate total expenses 
function getTotalExpenses() {
    const foodCost = getIputValue('food-cost');
    const rentCost = getIputValue('rent-cost');
    const clothesCost = getIputValue('clothes-cost');
    if (foodCost == 'inputNaN' || rentCost == 'inputNaN' || clothesCost == 'inputNaN') {
        alert('Text input not allowed!');
    }
    else if (foodCost < 0 || rentCost < 0 || clothesCost < 0) {
        alert("Amount can't be negative!");
    }
    else {
        const totalExpenses = foodCost + rentCost + clothesCost;
        return totalExpenses;
    }
}

function calculate() {
    const totalIncome = getIputValue('total-income');
    if (totalIncome == 'inputNaN') {
        alert('Text input not allowed!');
    }
    else if (totalIncome <= 0) {
        alert("Amount can't be zero or negative!");
    }
    else if (totalIncome > 0) {
        const totalExpenses = getTotalExpenses();
        if (!isNaN(totalExpenses)) {
            if (totalIncome < totalExpenses) {
                alert("Your expenses can't be greater than your income!");
                return 0;
            }
            else {
                const balance = totalIncome - totalExpenses;
                return balance;
            }
        }

    }
}

function updatedAmount(savingOrExpensesId, newBalanceId, isCalculateButton, isSaveButton) {
    const balance = calculate();
    if (!isNaN(balance)) {
        let newBalance = 0;
        let savingOrExpensesAmount = 0;
        if (isCalculateButton) {
            savingOrExpensesAmount = getTotalExpenses();
            if (!isNaN(savingOrExpensesAmount)) {
                newBalance = balance;
                if (newBalance == 0) {
                    savingOrExpensesAmount = 0
                }
            }
            else {
                savingOrExpensesAmount = 0;
            }

        }
        else if (isSaveButton) {
            const savingAmount = getSavingAmount();
            if (balance < savingAmount) {
                alert("You don't have enough money to save!");
            }
            else {
                newBalance = balance - savingAmount;
                savingOrExpensesAmount = savingAmount;
            }

        }
        document.getElementById(savingOrExpensesId).innerText = savingOrExpensesAmount;
        document.getElementById(newBalanceId).innerText = newBalance;
        document.getElementById('save-button').removeAttribute('disabled');
    }
}


function getSavingAmount() {
    const savingInputValue = getIputValue('saving-input');
    if (savingInputValue == 'inputNaN') {
        alert('Text input not allowed!');
    }
    else if (savingInputValue <= 0) {
        alert("Amount can't be zero or negative!");
    }
    else if (savingInputValue > 0) {
        const balance = calculate();
        const savingAmount = balance * savingInputValue / 100;
        return savingAmount;
    }


}

// calculate expenses and balance 
document.getElementById('calculate-button').addEventListener('click', function () {
    updatedAmount('total-expenses', 'balance', true, false);
    document.getElementById('saving-input').value = '';
    document.getElementById('saving-amount').innerText = 0;
    document.getElementById('remaining-balance').innerText = 0;
});

// calculate savings and remaining balance 
document.getElementById('save-button').addEventListener('click', function () {
    updatedAmount('saving-amount', 'remaining-balance', false, true);
});