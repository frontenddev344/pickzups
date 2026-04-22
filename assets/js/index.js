function openNav() {
    document.getElementById("mySidenavs").classList.add("open");
    document.getElementById("menuOverlay").classList.add("active");
}

function closeNav() {
    document.getElementById("mySidenavs").classList.remove("open");
    document.getElementById("menuOverlay").classList.remove("active");
}


//  header sticky js start  
const header = document.querySelector("header");
const toggleClass = "is-sticky";

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 40) {
        header.classList.add(toggleClass);
    } else {
        header.classList.remove(toggleClass);
    }
});
//  header sticky js end


document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contactForm');

    const formFields = [
        { id: 'name', element: document.getElementById('name') },
        { id: 'email', element: document.getElementById('email') },
        { id: 'phone', element: document.getElementById('phone') },
        { id: 'message', element: document.getElementById('message') }
    ];

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    function showError(fieldId, message) {
        const field = formFields.find(f => f.id === fieldId);
        const errorMessage = field.element.parentElement.querySelector('.error-message');

        if (errorMessage) {
            field.element.classList.add('error');
            errorMessage.textContent = message;
            errorMessage.style.display = "block";
        }
    }

    function hideError(fieldId) {
        const field = formFields.find(f => f.id === fieldId);
        const errorMessage = field.element.parentElement.querySelector('.error-message');

        if (errorMessage) {
            field.element.classList.remove('error');
            errorMessage.textContent = '';
            errorMessage.style.display = "none";
        }
    }

    function validateField(fieldId) {
        const field = formFields.find(f => f.id === fieldId);
        const value = field.element.value.trim();

        if (value === '') {
            showError(fieldId, 'This field is required');
            return false;
        }

        if (fieldId === 'email' && !emailPattern.test(value)) {
            showError(fieldId, 'Enter valid email');
            return false;
        }

        if (fieldId === 'phone' && !phonePattern.test(value)) {
            showError(fieldId, 'Enter valid 10-digit number');
            return false;
        }

        hideError(fieldId);
        return true;
    }

    // Real-time validation
    formFields.forEach(field => {
        field.element.addEventListener('input', function() {
            validateField(field.id);
        });
    });

    // Submit
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        formFields.forEach(field => {
            if (!validateField(field.id)) {
                isValid = false;
            }
        });

        if (isValid) {
            contactForm.submit();
        }
    });

});