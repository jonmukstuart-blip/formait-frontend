// Validation Constraint Matrix
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB Production Cap

export function validateMediaPayload(fileList) {
    if (!fileList || fileList.length === 0) {
        throw new Error("Validation Failed: No asset payload detected.");
    }

    const validatedFiles = [];
    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
        // 1. Structure Integrity Check
        if (!file.name || !file.size) {
            console.warn("Skipping corrupt file structural node:", file);
            continue;
        }

        // 2. File Size Constraint
        if (file.size <= 0 || file.size > MAX_FILE_SIZE_BYTES) {
            console.warn(`Asset file [${file.name}] rejected. Size out of bounds: ${file.size} bytes.`);
            continue;
        }

        // 3. MIME-Type Whitelist Verification
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            console.warn(`Asset file [${file.name}] rejected. Forbidden MIME type: ${file.type}`);
            continue;
        }

        // Safe item added to validated array
        validatedFiles.push(file);
    }

    if (validatedFiles.length === 0) {
        throw new Error("No files passed the security and structural validations.");
    }

    return validatedFiles;
}

// Integrated usage inside your Intake Zone
export function initMediaVaultIntakeZone() {
    const fileInput = document.getElementById("mediaFileInput") || document.querySelector("input[type='file']");
    if (!fileInput) return;

    fileInput.onchange = (e) => {
        try {
            const safeFiles = validateMediaPayload(e.target.files);
            // Proceed safely to your GSAP timeline and upload rendering loops
            renderMediaTimeline(safeFiles);
        } catch (err) {
            alert(`Upload Blocked: ${err.message}`);
        }
    };
}
