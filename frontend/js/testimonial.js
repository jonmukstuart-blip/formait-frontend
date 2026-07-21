// =============================================
// FORMA.IT CLIENT TESTIMONIAL ENGINE
// =============================================

let loader = null;
let selectedRating = 5;
let currentStep = 0;

document.addEventListener("DOMContentLoaded", () => {
    loader = document.getElementById("stepLoader");

    const urlParams = new URLSearchParams(window.location.search);
    const projectTitle =
        decodeURIComponent(urlParams.get("project") || "this project");

    const projectInput = document.getElementById("projectTitle");
    const projectName = document.getElementById("projectName");

    if (projectInput) {
        projectInput.value = projectTitle;
    }

    if (projectName) {
        projectName.textContent = projectTitle;
    }

    // Initialise rating
    const stars = document.querySelectorAll("#ratingStars span");

    function displayRating() {
        stars.forEach(star => {
            star.textContent =
                Number(star.dataset.rating) <= selectedRating
                    ? "★"
                    : "☆";
        });
    }

    stars.forEach(star => {
        star.addEventListener("click", () => {
            selectedRating = Number(star.dataset.rating);
            displayRating();
        });
    });

    displayRating();
    showStep(0);

    const form = document.getElementById("testimonialForm");

    if (!form) return;

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const submitButton = form.querySelector(
            'button[type="submit"]'
        );

        try {
            const projectId = urlParams.get("projectId");

            if (!projectId) {
                throw new Error(
                    "Invalid review link: missing projectId."
                );
            }

            const clientName =
                document.getElementById("clientName").value.trim();

            const testimonial =
                document.getElementById("testimonial").value.trim();

            if (!clientName) {
                throw new Error("Please enter your name.");
            }

            if (!testimonial) {
                throw new Error(
                    "Please tell us about your experience."
                );
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Submitting...";
            }

            if (loader) {
                loader.classList.remove("hidden");
            }

            const formData = new FormData();

            formData.append("projectId", projectId);
            formData.append("projectTitle", projectTitle);
            formData.append("clientName", clientName);

            formData.append(
                "company",
                document.getElementById("company").value.trim()
            );

            formData.append(
                "position",
                document.getElementById("position").value.trim()
            );

            formData.append("testimonial", testimonial);
            formData.append("rating", String(selectedRating));

            const mediaInput = document.getElementById("media");

            if (
                mediaInput &&
                mediaInput.files &&
                mediaInput.files.length > 0
            ) {
                formData.append("media", mediaInput.files[0]);
            }

            const response = await fetch(
                "https://formait-backend.onrender.com/api/testimonials",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json().catch(() => ({}));

const responseData =
    await response.json().catch(() => ({}));

if (!response.ok) {
    throw new Error(
        responseData.error ||
        responseData.message ||
        `Submission failed ${response.status}`
    );
}

            alert(
                "Thank you! Your review was submitted for approval."
            );

            form.reset();
            selectedRating = 5;
            displayRating();

            window.location.href = "./portfolio.html";

        } catch (error) {
            console.error("[TESTIMONIAL ERROR]", error);
            alert(error.message);

        } finally {
            if (loader) {
                loader.classList.add("hidden");
            }

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Review";
            }
        }
    });
});

// =============================================
// WIZARD CONTROLS
// =============================================

function showStep(index) {
    const steps = document.querySelectorAll(".step");
    const progressBar = document.getElementById("progressBar");

    if (!steps.length) return;

    steps.forEach((step, stepIndex) => {
        step.classList.toggle("active", stepIndex === index);
    });

    if (progressBar) {
        const progress = ((index + 1) / steps.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

function nextStep() {
    const steps = document.querySelectorAll(".step");

    if (!steps.length || currentStep >= steps.length - 1) {
        return;
    }

    // Validate name before leaving first step
    if (currentStep === 0) {
        const clientName =
            document.getElementById("clientName")?.value.trim();

        if (!clientName) {
            alert("Please enter your name.");
            return;
        }
    }

    // Validate rating
    if (currentStep === 1 && !selectedRating) {
        alert("Please select a rating.");
        return;
    }

    // Validate testimonial
    if (currentStep === 2) {
        const testimonial =
            document.getElementById("testimonial")?.value.trim();

        if (!testimonial) {
            alert("Please tell us about your experience.");
            return;
        }
    }

    currentStep += 1;
    showStep(currentStep);
}

function prevStep() {
    if (currentStep <= 0) return;

    currentStep -= 1;
    showStep(currentStep);
}

window.nextStep = nextStep;
window.prevStep = prevStep;