# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

GOV.UK Prototype Kit (v12) for "Claim Witness Expenses" — a Crown Prosecution Service alpha prototype. Session-based (no database); all form data stored in Express sessions.

## Commands

```bash
npm start       # Start the server (runs gulp: compile assets, watch, start with nodemon)
npm run lint    # Run Standard JS linter
npm test        # Full suite: lint + gulp asset generation + Jest tests
npm run rapidtest  # Quick Jest tests with --bail
```

Server runs on port 3000. Assets are compiled from `app/assets/sass/` to `public/` via Gulp/Sass.

## Architecture

- **`server.js`** — Express setup, middleware, session config
- **`app/routes.js`** — All Express routing and branching logic for form flows
- **`app/views/`** — Nunjucks templates; versions in subdirectories (`witex-v6/` through `witex-v33/`, `FCT-v1/`, `version-1/`, `version-1a/`)
- **`app/views/layouts/main.html`** — Base layout; all pages extend this
- **`app/views/includes/`** — Reusable Nunjucks partials
- **`app/data/session-data-defaults.js`** — Default values pre-loaded into session
- **`app/assets/sass/`** — Custom SCSS (use sparingly; prefer GOV.UK classes)
- **`gulp/`** — Build tasks (sass compilation, file watching, nodemon)

Deployment: GitHub Actions CI to Azure Web App (`witex-proto`) on push to `main`.

## Core rules

1. All pages must extend `{% extends "layouts/main.html" %}`
2. Use Nunjucks macros (`{{ govukButton({...}) }}`), not raw HTML
3. Only use GOV.UK classes — no custom CSS or inline styles
4. GOV.UK components are WCAG 2.2 AA compliant by design — use them correctly
5. If something isn't possible with existing GOV.UK components, flag it rather than workarounding

## Versioning

- **Never delete old versions** — keep all version folders for reference
- **Copy, don't move** — duplicate the previous folder when starting a new version
- Routes for each version must be kept separate in `app/routes.js`
- Update `app/views/index.html` with version metadata (date, phase, research round tags)

## Naming conventions

| Type | Convention | Example |
|---|---|---|
| HTML files | Lowercase, hyphens | `check-answers.html` |
| URL paths | Lowercase, hyphens | `/v2/check-answers` |
| Form field names | Lowercase, hyphens | `full-name`, `date-of-birth` |
| JS variables | camelCase | `contactMethod` |
| Nunjucks variables | camelCase | `pageName`, `serviceName` |

## Page structure

```nunjucks
{% extends "layouts/main.html" %}

{% set pageName = "What is your name?" %}

{% block beforeContent %}
  {{ govukBackLink({ text: "Back", href: "javascript:history.back()" }) }}
{% endblock %}

{% block content %}
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <!-- Content here -->
    </div>
  </div>
{% endblock %}
```

## Routes and branching

```javascript
router.post("/v2/contact-preference", function (request, response) {
  const contact = request.session.data["contact"];
  if (contact === "email") {
    response.redirect("/v2/email-address");
  } else {
    response.redirect("/v2/phone-number");
  }
});
```

Access session data in templates with `data['field-name']`; pre-fill inputs with `value: data['field-name']`.

## Content design (GOV.UK style)

- Plain English: "buy" not "purchase", "help" not "assist", "start" not "commence"
- Address the user as "you"; refer to the service as "we"
- Sentence case everywhere except proper nouns
- Button text: "Continue" for multi-page forms; "Send application" for final submission; never "Click here" or "Next"
- Dates: "6 September 2024" (no ordinals); money: "£50" (no ".00"); numbers 1–9 as words, 10+ as digits
- Avoid: "Please", "click", "ensure" (use "make sure"), "via" (use "through"), "i.e."/"e.g." (spell out)

## Code style

- 2-space indentation for all file types (no tabs)
- Complex macros: multi-line with aligned properties; simple macros: single line acceptable
- Class order: component → modifier → width → spacing → display
- Keep template logic minimal — branching belongs in `routes.js`
- One question per page

## Accessibility (mandatory)

- Every form input needs an associated `<label>` (macros handle this — never use raw `<input>`)
- Group radios/checkboxes/date inputs in a `<fieldset>` with a `<legend>`
- Use `isPageHeading: true` on label/legend when it's the page `<h1>`
- Every page needs exactly one `<h1>`; heading levels must be sequential
- Link text must describe the destination — no "click here" or "read more"
- Use `visuallyHiddenText` in summary list change links for screen reader context
- Never remove focus styles (`outline: none` is forbidden)
- Errors: use `govukErrorSummary` at page top + `errorMessage` on each field

## Design System reference

- Components: https://design-system.service.gov.uk/components/
- Patterns: https://design-system.service.gov.uk/patterns/
- Styles: https://design-system.service.gov.uk/styles/

Do not hardcode class names or hex values from memory — check live documentation.

## PDF component

There is a separate React app in `pdf-component/` (React 17, TypeScript, pdfjs-dist) for PDF annotation functionality. It has its own `package.json` and build process.
