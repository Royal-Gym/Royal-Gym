
import { members, membershipPlans, trainers, maleClasses, femaleClasses } from '../data.js';
const initStorage = () => {

  let membersData = localStorage.getItem("members");
  if (membersData === null) {
    localStorage.setItem("members", JSON.stringify(members))
  }
  let classesData = localStorage.getItem("classes");
  if (classesData === null) {
    let classes = [...maleClasses, ...femaleClasses]
    localStorage.setItem("classes", JSON.stringify(classes));
  }

  let plansData = localStorage.getItem("plans");
  if (plansData === null) {
    localStorage.setItem("plans", JSON.stringify(membershipPlans));
  }

  let trainersData = localStorage.getItem("trainers");
  if (trainersData === null) {
    localStorage.setItem("trainers", JSON.stringify(trainers));
  }
};


const renderStats = () => {
  let members = getMembers();
  
  let classes = JSON.parse(localStorage.getItem("classes")) || [];

  document.getElementById("total-members").textContent = members.length;

  document.getElementById("active-subs").textContent = members.length;

  let today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  let todayClasses = classes.filter(m => m.day === today);
  document.getElementById("classes-today").textContent = todayClasses.length;

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

const renderRecentMembers = () => {
  let members = getMembers();

  let lastMembers = members.slice(-5).reverse();

  let tbody = document.getElementById("recent-tbody");

  tbody.innerHTML = lastMembers.map(m => `
  <tr>
    <td>${m.name}</td>
    <td>${m.joinDate}</td>
    <td>${m.plan}</td>
    <td>${m.email}</td>
  </tr>
  `).join("")
};

const renderChart = () => {
  let members = getMembers();

  const starterCount = members.filter(m => m.plan === "Starter").length;
  const eliteCount = members.filter(m => m.plan === "Elite").length;
  const royaleCount = members.filter(m => m.plan === "Royale").length;

  const total = members.length || 1;

  document.getElementById("bar-starter").style.width = `${(starterCount / total) * 100}%`;
  document.getElementById("label-starter").textContent = starterCount;

  document.getElementById("bar-elite").style.width = `${(eliteCount / total) * 100}%`;
  document.getElementById("label-elite").textContent = eliteCount;

  document.getElementById("bar-royal").style.width = `${(royaleCount / total) * 100}%`
  document.getElementById("label-royal").textContent = royaleCount;
};


initStorage();
renderStats();
renderRecentMembers();
renderChart();
