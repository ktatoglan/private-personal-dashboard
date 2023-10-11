let keys = false;
document.addEventListener("DOMContentLoaded", async function () {
  await fetch("keys.json")
    .then((response) => response.json())
    .then((data) => {
      keys = data.keys;
    });

  function tempFetch() {
    fetch("https://api.collectapi.com/economy/liveBorsa", {
      method: "GET",
      headers: {
        authorization: keys.colletcapi_key_a,
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let tbody = document.querySelector(".tbody");
        const exchanges = data.result;

        function exhangeCard() {
          exchanges.forEach((exchange) => {
            let exchangeCard = document.createElement("tr");
            exchangeCard.classList.add("excahangess");

            let name = document.createElement("td");
            name.innerHTML = exchange.name;
            name.classList.add("exchangeName");

            let price = document.createElement("td");
            price.innerHTML = exchange.price;
            price.classList.add("price");

            let rate = document.createElement("td");
            rate.innerHTML = exchange.rate;
            if (exchange.rate < 0) {
              rate.classList.add("red");
            } else {
              rate.classList.add("green");
            }

            let hacimtl = document.createElement("td");
            hacimtl.innerHTML = exchange.hacimtl;
            hacimtl.classList.add("hacimtl");

            exchangeCard.appendChild(name);
            exchangeCard.appendChild(price);
            exchangeCard.appendChild(rate);
            exchangeCard.appendChild(hacimtl);
            tbody.appendChild(exchangeCard);
          });
          document.querySelector(".dataTables_empty").remove();
        }
        exhangeCard();
      })
      .catch((error) => console.error("Error:", error));
  }

  tempFetch();
});
let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
  let currentTime = new Date();
  hrs.innerHTML =
    (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
  min.innerHTML =
    (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
  sec.innerHTML =
    (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);
