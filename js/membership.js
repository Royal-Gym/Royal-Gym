document.getElementById("register-form").addEventListener("submit", function (e) {
	e.preventDefault()

	const nameOk  = validateName()
	const emailOk = validateEmail()
	const dobOk   = validateDob()

	if (nameOk && emailOk && dobOk) {
		document.getElementById("success-msg").style.display = "block"
	} else {
		document.getElementById("success-msg").style.display = "none"
	}
})

// ── Live validation listeners ────────────────────────────────────────────────
document.getElementById("fullname").addEventListener("input", validateName)
document.getElementById("email").addEventListener("input", validateEmail)
document.getElementById("dob").addEventListener("change", validateDob)

// ── Validators ───────────────────────────────────────────────────────────────
function validateName() {
	const input = document.getElementById("fullname")
	const name  = input.value.trim()
	if (name.length < 3 || !/^[a-zA-Z\s]+$/.test(name)) {
		setError(input, "fullname-error", "Name must be at least 3 letters only")
		return false
	}
	setSuccess(input, "fullname-error")
	return true
}

function validateEmail() {
	const input = document.getElementById("email")
	const email = input.value.trim()
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		setError(input, "email-error", "Enter a valid email address")
		return false
	}
	setSuccess(input, "email-error")
	return true
}

function validateDob() {
	const input    = document.getElementById("dob")
	const dobValue = input.value
	if (!dobValue) {
		setError(input, "dob-error", "Please enter your date of birth")
		return false
	}
	const age = Math.floor((new Date() - new Date(dobValue)) / (365.25 * 24 * 60 * 60 * 1000))
	if (age < 16) {
		setError(input, "dob-error", "You must be at least 16 years old")
		return false
	}
	setSuccess(input, "dob-error")
	return true
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function setError(input, spanId, message) {
	input.classList.add("input--error")
	input.classList.remove("input--success")
	const span = document.getElementById(spanId)
	if (!span) return
	span.textContent = "⚠ " + message
	span.className = "field-msg field-msg--error"
}

function setSuccess(input, spanId) {
	input.classList.remove("input--error")
	input.classList.add("input--success")
	const span = document.getElementById(spanId)
	if (!span) return
	span.textContent = "✓ Looks good"
	span.className = "field-msg field-msg--success"
}
