// ===== SELECT ELEMENTS =====
const jobList = document.getElementById("jobList");
const emptyState = document.getElementById("emptyState");

const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");
const jobCountEl = document.getElementById("jobCount");

const filterAll = document.getElementById("filterAll");
const filterInterview = document.getElementById("filterInterview");
const filterRejected = document.getElementById("filterRejected");

let currentFilter = "all";

// ===== UPDATE COUNTS =====
function updateCounts() {
  const cards = document.querySelectorAll(".job-card");

  let total = cards.length;
  let interview = 0;
  let rejected = 0;
  let visible = 0;

  cards.forEach(card => {
    const status = card.dataset.status;

    if (status === "interview") interview++;
    if (status === "rejected") rejected++;

    // visible count
    if (
      currentFilter === "all" ||
      card.dataset.status === currentFilter
    ) {
      if (!card.classList.contains("hidden")) visible++;
    }
  });

  totalCountEl.textContent = total;
  interviewCountEl.textContent = interview;
  rejectedCountEl.textContent = rejected;
  jobCountEl.textContent = visible + " jobs";
}

// ===== FILTER FUNCTION =====
function applyFilter(filter) {
  currentFilter = filter;
  const cards = document.querySelectorAll(".job-card");

  cards.forEach(card => {
    if (filter === "all") {
      card.classList.remove("hidden");
    } else {
      if (card.dataset.status === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    }
  });

  checkEmptyState();
  updateCounts();
}

// ===== EMPTY STATE =====
function checkEmptyState() {
  const visibleCards = document.querySelectorAll(
    ".job-card:not(.hidden)"
  );

  if (visibleCards.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

// ===== CARD ACTIONS (EVENT DELEGATION) =====
jobList.addEventListener("click", function (e) {
  const card = e.target.closest(".job-card");
  if (!card) return;

  // INTERVIEW CLICK
  if (e.target.closest(".btn-interview")) {
    card.dataset.status = "interview";
    card.querySelector("span").textContent = "INTERVIEW";
    card.querySelector("span").className =
      "mt-3 px-4 py-1.5 rounded-xl text-sm font-semibold bg-green-100 text-green-700 w-fit";

    applyFilter(currentFilter);
  }

  // REJECT CLICK
  if (e.target.closest(".btn-reject")) {
    card.dataset.status = "rejected";
    card.querySelector("span").textContent = "REJECTED";
    card.querySelector("span").className =
      "mt-3 px-4 py-1.5 rounded-xl text-sm font-semibold bg-red-100 text-red-700 w-fit";

    applyFilter(currentFilter);
  }

  // DELETE CLICK
  if (e.target.closest(".btn-delete")) {
    card.remove();
    updateCounts();
    checkEmptyState();
  }
});

// ===== FILTER BUTTONS =====
filterAll.addEventListener("click", () => applyFilter("all"));
filterInterview.addEventListener("click", () => applyFilter("interview"));
filterRejected.addEventListener("click", () => applyFilter("rejected"));

// ===== INITIAL =====
updateCounts();
checkEmptyState();