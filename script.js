document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.querySelector(".msger-chat");
    let isReady = false;
    let mainSource = "";
    let totalIncome = 0;
    let numDependents = 0;
    let errorMessageCount = 0;
    let isBudgetBreakdownShown = false;

    function startChat() {
        setTimeout(function() {
            showBotMessage("I am a.w.e.s.o.m.o your budget assistant. I will help you to better organize your finances. As an international student in Germany, it is important to have a good organization of your money. Are you ready?");
        }, 700);
    }

    function handleUserResponse(userInput) {
        userInput = userInput.toLowerCase();
        if (!isReady) {
            if (userInput === "no") {
                showBotMessage("Don't worry, we can start another time. Bye!");
                setTimeout(function() {
                    resetChat();
                }, 4000);
            } else if (userInput === "yes") {
                isReady = true;
                showBotMessage("Let's start! What is your main source of income?\n- Work\n- Savings\n- Scholarship");
            } else {
                showErrorMessage("Sorry, I could not understand what you said. Please say 'yes' or 'no'.");
            }
        } else {
            if (mainSource === "") {
                if (userInput === "work" || userInput === "savings" || userInput === "scholarship") {
                    mainSource = userInput;
                    showBotMessage("How much is your total income enter the amount in euro?");
                } else {
                    showErrorMessage("Sorry, I could not understand what you said. Please say 'work', 'savings', or 'scholarship'.");
                }
            } else if (!isNaN(userInput) && totalIncome === 0) {
                const income = parseInt(userInput);
                if (income >= 934) {
                    totalIncome = income;
                    showBotMessage("How many people are dependent on this income?");
                } else {
                    showErrorMessage("Remember that the monthly income required by German law is 934 per person. Please try again.");
                }
            } else if (!isNaN(userInput) && mainSource !== "" && totalIncome > 0) {
                numDependents = parseInt(userInput);
                if (numDependents >= 1) {
                    const monthlyIncomePerPerson = Math.round(totalIncome / numDependents);
                    if (monthlyIncomePerPerson >= 934) {
                        const needs = Math.round(totalIncome * 0.5);
                        const luxuries = Math.round(totalIncome * 0.3);
                        const savings = Math.round(totalIncome * 0.2);

                        const tableHTML =
                            `<table class="table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Needs</td>
                                    <td>${needs}</td>
                                </tr>
                                <tr>
                                    <td>Luxuries</td>
                                    <td>${luxuries}</td>
                                </tr>
                                <tr>
                                    <td>Savings</td>
                                    <td>${savings}</td>
                                </tr>
                            </tbody>
                            </table>`;

                        showBotMessage(`Based on your income and the number of dependents, here is a budget breakdown:<br>${tableHTML} This is just a recommended budgeting method that you can use as a starting point<br> Would you like some tips for budgeting?`);
                        isBudgetBreakdownShown = true;
                    } else {
                        showErrorMessage("The income per person is less than 934, which is required by German law. Please try again.");
                    }
                } else {
                    showErrorMessage("Please enter a valid number for the number of dependents.");
                }
            } else {
                if (isBudgetBreakdownShown) {
                    if (userInput === "yes") {
                        showBotMessage("Here are some additional tips for budgeting your income:\n\n <br>-Track your spending: This will help you see where your money is going and identify areas where you can cut back.\n " +
                            "<br>-Set realistic goals: Don't try to save too much money too quickly. Start with small, achievable goals and build on them over time.\n" +
                            "<br>-Be flexible: Things happen, and your budget may need to be adjusted accordingly. Don't beat yourself up if you go over budget one month. Just make sure to adjust your budget for the next month.\n" +
                            "<br>-Automate your savings: This is a great way to make sure you're saving money each month, even if you don't have a lot of extra cash. You can set up automatic transfers from your checking account to your savings account, or you can have your employer contribute a portion of your paycheck directly to your savings account.\n" +
                            "<br>-Pay yourself first: This means setting aside money for your savings goals before you pay your bills or spend any money on discretionary expenses. This will help you ensure that you're saving for your future, even when times are tough.\n" +
                            "<br>-Review your budget regularly: Your budget should be a living document that you review and update on a regular basis. This will help you stay on track and make sure that your budget is still working for you.\n\n" +
                            "<br><br>I hope this helps!");
                    } else {
                        showBotMessage("It was nice to help you, bye!");
                        setTimeout(function() {
                            resetChat();
                        }, 3000);
                    }
                } else {
                    showErrorMessage("Sorry, I could not understand what you said. Please enter a valid number.");
                }
            }
        }
    }

    function showErrorMessage(message) {
        errorMessageCount++;
        if (errorMessageCount <= 3) {
            showBotMessage(message);
        } else {
            showBotMessage("Let's start again");
            setTimeout(function() {
                resetChat();
            }, 3000);
        }
    }

    function resetChat() {
        chatContainer.innerHTML = "";
        isReady = false;
        mainSource = "";
        totalIncome = 0;
        numDependents = 0;
        errorMessageCount = 0;
        isBudgetBreakdownShown = false;
        startChat();
    }

    startChat();

    document.querySelector(".msger-inputarea").addEventListener("submit", function(e) {
        e.preventDefault();
        const userInput = document.querySelector(".msger-input").value;
        if (userInput.trim() !== "") {
            showUserMessage(userInput);
            document.querySelector(".msger-input").value = "";
            handleUserResponse(userInput);
        }
    });
});

function showBotMessage(message) {
    const chatContainer = document.querySelector(".msger-chat");
    const msgHTML =
        `<div class="msg left-msg">
        <div class="msg-img" style="background-image: url(alex.jpg)"></div>
        <div class="msg-bubble">
            <div class="msg-text">${message}</div>
        </div>
        </div>`;
    chatContainer.insertAdjacentHTML("beforeend", msgHTML);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showUserMessage(message) {
    const chatContainer = document.querySelector(".msger-chat");
    const msgHTML =
        `<div class="msg right-msg">
        <div class="msg-img" style="background-image: url(butters.png)"></div>
        <div class="msg-bubble">
            <div class="msg-text">${message}</div>
        </div>
        </div>`;
    chatContainer.insertAdjacentHTML("beforeend", msgHTML);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
