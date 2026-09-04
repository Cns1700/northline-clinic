// This is the only JavaScript file on the site.
// It does four jobs: put the year in the footer, open/close the Menu,
// filter staff cards with a loop, and check the request form then send it to Netlify.
// Every line is commented so you can follow what it does.
//
// Words you will see a lot:
//   function  = a named set of steps you can run later
//   return    = the value a function hands back when it is done
//   loop      = repeat the same steps for every item in a list

// -----------------------------
// Footer year
// -----------------------------

// Put the current year in the footer so the copyright stays up to date.
// Returns nothing (undefined). A function with no return statement gives back undefined.
function setFooterYear() {
  // Look for the element with id="year". Other pages still call this; it is fine if it is missing.
  var yearEl = document.getElementById("year");
  // Only change the text if that element is on this page.
  if (yearEl) {
    // new Date() is "right now". getFullYear() pulls the year number, like 2026.
    yearEl.textContent = new Date().getFullYear();
  }
}

// -----------------------------
// Mobile menu
// -----------------------------

// Find the Menu button. On wide screens CSS hides it, but it is still in the HTML.
var menuButton = document.querySelector(".menu-button");

// Find the nav list we show and hide on small screens.
var navLinks = document.querySelector(".site-nav");

// Tell us whether the mobile menu is open right now.
// Returns true if the nav has the is-open class, otherwise false.
function isNavOpen() {
  // If the nav is not on the page, treat it as closed.
  if (!navLinks) {
    // Hand false back to whoever called this function.
    return false;
  }
  // classList.contains returns true or false. We pass that value straight back.
  return navLinks.classList.contains("is-open");
}

// Close the mobile menu and tell screen readers it is closed.
// Returns nothing.
function closeNav() {
  // If the nav is on the page, hide it by removing the open class.
  if (navLinks) {
    // CSS only shows the menu when .is-open is present on small screens.
    navLinks.classList.remove("is-open");
  }
  // If the button is on the page, mark it as not expanded.
  if (menuButton) {
    // aria-expanded is how screen readers know the menu state.
    menuButton.setAttribute("aria-expanded", "false");
  }
}

// Open the menu if it is closed, or close it if it is open.
// Returns nothing.
function toggleNav() {
  // Ask isNavOpen. That function returns true or false.
  var open = isNavOpen();
  // If it is already open, close it and stop here.
  if (open) {
    // Reuse closeNav so we do not copy the same steps twice.
    closeNav();
    // return with no value just exits the function early.
    return;
  }
  // If we got this far, the menu is closed, so open it.
  if (navLinks) {
    // Adding is-open makes the CSS display the list.
    navLinks.classList.add("is-open");
  }
  if (menuButton) {
    // Tell screen readers the menu is now open.
    menuButton.setAttribute("aria-expanded", "true");
  }
}

// -----------------------------
// Staff directory search (this is the loop to practice)
// -----------------------------

// Collect every staff card on the directory page.
// Returns a NodeList (a list of elements). If none exist, the list is empty.
function getStaffCards() {
  // [data-staff-name] means "every element that has a data-staff-name attribute".
  return document.querySelectorAll("[data-staff-name]");
}

// Update the "Showing X of Y staff" line.
// visibleCount and totalCount are numbers. query is the text in the search box.
// Returns nothing.
function updateStaffStatus(visibleCount, totalCount, query) {
  // Find the live status paragraph.
  var statusEl = document.getElementById("search-status");
  // If this page has no status line, stop.
  if (!statusEl) {
    return;
  }
  // If the box is empty, we are showing the full directory.
  if (query === "") {
    // Write a plain English sentence with the total.
    statusEl.textContent = "Showing all " + totalCount + " staff members.";
    // Leave the function so we do not overwrite that sentence.
    return;
  }
  // If the search found nobody, say so.
  if (visibleCount === 0) {
    // Keep the wording short and specific.
    statusEl.textContent = "No staff match \u201c" + query + "\u201d.";
    // Stop here.
    return;
  }
  // Otherwise report how many of the total are still visible.
  statusEl.textContent = "Showing " + visibleCount + " of " + totalCount + " staff members.";
}

// Show or hide each staff card by looping over them.
// An empty search box shows everyone.
// query is whatever the user typed.
// Returns the number of cards that are still visible.
function filterStaffByName(query) {
  // trim() drops extra spaces. toLowerCase() ignores capital letters.
  var needle = (query || "").trim().toLowerCase();
  // Ask getStaffCards for the list we will loop over.
  var cards = getStaffCards();
  // Start a counter at 0. Add 1 each time we keep a card visible.
  var visibleCount = 0;

  // --- PRACTICE LOOP ---
  // i is the index (position) of the card we are looking at.
  // i = 0 is the first card.
  // The loop repeats while i is less than cards.length (how many cards there are).
  // i = i + 1 moves to the next card after each pass.
  for (var i = 0; i < cards.length; i++) {
    // Pull the card at position i out of the list.
    var card = cards[i];
    // Read the person's name from the data-staff-name attribute.
    var name = (card.getAttribute("data-staff-name") || "").toLowerCase();
    // If the box is empty, show the card. If not, show it only when the name contains the search text.
    var shouldShow = needle === "" || name.indexOf(needle) !== -1;
    // If the card should be shown...
    if (shouldShow) {
      // hidden = false means the browser displays the card.
      card.hidden = false;
      // Add 1 to the counter because this card is visible.
      visibleCount = visibleCount + 1;
    } else {
      // hidden = true means the browser does not display the card.
      card.hidden = true;
    }
  }

  // Find the empty-state message that we show only when nothing matches.
  var emptyEl = document.getElementById("staff-empty");
  // If that message exists, hide it when we have results, show it when we do not.
  if (emptyEl) {
    // visibleCount === 0 is true when no cards are showing.
    emptyEl.hidden = visibleCount !== 0;
  }

  // Update the status line with the count we just tallied.
  updateStaffStatus(visibleCount, cards.length, needle);

  // Hand the visible count back. Other functions can use it, or ignore it.
  return visibleCount;
}

// Wire the search box to the filter function.
// Returns nothing.
function setupStaffSearch() {
  // Find the search input. Pages without it skip this whole function.
  var searchInput = document.getElementById("staff-search");
  // If there is no search box on this page, stop.
  if (!searchInput) {
    return;
  }
  // "input" fires on every keystroke, paste, or clear.
  searchInput.addEventListener("input", function onSearchInput(event) {
    // event.target is the search box. .value is the text inside it.
    filterStaffByName(event.target.value);
  });
  // Run once on page load so the status line is correct even before anyone types.
  filterStaffByName(searchInput.value);
}

// -----------------------------
// IT / records request form
// -----------------------------

// Check whether a string looks like an email address.
// Returns true if it has an @ and a dot after the @, otherwise false.
function isValidEmail(value) {
  // indexOf("@") returns the position of @, or -1 if it is not there.
  var atIndex = value.indexOf("@");
  // If there is no @, this is not an email.
  if (atIndex === -1) {
    return false;
  }
  // lastIndexOf(".") finds the last dot. Emails need a dot in the domain, like .example
  var dotIndex = value.lastIndexOf(".");
  // The dot must come after the @, and not be the last character.
  if (dotIndex <= atIndex + 1) {
    return false;
  }
  // The string should have at least one character after the last dot.
  if (dotIndex === value.length - 1) {
    return false;
  }
  // If we got this far, it is good enough for this form.
  return true;
}

// Check the name and email fields.
// Returns an error string if something is wrong, or "" (empty string) if the form is OK.
function getRequestError() {
  // Find the name input by its id.
  var nameField = document.getElementById("name");
  // Find the email input by its id.
  var emailField = document.getElementById("email");
  // If the fields are not on this page, there is nothing to check.
  if (!nameField || !emailField) {
    // Empty string means "no error".
    return "";
  }
  // trim() drops extra spaces on the ends so "  " does not count as a name.
  var nameValue = nameField.value.trim();
  // Do the same for email.
  var emailValue = emailField.value.trim();
  // If both are empty, say so in one sentence.
  if (nameValue === "" && emailValue === "") {
    return "Please enter your name and email.";
  }
  // If only the name is missing, ask for it.
  if (nameValue === "") {
    return "Please enter your name.";
  }
  // If only the email is missing, ask for it.
  if (emailValue === "") {
    return "Please enter your email.";
  }
  // isValidEmail returns false when the email does not look valid.
  if (!isValidEmail(emailValue)) {
    return "Please enter a valid email address.";
  }
  // Empty string means we found no problems.
  return "";
}

// Turn every field on a form into a string Netlify can store.
// form is the <form> element.
// Returns a URL-encoded string, like "name=Ada&email=ada%40northlineclinic.com".
function encodeFormBody(form) {
  // FormData copies every named field, including the hidden form-name field.
  var formData = new FormData(form);
  // URLSearchParams turns that list into one string Netlify expects.
  return new URLSearchParams(formData).toString();
}

// Hide the form and show the thank-you message.
// Returns nothing.
function showRequestThanks() {
  // Find the error box so we can hide it if it was showing.
  var errorBox = document.getElementById("form-error");
  // Find the form itself.
  var requestForm = document.getElementById("request-form");
  // Find the thank-you message.
  var thanksBox = document.getElementById("form-thanks");
  // Hide the error box in case it was showing from an earlier try.
  if (errorBox) {
    errorBox.hidden = true;
  }
  // Hide the form so the user does not send it twice.
  if (requestForm) {
    requestForm.hidden = true;
  }
  // Show the thank-you message instead of the form.
  if (thanksBox) {
    thanksBox.hidden = false;
    // Move keyboard focus to the thanks heading so screen readers announce it.
    thanksBox.focus();
  }
}

// POST the form to Netlify Forms on the live site.
// form is the <form> element.
// Returns nothing. fetch is asynchronous, so this function does not wait for the reply.
function sendFormToNetlify(form) {
  // Ask encodeFormBody for the field string. That function returns the encoded body.
  var encoded = encodeFormBody(form);
  // Read the action on the form. That is the request page on the Netlify site.
  var sendTo = form.getAttribute("action");
  // If the action is missing, send to this page.
  if (!sendTo) {
    sendTo = "/request.html";
  }
  // Send the form to Netlify. The live site receives this. The in-browser preview does not.
  fetch(sendTo, {
    // Use POST so Netlify treats this as a form submission.
    method: "POST",
    // Tell Netlify the body is a normal HTML form.
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // Put the field string in the request body.
    body: encoded
  }).catch(function () {
    // The in-browser preview is not Netlify, so this send can fail. That is fine.
  });
}

// Run when the user tries to send the request form.
// event is the submit event from the browser.
// Returns nothing.
function handleRequestSubmit(event) {
  // Stop the browser from doing a full page reload. We send with fetch instead.
  event.preventDefault();
  // Ask getRequestError. It returns a message or an empty string.
  var errorText = getRequestError();
  // Find the error box.
  var errorBox = document.getElementById("form-error");
  // Find the form itself.
  var requestForm = document.getElementById("request-form");
  // If there is an error, show it and stop. Do not hide the form. Do not send.
  if (errorText !== "") {
    // If the error box exists, put the message in it and unhide it.
    if (errorBox) {
      errorBox.textContent = errorText;
      errorBox.hidden = false;
    }
    // Leave the function now so we never reach the success steps.
    return;
  }
  // If the form is on the page, post it to Netlify Forms.
  if (requestForm) {
    sendFormToNetlify(requestForm);
  }
  // Hide the form and show thanks after a valid check.
  showRequestThanks();
}

// Attach the submit handler if this page has the request form.
// Returns nothing.
function setupRequestForm() {
  // Find the form. Other pages do not have it, and that is fine.
  var requestForm = document.getElementById("request-form");
  // If there is no form, stop.
  if (!requestForm) {
    return;
  }
  // When the user clicks Send request, run handleRequestSubmit.
  requestForm.addEventListener("submit", handleRequestSubmit);
}

// -----------------------------
// Start everything
// -----------------------------

// Run the setups that this page needs.
// Returns nothing.
function init() {
  // Always try to fill the year. Harmless if the span is missing.
  setFooterYear();
  // Only bind the menu button if both the button and the nav exist.
  if (menuButton && navLinks) {
    // When the Menu button is clicked, open or close the nav.
    menuButton.addEventListener("click", function () {
      toggleNav();
    });
  }
  // Find every link inside the navigation list.
  var navLinkItems = document.querySelectorAll(".site-nav a");
  // LOOP: when a nav link is clicked, close the mobile menu.
  for (var i = 0; i < navLinkItems.length; i++) {
    navLinkItems[i].addEventListener("click", function () {
      closeNav();
    });
  }
  // Set up staff search if this is the directory page.
  setupStaffSearch();
  // Set up the request form if this is the request page.
  setupRequestForm();
}

// When the HTML is finished loading, run init.
document.addEventListener("DOMContentLoaded", init);
