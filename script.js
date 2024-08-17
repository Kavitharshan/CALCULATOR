const display = document.getElementById("display")
const calcBtn = document.querySelectorAll(".calc-button")
const OperandBtn = document.querySelectorAll(".operator-button")
const NumberBtn = document.querySelectorAll(".num-button")
let calculateArr = []
let initialDisplay = 0
let lastOperator = null
let initialNegative = false

display.value = initialDisplay;

calcBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
    const btnText = btn.innerText
    

    if (!isNaN(btnText) || btnText === '.'){

        if  (btnText === "." && display.value.includes(".") ){
            return;
           } 

       

        if (display.value === initialDisplay.toString() || lastOperator || initialNegative){
           if(btnText === "."){
                display.value += btnText
           }else if (initialNegative){
                display.value = "-" + btnText
                initialNegative = false
            } else{
                display.value = btnText
            }
            lastOperator = null
        } else  {
            display.value += btnText
        }
       } else if (btnText === "+" || btnText === "-" || btnText === "X" || btnText === "÷") {

         if (display.value != initialDisplay.toString()){
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
         initialNegative = false

       } else if (btnText === "C"){
            display.value = initialDisplay.toString();
            calculateArr = []
            lastOperator = null
            initialNegative = false
       } else if (btnText === "+/-"){
        if (display.value != initialDisplay.toString()){
            display.value = (parseFloat(display.value) * -1).toString()
        } else if (display.value === initialDisplay.toString()){
            display.value = "-" + initialDisplay
        }
        initialNegative = true
       } else if (btnText === "%"){
            if (display.value != initialDisplay.toString()){
                
            }
       }
       

    })
})



const calculateDisplay = () => {
 
}

