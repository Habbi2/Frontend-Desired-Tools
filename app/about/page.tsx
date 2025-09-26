export const metadata = { title: 'About – Frontend Desired Tools' };

export default function AboutPage() {
  return (
    <div className="prose dark:prose-invert max-w-3xl">
      <h1>About</h1>
      <p>
        <strong>Frontend Desired Tools</strong> is a growing collection of small, purposeful web utilities—focused on
        security hardening, performance insight, and day‑to‑day frontend workflow improvements.
      </p>
      <p>
        Each tool is designed to be:
      </p>
      <ul>
        <li>Low friction – open and use immediately</li>
        <li>Transparent – minimal vendor lock‑in or hidden logic</li>
        <li>Composable – output you can drop into existing projects</li>
      </ul>
      <p>
        Created & maintained by <a href="https://www.habbiwebdesign.site/" target="_blank" rel="noreferrer">Habbi Web Design</a>.
      </p>
      <p>
        Have an idea for the next tool? Open an issue in any repo or reach out via the site.
      </p>
    </div>
  );
}
