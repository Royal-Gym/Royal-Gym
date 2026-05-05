let editingPlanId = null;

const defaultPlans = [
  {
    id: 1,
    name: "Starter",
    price: 4900,
    duration: "1-month",
    description: "Equipment access, Standard locker, Standard support"
  },
  {
    id: 2,
    name: "Elite",
    price: 14900,
    duration: "1-month",
    description: "All Starter + Sauna & Steam, Meal plan, Priority support"
  },
  {
    id: 3,
    name: "Royale",
    price: 24900,
    duration: "1-month",
    description: "All Elite + Personal Training, 1-on-1 coaching, Massage"
  }
];

function getPlans() {
  let data = localStorage.getItem("plans");
  if (data) {
    let parsed = JSON.parse(data);
    let needsSave = false;
    parsed = parsed.map((p, index) => {
      if (!p.id) {
        needsSave = true;
        return { ...p, id: Date.now() + index };
      }
      return p;
    });
    if (needsSave) savePlans(parsed);
    return parsed;
  } else {
    savePlans(defaultPlans);
    return defaultPlans;
  }
}

function savePlans(plans) {
  localStorage.setItem("plans", JSON.stringify(plans));
}

function renderPlans() {
  let plans = getPlans();
  let tbody = document.getElementById("plans-tbody");
  tbody.innerHTML = "";

  plans.forEach((plan) => {
    let durationString = String(plan.duration || "1-month");
    let durationText = durationString.replace('-', ' ');
    durationText = durationText.charAt(0).toUpperCase() + durationText.slice(1);
    
    let descText = plan.description || (plan.features ? plan.features.join(", ") : "");

    tbody.innerHTML += `
      <tr>
        <td>${plan.name}</td>
        <td>${plan.price.toLocaleString()} DA</td>
        <td>${durationText}</td>
        <td>${descText}</td>
        <td>
          <button class="btn btn-edit" onclick="editPlan(${plan.id})">Edit</button>
          <button class="btn btn-delete" onclick="deletePlan(${plan.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deletePlan(id) {
  if (confirm("Are you sure you want to delete this plan?")) {
    let plans = getPlans();
    plans = plans.filter(p => p.id !== id);
    savePlans(plans);
    renderPlans();
  }
}

function editPlan(id) {
  editingPlanId = id;
  let plans = getPlans();
  let plan = plans.find(p => p.id === id);

  if (plan) {
    document.getElementById("plan-name").value = plan.name;
    document.getElementById("plan-price").value = plan.price;
    document.getElementById("plan-duration").value = plan.duration || "1-month";
    document.getElementById("plan-description").value = plan.description || (plan.features ? plan.features.join(", ") : "");

    // Change form title and button text to indicate editing
    let titles = document.querySelectorAll(".card-title");
    if(titles.length > 1) titles[1].textContent = "Edit Plan";
    document.querySelector(".btn-submit").textContent = "Update Plan";
    
    // Scroll to form
    document.getElementById("plan-form").scrollIntoView({ behavior: 'smooth' });
  }
}

function resetForm() {
  editingPlanId = null;
  let titles = document.querySelectorAll(".card-title");
  if(titles.length > 1) titles[1].textContent = "Add New Plan";
  document.querySelector(".btn-submit").textContent = "Add Plan";
}

document.getElementById("plan-form").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("plan-name").value.trim();
  let price = document.getElementById("plan-price").value.trim();
  let duration = document.getElementById("plan-duration").value;
  let description = document.getElementById("plan-description").value.trim();

  if (!name || !price || !duration || !description) {
    alert("Please fill in all required fields.");
    return;
  }

  let plans = getPlans();

  // Basic duplicate check (only by name for now, excluding currently editing plan)
  let duplicate = plans.find(p => p.name.toLowerCase() === name.toLowerCase() && p.id !== editingPlanId);
  if (duplicate) {
    alert("A plan with this name already exists.");
    return;
  }

  if (editingPlanId) {
    // Update existing plan
    plans = plans.map(p => 
      p.id === editingPlanId ? { ...p, name, price: Number(price), duration, description } : p
    );
  } else {
    // Add new plan
    let newPlan = {
      id: Date.now(),
      name,
      price: Number(price),
      duration,
      description
    };
    plans.push(newPlan);
  }

  savePlans(plans);
  
  // Explicitly reset form fields since we prevented default
  document.getElementById("plan-form").reset();
  resetForm();
  
  renderPlans();
});

document.getElementById("plan-form").addEventListener("reset", function(e) {
  // Use timeout to let the default reset finish clearing the fields
  setTimeout(() => {
    resetForm();
  }, 0);
});

// Initialize
renderPlans();