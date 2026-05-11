import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-16 max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-block text-xs text-gray-500 hover:text-gray-300 font-cinzel tracking-widest mb-8"
      >
        ← Back to Map
      </Link>

      <h1
        className="text-2xl font-cinzel tracking-wide mb-8"
        style={{ color: '#ff1744' }}
      >
        Privacy Policy
      </h1>

      <div className="space-y-6 text-sm text-gray-400 leading-relaxed">
        <p className="text-gray-500 text-xs">
          Last updated: May 11, 2026
        </p>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Who we are</h2>
          <p>
            Investment Treasure Map is a free educational project created by Maksym Mishchenko,
            based in Prague, Czech Republic. This is a personal, non-commercial project.
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">What data we collect</h2>
          <p>If you sign in with Google, we store:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Email address</strong> — to identify your account</li>
            <li><strong>Display name</strong> — shown in the UI</li>
            <li><strong>Profile picture</strong> — shown in the UI</li>
            <li><strong>Learning progress</strong> — which zones you completed, quiz scores, zone ratings</li>
          </ul>
          <p className="mt-2">
            If you use the app as a guest (without signing in), no personal data is collected.
            Progress is stored only in your browser&apos;s local storage.
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">How we use your data</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Save and sync your learning progress across devices</li>
            <li>Display your name and avatar in the app</li>
            <li>Determine admin access (by email)</li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> sell, share, or transfer your data to any third parties.
            We do <strong>not</strong> use your data for advertising or marketing.
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Cookies</h2>
          <p>
            We use essential cookies only — a session cookie to keep you signed in.
            No tracking cookies, no analytics cookies, no third-party cookies.
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Feedback data</h2>
          <p>
            When you submit feedback, topic requests, or issue reports through the app,
            the message content is sent via Telegram notification to the project maintainer.
            Your IP address is temporarily stored in memory for rate limiting (not persisted).
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Data storage</h2>
          <p>
            Your data is stored on Vercel (hosting) and Neon (PostgreSQL database),
            both located in the United States. Data is encrypted in transit (HTTPS/TLS).
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Your rights (GDPR)</h2>
          <p>As a user in the EU/EEA, you have the right to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Correct</strong> inaccurate data</li>
            <li><strong>Delete</strong> your account and all associated data</li>
            <li><strong>Export</strong> your data in a portable format</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, email:{' '}
            <a href="mailto:maksimus2998@gmail.com" className="text-[#00e5ff] hover:underline">
              maksimus2998@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Data retention</h2>
          <p>
            Your data is kept as long as your account exists. If you request deletion,
            all your data will be permanently removed within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Children</h2>
          <p>
            This app is not directed at children under 16. We do not knowingly
            collect data from children.
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Changes</h2>
          <p>
            We may update this policy. Changes will be posted on this page with
            an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-base text-gray-200 font-semibold mb-2">Contact</h2>
          <p>
            Maksym Mishchenko — Prague, Czech Republic
            <br />
            <a href="mailto:maksimus2998@gmail.com" className="text-[#00e5ff] hover:underline">
              maksimus2998@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
