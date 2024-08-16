const display = document.getElementById("display")
const calcBtn = document.querySelectorAll(".calc-button")
const OperandBtn = document.querySelectorAll(".operator-button")
const NumberBtn = document.querySelectorAll(".num-button")
let calculateArr = []
let initialDisplay = 0
let lastOperator = null

display.value = initialDisplay;

calcBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
    const btnText = btn.innerText
    

    if (!isNaN(btnText) || btnText === '.'){

        if  (btnText === "." && display.value.includes(".") ){
            return;
           } 

       

        if (display.value === initialDisplay.toString() || lastOperator){
            if (btnText === "."){
                display.value += btnText
            } else{ 
           display.value = btnText
            }
            lastOperator = null
        } else  {
            display.value += btnText
        }
       } else if (btnText === "+" || btnText === "-" || btnText === "X" || btnText === "÷") {

         if (display.value != initialDisplay.toString){
            if (lastOperator){
                calculateArr[calculateArr.length - 1] = btnText
            } else {
                calculateArr.push(display.value)
                calculateArr.push(btnText)
            }
         } else if (display.value === initialDisplay.toString()) {
            if (lastOperator) {
                calculateArr[calculateArr.length - 1] = btnText; 
            } else {
                calculateArr.push(display.value);
                calculateArr.push(btnText);       
            }
        } else if (calculateArr.length >= 2){ 
            display.value = calculateArr[calculateArr.length - 2];
            calculateArr[calculateArr.length - 1] = btnText;  
         }

         lastOperator = btnText
       }
       

    })
})



const calculateDisplay = () => {
 
}

