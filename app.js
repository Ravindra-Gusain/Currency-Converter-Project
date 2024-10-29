const Base_URL = "https://v6.exchangerate-api.com/v6/ad93163d93b0b00d7ec5ff90/latest/"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

//code for add all country from codes.js into select dropdown 

for (let select of dropdowns){
  for(currCode in countryList){
    let newOption =document.createElement("Option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected"
    } else  if (select.name === "To" && currCode === "INR") {
      newOption.selected = "selected"
    } 
    select.append(newOption)

  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target) // target is basically to show where change is happen
  })
}

// process to update the flags of country while choosing form dropdown menu

const updateFlag = (element)=>{
  let currCode = element.value;
  // console.log(currCode)
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img")
  img.src = newSrc
}

btn.addEventListener("click", async (evt)=>{
  evt.preventDefault(); // while clicking button remove its default funtions
  let amount = document.querySelector(".amount input");
  amtVal = amount.value;
  if (amtVal === ""|| amtVal <1) {
    amtVal = 1;
    amount.value = "1"
  }
  const URL = `${Base_URL}/${fromCurr.value}`
  let response = await fetch(URL);
  let data = await response.json()
  console.log(data)
  let rate = data.conversion_rates[toCurr.value]
  console.log(rate)

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

})

// async function CheckConverter() {
//   const response=await fetch(Base_URL);
//   const data=await response.json();
//   console.log(data)
  
// };
// CheckConverter();