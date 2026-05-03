document.getElementById("register-form").addEventListener("submit", function(e) {
e.preventDefault()
let valid = true
// Full name check
const name = document.getElementById("fullname").value.trim()
if (name.length < 3 || !/^[a-zA-Z\s]+$/.test(name)) {
showError("fullname-error", "Name must be at least 3 letters only")
valid = false
} else {
showSuccess("fullname-error")
}
// Email check
const email = document.getElementById("email").value.trim()
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
showError("email-error", "Enter a valid email address")
valid = false
} else {
showSuccess("email-error")
}
// Age check (must be 16+)
const dob = new Date(document.getElementById("dob").value)
const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000))
if (age < 16) {
showError("dob-error", "You must be at least 16 years old")
valid = false
}
if (valid) {
document.getElementById("success-msg").style.display = "block"
}
})
function showError(id, message) {
const el = document.getElementById(id)
el.textContent = message
el.style.color = "red"
}
function showSuccess(id) {
const el = document.getElementById(id)
el.textContent = "✓"
el.style.color = "green"
}
