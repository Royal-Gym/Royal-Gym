
// import { members as mem, membershipPlans, trainers, maleClasses, femaleClasses } from '../data.js';
// ============================================================
// members.js — Admin Members Management (Full CRUD)
// ============================================================
// This file powers the admin-members.html page.
// It provides Create, Read, Update, and Delete operations for
// the "members" array stored in localStorage.
//
// Features:
//   - Render all members in a table with colored plan badges
//   - Search members by name (real-time filtering)
//   - Filter members by plan (dropdown)
//   - Add new members via a form (with duplicate email check)
//   - Edit existing members via a modal
//   - Delete members with confirmation
//
// Depends on: data.js being loaded BEFORE this script so that
//             localStorage is already seeded with member data.
// ============================================================


// ------------------------------------------------------------
// State variable: tracks which member is currently being edited
// ------------------------------------------------------------
// When a user clicks "Edit" on a row, we store that member's
// array index here so the edit form knows which record to update.
// Set to null when no edit is in progress.
// ------------------------------------------------------------

let editingIndex = null;


// ============================================================
//                     DATA HELPERS
// ============================================================


// ------------------------------------------------------------
// getMembers()
// ------------------------------------------------------------
// Reads the "members" array from localStorage, parses it from
// JSON, and returns it as a JavaScript array.
// Returns an empty array if the key doesn't exist yet.
// ------------------------------------------------------------
function getMembers() {
  // TODO: read "members" from localStorage and return the array
  let data = localStorage.getItem("members");
  let members = JSON.parse(data) ;
  return members || [];
}


// ------------------------------------------------------------
// saveMembers(data)
// ------------------------------------------------------------
// Takes a JavaScript array of member objects and saves it
// back to localStorage under the key "members".
// ------------------------------------------------------------

function saveMembers(members) {
  // TODO: save the members array to localStorage under key "members"
  localStorage.setItem("members", JSON.stringify(members));
}


// ============================================================
//                     RENDERING
// ============================================================


// ------------------------------------------------------------
// renderMembers(data)
// ------------------------------------------------------------
// Clears the members table body and re-draws all rows from the
// given data array. Each row shows: Name, Email, Phone,
// Plan (as a colored badge), Join Date, and Action buttons
// (Edit + Delete).
//
// @param {Array} data — the array of member objects to display
// ------------------------------------------------------------
const dfgsdfg = (data) => {
  // Step 1: Get reference to <tbody> with id "members-tbody"

  // Step 2: Clear existing content
  //         → tbody.innerHTML = ""

  // Step 3: Loop through the data array using forEach((member, index) => { ... })
  //         For each member:

  //   Step 3a: Create a <tr> element (or build an HTML string)

  //   Step 3b: Create <td> cells for each column:
  //            - Name:      member.name
  //            - Email:     member.email
  //            - Phone:     member.phone
  //            - Plan:      member.plan displayed as a colored <span> badge
  //                         → Use CSS classes like "badge-starter", "badge-elite",
  //                           "badge-royale" (or inline styles) to color-code
  //                         → Example: <span class="badge badge-${member.plan.toLowerCase()}">${member.plan}</span>
  //            - Join Date: member.joinDate
  //            - Actions:   Two buttons — Edit and Delete

  //   Step 3c: For the Edit button:
  //            → Create a <button> with text "Edit"
  //            → Add an onclick handler that calls openEditModal(index)
  //            → IMPORTANT: `index` here must be the index in the FULL
  //              members array (from localStorage), not the filtered array.
  //              If you're rendering a filtered subset, you need to find
  //              the real index. One approach: store the original index
  //              as a data attribute on each row.

  //   Step 3d: For the Delete button:
  //            → Create a <button> with text "Delete"
  //            → Add an onclick handler that calls deleteMember(index)
  //            → Same index caveat as above applies

  //   Step 3e: Append the <tr> to the <tbody>
};

function renderMembers() {
  // TODO: get members, filter by search + plan, render rows in #membersTableBody
  let members = getMembers();
  let table = document.getElementById("members-tbody");
  table.innerHTML = "";

  let search = document.getElementById("member-search").value.toLowerCase();
  let filter = document.getElementById("plan-filter").value;
  

  if( search !== ""){
    members = members.filter(m => 
      m.name.toLowerCase().includes(search) ||
      m.email.toLowerCase().includes(search)
    )
  }
  if( filter !== "All"){
    members = members.filter(m => m.plan === filter);
  }


  table.innerHTML = members.map( member => `
    <tr> 
      <td>${member.name} </td>
      <td>${member.email} </td>
      <td><span class="badge badge-${member.plan.toLowerCase()}">${member.plan}</span></td>
      <td>${member.date} </td>
      <td>
        <button onclick="openEditModal(${member.id})">Edit</button>
        <button onclick="openDeleteModal(${member.id})">Delete</button>
      </td>
    </tr>
  `).join("");
  document.getElementById("member-count").textContent = members.length;
}


// ============================================================
//                  FILTERING & SEARCH
// ============================================================


// ------------------------------------------------------------
// applyFilters()
// ------------------------------------------------------------
// Reads the current values of the search input and plan filter
// dropdown, filters the full members array accordingly, then
// re-renders the table and updates the member count display.
// ------------------------------------------------------------
const applyFilters = () => {
  // Step 1: Get all members from localStorage
  //         → const allMembers = getMembers()

  // Step 2: Read the search query
  //         → const query = document.getElementById("member-search").value.toLowerCase()

  // Step 3: Read the selected plan filter
  //         → const planFilter = document.getElementById("plan-filter").value

  // Step 4: Filter the members array
  //         → let filtered = allMembers
  //         → If query is not empty, filter by name containing the query:
  //           filtered = filtered.filter(m => m.name.toLowerCase().includes(query))
  //         → If planFilter is not empty / not "all", filter by plan:
  //           filtered = filtered.filter(m => m.plan === planFilter)

  // Step 5: Render the filtered results
  //         → renderMembers(filtered)

  // Step 6: Update the member count display
  //         → document.getElementById("member-count").textContent = filtered.length
}; //useless


// ============================================================
//                     DELETE
// ============================================================


// ------------------------------------------------------------
// deleteMember(index)
// ------------------------------------------------------------
// Asks the user for confirmation, then removes the member at
// the given index from the localStorage array and refreshes
// the table.
//
// @param {number} index — index of the member in the full array
// ------------------------------------------------------------
const deleteMember = (index) => {
  // Step 1: Show a confirmation dialog
  //         → if (!confirm("Are you sure you want to delete this member?")) return;
  
  // Step 2: Get all members from localStorage
  //         → const members = getMembers()

  // Step 3: Remove the member at the given index
  //         → members.splice(index, 1)

  // Step 4: Save the updated array back to localStorage
  //         → saveMembers(members)

  // Step 5: Re-render the table with current filters
  //         → applyFilters()
}; //iseless

let deletingId = null;

function openDeleteModal(id){
  deletingId = id;
  document.getElementById('deleteModal').classList.remove('hidden');
}

function closeDeleteModal(){
  document.getElementById('deleteModal').classList.add('hidden');
  deletingId = null;
}

function confirmDelete(){
  let members = getMembers();
  members = members.filter(m => m.id !== deletingId);
  saveMembers(members);
  closeDeleteModal();
  renderMembers();
}

// ============================================================
//                     EDIT MODAL
// ============================================================


// ------------------------------------------------------------
// openEditModal(index)
// ------------------------------------------------------------
// Opens the edit modal and pre-fills the form fields with
// the data of the member at the given index.
//
// @param {number} index — index of the member in the full array
// ------------------------------------------------------------
// const openEditModal = (index) => {
//   // Step 1: Store the index in the global variable
//   //         → editingIndex = index

//   // Step 2: Get the member data
//   //         → const members = getMembers()
//   //         → const member = members[index]

//   // Step 3: Fill the edit form fields with the member's current data
//   //         → document.getElementById("edit-name").value  = member.name
//   //         → document.getElementById("edit-email").value = member.email
//   //         → document.getElementById("edit-phone").value = member.phone
//   //         → document.getElementById("edit-plan").value  = member.plan

//   // Step 4: Show the edit modal
//   //         → document.getElementById("edit-modal").style.display = "flex"
//   //           (or "block", depending on your CSS — use "flex" to center it)
// };


// // ------------------------------------------------------------
// // closeEditModal()
// // ------------------------------------------------------------
// // Hides the edit modal and resets the editingIndex so no
// // stale index remains stored.
// // ------------------------------------------------------------
// const closeEditModal = () => {
//   // Step 1: Hide the modal
//   //         → document.getElementById("edit-modal").style.display = "none"

//   // Step 2: Reset the editing state
//   //         → editingIndex = null
// };

let editingId = null;

function openAddModal(){
  editingId = null
  document.getElementById("modalTitle").textContent = "Add Member";
  document.getElementById("inputName").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputPlan").value = "Bronze";
  document.getElementById("memberModal").classList.remove("hidden");
}

function openEditModal(id) {
  // TODO: find the member by id, fill the form, show modal
  editingId = id;
  let members = getMembers();
  let member = members.find(m => m.id === id);

  document.getElementById("modalTitle").textContent = "Edit Member"
  document.getElementById("inputName").value =member.name;
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
  if(name === "" || email === ""){
    alert("Please fill in all the fields.")
    return;
  }

  let members = getMembers();

  let duplicate = members.find(m => m.email === email && m.id !== editingId)
  if(duplicate){
    document.getElementById("errorMsg").classList.remove("hidden");
    return;
  }

  if(editingId){
    members = members.map(m => m.id === editingId ? {...m, name, email, plan} : m);
    editingId = null
  }
  else{
    let newMember = {
      id: Date.now(),
      name: name,
      email: email,
      plan: plan,
      date: new Date().toISOString().slice(0, 10) //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    }
    members.push(newMember);
  }

  saveMembers(members);
  closeModal();
  renderMembers();
}

// ============================================================
//                   EVENT LISTENERS
// ============================================================


// ------------------------------------------------------------
// Edit form submit handler
// ------------------------------------------------------------
// When the user submits the edit form, update the member at
// editingIndex in localStorage (keeping the original joinDate),
// then close the modal and refresh the table.
// → form id: "edit-form"
// ------------------------------------------------------------
// document.getElementById("edit-form").addEventListener("submit", (e) => {
//   // Step 1: Prevent default form submission
//   //         → e.preventDefault()

//   // Step 2: Read values from the edit form inputs
//   //         → const name  = document.getElementById("edit-name").value.trim()
//   //         → const email = document.getElementById("edit-email").value.trim()
//   //         → const phone = document.getElementById("edit-phone").value.trim()
//   //         → const plan  = document.getElementById("edit-plan").value

//   // Step 3: Get all members from localStorage
//   //         → const members = getMembers()

//   // Step 4: Update the member at editingIndex
//   //         → Keep the original joinDate: members[editingIndex].joinDate stays the same
//   //         → members[editingIndex].name  = name
//   //         → members[editingIndex].email = email
//   //         → members[editingIndex].phone = phone
//   //         → members[editingIndex].plan  = plan

//   // Step 5: Save updated members back to localStorage
//   //         → saveMembers(members)

//   // Step 6: Close the edit modal
//   //         → closeEditModal()

//   // Step 7: Refresh the table
//   //         → applyFilters()
// });


// // ------------------------------------------------------------
// // Add member form submit handler
// // ------------------------------------------------------------
// // When the user fills in the "add member" form and submits:
// // validate that all fields are filled, check for duplicate
// // email, add the new member to localStorage, and refresh.
// // → form id: "add-member-form"
// // ------------------------------------------------------------
// document.getElementById("add-member-form").addEventListener("submit", (e) => {
//   // Step 1: Prevent default form submission
//   //         → e.preventDefault()

//   // Step 2: Read values from the add form inputs
//   //         → const name     = document.getElementById("m-name").value.trim()
//   //         → const email    = document.getElementById("m-email").value.trim()
//   //         → const phone    = document.getElementById("m-phone").value.trim()
//   //         → const plan     = document.getElementById("m-plan").value
//   //         → const joinDate = document.getElementById("m-joindate").value

//   // Step 3: Validate that no field is empty
//   //         → if (!name || !email || !phone || !plan || !joinDate) {
//   //              alert("Please fill in all fields.");
//   //              return;
//   //           }

//   // Step 4: Check for duplicate email
//   //         → const members = getMembers()
//   //         → const duplicate = members.some(m => m.email.toLowerCase() === email.toLowerCase())
//   //         → if (duplicate) {
//   //              alert("A member with this email already exists.");
//   //              return;
//   //           }

//   // Step 5: Create the new member object
//   //         → const newMember = { name, email, phone, plan, joinDate }

//   // Step 6: Add to the array and save
//   //         → members.push(newMember)
//   //         → saveMembers(members)

//   // Step 7: Reset the form
//   //         → e.target.reset()

//   // Step 8: Refresh the table
//   //         → applyFilters()
// });


// // ------------------------------------------------------------
// // Search input event listener
// // ------------------------------------------------------------
// // Calls applyFilters() on every keystroke so the table updates
// // in real-time as the user types a search query.
// // → input id: "member-search"
// // ------------------------------------------------------------
// document.getElementById("member-search").addEventListener("input", () => {
//   // Step 1: Call applyFilters()
//   //         → applyFilters()
// });


// // ------------------------------------------------------------
// // Plan filter change event listener
// // ------------------------------------------------------------
// // Calls applyFilters() whenever the user picks a different
// // plan from the dropdown so the table filters immediately.
// // → select id: "plan-filter"
// // ------------------------------------------------------------
// document.getElementById("plan-filter").addEventListener("change", () => {
//   // Step 1: Call applyFilters()
//   //         → applyFilters()
// });


// // ------------------------------------------------------------
// // Close edit modal when clicking outside the modal content
// // ------------------------------------------------------------
// // The modal overlay covers the full screen. If the user clicks
// // directly on the overlay (not on the modal content inside it),
// // close the modal.
// // ------------------------------------------------------------
document.getElementById("memberModal").addEventListener("click", (e) => {
  // Step 1: Check if the click target is the modal overlay itself
  //         → if (e.target === document.getElementById("edit-modal"))
  //         → This ensures clicks on the inner modal content don't close it
  if (e.target === document.getElementById("memberModal")){
    closeModal();
  }
  // Step 2: Close the modal
  //         → closeEditModal()
});


// // ------------------------------------------------------------
// // Close edit modal when pressing the Escape key
// // ------------------------------------------------------------
// // Listens for "keydown" events on the entire document. If the
// // user presses Escape while the edit modal is visible, close it.
// // ------------------------------------------------------------
// document.addEventListener("keydown", (e) => {
//   // Step 1: Check if the pressed key is "Escape"
//   //         → if (e.key === "Escape")
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" ){
    let modal = document.getElementById("memberModal");
    if(modal.display !== "none"){
      closeModal();
    }
  }
})

//   // Step 2: Check if the modal is currently visible
//   //         → const modal = document.getElementById("edit-modal")
//   //         → if (modal.style.display !== "none" && modal.style.display !== "")

//   // Step 3: Close the modal
//   //         → closeEditModal()
// });


// ============================================================
// Initialization — render the table on page load
// ============================================================
// Call applyFilters() to read all members from localStorage
// and render the table with no filters applied initially.
// This also sets the member count display.
// ------------------------------------------------------------
applyFilters();
renderMembers();
document.getElementById('member-search').addEventListener('input', renderMembers);
document.getElementById('plan-filter').addEventListener('change', renderMembers);
