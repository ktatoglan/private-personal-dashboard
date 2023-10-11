async function tempFetch() {
  const url = "https://www.arbeitnow.com/api/job-board-api";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();
    const jobs = data.data;

    const jobsHeading = document.querySelector(".jobs-list-container h2");
    const jobsContainer = document.querySelector(".jobs-list-container .jobs");
    const jobSearch = document.querySelector(
      ".jobs-list-container .job-search"
    );

    let searchTerm = "";

    if (jobs.length == 1) {
      jobsHeading.innerHTML = `${jobs.length} Job`;
    } else {
      jobsHeading.innerHTML = `${jobs.length} Jobs`;
    }

    const createJobListingCards = () => {
      jobsContainer.innerHTML = "";

      jobs.forEach((job) => {
        let jobDescription = job.description;
        const cleanText = jobDescription.replace(/<[^>]*>/g, "", {
          protected: ["p", "img"],
        });

        if (job.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          let jobCard = document.createElement("div");
          jobCard.classList.add("job");

          let image = document.createElement("img");
          image.src = "images/project-manager.svg";

          let title = document.createElement("h3");
          title.innerHTML = job.title;
          title.classList.add("job-title");

          let details = document.createElement("div");
          details.innerHTML = cleanText.slice(0, 300);
          details.classList.add("details");

          let local = document.createElement("div");
          local.innerHTML = job.location;
          local.classList.add("local");

          let detailsBtn = document.createElement("a");
          detailsBtn.href = job.url;
          detailsBtn.innerHTML = "More Details";
          detailsBtn.classList.add("details-btn");

          jobCard.appendChild(image);
          jobCard.appendChild(title);
          jobCard.appendChild(details);
          jobCard.appendChild(local);
          jobCard.appendChild(detailsBtn);
          jobsContainer.appendChild(jobCard);
        }
      });
    };

    createJobListingCards();

    jobSearch.addEventListener("input", (e) => {
      searchTerm = e.target.value;

      createJobListingCards();
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

tempFetch();

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
