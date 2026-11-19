# Light theme and conversion decisions — 19 November 2026

The user rejected large dark surfaces and requested a light, reassuring experience grounded in the logo colours. Ivory, lilac, butter and neutral white distinguish sections without dark panels or an all-pink page. The transparent crest stays unchanged from the previous revision. Existing locally hosted fonts, rounded controls, motion preferences and responsive architecture remain in place.

## Evidence and limits

- [Alberts & van der Geest, Color matters](https://research.utwente.nl/en/publications/color-matters-color-as-trustworthiness-cue-in-web-sites/): colour had a statistically significant but limited effect on perceived trust in an experiment involving finance, legal and medical sites. This does not establish a universal palette for beauty education or guarantee more sales. The chosen palette implements the owner's preference and brand identity.
- [Nielsen Norman Group, usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/): visible choices, familiar language, predictable interactions and reduced memory demands. Applied through a descriptive header enquiry action, explicit WhatsApp destination, visible course-fee comparison and a clear explanation of the next step.
- Existing authentic client videos, trainer credentials, portfolio and fees support informed decisions. Client stories are not labelled as student results. Existing terms and availability disclosures remain visible.

The aim is lower decision friction: understand the offering, see the work, compare fees, ask questions, then decide. Adding every sales tactic would compete for attention. This revision avoids invented scarcity, unverified earnings or outcomes, fake popularity and countdowns. It does not add guarantees the academy has not authorised.

## Validation

Production build includes TypeScript, lint and rendered-page claim integrity checks. Visual review covers desktop and phone navigation, teacher, final invitation and footer. Colour changes are not evidence of improved conversion: that requires subsequent real visitor data or a controlled comparison.

Verified results: production build passed (25 generated routes); TypeScript, lint and 12 rendered-page claim checks passed. Browser review confirmed light computed backgrounds for header/trainer/invitation/footer, logo loaded, and no home-page horizontal overflow at 280, 360, 901 and 1440 CSS pixels. Phone menu opened and closed correctly. Desktop trainer and invitation/footer were visually inspected. This is browser viewport testing, not a claim of physical Samsung hardware coverage.

Measured contrast: primary text/ivory 13.48:1; muted text/lilac 5.68:1; muted text/butter 5.91:1; gold text/ivory 6.06:1; white/magenta button 5.63:1. All exceed 4.5:1 for normal text.
