function deletePlan(index) {
	const storedPlans = JSON.parse(localStorage.getItem("plans")) || plans
	storedPlans.splice(index, 1)
	localStorage.setItem("plans", JSON.stringify(storedPlans))
	renderPlans()
}

function renderPlans() {
	const storedPlans = JSON.parse(localStorage.getItem("plans")) || plans
	const tbody = document.getElementById("plans-tbody")
	tbody.innerHTML = ""
	storedPlans.forEach((plan, index) => {
		tbody.innerHTML += `
		<tr>
			<td>${plan.name}</td>
			<td>${plan.price} DA</td>
			<td>${plan.duration} month(s)</td>
			<td>${plan.features.join(", ")}</td>
			<td>
				<button onclick="deletePlan(${index})">Delete</button>
			</td>
		</tr>
		`
	})
}

renderPlans()
