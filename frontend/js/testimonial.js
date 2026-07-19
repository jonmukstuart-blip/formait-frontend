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

const params = new URLSearchParams(window.location.search);
const projectId = params.get("projectId");
const projectTitle = params.get("project") || "";

if (!projectId) {
    alert("Invalid review link: missing projectId");
    return;
}

const formData = new FormData();

formData.append("projectId", projectId);
formData.append("projectTitle", projectTitle);
formData.append(
    "clientName",
    document.getElementById("clientName").value.trim()
);
formData.append(
    "company",
    document.getElementById("company").value.trim()
);
formData.append(
    "position",
    document.getElementById("position").value.trim()
);
formData.append(
    "testimonial",
    document.getElementById("testimonial").value.trim()
);
formData.append("rating", String(selectedRating));

const mediaInput = document.getElementById("media");

if (mediaInput && mediaInput.files.length > 0) {
    formData.append("media", mediaInput.files[0]);
}

const response = await fetch(
    "https://formait-backend.onrender.com/api/testimonials",
    {
        method: "POST",
        body: formData
    }
);

if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
        errorData.error ||
        errorData.message ||
        "The testimonial could not be submitted."
    );
}

await response.json();

alert(
    "Thank you! Your testimonial was submitted and will appear after approval."
);

form.reset();

setTimeout(() => {
    window.location.href = "./portfolio.html";
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