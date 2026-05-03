// membership.js
alert("JavaScript is working!");
console.log("JavaScript loaded successfully!");

try {
    // Simple Validation Rules
    const VALIDATION = {
        fullname: { pattern: /^[a-zA-Z\s]{3,}$/, error: 'Name must be 3+ letters' },
        email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: 'Invalid email' },
        phone: { pattern: /^0\d{9}$/, error: 'Invalid phone number' },
        dob: { custom: isAdult, error: 'Must be 16+ years old' }
    };

    function isAdult(val) {
        const age = Math.floor((new Date() - new Date(val)) / (365.25 * 24 * 60 * 60 * 1000));
        return age >= 16;
    }

    // Initialize
    localStorage.getItem('members') || localStorage.setItem('members', JSON.stringify([]));

    const form = document.querySelector('form');
    console.log("Form found:", form);

    if (form) {
        form.addEventListener('submit', handleSubmit);
        console.log("✅ Submit listener added to form");

        form.querySelectorAll('#fullname, #email, #phone, #dob').forEach(input => {
            console.log("✅ Adding blur listener to:", input.id);
            input.addEventListener('blur', () => {
                console.log("🎯 Blur event fired for:", input.id);
                checkField(input.id);
            });
        });
        console.log("✅ All event listeners added");
    } else {
        console.log("❌ Form not found!");
    }

    // Validate single field
    function checkField(fieldName) {
        console.log("🔍 Validating field:", fieldName);
        const input = document.getElementById(fieldName);
        console.log("Input element:", input);
        const value = input?.value.trim() || '';
        console.log("Field value:", `"${value}"`);
        const rule = VALIDATION[fieldName];
        console.log("Validation rule:", rule);
        
        const isValid = value && (rule.pattern?.test(value) || rule.custom?.(value));
        console.log("Is valid:", isValid);
        const errorEl = getErrorElement(fieldName);
        console.log("Error element:", errorEl);
        
        errorEl.textContent = isValid ? '✓' : rule.error;
        errorEl.style.color = isValid ? '#51cf66' : '#ff6b6b';
        console.log("Set error text to:", errorEl.textContent);
        
        // Test: Show alert for debugging
        alert(`Field ${fieldName}: ${isValid ? 'Valid' : 'Invalid'} - ${errorEl.textContent}`);
        
        return isValid;
    }

    // Handle submission
    function handleSubmit(e) {
        e.preventDefault();
        alert("Form submitted! Checking validation...");
        console.log("🚀 Form submitted!");
        
        // Check all fields
        const fieldsValid = Object.keys(VALIDATION).every(checkField);
        console.log("📋 Fields valid:", fieldsValid);
        
        const planValid = document.querySelector('input[name="plan"]:checked');
        console.log("📋 Plan selected:", planValid);
        
        const termsValid = document.querySelector('input[name="terms"]').checked;
        console.log("📋 Terms checked:", termsValid);
        
        if (!fieldsValid || !planValid || !termsValid) {
            console.log("❌ Validation failed, showing errors");
            if (!planValid) getErrorElement('plan').textContent = 'Select a plan';
            if (!termsValid) getErrorElement('terms').textContent = 'Agree to terms';
            return;
        }
        
        console.log("✅ All validations passed, saving member");
        // Save member
        const members = JSON.parse(localStorage.getItem('members')) || [];
        members.push({
            id: Date.now(),
            name: document.getElementById('fullname').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            plan: document.querySelector('input[name="plan"]:checked').value,
            joinDate: new Date().toISOString().split('T')[0]
        });
        
        localStorage.setItem('members', JSON.stringify(members));
        console.log("💾 Member saved:", members[members.length - 1]);
        
        // Success feedback
        const msg = document.getElementById('success-msg');
        if (msg) {
            msg.style.display = 'block';
            setTimeout(() => msg.style.display = 'none', 3000);
        }
        form.reset();
        document.querySelectorAll('[id$="-error"]').forEach(el => el.textContent = '');
    }

    // Helper to get/create error element
    function getErrorElement(fieldName) {
        let el = document.getElementById(`${fieldName}-error`);
        console.log("🔧 Looking for error element:", `${fieldName}-error`, "Found:", el);

        if (!el) {
            console.log("🔧 Creating new error element for:", fieldName);
            el = document.createElement('div');
            el.id = `${fieldName}-error`;
            el.style.cssText = 'font-size: 0.9rem; margin-top: 4px; min-height: 18px;';
            
            const parent = document.getElementById(fieldName)?.parentNode;
            console.log("🔧 Parent element:", parent);
            
            if (parent) {
                parent.appendChild(el);
                console.log("✅ Error element appended to parent");
            } else {
                console.log("❌ Could not find parent for", fieldName);
            }
        }
        return el;
    }

    console.log("JavaScript initialization complete");
} catch (error) {
    console.error("JavaScript error:", error);
    alert("JavaScript error: " + error.message);
}
