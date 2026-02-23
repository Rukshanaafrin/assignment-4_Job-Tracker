// // ===== SELECT ELEMENTS =====
// const jobList = document.getElementById("jobList");
// const emptyState = document.getElementById("emptyState");

// const totalCountEl = document.getElementById("totalCount");
// const interviewCountEl = document.getElementById("interviewCount");
// const rejectedCountEl = document.getElementById("rejectedCount");
// const jobCountEl = document.getElementById("jobCount");

// const filterAll = document.getElementById("filterAll");
// const filterInterview = document.getElementById("filterInterview");
// const filterRejected = document.getElementById("filterRejected");

// let currentFilter = "all";

// // ===== UPDATE COUNTS =====
// function updateCounts() {
//   const cards = document.querySelectorAll(".job-card");

//   let total = cards.length;
//   let interview = 0;
//   let rejected = 0;
//   let visible = 0;

//   cards.forEach(card => {
//     const status = card.dataset.status;

//     if (status === "interview") interview++;
//     if (status === "rejected") rejected++;

//     // visible count
//     if (
//       currentFilter === "all" ||
//       card.dataset.status === currentFilter
//     ) {
//       if (!card.classList.contains("hidden")) visible++;
//     }
    
//   });

//   totalCountEl.textContent = total;
//   interviewCountEl.textContent = interview;
//   rejectedCountEl.textContent = rejected;
//   jobCountEl.textContent = `${visible} of ${total} jobs`;
// }

// // ===== FILTER FUNCTION =====
// function applyFilter(filter) {
//   currentFilter = filter;
//   const cards = document.querySelectorAll(".job-card");

//   cards.forEach(card => {
//     if (filter === "all") {
//       card.classList.remove("hidden");
//     } else {
//       if (card.dataset.status === filter) {
//         card.classList.remove("hidden");
//       } else {
//         card.classList.add("hidden");
//       }
//     }
//   });

//   checkEmptyState();
//   updateCounts();
// }

// // ===== EMPTY STATE =====
// function checkEmptyState() {
//   const visibleCards = document.querySelectorAll(
//     ".job-card:not(.hidden)"
//   );

//   if (visibleCards.length === 0) {
//     emptyState.classList.remove("hidden");
//   } else {
//     emptyState.classList.add("hidden");
//   }
// }

// // ===== CARD ACTIONS (EVENT DELEGATION) =====
// jobList.addEventListener("click", function (e) {
//   const card = e.target.closest(".job-card");
//   if (!card) return;

//   // INTERVIEW CLICK
//   if (e.target.closest(".btn-interview")) {
//     card.dataset.status = "interview";
//     card.querySelector("span").textContent = "INTERVIEW";
//     card.querySelector("span").className =
//       "mt-3 px-4 py-1.5 rounded-xl text-sm font-semibold bg-green-100 text-green-700 w-fit";

//     applyFilter(currentFilter);
//   }

//   // REJECT CLICK
//   if (e.target.closest(".btn-reject")) {
//     card.dataset.status = "rejected";
//     card.querySelector("span").textContent = "REJECTED";
//     card.querySelector("span").className =
//       "mt-3 px-4 py-1.5 rounded-xl text-sm font-semibold bg-red-100 text-red-700 w-fit";

//     applyFilter(currentFilter);
//   }

//   // DELETE CLICK
//   if (e.target.closest(".btn-delete")) {
//     card.remove();
//     updateCounts();
//     checkEmptyState();
//   }
// });

// // ===== FILTER BUTTONS =====
// filterAll.addEventListener("click", () => applyFilter("all"));
// filterInterview.addEventListener("click", () => applyFilter("interview"));
// filterRejected.addEventListener("click", () => applyFilter("rejected"));

// // ===== INITIAL =====
// updateCounts();
// checkEmptyState();



// ===============================
// ELEMENTS
// ===============================
const cards = document.querySelectorAll(".job-card");
const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");
const jobCountEl = document.getElementById("jobCount");

const filterAll = document.getElementById("filterAll");
const filterInterview = document.getElementById("filterInterview");
const filterRejected = document.getElementById("filterRejected");

const emptyState = document.getElementById("emptyState");

// ===============================
// STATE
// ===============================
let totalJobs = cards.length;
let interviewCount = 0;
let rejectedCount = 0;
let currentFilter = "all";

// ===============================
// INIT
// ===============================
updateDashboard();
updateRightCount();
filterCards("all");

// ===============================
// FILTER BUTTON STYLE
// ===============================
function setActiveButton(activeBtn) {
  [filterAll, filterInterview, filterRejected].forEach(btn => {
    btn.classList.remove("bg-gradient-to-r", "from-blue-500", "to-blue-400", "text-white");
    btn.classList.add("bg-base-100", "text-gray-600");
  });

  activeBtn.classList.remove("bg-base-100", "text-gray-600");
  activeBtn.classList.add("bg-gradient-to-r", "from-blue-500", "to-blue-400", "text-white");
}

// ===============================
// FILTER CARDS
// ===============================
function filterCards(type) {
  currentFilter = type;

  cards.forEach(card => {
    const status = card.dataset.status;

    if (type === "all" || status === type) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // empty state
  const visibleCards = [...cards].filter(card => card.style.display !== "none");
  emptyState.classList.toggle("hidden", visibleCards.length !== 0);

  updateRightCount();
}

// ===============================
// DASHBOARD UPDATE
// ===============================
function updateDashboard() {
  totalCountEl.textContent = totalJobs;
  interviewCountEl.textContent = interviewCount;
  rejectedCountEl.textContent = rejectedCount;
}

// ===============================
// RIGHT COUNT (🔥 IMPORTANT FIX)
// ===============================
function updateRightCount() {
  if (currentFilter === "all") {
    jobCountEl.textContent = `${totalJobs} jobs`;
  }

  else if (currentFilter === "interview") {
    if (interviewCount === 0) {
      jobCountEl.textContent = `0 jobs`;
    } else {
      jobCountEl.textContent = `${interviewCount} of ${totalJobs} jobs`;
    }
  }

  else if (currentFilter === "rejected") {
    if (rejectedCount === 0) {
      jobCountEl.textContent = `0 jobs`;
    } else {
      jobCountEl.textContent = `${rejectedCount} of ${totalJobs} jobs`;
    }
  }
}

// ===============================
// FILTER BUTTON EVENTS
// ===============================
filterAll.addEventListener("click", () => {
  setActiveButton(filterAll);
  filterCards("all");
});

filterInterview.addEventListener("click", () => {
  setActiveButton(filterInterview);
  filterCards("interview");
});

filterRejected.addEventListener("click", () => {
  setActiveButton(filterRejected);
  filterCards("rejected");
});

// ===============================
// CARD BUTTONS (INTERVIEW / REJECT)
// ===============================
cards.forEach(card => {
  const interviewBtn = card.querySelector(".btn-interview");
  const rejectBtn = card.querySelector(".btn-reject");
  const deleteBtn = card.querySelector(".btn-delete");
  const statusBadge = card.querySelector("span");

  // INTERVIEW CLICK
  interviewBtn.addEventListener("click", () => {
    const prevStatus = card.dataset.status;

    if (prevStatus === "interview") return;

    if (prevStatus === "rejected") rejectedCount--;

    card.dataset.status = "interview";
    interviewCount++;

    statusBadge.textContent = "INTERVIEW";
    statusBadge.className =
      "mt-3 px-4 py-1.5 rounded-xl text-sm font-semibold bg-green-100 text-green-700 w-fit";

    updateDashboard();
    filterCards(currentFilter);
  });

  // REJECT CLICK
  rejectBtn.addEventListener("click", () => {
    const prevStatus = card.dataset.status;

    if (prevStatus === "rejected") return;

    if (prevStatus === "interview") interviewCount--;

    card.dataset.status = "rejected";
    rejectedCount++;

    statusBadge.textContent = "REJECTED";
    statusBadge.className =
      "mt-3 px-4 py-1.5 rounded-xl text-sm font-semibold bg-red-100 text-red-700 w-fit";

    updateDashboard();
    filterCards(currentFilter);
  });

  // DELETE
  deleteBtn.addEventListener("click", () => {
    const status = card.dataset.status;

    if (status === "interview") interviewCount--;
    if (status === "rejected") rejectedCount--;

    totalJobs--;
    card.remove();

    updateDashboard();
    filterCards(currentFilter);
  });
});