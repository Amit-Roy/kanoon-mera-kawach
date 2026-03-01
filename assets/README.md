# Assets

## Gavel Background Image

The app uses `gavel-bg.png` as a subtle background image on the HomeScreen.

**To add the background image:**

1. Find a judge's gavel PNG image (suggested: transparent background, ~500x500px)
2. Place it in this directory: `assets/gavel-bg.png`
3. Optional: Use an online tool to convert an SVG gavel to PNG (search "judge gavel SVG")

**Suggested sources:**
- Freepik (search "judge gavel silhouette")
- IconFinder (search "gavel icon")
- Undraw.co (if they have law-themed illustrations)

**If you can't find an image:**
- For now, the app will use a gradient fallback
- The background opacity is set to 8% in dark mode and 12% in light mode for readability

The current implementation uses `ImageBackground` with low opacity so the content remains readable while giving visual depth to the app.
