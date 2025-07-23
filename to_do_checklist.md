# To Do Checklist for dApp Frontend

**Date:** July 23, 2025

This checklist helps you set up and verify the required static files and icons for your dApp. Update this list as you customize or add assets.

---

## index.css
- [x] File exists in project root
- [x] Contains basic body, heading, and button styles
- [ ] All custom styles are documented (comments or style guide reference)
- [ ] No !important usage unless absolutely necessary
- [ ] All CSS variables (if used) are defined and scoped properly
- [ ] Uses your preferred color scheme and fonts
- [ ] Responsive design for mobile and desktop
- [ ] No unused or duplicate CSS rules
- [ ] Linked in your HTML or imported in your main JS/TS file

### Custom styles for all major components:
- [ ] App.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode
- [ ] SwapCard.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode
- [ ] ConnectWalletButton.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode
- [ ] ConnectWalletModal.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode
- [ ] InfoModal.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode
- [ ] QuoteList.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode
- [ ] TokenSelector.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode
- [ ] TransactionHistory.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode
- [ ] TransactionStatusModal.tsx
  - [ ] Unique class names/selectors
  - [ ] Mobile responsive
  - [ ] Matches brand/design guidelines
  - [ ] Tested in light/dark mode

## favicon.ico
- [x] File exists in project root
- [ ] Custom icon (replace placeholder with your brand logo)
- [ ] 48x48 or 32x32 pixel size recommended
- [ ] Looks good in browser tab and bookmarks
- [ ] No copyright issues (original or licensed artwork)
- [ ] Favicon displays correctly on all major browsers
- [ ] Favicon is included in manifest.json (if using PWA)

## Icons (SVG/PNG)
- [ ] All required icon files exist in public/icons or src/assets/icons
- [ ] No 404 errors for icon assets in browser or terminal
- [ ] Replace placeholder icons with your brand or token icons
- [ ] Optimize and compress icons for production
- [ ] Update icon paths in components (e.g., `Icons.tsx`, `SwapCard.tsx`)
- [ ] Test icon display in both development and production builds
- [ ] SVGs are sanitized (no malicious code)
- [ ] PNGs/JPEGs are losslessly compressed
- [ ] Icons are tested for retina/high-DPI screens

### For each icon (see list below):
  - [ ] Icon is visually correct (matches brand/token)
  - [ ] Icon is optimized (compressed, correct format)
  - [ ] Icon displays correctly at all required sizes
  - [ ] Icon has fallback (alt text or default image if missing)

### Icons Used (from components/Icons.tsx):
- [ ] logo.png
- [ ] usdt.png
- [ ] usdc.png
- [ ] ethereum.png
- [ ] arbitrum.png
- [ ] polygon.png
- [ ] optimism.png
- [ ] bsc.png
- [ ] avalanche.png
- [ ] solana.png
- [ ] tron.png
- [ ] sui.png
- [ ] near.png
- [ ] cro.png
- [ ] base.png
- [ ] gnosis.png
- [ ] fantom.png
- [ ] polygon-zkevm.png
- [ ] zksync.png
- [ ] linea.png
- [ ] stargate.png
- [ ] synapse.png
- [ ] wormhole.png
- [ ] relay.png
- [ ] cctp.png
- [ ] celer.png
- [ ] mayan.png
- [ ] across.png
- [ ] hop.png
- [ ] hyphen.png
- [ ] connext.png
- [ ] debridge.png
- [ ] socket.png
- [ ] metamask.png
- [ ] coinbase.png
- [ ] phantom.png
- [ ] solflare.png
- [ ] tronlink.png
- [ ] suiet.png
- [ ] okx.png
- [ ] crypto.png
- [ ] binance.png

---

## General Static Asset Setup
- [ ] All static files are in the correct directory (root or public/)
- [ ] No 404 errors for static assets in browser or terminal
- [ ] Assets are included in your build/deploy process
- [ ] Assets display correctly in GitHub Codespaces and local environments
- [ ] All icons and images used in each component are present and render correctly
- [ ] No broken image links or missing assets in browser console
- [ ] Components tested in both development and production builds
- [ ] Static assets are included in the build output
- [ ] No asset path issues after deployment
- [ ] Asset cache busting/versioning is enabled for production
- [ ] All assets have correct permissions (readable by server)
- [ ] Asset loading is tested on slow networks
- [ ] Build process logs missing assets or errors
- [ ] Static assets are referenced using relative paths (not absolute URLs)

## Accessibility
- [ ] All images/icons have descriptive alt text
- [ ] Color contrast meets accessibility standards
- [ ] All interactive icons/buttons are keyboard accessible
- [ ] All icons used as buttons have ARIA labels

---

**Tip:**
- Update this checklist whenever you add, remove, or change static assets.
- For production, optimize and compress images/icons for faster load times.
