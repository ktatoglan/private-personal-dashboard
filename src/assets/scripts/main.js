let keys = false;

// Google Search
function googleSearch() {
  var text = document.getElementById("search-text").value;
  text = text.replaceAll(" ", "+");
  if (text != undefined && text != null) {
    window.open("https://www.google.com/search?q=" + text, "_blank");
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await fetch("keys.json")
    .then((response) => response.json())
    .then((data) => {
      keys = data.keys;
    });

  fetch("https://api.collectapi.com/news/getNews?country=tr&tag=general", {
    method: "GET",
    headers: {
      "Access-Control-Request-Headers": "Accept",
      "Content-Type": "application/json",
      Authorization: keys.colletcapi_key_k,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const newsContainer = document.getElementById("news-container");

      data.result.forEach((newsItem, index) => {
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("layer", "w-100", "mt-15", "single-news");

        const newsImgContainer = document.createElement("div");
        newsImgContainer.classList.add(
          "news-img-container",
          "float-l",
          "mr-15"
        );

        const img = document.createElement("img");
        img.src = newsItem.image || "https://placehold.co/100"; // Varsayılan görüntü

        const title = document.createElement("h5");
        title.classList.add("mB-5");
        title.textContent = newsItem.name; // Haber başlığı veya herhangi bir metin

        const source = document.createElement("small");
        source.classList.add("fw-600", "c-grey-700");
        source.textContent = newsItem.source || "Source"; // Haber kaynağı veya herhangi bir metin

        newsDiv.addEventListener("click", () => {
          window.open(newsItem.url, "_blank");
        });

        newsImgContainer.appendChild(img);
        newsDiv.appendChild(newsImgContainer);
        newsDiv.appendChild(title);
        newsDiv.appendChild(source);

        newsContainer.appendChild(newsDiv);
      });
    })
    .catch((error) => {
      console.error("Hata:", error.message);
    });

  // Google Translate

  const translate_apiUrl =
    "https://translation.googleapis.com/language/translate/v2";

  async function translateText(text, targetLanguage) {
    try {
      const response = await axios.post(translate_apiUrl, null, {
        params: {
          q: text,
          target: targetLanguage,
          key: keys.translate_key,
        },
      });

      const translation = response.data.data.translations[0].translatedText;

      return translation;
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  }
  let button = document.querySelector("#translate-button");
  let textToTranslate = document.querySelector("#originalText");
  let language = document.querySelector(".form-select");

  button.addEventListener("click", () => {
    translateText(textToTranslate.value, language.value)
      .then((translation) => {
        document.querySelector("#translatedText").value = translation;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // Weather

  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const data = JSON.parse(this.responseText);
      console.log(data);
      document.querySelector(".weather-temp").innerText = data.result[0].degree;
      document.querySelector(".weather-date").innerText = data.result[0].date;
      let weatherDayElement = document.querySelector(".weather-day");
      let dayInTurkish = data.result[0].day;
      switch (dayInTurkish) {
        case "Pazartesi":
          weatherDayElement.innerText = "Monday";
          break;
        case "Salı":
          weatherDayElement.innerText = "Tuesday";
          break;
        case "Çarşamba":
          weatherDayElement.innerText = "Wednesday";
          break;
        case "Perşembe":
          weatherDayElement.innerText = "Thursday";
          break;
        case "Cuma":
          weatherDayElement.innerText = "Friday";
          break;
        case "Cumartesi":
          weatherDayElement.innerText = "Saturday";
          break;
        case "Pazar":
          weatherDayElement.innerText = "Sunday";
          break;
      }
      document.querySelector(".weather-status").innerText =
        data.result[0].status;
      document.querySelector(".weather-humidity").innerText =
        data.result[0].humidity + "%";
      document.querySelector(".weather-night").innerText = data.result[0].night;
      document.querySelector(".weather-city").innerText =
        data.city.toUpperCase();

      for (let i = 0; i < data.result.length; i++) {
        if (data.result[i].day === "Pazartesi") {
          document.querySelector(".weather-mon").innerText =
            data.result[i].degree;
        } else if (data.result[i].day === "Salı") {
          document.querySelector(".weather-tue").innerText =
            data.result[i].degree;
        } else if (data.result[i].day === "Çarşamba") {
          document.querySelector(".weather-wed").innerText =
            data.result[i].degree;
        } else if (data.result[i].day === "Perşembe") {
          document.querySelector(".weather-thr").innerText =
            data.result[i].degree;
        } else if (data.result[i].day === "Cuma") {
          document.querySelector(".weather-fri").innerText =
            data.result[i].degree;
        } else if (data.result[i].day === "Cumartesi") {
          document.querySelector(".weather-sat").innerText =
            data.result[i].degree;
        } else if (data.result[i].day === "Pazar") {
          document.querySelector(".weather-sun").innerText =
            data.result[i].degree;
        }
      }
      let weatherIcon = document.createElement("img");
      weatherIcon.src = "";
      weatherIcon.width = 66;
      weatherIcon.height = 66;
      let weatherStatus = document.querySelector(".peer11");
      let weather_status = data.result[0].status;

      switch (weather_status) {
        case "Clear":
          weatherIcon.src = "assets/images/clear.svg";
          break;
        case "Clouds":
          weatherIcon.src = "assets/images/cloudy.svg";
          break;
        case "Rain":
          weatherIcon.src = "assets/images/rain.svg";
          break;
        case "Snow":
          weatherIcon.src = "assets/images/snow.svg";
          break;
      }
      weatherStatus.appendChild(weatherIcon);

      let weatherStatus1 = document.querySelector(".peer1");
      let weatherStatus2 = document.querySelector(".peer2");
      let weatherStatus3 = document.querySelector(".peer3");
      let weatherStatus4 = document.querySelector(".peer4");
      let weatherStatus5 = document.querySelector(".peer5");
      let weatherStatus6 = document.querySelector(".peer6");
      let weatherStatus7 = document.querySelector(".peer7");

      let weatherIcon2 = document.createElement("img");
      weatherIcon2.src = "";
      weatherIcon2.width = 55;
      weatherIcon2.height = 55;
      let weatherIcon3 = document.createElement("img");
      weatherIcon3.src = "";
      weatherIcon3.width = 55;
      weatherIcon3.height = 55;
      let weatherIcon4 = document.createElement("img");
      weatherIcon4.src = "";
      weatherIcon4.width = 55;
      weatherIcon4.height = 55;
      let weatherIcon5 = document.createElement("img");
      weatherIcon5.src = "";
      weatherIcon5.width = 55;
      weatherIcon5.height = 55;
      let weatherIcon6 = document.createElement("img");
      weatherIcon6.src = "";
      weatherIcon6.width = 55;
      weatherIcon6.height = 55;
      let weatherIcon7 = document.createElement("img");
      weatherIcon7.src = "";
      weatherIcon7.width = 55;
      weatherIcon7.height = 55;
      let weatherIcon8 = document.createElement("img");
      weatherIcon8.src = "";
      weatherIcon8.width = 55;
      weatherIcon8.height = 55;

      for (let i = 0; i < data.result.length; i++) {
        if (data.result[i].day === "Pazartesi") {
          if (data.result[i].status === "Clouds") {
            weatherIcon2.src = "assets/images/cloudy.svg";
            weatherStatus1.appendChild(weatherIcon2);
          } else if (data.result[i].status === "Clear") {
            weatherIcon2.src = "assets/images/clear.svg";
            weatherStatus1.appendChild(weatherIcon2);
          } else if (data.result[i].status === "Rain") {
            weatherIcon2.src = "assets/images/rain.svg";
            weatherStatus1.appendChild(weatherIcon2);
          } else if (data.result[i].status === "Snow") {
            weatherIcon2.src = "assets/images/snow.svg";
            weatherStatus1.appendChild(weatherIcon2);
          }
        } else if (data.result[i].day === "Salı") {
          if (data.result[i].status === "Clouds") {
            weatherIcon3.src = "assets/images/cloudy.svg";
            weatherStatus2.appendChild(weatherIcon3);
          } else if (data.result[i].status === "Clear") {
            weatherIcon3.src = "assets/images/clear.svg";
            weatherStatus2.appendChild(weatherIcon3);
          } else if (data.result[i].status === "Rain") {
            weatherIcon3.src = "assets/images/rain.svg";
            weatherStatus2.appendChild(weatherIcon3);
          } else if (data.result[i].status === "Snow") {
            weatherIcon3.src = "assets/images/snow.svg";
            weatherStatus2.appendChild(weatherIcon3);
          }
        } else if (data.result[i].day === "Çarşamba") {
          if (data.result[i].status === "Clouds") {
            weatherIcon4.src = "assets/images/cloudy.svg";
            weatherStatus3.appendChild(weatherIcon4);
          } else if (data.result[i].status === "Clear") {
            weatherIcon4.src = "assets/images/clear.svg";
            weatherStatus3.appendChild(weatherIcon4);
          } else if (data.result[i].status === "Rain") {
            weatherIcon4.src = "assets/images/rain.svg";
            weatherStatus3.appendChild(weatherIcon4);
          } else if (data.result[i].status === "Snow") {
            weatherIcon4.src = "assets/images/snow.svg";
            weatherStatus3.appendChild(weatherIcon4);
          }
        } else if (data.result[i].day === "Perşembe") {
          if (data.result[i].status === "Clouds") {
            weatherIcon5.src = "assets/images/cloudy.svg";
            weatherStatus4.appendChild(weatherIcon5);
          } else if (data.result[i].status === "Clear") {
            weatherIcon5.src = "assets/images/clear.svg";
            weatherStatus4.appendChild(weatherIcon5);
          } else if (data.result[i].status === "Rain") {
            weatherIcon5.src = "assets/images/rain.svg";
            weatherStatus4.appendChild(weatherIcon5);
          } else if (data.result[i].status === "Snow") {
            weatherIcon5.src = "assets/images/snow.svg";
            weatherStatus4.appendChild(weatherIcon5);
          }
        } else if (data.result[i].day === "Cuma") {
          if (data.result[i].status === "Clouds") {
            weatherIcon6.src = "assets/images/cloudy.svg";
            weatherStatus5.appendChild(weatherIcon6);
          } else if (data.result[i].status === "Clear") {
            weatherIcon6.src = "assets/images/clear.svg";
            weatherStatus5.appendChild(weatherIcon6);
          } else if (data.result[i].status === "Rain") {
            weatherIcon6.src = "assets/images/rain.svg";
            weatherStatus5.appendChild(weatherIcon6);
          } else if (data.result[i].status === "Snow") {
            weatherIcon6.src = "assets/images/snow.svg";
            weatherStatus5.appendChild(weatherIcon6);
          }
        } else if (data.result[i].day === "Cumartesi") {
          if (data.result[i].status === "Clouds") {
            weatherIcon7.src = "assets/images/cloudy.svg";
            weatherStatus6.appendChild(weatherIcon7);
          } else if (data.result[i].status === "Clear") {
            weatherIcon7.src = "assets/images/clear.svg";
            weatherStatus6.appendChild(weatherIcon7);
          } else if (data.result[i].status === "Rain") {
            weatherIcon7.src = "assets/images/rain.svg";
            weatherStatus6.appendChild(weatherIcon7);
          } else if (data.result[i].status === "Snow") {
            weatherIcon7.src = "assets/images/snow.svg";
            weatherStatus6.appendChild(weatherIcon7);
          }
        } else if (data.result[i].day === "Pazar") {
          if (data.result[i].status === "Clouds") {
            weatherIcon8.src = "assets/images/cloudy.svg";
            weatherStatus7.appendChild(weatherIcon8);
          } else if (data.result[i].status === "Clear") {
            weatherIcon8.src = "assets/images/clear.svg";
            weatherStatus7.appendChild(weatherIcon8);
          } else if (data.result[i].status === "Rain") {
            weatherIcon8.src = "assets/images/rain.svg";
            weatherStatus7.appendChild(weatherIcon8);
          } else if (data.result[i].status === "Snow") {
            weatherIcon8.src = "assets/images/snow.svg";
            weatherStatus7.appendChild(weatherIcon8);
          }
        }
      }

      let userData = [];
      document.querySelector(".submitcity").addEventListener("click", () => {
        let cityelement = document.querySelector("#city-idd").value;
        let nameelement = document.querySelector("#name-idd").value;
        if (cityelement !== null) {
          userData = JSON.parse(localStorage.getItem("userData")) || [];

          let newUser = {
            name: nameelement,
            city: cityelement,
          };
          userData.unshift(newUser);
          localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          alert("Please enter a valid city before submitting.");
        }
      });
    }
  });

  let getCity2 = "Ankara";
  let getCity = JSON.parse(localStorage.getItem("userData"));
  if (getCity) {
    getCity2 = getCity[0].city;
  }
  xhr.open(
    "GET",
    `https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${getCity2}`
  );

  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("authorization", `${keys.colletcapi_key_m}`);

  xhr.send(data);

  // Prayer Times

  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      const data = JSON.parse(this.responseText).result;
      console.log(data);
      document.querySelector(".imsak").innerHTML = data[0].saat;
      document.querySelector(".sabah").innerHTML = data[1].saat;
      document.querySelector(".ogle").innerHTML = data[2].saat;
      document.querySelector(".ikindi").innerHTML = data[3].saat;
      document.querySelector(".aksam").innerHTML = data[4].saat;
      document.querySelector(".yatsi").innerHTML = data[5].saat;
      document.querySelector(".prayer-city").innerHTML = getCity2.toUpperCase();

      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      console.log(day, month, year);
      document.querySelector(
        ".prayer-date"
      ).innerHTML = `${day}/${month}/${year}`;

      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      document.querySelector(
        ".p-hour"
      ).innerHTML = `<strong>${hours}:${minutes}</strong>`;
      let numberHour = [];
      let numberMinute = [];
      const prayerCountdown = document.querySelector(".prayer-countdown");

      for (let i = 0; i < data.length; i++) {
        let [hour, minute] = data[i].saat.split(":");
        numberHour.push(Number(hour));
        numberMinute.push(Number(minute));
      }

      let prayerTimes = [];
      for (let i = 0; i < numberHour.length; i++) {
        let hourMinute = {
          hour: numberHour[i],
          minute: numberMinute[i],
          vakit: data[i].vakit,
        };
        prayerTimes.push(hourMinute);
      }

      console.log(prayerTimes);

      function prayerTime(prayerTimes) {
        for (let i = 0; i < prayerTimes.length; i++) {
          if (
            hours < prayerTimes[i].hour ||
            (hours === prayerTimes[i].hour && minutes < prayerTimes[i].minute)
          ) {
            let remainingHours = prayerTimes[i].hour - hours;
            let remainingMinutes = prayerTimes[i].minute - minutes;

            if (remainingMinutes < 0) {
              remainingMinutes += 60;
              remainingHours--;
            }

            prayerCountdown.innerHTML = `${
              remainingHours == 0 ? "" : `${remainingHours} saat`
            } ${remainingMinutes} dakika içinde <strong>${prayerTimes[
              i
            ].vakit.toUpperCase()}</strong>`;

            return;
          }
          if (hours >= prayerTimes[5].hour) {
            let remainingHours = prayerTimes[0].hour + (24 - hours);
            let remainingMinutes = prayerTimes[0].minute - minutes;

            if (remainingMinutes < 0) {
              remainingMinutes += 60;
              remainingHours--;
            }

            prayerCountdown.innerHTML = `${
              remainingHours == 0 ? "" : `${remainingHours} saat`
            } ${remainingMinutes} dakika içinde <strong>${prayerTimes[0].vakit.toUpperCase()}</strong>`;

            return;
          }
        }
        prayerCountdown.innerHTML = "No upcoming prayer time found.";
      }

      prayerTime(prayerTimes);
    }
  });

  xhr.open("GET", `https://api.collectapi.com/pray/all?data.city=${getCity2}`);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("authorization", `${keys.colletcapi_key_m}`);

  xhr.send(data);

  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      const data = JSON.parse(this.responseText).result;
      console.log(data);
      let imdb_list = document.querySelector(".imdb-list");
      //li > div > img
      //   > div > li
      let imdb_search = document.querySelector(".imdb-search").value;
      let imdb_search_button = document.querySelector(".imdb-search-button");
      function imdbMovies(list) {
        list.forEach((movie) => {
          let hrElement = document.createElement("hr");
          hrElement.className = "imdb-hr";

          if (movie.Poster !== "N/A") {
            let imdb_li = document.createElement("li");
            imdb_li.className = "imdb-li";
            imdb_li.innerHTML = `<div class="imdb-div1"><img class="imdb-img" src="${
              movie.Poster
            }"</div><div class="imdb-div2"><li class="imdb-div2-li"><strong>${
              movie.Title
            }</strong><br><br>${
              movie.Year
            }<br>${movie.Type.toUpperCase()}</li>`;

            let imdbImgElement = imdb_li.querySelector(".imdb-img");

            if (
              imdbImgElement &&
              imdbImgElement.getAttribute("src") !== "N/A"
            ) {
              imdb_list.appendChild(imdb_li);
              imdb_list.appendChild(hrElement);
            }
          }
        });
      }
      imdb_search_button.addEventListener("click", function () {
        let imdb_search = document.querySelector(".imdb-search").value;
        document.querySelector(
          ".imdb-list"
        ).style = `border: 1px solid rgba(0,0,0,0.12);`;
        var newXHR = new XMLHttpRequest();
        newXHR.withCredentials = false;

        newXHR.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            const newData = JSON.parse(this.responseText).result;

            imdb_list.innerHTML = "";

            imdbMovies(newData);
          }
        });

        newXHR.open(
          "GET",
          `https://api.collectapi.com/imdb/imdbSearchByName?query=${imdb_search}`
        );
        newXHR.setRequestHeader("content-type", "application/json");
        newXHR.setRequestHeader("authorization", `${keys.colletcapi_key_m}`);
        newXHR.send(data);
      });
    }
  });

  xhr.open("GET", "https://api.collectapi.com/imdb/imdbSearchByName?query=");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("authorization", `${keys.colletcapi_key_m}`);
  xhr.send(data);
});

// Currency
let country_list = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

const dropList = document.querySelectorAll(".currency_form select"),
  fromCurrency = document.querySelector(".currency_form select"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector(".currency_form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "NPR"
        ? "selected"
        : "";
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector(".currency_form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/${keys.currenncy_key}/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}

// nöbetci eczane
function disa() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  function onError(err) {
    console.log(err);
  }
  async function onSuccess(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    const apikey = keys.location_key;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apikey}`;

    const response = await fetch(url);
    const data = await response.json();

    const cty = data.results[0].components.county;

    var city = cty.split(" ")[0];
    var ilce = cty.split(" ")[1];

    function template() {
      fetch(
        `https://api.collectapi.com/health/dutyPharmacy?ilce=${ilce}&il=${city}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: keys.colletcapi_key_a,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Hata: " + response.status);
          }

          return response.json();
        })
        .then((data) => {
          const tbodyx = document.querySelector("#nöecz");

          const createCountryCards = () => {
            tbodyx.innerHTML = "";

            for (let i = 0; i < data.result.length; i++) {
              let country = document.createElement("h5");
              country.className = "card-title";
              country.innerHTML = data.result[i].name;

              let unit = document.createElement("p");
              unit.className = "card-text";
              unit.innerHTML = data.result[i].address;

              tbodyx.appendChild(country);
              tbodyx.appendChild(unit);
            }
          };

          createCountryCards();

          document.querySelector(".ezlogo").style.display = "none";
          document.querySelector("#spinner-nö").style.display = "inline-block";
          setTimeout(() => {
            document.querySelector("#spinner-nö").style.display = "none";
            document.querySelector("#eczaneList").style.display =
              "inline-block";
          }, 2000);
        })
        .catch((error) => {
          console.log("Hata oluştu:", error);
        });
    }

    template();
  }
}
