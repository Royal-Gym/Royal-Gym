// ── Plan selection ─────────────────────────────────────────────────────────
document.querySelectorAll('.plan-card .btn-ghost').forEach((button, index) => {
	button.addEventListener('click', () => {
		const planValues = ['Starter', 'Elite', 'Royal'];
		const radio = document.querySelector(`input[name="plan"][value="${planValues[index]}"]`);
		if (radio) {
			radio.checked = true;
			// Scroll to the form section
			document.querySelector('.register').scrollIntoView({ behavior: 'smooth' });
		}
	});
});

document.getElementById("register-form").addEventListener("submit", function (e) {
	e.preventDefault()

	const nameOk = validateName()
	const emailOk = validateEmail()
	const dobOk = validateDob()
	const phoneOk = validatePhone()
	const genderOk = validateGender()

	if (nameOk && emailOk && dobOk && phoneOk && genderOk) {
		// Save member data
		const isSaved = saveMemberData()
		if (isSaved) {
			document.getElementById("success-msg").style.display = "block"
			document.getElementById("register-form").reset()
			// Remove success classes from inputs
			document.querySelectorAll('.input--success').forEach(el => {
				el.classList.remove('input--success')
			})
			document.querySelectorAll('.field-msg--success').forEach(el => {
				el.textContent = ''
				el.className = 'field-msg'
			})
		} else {
			document.getElementById("success-msg").style.display = "none"
		}
	} else {
		document.getElementById("success-msg").style.display = "none"
	}
})

// ── Live validation listeners ────────────────────────────────────────────────
document.getElementById("fullname").addEventListener("input", validateName)
document.getElementById("email").addEventListener("input", validateEmail)
document.getElementById("phone").addEventListener("input", validatePhone)
document.getElementById("gender").addEventListener("change", validateGender)
document.getElementById("dob").addEventListener("change", validateDob)

// ── Validators ───────────────────────────────────────────────────────────────
function validateName() {
	const input = document.getElementById("fullname")
	const name = input.value.trim()
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
	const input = document.getElementById("dob")
	const dobValue = input.value
	if (!dobValue) {
		setError(input, "dob-error", "Please enter your date of birth")
		return false
	}
	const age = Math.floor((new Date() - new Date(dobValue)) / (365.25 * 24 * 60 * 60 * 1000))
	if (age < 8) {
		setError(input, "dob-error", "You must be at least 8 years old")
		return false
	}
	setSuccess(input, "dob-error")
	return true
}

function validatePhone() {
	const input = document.getElementById("phone")
	const phone = input.value.trim()
	if (!phone) {
		setError(input, "phone-error", "Please enter your phone number")
		return false
	}
	if (!/^0\d{9}$/.test(phone)) {
		setError(input, "phone-error", "Enter a valid Algerian number")
		return false
	}
	setSuccess(input, "phone-error")
	return true
}

function validateGender() {
	const input = document.getElementById("gender")
	const gender = input.value
	if (!gender) {
		setError(input, "gender-error", "Please select your gender")
		return false
	}
	setSuccess(input, "gender-error")
	return true
}

// ── Save member data ─────────────────────────────────────────────────────────
function saveMemberData() {
	const name = document.getElementById("fullname").value.trim()
	const email = document.getElementById("email").value.trim()
	const phone = document.getElementById("phone").value.trim()
	const gender = document.getElementById("gender").value
	const plan = document.querySelector('input[name="plan"]:checked').value

	// Get existing members
	let members = JSON.parse(localStorage.getItem("members")) || []

	// Check for duplicate email
	let duplicate = members.find(m => m.email === email)
	if (duplicate) {
		setError(document.getElementById("email"), "email-error", "This email is already registered")
		return false
	}

	// Create new member object
	const newMember = {
		id: Date.now(),
		name: name,
		gender: gender,
		email: email,
		phone: phone,
		plan: plan.charAt(0).toUpperCase() + plan.slice(1), // Capitalize first letter
		joinDate: new Date().toISOString().slice(0, 10)
	}

	// Add to members array
	members.push(newMember)

	// Save back to localStorage
	localStorage.setItem("members", JSON.stringify(members))
	
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
