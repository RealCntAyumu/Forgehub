/** @format */

import { uploadFile } from "./upload.js";

export function initUploadDialog(uploadButton) {
    const uploadDialog = document.getElementById("upload-dialog");
    const projectSelect = document.getElementById("project-select");
    const folderSelect = document.getElementById("folder-select");
    const fileInput = document.getElementById("file-input");
    const uploadSubmit = document.getElementById("upload-submit");

    // Open the upload dialog when the upload button is clicked
    uploadButton.addEventListener("click", () => {
        uploadDialog.style.display = "block";
    });

    // Close the upload dialog when the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target === uploadDialog) {
            uploadDialog.style.display = "none";
        }
    });

    // Upload the selected file when the submit button is clicked
    uploadSubmit.addEventListener("click", async() => {
        const selectedProject = projectSelect.value;
        const selectedFolder = folderSelect.value;
        const file = fileInput.files[0];

        if (file && selectedProject && selectedFolder) {
            try {
                await uploadFile(selectedProject, selectedFolder, file);
                alert("File uploaded successfully!");
            } catch (error) {
                alert("Error uploading file: " + error.message);
            } finally {
                // Close the upload dialog and reset the input fields
                uploadDialog.style.display = "none";
                projectSelect.value = "";
                folderSelect.value = "";
                fileInput.value = "";
            }
        } else {
            alert("Please select a project, folder, and file.");
        }
    });
}