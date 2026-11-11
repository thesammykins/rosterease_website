# RosterEase website

Static Astro site. Node comes from `mise.toml`. Before pushing, run:

```sh
npm ci && npm run check:a11y && npm run check:motion
```

(~10s). Pushing `main` deploys to GitHub Pages. Record a one-off approval as a
commit trailer, `Approved-by: Sammy <link to her message>`, not in this file.

# Standing approvals

- Sammy approved pushing the FAQ/support pages live while keeping the rest of the website changes back ([10 November approval](https://ampcode.com/threads/T-01a1bdd5-f840-7150-a262-fcbe949823dc#M-034uyrRl3i3IAFg6n87Ugx)). Publish the R6 help articles and index from a separate branch based on `main`, with only their renderer, text helper and sitemap entries. This approval covers pushing those selective changes to this repository and `main` for its normal Pages deployment, not merging the full `help-1.1` branch, the homepage redesign or other marketing changes. No app release build, archive, upload or submission is authorized.
- Sammy explicitly approved publishing only the corrected privacy policy to `rosterease.app/privacy`, leaving everything else held back, by answering “Yes” to that exact question in [the R6 thread](https://ampcode.com/threads/T-01a1c394-2073-77e0-a822-66a0ad27f179). Commit and push only that policy correction and this approval record to website `main` for its normal Pages deployment, then recheck the public policy and all eighteen app links. This does not authorize merging the full `help-1.1` branch or publishing its other changes.
- Sammy approved the Settings-navigation, Calendar-guidance and capture-default corrections in the three help guides: “Approve the expanded help update: commit and push to website origin/main and origin/help-1.1” ([approval](https://ampcode.com/threads/T-4cab7f56-26c2-4b35-b618-acd194922dad)). Commit and push these help-only corrections and this approval record to both branches in `thesammykins/rosterease_website`; allow `main`’s normal Pages deployment and recheck every app help URL publicly. Keep `help-1.1` unmerged and its homepage redesign and marketing unpublished. No app release action is authorized.
- Sammy approved the UX-R2 Smart Import and visit-route help corrections: “Approve the help-only update: commit and push to website origin/main and origin/help-1.1; keep help-1.1 unmerged” ([approval](https://ampcode.com/threads/T-01a1c720-6821-76a7-8180-40928cfef11f)). Commit and push only these corrections and this approval record to both branches, allow main’s normal Pages deployment, then recheck the public app help links. Keep the homepage redesign and marketing held on unmerged `help-1.1`. No app release action is authorized.
