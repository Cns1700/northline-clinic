# Northline Clinic

Fictional outpatient clinic site. Built as a portfolio piece.

**Live:** [cns1700.github.io/northline-clinic](https://cns1700.github.io/northline-clinic/)

This is a small multi-page demo with a staff-directory search. Paid client jobs I take are usually a **single landing page** with file handoff. This repo shows a calmer professional layout plus a search loop I can walk through out loud.

---

## Open it on your computer

1. Download or clone the folder.
2. Open `index.html` in a browser.
3. Or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

No build step. HTML, one CSS file, one JS file.

The request form uses **Netlify Forms** on a hosted copy (`data-netlify="true"` plus a honeypot field). Opening the files on your computer still checks name and email and shows thanks. It does not save a real ticket unless the page is on Netlify.

---

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Staff directory with name search |
| `department.html` | Primary Care |
| `request.html` | IT / records request form |
| `css/styles.css` | All layout and colors |
| `js/main.js` | Year, menu, staff search loop, request form |
| `favicon.svg` | Tab icon |
| `netlify.toml` | Netlify settings for the hosted copy |

---

## Where to change the usual client stuff

Clinic facts are written **in each HTML page**. Search for phone, hours, and address and update every copy.

Staff cards live on `index.html`. Each card needs a `data-staff-name` attribute. The search box compares what you type to that attribute (case does not matter).

To add a person: copy a card, change the visible name and `data-staff-name` so they match.

Colors and spacing live in `css/styles.css`.

---

## What the JavaScript does (learning notes)

`js/main.js` is commented on purpose. The moving parts:

1. **Footer year.** `setFooterYear()` fills `#year`.
2. **Mobile menu.** Same pattern as the other sites: toggle `is-open` on `.site-nav`.
3. **Staff search (the practice loop).**
   - `getStaffCards()` finds every `[data-staff-name]` card.
   - `filterStaffByName(query)` lowercases the search text and loops the cards.
   - A card stays visible if the box is empty **or** the name contains the typed text (`indexOf`).
   - `#search-status` and `#staff-empty` update from that count.
4. **Request form.** `getRequestError()` returns a message or `""`. Valid submit POSTs to Netlify on the hosted site, then shows `#form-thanks`.

Words to know while you read the file: `function`, `return`, `for` loop, `toLowerCase()`, `indexOf`.

---

## How a client would use these files

Zip the folder. They can host it as static files. If they want the request form to collect real messages, they need Netlify Forms or another form backend. A raw `index.html` double-click will not store mail.

---

## Honest limits

- Fictional clinic. Not a medical provider.
- Directory is static HTML, not a staff database.
- Search only looks at `data-staff-name`, not titles or departments.
- Local preview does not store form mail.
- No patient portal, no HIPAA workflow, no online scheduling.
