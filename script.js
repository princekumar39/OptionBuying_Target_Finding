document.getElementById("calculate").addEventListener("click", function () {

const inputs = document.querySelectorAll(".input-box input")
for(let i=2;i<inputs.length;i++)
{
    if(inputs[i].value === "")
    {
        alert("Please fill all required fields")
        inputs[i].style.border="2px solid red"
        return
    }
}

const strike = inputs[1].value.toUpperCase()

const premium = parseFloat(inputs[2].value)
const delta = parseFloat(inputs[3].value)
const theta = parseFloat(inputs[4].value)
const stockEntry = parseFloat(inputs[5].value)
const stockTarget = parseFloat(inputs[6].value)
const stockSL = parseFloat(inputs[7].value)
const lotSize = parseFloat(inputs[8].value)

inputs[6].style.border = ""
inputs[7].style.border = ""


// CE Validation
if(strike.includes("CE"))
{

if(stockTarget <= stockEntry)
{
alert("Target must be greater than Entry for CE")
inputs[6].style.border = "2px solid red"
return
}

if(stockSL >= stockEntry)
{
alert("Stop Loss must be less than Entry for CE")
inputs[7].style.border = "2px solid red"
return
}

}


// PE Validation
if(strike.includes("PE"))
{

if(stockTarget >= stockEntry)
{
alert("Target must be less than Entry for PE")
inputs[6].style.border = "2px solid red"
return
}

if(stockSL <= stockEntry)
{
alert("Stop Loss must be greater than Entry for PE")
inputs[7].style.border = "2px solid red"
return
}

}


// Target Calculation
const stockMove = stockTarget - stockEntry
const optionMove = delta * stockMove
const optionTarget = premium + optionMove + theta


// SL Calculation
const slMove = stockEntry - stockSL
const optionSL = premium - (delta * slMove)

// R:R Calculation
const risk = premium - optionSL
const reward = optionTarget - premium
const rr = reward / risk

document.getElementById("entry").innerText = premium.toFixed(2)
document.getElementById("target").innerText = optionTarget.toFixed(2)
document.getElementById("sl").innerText = optionSL.toFixed(2)
document.getElementById("rr").innerText = "1 : " + rr.toFixed(2)

// Profit & Loss Calculation
const profit = (optionTarget - premium) * lotSize
const loss = (premium - optionSL) * lotSize
document.getElementById("profit").innerText = "₹ " + profit.toFixed(2)
document.getElementById("loss").innerText = "₹ " + loss.toFixed(2)

//................ FOR SL,ENTRY,TARGET SHOWING with adjustment ...............
document.getElementById("sl-value").innerText = optionSL.toFixed(2)
document.getElementById("entry-value").innerText = premium.toFixed(2)
document.getElementById("target-value").innerText = optionTarget.toFixed(2)
//........adjustment part w.r.t price value.........
const slDistance = Math.abs(premium - optionSL)
const targetDistance = Math.abs(optionTarget - premium)
const totalDistance = slDistance + targetDistance

const slWidth = (slDistance / totalDistance) * 100
const targetWidth = (targetDistance / totalDistance) * 100
const entryWidth = 5

document.getElementById("vis-sl").style.width = slWidth + "%"
document.getElementById("vis-entry").style.width = entryWidth + "%"
document.getElementById("vis-target").style.width = targetWidth + "%"

// Move labels according to bar positions
document.querySelector(".label-sl").style.left = "0%"
document.querySelector(".label-entry").style.left = slWidth + "%"
document.querySelector(".label-target").style.left = (slWidth + entryWidth) + "%"
})

//........ Clear red borders automatically when user corrects input...........
const inputs = document.querySelectorAll(".input-box input")

inputs.forEach(input => {

input.addEventListener("input", function(){

this.style.border=""

})

})


function setMarket(symbol){

document.getElementById("stock").value = symbol

// optional: load chart
if(typeof loadChart === "function"){
loadChart(symbol)
}

}

//................. on click start calculator page automatically move to calculator part...................
function scrollToCalculator(){
document.getElementById("calculator").scrollIntoView({
behavior:"smooth"
})
}

//............. for underline indicator moving in header.....
const links = document.querySelectorAll(".nav-link")
const indicator = document.getElementById("nav-indicator")

function moveIndicator(el){
indicator.style.width = el.offsetWidth + "px"
indicator.style.left = el.offsetLeft + "px"
}

links.forEach(link=>{
link.addEventListener("click",function(){

links.forEach(l=>l.classList.remove("active"))
this.classList.add("active")

moveIndicator(this)

})
})

window.addEventListener("load",()=>{
const active = document.querySelector(".nav-link.active")
moveIndicator(active)
})


//...................for mobile responsive navbar.................
function toggleMenu(){
const menu = document.getElementById("nav-menu")
if(menu.style.display === "flex"){
menu.style.display = "none"
}
else{
menu.style.display = "flex"
}
}