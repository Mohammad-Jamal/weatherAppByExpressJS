const city_name = document.getElementById("city_name");
const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const temp_real_value = document.querySelector(".temp_real_value");
const temp_status = document.getElementById("temp_status");
const dataHide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = "Please enter city name before search";
    dataHide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=a35e1ffbfe89e0a6777d5e7236c63804`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
      temp_real_value.innerText = `${(arrData[0].main.temp - 273).toFixed(2)}`;

      const tempMood = arrData[0].weather[0].main;

      if (tempMood == "Clear") {
        temp_status.innerHTML = "<i class='fa fa-sun' style = 'color : #eccc68' aria-hidden='true'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fa fa-cloud' style = 'color : #f1f2f6' aria-hidden='true'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fa fa-cloud-rain' style = 'color : #a4b0be'  aria-hidden='true'></i>";
      } else {
        temp_status.innerHTML = "<i class='fa fa-sun' style = 'color : #eccc68' aria-hidden='true'></i>";
      }

      dataHide.classList.remove("data_hide");
    } catch {
      city_name.innerText = "Please enter city name exactly";
      dataHide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
