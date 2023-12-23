"use strict";

// Get references to HTML elements
var siteNameInput = document.getElementById("sname");
var siteUrlInput = document.getElementById("siteurl");
var tableBody = document.getElementById("tablebody");
var layerBox = document.getElementById("layerBox");

// Array to store site data
var Sites = [];

// Check if there are stored sites in localStorage
if (localStorage.getItem("site") === null) {
  Sites = [];
} else {
  // Retrieve sites from localStorage and parse JSON
  Sites = JSON.parse(localStorage.getItem("site"));
  // Display the stored sites on the page
  displaySites(Sites);
}

// Function to add a new site
function addSite() {
  // Check if the entered site name and URL are valid
  if (validateSiteName() && validateUrlName()) {
    // Take values from inputs
    var inputValues = {
      siteNameValue: siteNameInput.value,
      siteUrlValue: siteUrlInput.value,
    };
    // Add the new site to the array
    Sites.push(inputValues);

    // Display the updated list of sites
    displaySites();
    // Clear input fields
    clearInput();
    // Update localStorage with the new list of sites
    localStorage.setItem("site", JSON.stringify(Sites));
  } else {
    // If validation fails, display the error layer
    layerBox.classList.replace("d-none", "d-flex");
  }
}

// Function to close the error layer
function closeLayer() {
  layerBox.classList.replace("d-flex", "d-none");
}

// Function to clear input fields
function clearInput() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

// Function to display the list of sites on the page
function displaySites() {
  var cartona = "";

  for (let i = 0; i < Sites.length; i++) {
    cartona += `
          <tr>
            <td>${i + 1}</td>
            <td>${Sites[i].siteNameValue}</td>
            <td>
              <button class="btn btn-success">
                <a class="text-white text-decoration-none" href='${
                  Sites[i].siteUrlValue
                }'> <i class="bi bi-eye-fill"></i> Visit</a>
              </button>
            </td>
            <td>
              <button onclick="deleteSite(${i})" class="btn btn-danger">
                <i class="bi bi-trash3-fill"></i> 
                Delete
              </button>
            </td>
          </tr>`;
  }

  tableBody.innerHTML = cartona;
}

// Function to delete a site based on its index
function deleteSite(index) {
  // Remove the site from the array
  Sites.splice(index, 1);

  // Display the updated list of sites
  displaySites(Sites);

  // Update localStorage with the modified list of sites
  localStorage.setItem("site", JSON.stringify(Sites));
}

// Function to validate the site name using a regular expression
function validateSiteName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if (regex.test(siteNameInput.value)) {
    siteNameInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    return false;
  }
}

// Function to validate the site URL using a regular expression
function validateUrlName() {
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (urlRegex.test(siteUrlInput.value)) {
    siteUrlInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    return false;
  }
}
