// =============================================
// FORMA.IT CLIENT TESTIMONIAL ENGINE (WIZARD FIXED)
// =============================================
let loader = null;
let selectedRating = 5;

let currentStep = 0;
let steps = [];
let progressBar = null;

document.addEventListener("DOMContentLoaded", () => {
    loader = document.getElementById("stepLoader");

    const params = new URLSearchParams(window.location.search);

    const project = params.get("project") || "this project";

    const input = document.getElementById("projectTitle");

    if (input) {
        input.value = decodeURIComponent(project);
    }


    const stars = document.querySelectorAll("#ratingStars span");

    stars.forEach(star => {
        star.addEventListener("click", () => {
            selectedRating = Number(star.dataset.rating);

            stars.forEach(s => {
                s.textContent =
                    Number(s.dataset.rating) <= selectedRating ? "★" : "☆";
            });
        });
    });

    const form = document.getElementById("testimonialForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            try {
               const params = new URLSearchParams(window.location.search);

const body = {
    projectId: params.get("projectId"),
    projectTitle: params.get("project") || "",
    clientName: document.getElementById("clientName").value,
    company: document.getElementById("company").value,
    position: document.getElementById("position").value,
    testimonial: document.getElementById("testimonial").value,
    rating: selectedRating,
    status: "pending"
};

if (!body.projectId) {
    alert("Invalid review link: missing projectId");
    return;
}
                const response = await fetch("https://formait-backend.onrender.com/api/testimonials", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });

if (!response.ok) throw new Error("Submission failed.");

alert("Thank you! Your testimonial has been submitted.");

form.reset();

// Redirect client to portfolio after successful submission
setTimeout(() => {
    window.location.href = "portfolio.html";
}, 800);

            } catch (err) {
                console.error(err);
                alert(err.message);
            }
        });
    }

});
// =============================================
// WIZARD CONTROLS
// =============================================
function showStep(index) {

    const steps = document.querySelectorAll(".step");
    const progressBar = document.getElementById("progressBar");

    steps.forEach((step, i) => {

        if (i === index) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }

    });

    if (progressBar) {
        const progress = ((index + 1) / steps.length) * 100;
        progressBar.style.width = progress + "%";
    }
}

function nextStep() {

    const steps = document.querySelectorAll(".step");

    if (currentStep < steps.length - 1) {

        // show loading overlay
        if (loader) loader.classList.remove("hidden");

        setTimeout(() => {

            currentStep++;
            showStep(currentStep);

            // hide loading after step switch
            if (loader) loader.classList.add("hidden");

        }, 400); // fake loading delay (Stripe-style feel)

    }
}

function prevStep() {

    if (currentStep > 0) {

        if (loader) loader.classList.remove("hidden");

        setTimeout(() => {

            currentStep--;
            showStep(currentStep);

            if (loader) loader.classList.add("hidden");

        }, 300);

    }
}