# ECAMS Billboard Static

The public-facing display frontend for the ECAMS (Engineering, Computing and Mathematical Sciences) department billboard. A static HTML/CSS/JS site intended to be shown on a department display screen.

## Features

- **Banner carousel** — auto-rotating slideshow of department banners fetched from the API
- **Professor directory** — scrollable table of faculty with office numbers
- **Professor detail modal** — click any professor to see name, email, office hours, and office location
- Hosted on **Azure Static Web Apps**

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- Bootstrap 5
- jQuery
- Data fetched at runtime from [ECAMS-Billboard-API](../ECAMS-Billboard-API)

## Setup

This is a static site with no build step. To run it locally, serve it with any static file server:

```bash
npx serve .
# or
python -m http.server 8080
```

### Configuring the API URL

The API base URL is set in `assets/scripts.js`. Update it to point to your [ECAMS-Billboard-API](../ECAMS-Billboard-API) instance before deploying.

## Deployment

Deploy to **Azure Static Web Apps** using the included `staticwebapp.config.json`. Connect your GitHub repository in the Azure portal and it will build and deploy automatically on push.

## CI/CD

See [CI_CD.md](CI_CD.md) for the full deployment pipeline documentation.
