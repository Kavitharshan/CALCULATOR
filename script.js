const display = document.getElementById("display")
const calcBtn = document.querySelectorAll(".calc-button")
const OperandBtn = document.querySelectorAll(".operator-button")
const NumberBtn = document.querySelectorAll(".num-button")
let calculateArr = []
let initialDisplay = 0
let lastOperator = null
let initialNegative = false
let modulusTracker = false

display.value = initialDisplay;




calcBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
    const btnText = btn.innerText
    

    if (!isNaN(btnText) || btnText === '.'){

        if  (btnText === "." && display.value.includes(".") ){
            return;
        } 

       

        if (display.value === initialDisplay.toString() || lastOperator || initialNegative || modulusTracker){
            if(btnText === "." && initialNegative){
                display.value += btnText
                initialNegative = false
            }else if(btnText === "."){
                display.value += btnText
            }else if(initialNegative){
                display.value = "-" + btnText
                initialNegative = false 
            }else{
                display.value = btnText
            }


            lastOperator = null
            modulusTracker = false


        } else{
            display.value += btnText
        }

        
       } else if (btnText === "+" || btnText === "-" || btnText === "×" || btnText === "÷") {

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

       } else if (btnText === "AC"){
            display.value = initialDisplay.toString();
            calculateArr = []
            lastOperator = null
            initialNegative = false
            modulusTracker = false  
       } else if (btnText === "+/-"){
        if (display.value != initialDisplay.toString()){
            display.value = (parseFloat(display.value) * -1).toString()
        } else if (display.value === initialDisplay.toString()){        
            display.value = "-" + initialDisplay
            initialNegative = true
        }
        
       } else if (btnText === "%"){
            if (display.value != initialDisplay.toString()){
                display.value = (parseFloat(display.value) / 100).toString()
                modulusTracker = true       
            }
       } else if (btnText === "="){
        if (display.value != initialDisplay.toString() && calculateArr.length >= 2){
            calculateArr.push(display.value)
            calculateArr.push(btnText)
            display.value = calculateDisplay(calculateArr)
            calculateArr = []
            lastOperator = null
            initialNegative = false;
            modulusTracker = false
        }
       }
       

    })
})

const handleDivision = (arr) => {
    let result1 = []
    let i = 0;

    
    while (i < arr.length){
        if (arr[i] === "÷"){

            prevValue = parseFloat(result1.pop())
            nextValue = parseFloat(arr[i + 1])

            result1.push(prevValue / nextValue)

            i += 2
        } else {
            result1.push(arr[i])
            i++
        }
    }

    return result1;
}

const handleMultiplication = (arr) => {
    let result2 = []
    let i = 0

    while (i < arr.length){
        if (arr[i] === "×"){
            
            prevValue = parseFloat(result2.pop())
            nextValue = parseFloat(arr[i + 1])

            result2.push(prevValue * nextValue)

            i += 2
        } else {
            result2.push(arr[i])
            i++
        }


    }

        return result2;
}

const handleAddition = (arr) => {
    let result3 = []
    let i = 0

    while (i < arr.length){
        if (arr[i] === "+"){

        prevValue = parseFloat(result3.pop())
        nextValue = parseFloat(arr[i + 1])

        result3.push(prevValue + nextValue)

        i += 2
     }   else {
            result3.push(arr[i])
            i++
        }
    }

        return result3;
}


const handleSubtraction = (arr) => {
    let result4 = []
    let i = 0

    while (i < arr.length){
        if (arr[i] === "-"){

        prevValue = parseFloat(result4.pop())
        nextValue = parseFloat(arr[i + 1])

        result4.push(prevValue - nextValue)

        i += 2
     }   else {
            result4.push(arr[i])
            i++
        }
    }

        return result4;
}



const calculateDisplay = (calculateArr) => {


 let divided = handleDivision(calculateArr)
 let multiplied = handleMultiplication(divided)
 let addition = handleAddition(multiplied)
 let final = handleSubtraction(addition)

 return final[0];

}

