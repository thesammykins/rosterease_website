# App Store badge

The site uses Apple's black English `Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg` artwork, saved without modification as `src/assets/rosterease/app-store-badge.svg`.

- Artwork supplier: Apple Inc.
- Marketing guidelines: https://developer.apple.com/app-store/marketing/guidelines/
- Retrieved copy: https://raw.githubusercontent.com/jellyfin/Swiftfin/main/Resources/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg
- SHA-256: `a26fc5b38380272c92e9019a2eb8b45542a66814b3e2b203772db8904b9fb99f`.
- Retrieval date: 9 October 2026 (Australia/Melbourne).
- The artwork remains subject to Apple's badge guidelines and applicable marketing agreement; the mirror's software licence does not replace Apple's terms.

`AppStoreBadge.astro` serves the SVG locally, preserves its proportions and grey border, and displays it at 48px tall with 12px clear space on each side. It does not receive the site's button animation or recolouring. There is one badge per page: the homepage hero, the product download section, or the shared footer. Header and remaining footer calls to action use text links. All App Store links resolve to the shared `APP_STORE_URL` constant.
