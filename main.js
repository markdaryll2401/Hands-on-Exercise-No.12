const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const dropdown = document.getElementById("dropdown");

const tbl = document.getElementById("tblNumbers");


let total = 0;

let numbersArr = new Array();


btn1.addEventListener("click", () => {

    const txtNumber = document.getElementById("txtNum").value;

    let num;
    let regex = /^[0-9]+$/; // regular expression for checking valid positive number values.


    if(txtNumber.match(regex)){
        num = parseInt(txtNumber);
        numbersArr.push(num);
        console.log(numbersArr);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a number");
        document.getElementById("txtNum").value = "";
        return;
    }

    iterateNumbers();
    
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    // reset all trs
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }
    document.getElementById("btn3").style.display = "none";
    document.getElementById("btn4").style.display = "none";
    document.getElementById("btn5").style.display = "none";
    document.getElementById("dropdown").style.display = "none";

});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";

    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";

    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;
        
    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});

btn5.addEventListener("click", () => {
    let min=0,max=0;
    const trHigh = document.createElement("tr");
    const tdLowLabel1 = document.createElement("td");
    const tdLowValue1 = document.createElement("td");

    const trLow = document.createElement("tr");
    const tdLowLabel2 = document.createElement("td");
    const tdLowValue2 = document.createElement("td");

    max = Math.max.apply(null, numbersArr);
    min = Math.min.apply(null, numbersArr);

    trHigh.style.height = "30px";
    trLow.style.height = "30px";

    tdLowLabel1.style.fontWeight = "bold";
    tdLowLabel1.innerHTML = "HIGHEST";

    tdLowValue1.style.textDecoration = "underline";
    tdLowValue1.innerHTML = max;

    tdLowLabel2.style.fontWeight = "bold";
    tdLowLabel2.innerHTML = "LOWEST";

    tdLowValue2.style.textDecoration = "underline";
    tdLowValue2.innerHTML = min;
        
    trHigh.appendChild(tdLowLabel1);
    trHigh.appendChild(tdLowValue1);
    trLow.appendChild(tdLowLabel2);
    trLow.appendChild(tdLowValue2);
    tbl.appendChild(trHigh);
    tbl.appendChild(trLow);
});

dropdown.addEventListener("change", () => {
    iterateNumbers();
});

function deleteNumber(i) {
    numbersArr.splice(i,1);
    iterateNumbers();
    console.log(numbersArr)
}

function editNumber(i) {

    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/; // regular expression for checking valid positive number values.
    
    if(editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else {
        if(editTxt.match(regex)) {
            numbersArr[i] = parseInt(editTxt);
            iterateNumbers();
            console.log(numbersArr);
        } else {
            alert("You did not input a valid number!");
        }
    } 
}

function iterateNumbers() {
    // reset all trs
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if(!(numbersArr.length == 0)) {

        let ddValue = document.getElementById("dropdown").value;
        total = 0;

        console.log(`Array Length: ${numbersArr.length}`);
        
        let arrNew = [...numbersArr];
        
        if(ddValue === "v2"){
                    arrNew.sort((a, b) => a - b);
                }else if(ddValue === "v3"){
                    arrNew.sort((a, b) => b - a);
                }

        // Loop for iterating numbers from the array in a table
        for(let i=0 ; i < numbersArr.length ; i++) {

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td"); // for the delete button
            const td4 = document.createElement("td"); // for the delete button
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = arrNew[i];

            td2.style.width = "70px";

            if(numbersArr[i] %2 == 0) {
                td2.style.color = "green";
                td2.innerHTML = "EVEN";
            } else {
                td2.style.color = "blue";
                td2.innerHTML = "ODD";
            }

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`) ;
            btnDelete.innerHTML = "Remove"; 

            btnEdit.setAttribute("onclick", `editNumber(${i})`) ;
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);

            if(!(numbersArr.length == 0)) {
                document.getElementById("btn3").style.display = "inline";
                document.getElementById("btn4").style.display = "inline";
                document.getElementById("btn5").style.display = "inline";
                document.getElementById("dropdown").style.display = "inline";
            }
            
            total += numbersArr[i];
            console.log(numbersArr[i]);

            console.log(`Total: ${total}`)
        }
    } else {
        total = 0;
        document.getElementById("btn4").style.display = "none";
    }

}