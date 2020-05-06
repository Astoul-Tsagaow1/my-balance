

let userDescriptions = document.getElementById("userdescriptions");
let Selecte_Pluse_Minus = document.getElementById('Selecte_Pluse_Minus');
let userNumbers = document.getElementById('userNumberss');
let buget = document.getElementById("Balancetitle");
let incomeListUL = document.getElementById("incomelistUL");
let incomeheadNumbers = document.getElementById("incomeheadNumbers");
let expenseslistUL = document.getElementById('expenseslistUL');
let exspensesheadNumbers = document.getElementById('exspensesheadNumbers');
let iconeColor = document.getElementById('iconeColor');
let percentage = document.getElementById('GeneralPercentage');
let totalplus = 0;
let sumExpenses = 0;
let totalMinus = 0;
let totalbuget = 0;
let Mybudget = 0;
let userPlusNumbers = 0;
let userMinusNumbers = 0;
let presencheEXspensenumbers = document.getElementsByClassName('presencheEX')
let arrayExspenseNumbers = []

function totalBalance() {
    totalbuget = totalMinus + totalplus;
    buget.innerHTML = totalbuget;
    if (totalbuget > 0) {
        buget.innerText = `+${totalbuget}`;
    }
    else {
        buget.innerText = `${totalbuget}`;
    }
}

function peresenche() {
    if (totalplus == 0) {
        return percentage.innerHTML = `0%`;/// פונקציה של אחוזים
    }
    else { percentage.innerHTML = Math.floor((-totalMinus / totalplus) * 100) + '%' };
};
function exspensPresenche() {
    if (totalplus == 0) {
        return presencheEXspensenumbers.innerHTML = `0%`;/// פונקציה של אחוזים
    }
    for (let i = 0; i < presencheEXspensenumbers.length; i++) {
        presencheEXspensenumbers[i].innerHTML = Math.floor((arrayExspenseNumbers[i] / totalplus) * 100) + "%";
    }
}


function ChangeBorderColors() {
    if (Selecte_Pluse_Minus.value == '-') {
        iconeColor.style.color = "rgb(249, 53, 58)";
        userNumbers.style.borderColor = 'rgb(249, 53, 58)';
        userDescriptions.style.borderColor = 'rgb(249, 53, 58)';
        Selecte_Pluse_Minus.style.borderColor = 'rgb(249, 53, 58)';
    }
    else if (Selecte_Pluse_Minus.value == '+') {
        iconeColor.style.color = "rgb(51, 169, 164)";
        userNumbers.style.borderColor = 'rgb(51, 169, 164)';
        userDescriptions.style.borderColor = 'rgb(51, 169, 164)';
        Selecte_Pluse_Minus.style.borderColor = 'rgb(51, 169, 164)';

    }
};
function mounthfunction() {
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    let thedate = new Date();
    let themonth = month[thedate.getMonth()];
    document.getElementById("month").innerHTML = themonth
}
function yearfunction() {
    thedate = new Date();
    let theyear = thedate.getFullYear();
    document.getElementById("month").innerHTML += `<span> ${theyear} </span>`;
}
mounthfunction();
yearfunction();


// income list remove
incomeListUL.addEventListener('click', (e) => {
    if (e.target.classList.contains('icone-green')) {
        let numbervalueincome = e.target.previousElementSibling.innerHTML;// + 55 
        e.target.parentElement.remove();
        numbervalueincome = numbervalueincome.split(" ");
        numbervalueincome = Number(numbervalueincome[1]);
        totalbuget -= numbervalueincome;
        totalplus -= numbervalueincome;
        incomeheadNumbers.innerHTML = `+${totalplus}`;
       
        totalBalance(); exspensPresenche(); 
        peresenche();

    }
});
///exspenses list remove
expenseslistUL.addEventListener('click', (e) => {
    if (e.target.classList.contains('icone-red')) {
        
        let numbervalueexspens = e.target.previousElementSibling.innerHTML;
        e.target.parentElement.remove();
        numbervalueexspens = numbervalueexspens.split(" ");
        numbervalueexspens = Number(numbervalueexspens[0]);
        totalbuget += numbervalueexspens;
        totalMinus += numbervalueexspens;
        exspensesheadNumbers.innerText = totalMinus;
        exspensPresenche(); 
        totalBalance()
        peresenche();
    }
});
////////////////////////////////****************************************************************************************
function AftersendDescriptionsNumbers() {
    /////// income **
    if ((Selecte_Pluse_Minus.value == '+') && (userNumbers.value > 0) && (userDescriptions.value != '')) {
        ChangeBorderColors();
        userPlusNumbers = Number(userNumbers.value);
        incomeListUL.innerHTML += `<li class="Li_Income_List"> <span>${userDescriptions.value}</span>
     <span class="Income_List_Bottom_Numbers"> +${userPlusNumbers}</span >
    <i style="color:rgb(51, 169, 164)" class="far icone-green  fa-times-circle" ></i></li>`;
        totalplus += userPlusNumbers;
        buget.innerHTML = ` + ${userPlusNumbers}`;
        incomeheadNumbers.innerHTML = `+ ${totalplus}`;
    }
    /////// exspenses **
    else if ((Selecte_Pluse_Minus.value == '-') && (userNumbers.value > 0) && (userDescriptions.value != '')) {
        ChangeBorderColors()
        userMinusNumbers = Number(userNumbers.value);
        arrayExspenseNumbers.push(userMinusNumbers);
      
        expenseslistUL.innerHTML += `<li class="Li_EXspenses_List"> <span>${userDescriptions.value}</span>
     <span class="EXspenses_List_Bottom_Numbers">${userMinusNumbers}</span> 
    <i style="color:red" class="far icone-red fa-times-circle" > <span class="presencheEX" >0%</span></i></li>`;
        totalMinus -= userMinusNumbers;
        exspensesheadNumbers.innerHTML = totalMinus;
    };
    // היתרה
    exspensPresenche(); 
    totalBalance();
    peresenche();
}

window.addEventListener("keypress", function (e) {
    if (e.keyCode == 13) {
        AftersendDescriptionsNumbers()
    }
})


