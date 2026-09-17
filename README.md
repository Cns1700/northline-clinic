# Northline Clinic

Fictional outpatient clinic website using static HTML, CSS, and a little JavaScript.

Open `index.html` in a browser, or serve the folder with any static file server.

| File | Page |
| --- | --- |
| `index.html` | Staff directory with name search |
| `department.html` | Primary Care |
| `request.html` | IT / records request (Netlify Forms) |
| `css/styles.css` | All styles |
| `js/main.js` | Mobile menu, staff search loop, request form check |

Clinic details (phone, hours, address) are written into each HTML page.
The request form uses Netlify Forms (`data-netlify="true"`, honeypot field). Live submissions show up in the Netlify dashboard. The in-browser preview is not Netlify, so the thank-you message will still appear after a valid name and email.
