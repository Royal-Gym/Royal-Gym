// ============================================================
// dashboard.js — Admin Dashboard Logic
// ============================================================
// This file powers the admin-dashboard.html page.
// It reads data from localStorage (seeded by data.js) and renders:
//   1. Summary stat cards (total members, active subs, classes today, popular plan)
//   2. A "recent members" table (last 5 added)
//   3. A CSS bar chart showing member distribution across plans
//
// Depends on: data.js being loaded BEFORE this script in the HTML
// ============================================================


// ------------------------------------------------------------
// initStorage()
// ------------------------------------------------------------
// Seeds localStorage with data from the global arrays defined
// in data.js, but ONLY if the keys don't already exist.
// This ensures first-time visitors get sample data without
// overwriting any data that was added or edited later.
// ------------------------------------------------------------

const initStorage = () => {
  import { members, membershipPlans, trainers, maleClasses, femaleClasses } from "./data.js";
  // Step 1: Check if localStorage key "members" exists
  //         → if it does NOT exist, stringify the global `members`
  //           array (from data.js) and store it under key "members"
  let membersData = localStorage.getItem("members");
  if (members === null) {
    localStorage.setItem("members", JSON.stringify(members))
  }

  // Step 2: Check if localStorage key "classes" exists
  //         → if it does NOT exist, combine `maleClasses` and
  //           `femaleClasses` arrays from data.js into one array,
  //           stringify it, and store under key "classes"
  let maleClassesData = localStorage.getItem("maleClasses");
  if (maleClassesData === null) {
    localStorage.setItem("classes", JSON.stringify(maleClasses))
  }

  let femaleClassesData = localStorage.getItem("femaleClasses");
  if (femaleClassesData === null) {
    localStorage.setItem("classes", JSON.stringify(femaleClasses))
  }


  // Step 3: Check if localStorage key "plans" exists
  //         → if it does NOT exist, stringify the global
  //           `membershipPlans` object and store under key "plans"
  let plansData = localStorage.getItem("plans");
  if (plansData === null) {
    localStorage.setItem("plans", JSON.stringify(membershipPlans));
  }

  let trainersData = localStorage.getItem("trainers");
  if (trainersData === null) {
    localStorage.setItem("trainers", JSON.stringify(trainers));
  }
};


// ------------------------------------------------------------
// renderStats()
// ------------------------------------------------------------
// Reads "members" and "classes" from localStorage, computes
// four statistics, and injects them into the stat-card elements
// on the dashboard page.
// ------------------------------------------------------------
const renderStats = () => {
  // Step 1: Parse the "members" array from localStorage
  //         → const members = JSON.parse(...)
  let members = JSON.parse(localStorage.getItem("members")) || [];

  // Step 2: Parse the "classes" array from localStorage
  //         → const classes = JSON.parse(...)

  let classes = JSON.parse(localStorage.getItem("classes")) || [];

  // Step 3: Calculate total number of members
  //         → members.length
  //         → Set textContent of element with id "total-members"
  document.getElementById("total-members").textContent = members.length

  // Step 4: Calculate active subscriptions
  //         → For now this equals total members (members.length)
  //         → Set textContent of element with id "active-subs"

  // Step 5: Calculate how many classes happen today
  //         → Get the current day name using:
  //           new Date().toLocaleDateString("en-US", { weekday: "long" })
  //         → Filter the classes array where class.day === currentDay
  //         → Set textContent of element with id "classes-today"

  // Step 6: Find the most popular plan
  //         → Count occurrences of each plan name in the members array
  //           (e.g. { Starter: 2, Elite: 3, Royale: 3 })
  //         → Find the plan name with the highest count
  //         → Set textContent of element with id "popular-plan"
};


// ------------------------------------------------------------
// renderRecentMembers()
// ------------------------------------------------------------
// Shows the last 5 members added to the system in a table.
// The most recently added member appears first (assuming the
// array is in chronological insertion order, so we slice the
// last 5 and reverse them).
// ------------------------------------------------------------
const renderRecentMembers = () => {
  // Step 1: Parse the "members" array from localStorage

  // Step 2: Get the last 5 members
  //         → members.slice(-5).reverse()

  // Step 3: Get reference to the <tbody> with id "recent-tbody"

  // Step 4: Clear existing tbody content
  //         → tbody.innerHTML = ""

  // Step 5: Loop through the 5 recent members and for each one:
  //         → Create a <tr> element
  //         → Create 4 <td> elements for: Name, Join Date, Plan, Email
  //         → Append the <td>s to the <tr>
  //         → Append the <tr> to the <tbody>
  //
  //         You can also use template literals:
  //         tbody.innerHTML += `<tr>
  //           <td>${member.name}</td>
  //           <td>${member.joinDate}</td>
  //           <td>${member.plan}</td>
  //           <td>${member.email}</td>
  //         </tr>`;
};


// ------------------------------------------------------------
// renderChart()
// ------------------------------------------------------------
// Draws a simple CSS bar chart showing how many members are
// on each plan (Starter, Elite, Royale).
// Each bar's width is set as a percentage of total members.
// The label below each bar shows the count number.
// ------------------------------------------------------------
const renderChart = () => {
  // Step 1: Parse the "members" array from localStorage

  // Step 2: Count members per plan
  //         → const starterCount = members.filter(m => m.plan === "Starter").length
  //         → const eliteCount   = members.filter(m => m.plan === "Elite").length
  //         → const royaleCount  = members.filter(m => m.plan === "Royale").length

  // Step 3: Calculate total for percentage
  //         → const total = members.length  (avoid division by zero: use || 1)

  // Step 4: Set bar widths as percentages
  //         → document.getElementById("bar-bronze").style.width
  //             = `${(starterCount / total) * 100}%`
  //         → document.getElementById("bar-silver").style.width
  //             = `${(eliteCount / total) * 100}%`
  //         → document.getElementById("bar-gold").style.width
  //             = `${(royaleCount / total) * 100}%`
  //
  //         NOTE: The HTML ids use "bronze/silver/gold" as generic
  //         tier labels. They map to Starter/Elite/Royale respectively.

  // Step 5: Update the count labels below each bar
  //         → document.getElementById("label-bronze").textContent = starterCount
  //         → document.getElementById("label-silver").textContent = eliteCount
  //         → document.getElementById("label-gold").textContent   = royaleCount
};


// ============================================================
// Initialization — run everything when the page loads
// ============================================================
// Call each function in order so the dashboard is fully
// populated as soon as the script executes.
// ------------------------------------------------------------
initStorage();
renderStats();
renderRecentMembers();
renderChart();
