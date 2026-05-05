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

import { members, membershipPlans, trainers, maleClasses, femaleClasses } from './data.js';
const initStorage = () => {

  // Step 1: Check if localStorage key "members" exists
  //         → if it does NOT exist, stringify the global `members`
  //           array (from data.js) and store it under key "members"
  let membersData = localStorage.getItem("members");
  if (membersData === null) {
    localStorage.setItem("members", JSON.stringify(members))
  }

  // Step 2: Check if localStorage key "classes" exists
  //         → if it does NOT exist, combine `maleClasses` and
  //           `femaleClasses` arrays from data.js into one array,
  //           stringify it, and store under key "classes"
  let classesData = localStorage.getItem("classes");
  if (classesData === null) {
    let classes = [...maleClasses, ...femaleClasses]
    localStorage.setItem("classes", JSON.stringify(classes));
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
  let members = getMembers();

  // Step 2: Parse the "classes" array from localStorage
  //         → const classes = JSON.parse(...)

  let classes = JSON.parse(localStorage.getItem("classes")) || [];

  // Step 3: Calculate total number of members
  //         → members.length
  //         → Set textContent of element with id "total-members"
  document.getElementById("total-members").textContent = members.length;

  // Step 4: Calculate active subscriptions
  //         → For now this equals total members (members.length)
  //         → Set textContent of element with id "active-subs"
  document.getElementById("active-subs").textContent = members.length;

  // Step 5: Calculate how many classes happen today
  //         → Get the current day name using:
  //           new Date().toLocaleDateString("en-US", { weekday: "long" })
  //         → Filter the classes array where class.day === currentDay
  //         → Set textContent of element with id "classes-today"

  let today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  let todayClasses = classes.filter(m => m.day === today);
  document.getElementById("classes-today").textContent = todayClasses.length;

  // Step 6: Find the most popular plan
  //         → Count occurrences of each plan name in the members array
  //           (e.g. { Starter: 2, Elite: 3, Royale: 3 })
  //         → Find the plan name with the highest count
  //         → Set textContent of element with id "popular-plan"
  let starterCount = members.filter(m => m.plan === "Starter").length;
  let eliteCount = members.filter(m => m.plan === "Elite").length;
  let royaleCount = members.filter(m => m.plan === "Royale").length;

  let popularPlan = "Starter";
  if (eliteCount > starterCount) {
    popularPlan = "Elite";
  }
  if (royaleCount > eliteCount && royaleCount > starterCount) {
    popularPlan = "Royale";
  }
  document.getElementById("popular-plan").textContent = popularPlan;

};

function getMembers() {
  return JSON.parse(localStorage.getItem("members")) || [];
}

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
  let members = getMembers();

  // Step 2: Get the last 5 members
  //         → members.slice(-5).reverse()
  let lastMembers = members.slice(-5).reverse();

  // Step 3: Get reference to the <tbody> with id "recent-tbody"
  let tbody = document.getElementById("recent-tbody");

  // Step 4: Clear existing tbody content
  //         → tbody.innerHTML = ""
  tbody.innerHTML = ""

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

  tbody.innerHTML = lastMembers.map(m => `
  <tr>
    <td>${m.name}</td>
    <td>${m.joinDate}</td>
    <td>${m.plan}</td>
    <td>${m.email}</td>
  </tr>
  `).join("")
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
  let members = getMembers();

  // Step 2: Count members per plan
  //         → const starterCount = members.filter(m => m.plan === "Starter").length
  //         → const eliteCount   = members.filter(m => m.plan === "Elite").length
  //         → const royaleCount  = members.filter(m => m.plan === "Royale").length

  const starterCount = members.filter(m => m.plan === "Starter").length;
  const eliteCount = members.filter(m => m.plan === "Elite").length;
  const royaleCount = members.filter(m => m.plan === "Royale").length;


  // Step 3: Calculate total for percentage
  //         → const total = members.length  (avoid division by zero: use || 1)
  const total = members.length || 1;

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
  document.getElementById("bar-starter").style.width = `${(starterCount / total) * 100}%`;
  document.getElementById("label-starter").textContent = starterCount;

  document.getElementById("bar-elite").style.width = `${(eliteCount / total) * 100}%`;
  document.getElementById("label-elite").textContent = eliteCount;

  document.getElementById("bar-royal").style.width = `${(royaleCount / total) * 100}%`
  document.getElementById("label-royal").textContent = royaleCount;

  // Step 5: Update the count labels below each bar
  //         → document.getElementById("label-gold").textContent   = royaleCount
  //         → document.getElementById("label-bronze").textContent = starterCount
  //         → document.getElementById("label-silver").textContent = eliteCount
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
