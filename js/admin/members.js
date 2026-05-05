

let editingIndex = null;

function getMembers() {
  let data = localStorage.getItem("members");
  let members = JSON.parse(data);
  return members || [];
}

function saveMembers(members) {
  localStorage.setItem("members", JSON.stringify(members));
}

function renderMembers() {
  let members = getMembers();
  let table = document.getElementById("members-tbody");
  table.innerHTML = "";

  let search = document.getElementById("member-search").value.toLowerCase();
  let filter = document.getElementById("plan-filter").value;


  if (search !== "") {
    members = members.filter(m =>
      m.name.toLowerCase().includes(search) ||
      m.email.toLowerCase().includes(search)
    )
  }
  if (filter !== "All") {
    members = members.filter(m => m.plan === filter);
  }


  table.innerHTML = members.map(member => `
    <tr> 
      <td>${member.name} </td>
      <td>${member.email} </td>
      <td><span class="badge badge-${member.plan.toLowerCase()}">${member.plan}</span></td>
      <td>${member.date} </td>
      <td>
        <button class="btn btn-edit" onclick="openEditModal(${member.id})">Edit</button>
        <button class="btn btn-delete" onclick="openDeleteModal(${member.id})">Delete</button>
      </td>
    </tr>
  `).join("");
  document.getElementById("member-count").textContent = members.length;
}

let deletingId = null;

function openDeleteModal(id) {
  deletingId = id;
  document.getElementById('deleteModal').classList.remove('hidden');
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.add('hidden');
  deletingId = null;
}

function confirmDelete() {
  let members = getMembers();
  members = members.filter(m => m.id !== deletingId);
  saveMembers(members);
  closeDeleteModal();
  renderMembers();
}


let editingId = null;

function openAddModal() {
  editingId = null
  document.getElementById("modalTitle").textContent = "Add Member";
  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputPlan").value = "Bronze";
  document.getElementById("memberModal").classList.remove("hidden");
}

function openEditModal(id) {
  editingId = id;
  let members = getMembers();
  let member = members.find(m => m.id === id);

  document.getElementById("modalTitle").textContent = "Edit Member"
  document.getElementById("inputName").value = member.name;
  document.getElementById("inputEmail").value = member.email;
  document.getElementById("inputPlan").value = member.plan;
  document.getElementById("memberModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById('memberModal').classList.add('hidden');
  document.getElementById('errorMsg').classList.add('hidden');
}

function saveMember() {
  let name = document.getElementById("inputName").value;
  let email = document.getElementById("inputEmail").value;
  let plan = document.getElementById("inputPlan").value;
  if (name === "" || email === "" || plan === "") {
    alert("Please fill in all the fields.")
    return;
  }

  let members = getMembers();

  let duplicate = members.find(m => m.email === email && m.id !== editingId)
  if (duplicate) {
    document.getElementById("errorMsg").classList.remove("hidden");
    return;
  }

  if (editingId) {
    members = members.map(m => m.id === editingId ? { ...m, name, email, plan } : m);
    editingId = null
  }
  else {
    let newMember = {
      id: Date.now(),
      name: name,
      email: email,
      plan: plan,
      date: new Date().toISOString().slice(0, 10)
    }
    members.push(newMember);
  }

  saveMembers(members);
  closeModal();
  renderMembers();
}

document.getElementById("memberModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("memberModal")) {
    closeModal();
  }
});



document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    let modal = document.getElementById("memberModal");
    if (modal.display !== "none") {
      closeModal();
    }
  }
})

document.getElementById('member-search').addEventListener('input', renderMembers);
document.getElementById('plan-filter').addEventListener('change', renderMembers);

renderMembers();