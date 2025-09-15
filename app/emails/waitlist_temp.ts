export function waitlistEmailHTML({
  email,
  updatesUrl,
}: {
  email: string;
  updatesUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>SynkList Waitlist</title>
<style>
  body { margin:0; padding:0; background:#f9fafb; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#111; }
  .outer { max-width:640px; margin:0 auto; padding:32px 20px; }
  .card { background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:40px 32px; }

  /* Header */
  .brand { font-size:42px; font-weight:800; color:#111; margin:0; text-align:center; }
  .tagline { text-align:center; font-size:14px; font-family:monospace; color:#25d366; margin-top:6px; }
  .status { text-align:center; margin-top:16px; }
  .status-pill { display:inline-flex; align-items:center; gap:8px; padding:6px 14px; font-size:12px; font-family:monospace; background:#f3f4f6; border-radius:999px; color:#111; }
  .status-dot { width:8px; height:8px; background:#10b981; border-radius:50%; }

  /* Headline + intro */
  .headline { font-size:28px; font-weight:700; margin:40px 0 16px; color:#111; text-align:center; }
  .para { font-size:16px; line-height:1.6; color:#4b5563; text-align:center; margin:0 0 24px; }
  .para strong { color:#000; }

  /* Feature preview */
  .features { background:#f9fafb; border:1px solid #e5e7eb; border-radius:12px; padding:24px; margin:32px 0; }
  .features h3 { font-size:18px; font-weight:600; text-align:center; margin:0 0 16px; color:#111; }
  .features ul { list-style:disc; padding-left:20px; margin:0; color:#374151; font-size:15px; line-height:1.6; }

  /* CTA */
  .cta { text-align:center; margin:32px 0; }
  .btn { display:inline-block; background:#111; color:#fff !important; text-decoration:none; padding:14px 28px; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #000; }

  /* Metrics */
  .divider { height:1px; background:#e5e7eb; margin:32px 0; }
  .metrics { display:flex; gap:16px; justify-content:space-between; text-align:center; }
  .metric { flex:1; }
  .metric-number { font-family:monospace; font-size:20px; font-weight:700; color:#000; margin:0; }
  .metric-label { font-size:14px; color:#374151; font-weight:600; margin:6px 0 2px; }
  .metric-desc { font-size:12px; color:#6b7280; margin:0; }

  /* Footer */
  .footer { font-size:12px; color:#9ca3af; text-align:center; margin-top:16px; }

  @media (max-width:480px) {
    .metrics { flex-direction:column; gap:20px; }
  }
</style>
</head>
<body>
  <div class="outer">
    <div class="card">

      <!-- Header -->
      <h1 class="brand">SynkList</h1>
      <div class="tagline">&gt; AI Command Center in WhatsApp </div>
      <div class="status">
        <span class="status-pill"><span class="status-dot"></span>SYSTEM ONLINE</span>
      </div>

      <!-- Intro -->
      <h2 class="headline">Welcome to the Future</h2>
      <p class="para">Hi <strong>${email}</strong>, you’re officially on our exclusive waitlist.<br/>We’ll notify you the moment SynkList is ready to transform WhatsApp into your AI command center.</p>

      <!-- Features -->
      <div class="features">
        <h3>What's Coming</h3>
        <ul>
                      <li>AI Assistant</li>
            <li>Smart Reminders</li>
            <li>Gmail Integration</li>
            <li>List Maintainer</li>
            <li>Calendar Sync</li>
            <li>Task Management</li>
            <li>Drive Access</li>
            <li>Notion Control</li>
        </ul>
      </div>

      <!-- CTA -->
      <div class="cta">
        <a href="${updatesUrl}" class="btn" target="_blank">Follow Live Updates</a>
      </div>

      <!-- Metrics -->
      <div class="divider"></div>
      <div class="metrics">
        <div class="metric">
          <p class="metric-number">100%</p>
          <p class="metric-label">Private</p>
          <p class="metric-desc">End-to-end encrypted</p>
        </div>
        <div class="metric">
          <p class="metric-number">&lt;1s</p>
          <p class="metric-label">Response</p>
          <p class="metric-desc">Lightning fast AI</p>
        </div>
        <div class="metric">
          <p class="metric-number">24/7</p>
          <p class="metric-label">Available</p>
          <p class="metric-desc">Always-on assistant</p>
        </div>
      </div>
      <div class="divider"></div>

      <!-- Footer -->
      <div class="footer">
        You’re receiving this email because you joined the SynkList waitlist.<br/>
        If this wasn’t you, you can safely ignore it.
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function waitlistEmailText({ updatesUrl }: { updatesUrl: string }) {
  return [
    "SynkList - AI Command Center in WhatsApp",
    "SYSTEM ONLINE",
    "",
    "Welcome to the Future",
    "",
    "You’re officially on our exclusive waitlist.",
    "We’ll notify you as soon as SynkList is ready.",
    "",
    "What's Coming:",
    "- Gmail Integration",
    "- Calendar Sync",
    "- Drive Access",
    "- Notion Control",
    "- Task Management",
    "- Smart Reminders",
    "",
    `Follow Live Updates: ${updatesUrl}`,
    "",
    "Metrics:",
    "100% Private (End-to-end encrypted)",
    "<1s Response (Lightning fast AI)",
    "24/7 Available (Always-on assistant)",
    "",
    "If this wasn’t you, ignore this email.",
  ].join("\n");
}
