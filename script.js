const countriesElement = document.querySelector(".countries");
const dropdown = document.querySelector(".dropdown");
const dropElem = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const moon = document.querySelector(".moon");
const toggle = document.querySelector(".toggle");
const search = document.querySelector(".search");

async function getCountry() {
  countriesElement.classList.add("loading");

  countriesElement.display = false;
  const url = await fetch("https://restcountries.com/v3.1/all");
  const res = await url.json();

  console.log(res);
  res.forEach((element) => {
    countriesElement.classList.remove("loading");

    countriesElement.display = true;
    showCountry(element);
  });
}
getCountry();
function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `  <div class="country-img">
<img src="${data.flags.svg}" alt="img">

<div class="country-info">
<h5 class="countryName">${data.name.common}</h5>

<p><strong>Population:</strong>${data.population}</p>
<p class="region1"><strong >Region:</strong>${data.region}</p>
<p><strong>Capital:</strong>${data.capital}</p>
</div>
</div>`;
  countriesElement.appendChild(country);
  country.addEventListener("click", () => {
    showCountrydetail(data);
  });
}
dropdown.addEventListener("click", (e) => {
  console.log("hey");

  dropElem.classList.toggle("showdropdown");
});
const region1 = document.getElementsByClassName("region1");
region.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);
    Array.from(region1).forEach((elem) => {
      console.log(elem.innerText);
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        elem.parentElement.parentElement.parentElement.style.display = "grid";
      } else {
        console.log(elem.parentElement.parentElement);
        elem.parentElement.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  moon.classList.toggle("fas");
});
//searching function
const countryName = document.getElementsByClassName("countryName");
search.addEventListener("input", () => {
  console.log(search.value.toLowerCase());
  Array.from(countryName).forEach((ele) => {
    if (ele.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      ele.parentElement.parentElement.parentElement.style.display = "grid";
    } else {
      ele.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
});
const countrymodal = document.querySelector(".countrymodal");
function showCountrydetail(data) {
  const surr = Object.values(data.currencies);
  console.log(surr);
  const lang = Object.values(data.languages);
  countrymodal.classList.toggle("display");
  countrymodal.innerHTML = `
       <button class="back">
       back
   
   </button>
   <div class="modal">
       <div class="leftmodal">
           <img src="${data.flags.png}">
         
       </div>
       <div class="rightmodal">
           <h1>${data.name.common}</h1>
           <div class="modalflex">
           <div class="innerleft inner">
               <p><strong>Native Name:</strong>${data.name.common}<p>
               <p><strong >Population:</strong>${data.population}</p>
               <p><strong>Region:</strong>${data.region}</p>
               <p><strong>Sub Region:</strong>${data.subregion}</p>
               
           </div>
           <div class="innerright inner">
           <p><strong>Capital:</strong>${data.capital}</p>
               <p><strong>Top Level Domain:</strong>${data.tld.map(
                 (elem) => elem
               )}</p>
               <p><strong >Currencies:</strong>${surr
                 .map((item) => item.name)
                 .join(",")}</p>
               <p><strong>Languages:</strong>${lang.join(",")}</p>
               
           </div>
           </div>
           <p class="last"><strong class="btn">Border Countries:</strong><button>${
             data.borders ? data.borders.join("   ") : "NO BORDER SHARING"
           }</button></p>
       </div>
   `;
  const back = countrymodal.querySelector(".back");

  back.addEventListener("click", () => {
    countrymodal.classList.toggle("display");
  });
}
