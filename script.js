//Select all buttons with class numberButton
const numberButtons = document.querySelectorAll(".numberButton");
//Select display
const display = document.getElementById("display");
//Select elements
const operatorButtons = document.querySelectorAll(".operatorButton");


let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let shouldResetDisplay = false;


//Loop through each button and add a click event listener
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        console.log("Button clicked:", button.textContent);
        if(display.textContent === "0" || shouldResetDisplay){
            display.textContent = button.textContent; //Replace 0 with clicked number
            shouldResetDisplay = false;
        }else{
            display.textContent += button.textContent; //Append clicked number
        }
    });
});

//Function to handle the operator buttons (including C and CE)
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const operator = button.textContent;

        if(operator == "C"){
            clearAll(); //Clear all
        }else if(operator == "CE"){
            clearEntry();   //Clear Entry
        }else if(operator == "="){
            evaluate();
            console.log("Operator clicked:", operator);
        }else{
            setOperator(operator);
        }
    });
});

function clearAll(){
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperator = "";
    shouldResetDisplay = false;
}
function clearEntry(){
    if(display.textContent.length === 1){
        display.textContent = "0"; //Reset if only one character
    }else{
        display.textContent = display.textContent.slice(0, -1); //Remove the last digit
    }
}
function setOperator(operator){
    if(currentOperator !== "" && !shouldResetDisplay){
        evaluate();
    }
    firstOperand = display.textContent;
    currentOperator = operator;
    display.textContent += operator; //Append operator to the display
    //shouldResetDisplay = true;
}

function evaluate(){
    if(currentOperator === "" || shouldResetDisplay) return;

    secondOperand = display.textContent;
    let result;

    switch(currentOperator){
        case "+":
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case "-":
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case "*":
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case "/":
            result = secondOperand === "0" ? "Error" : parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        case "%":
            result = parseFloat(firstOperand) % parseFloat(secondOperand);
            break;
    }
    display.textContent = result;
    firstOperand = result;
    currentOperator = "";
    shouldResetDisplay = true;
}
