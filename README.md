# ZR Enterprises website

A responsive static HTML/CSS/JavaScript website, built from the supplied company profile (download updated to the new eight-page PDF). No paid APIs, subscriptions, frameworks, analytics or build dependencies are required. The original company logo is extracted from the PDF; product artwork is a locally authored SVG illustration.

## Preview

Use Node.js 20.11 or newer:

```sh
npm run dev
```

Open http://127.0.0.1:5173. To use another port or expose a local preview:

```sh
npm run dev -- --host 0.0.0.0 --port 8080
```

Or serve this folder using any static HTTP server. No `npm install` or build step is needed. `npm run check` checks JavaScript syntax.

## Contact features

- Email form: native POST to https://formsubmit.co/zrenterprises13@gmail.com. FormSubmit's free service handles delivery; its default CAPTCHA is enabled. A hidden honeypot also filters basic spam. No password or API key belongs in the website.
- WhatsApp: opens https://wa.me/923204174734 with the completed form details. The visitor must press Send in WhatsApp. No WhatsApp API is used.
- Phone: `tel:+923204174734` opens a supported device's dialer.
- Downloadable company profile and a Google Maps search link are included.

### Required one-time email activation

1. Publish the site on your chosen static host, or serve it over HTTP for a test.
2. Submit a clearly labeled test inquiry through the email form and complete the provider's CAPTCHA.
3. The CEO must open the activation email in **zrenterprises13@gmail.com** and confirm the FormSubmit link. Check Spam too.
4. Submit a second test inquiry and verify that the CEO actually receives all fields and can reply to the visitor's email.

Until activation is confirmed, email delivery is not launch-verified. FormSubmit is an external dependency; availability and future terms are controlled by that provider. The website never displays a fabricated local email-success message. A native form submission works even if JavaScript is disabled. Only a provider-completed submission redirects to `thank-you.html`; that URL is set dynamically to the current host when JavaScript runs.

No live test messages have been sent to the CEO during development. Browser tests intercept the form POST and WhatsApp navigation, so testing does not contact anyone or activate accounts.

## Publishing and SEO

Upload the public website files (`index.html`, `styles.css`, `script.js`, `privacy.html`, `thank-you.html`, `404.html`, `robots.txt`, `sitemap.xml`, and `assets/`) to a static host. Do not upload `scripts/` or development files. A static host's free tier can serve this site; hosting and domain accounts have not been provisioned by this project. A custom domain may have its own registration/renewal cost.

The public domain currently follows the PDF: **https://www.zrenterprises.com/**. Before launch, confirm domain ownership and replace this URL in the canonical tags, Open Graph metadata, JSON-LD, sitemap, robots.txt and hidden `_next` field if the actual address differs. Enable HTTPS on the host. Configure its 404 handling to serve `404.html` with a 404 status.

Included: descriptive title/meta description, one main H1, semantic landmarks, heading hierarchy, local-business JSON-LD without invented ratings, image alt text, social share image, sitemap and robots.txt. Thank-you and error pages are marked noindex. Site content is in English for the business audience. SEO preparation does not guarantee rankings or search indexing. After launch, submit the sitemap in Google Search Console and verify a Google Business Profile using real business details.

## Editing

- Content and form fields: `index.html`.
- Colors, layout and responsive rules: `styles.css`.
- Menu, category selection and WhatsApp message construction: `script.js`.
- Original extracted logo: `assets/logo-full.webp` and `assets/logo-mark.webp`.
- Company profile: `assets/zr-enterprises-company-profile.pdf`.
- Privacy notice: review `privacy.html` if providers or data practices change.

The site makes no fabricated claims about clients, reviews, business age, authorized dealerships or guaranteed nationwide delivery. Software installation is identified as a possible future service, matching the source profile.

## Typography

Ubuntu Sans is served locally. Its Ubuntu Font Licence and attribution are included in `assets/FONT-LICENSE.txt`.

## Development verification

Verified in Chrome at 320, 375, 390, 700, 768, 1024 and 1440 pixels: no horizontal overflow, navigation and category selection, required fields and phone validation, WhatsApp recipient/message construction, and email POST with every field. External submissions were intercepted before transmission. The CAPTCHA configuration, redirect, privacy page, missing-page status, local assets, sitemap and structured data were checked. Actual inbox delivery remains dependent on the CEO's one-time activation and a subsequent live test.

## Business locations

Both complete addresses are shown in Contact, the footer, FAQ, privacy notice and local-business structured data, with separate Google Maps search links:

- 75B Gulberg Center Main Boulevard Gulberg III Lahore
- 52 MZ II Al Hafeez Shopping Mall Main Boulevard Gulberg III Lahore

## Latest profile download

The downloadable profile was replaced with the eight-page PDF supplied on 1 October 2026. Both download links include a content version to avoid stale browser caches. The original logo and both explicitly requested business addresses are preserved.

## Business coverage imagery

Six responsive sector cards use the original images embedded in page 7 of the supplied eight-page company profile. The three JPEG assets are extracted unchanged; CSS displays the relevant photograph from each source. Captions are selectable HTML text with image alt descriptions. Images are local and lazy-loaded; no paid image service or external image dependency is used.

## Brand slider

The brand strip scrolls continuously, pauses on hover or keyboard focus, and includes a pause/resume control. Reduced-motion preferences show a static list. Visual duplicates are hidden from assistive technology. No third-party slider library is required.

## Typography and coverage styling

Business Coverage uses white cards, inset photographs, navy headings and soft blue icons on the existing cream background. Text sizes are increased across navigation, body copy, cards, forms and footer. Mobile forms use one column and 16px inputs. Navigation switches to its mobile layout at 900px. Responsive layout and contact interactions were rechecked after these changes.

## Social profiles

The supplied WhatsApp Channel, Facebook, Instagram and LinkedIn links appear as accessible icon links in both the header strip and footer. The same profiles are included in LocalBusiness structured data. Their URLs can be updated in `index.html`. WhatsApp Channel is distinct from the existing direct-chat buttons.

## Sector overview

The original “Different businesses. The same care.” six-sector overview is restored before the photographic Business Coverage cards. Both sections remain on the page.

## Sector logo slider

The “Sectors We Support” section includes 21 organizations from page 6 of the supplied company profile. Fifteen displayed logos now use clearer local assets from the organizations' own sites or official profile (the Beaconhouse mark is rendered from its official PDF). The other six retain the profile extraction because an exact, verifiable higher-resolution source was not found. Asset-by-asset links and exceptions are in `assets/sector-logo-sources.md`. The slider pauses on hover or via its button, and reduced-motion settings show a manually scrollable logo row. The heading does not claim a client relationship.

## Page loader

The home page briefly shows the existing ZR Enterprises full logo with a subtle progress-line animation. It dismisses after page load, with a short minimum display and a timeout fallback. Reduced-motion visitors see a static logo, and the loader stays hidden when JavaScript is disabled. The logo is loaded from a local asset.
