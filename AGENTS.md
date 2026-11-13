# RosterEase website

Static Astro site. Node comes from `mise.toml`. Before pushing, run:

```sh
mise exec -- npm ci && mise exec -- npm run check:a11y && mise exec -- npm run check:motion
```

Pushing `main` deploys to GitHub Pages. Record one-off approvals in the commit
trailer, `Approved-by: Sammy <link to her message>`.

# Standing approvals

- **Coordinated 1.1 launch, 13 November 2026:** Sammy approved “triggering the push of all the changes that we've made to the website so that everything can go live all at the same time” and “go live now” after App Review approval ([direct approval](https://ampcode.com/threads/T-01a1bdd5-f840-7150-a262-fcbe949823dc#M-034wadF18rYGCHMeleEvTk)). Push the held `help-1.1` website work, merge it into `main`, allow its normal Pages deployment to `rosterease.app`, and verify the public homepage and help pages. Coordinate readiness with the App Store release thread. This supersedes the earlier website branch/deployment holds below for this launch only; it does not authorize pushing held app-repository commits or posting social material. The listing thread owns App Store header/search artwork; its approved uploaded close-ups supersede the legacy local header layouts.

## Earlier approvals and holds

These remain the history of the selective publications. Their website launch holds are superseded by the coordinated 1.1 approval above.

- Sammy approved pushing the FAQ/support pages live while keeping the rest of the website changes back ([10 November approval](https://ampcode.com/threads/T-01a1bdd5-f840-7150-a262-fcbe949823dc#M-034uyrRl3i3IAFg6n87Ugx)). Publish the R6 help articles and index from a separate branch based on `main`, with only their renderer, text helper and sitemap entries. This approval covers pushing those selective changes to this repository and `main` for its normal Pages deployment, not merging the full `help-1.1` branch, the homepage redesign or other marketing changes. No app release build, archive, upload or submission is authorized.
- Sammy explicitly approved publishing only the corrected privacy policy to `rosterease.app/privacy`, leaving everything else held back, by answering “Yes” to that exact question in [the R6 thread](https://ampcode.com/threads/T-01a1c394-2073-77e0-a822-66a0ad27f179). Commit and push only that policy correction and this approval record to website `main` for its normal Pages deployment, then recheck the public policy and all eighteen app links. This does not authorize merging the full `help-1.1` branch or publishing its other changes.
- Sammy approved committing and pushing the R6 help and privacy fixes to `origin/help-1.1` in `thesammykins/rosterease_website`, then explicitly said “Don’t merge” and “Just keep on branch since 1.1 is not approved on app store yet” ([approval and follow-ups](https://ampcode.com/threads/T-01a1c394-2073-77e0-a822-66a0ad27f179)). Keep this work on `help-1.1`; do not merge or deploy it without new approval. Pushing this branch does not authorize an app build, upload or submission.
- Sammy approved the Settings-navigation, Calendar-guidance and capture-default corrections in the three help guides: “Approve the expanded help update: commit and push to website origin/main and origin/help-1.1” ([approval](https://ampcode.com/threads/T-4cab7f56-26c2-4b35-b618-acd194922dad)). Commit and push these help-only corrections and this approval record to both branches in `thesammykins/rosterease_website`; allow `main`’s normal Pages deployment and recheck every app help URL publicly. Keep `help-1.1` unmerged and its homepage redesign and marketing unpublished. No app release action is authorized.
- Sammy approved the UX-R2 Smart Import and visit-route help corrections: “Approve the help-only update: commit and push to website origin/main and origin/help-1.1; keep help-1.1 unmerged” ([approval](https://ampcode.com/threads/T-01a1c720-6821-76a7-8180-40928cfef11f)). Commit and push only these corrections and this approval record to both branches, allow main’s normal Pages deployment, then recheck the public app help links. Keep the homepage redesign and marketing held on unmerged `help-1.1`. No app release action is authorized.
- Sammy approved committing and pushing the 21 narrated help guides and their website integration only to `origin/help-1.1` in `thesammykins/rosterease_website`, replying “Yep” to that branch-only commit/push request ([approval](https://ampcode.com/threads/T-f3a6794e-8f4f-4e2d-84b7-fab4fe16c3b9)). Keep the branch unmerged; no deployment, live-site change or app release is authorized.
