import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Bitloom",
  description:
    "Privacy Policy for Bitloom - Software Craftsmanship Company. Learn how we collect, use, and protect your personal information.",
  robots: "index, follow",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>

          <div className="text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              <strong>Effective Date:</strong> June 28, 2025
              <br />
              <strong>Last Updated:</strong> June 28, 2025
            </p>

            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to Bitloom s.r.o. (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;). We are a Software Craftsmanship company based
                in Košice, Slovakia, specializing in web development, mobile
                development, and technical consulting. We are committed to
                protecting your personal information and your right to privacy.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website{" "}
                <strong>bitloom.sk</strong> and <strong>blog.bitloom.sk</strong>
                , use our services, or contact us for business inquiries.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                2.1 Information You Provide Directly
              </h3>
              <p>When you contact us through our website forms, we collect:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Contact Information:</strong> Name, email address
                </li>
                <li>
                  <strong>Business Information:</strong> Company name, project
                  details
                </li>
                <li>
                  <strong>Communication Content:</strong> Messages, project
                  requirements, goals, and timeline information
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-6">
                2.2 Information Collected with Your Consent
              </h3>
              <p>
                <strong>Only when you accept cookies</strong> through our
                consent banner, we collect:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Analytics Data:</strong> Page views, session duration,
                  bounce rate, device information
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, browser
                  type, operating system, referring URLs
                </li>
                <li>
                  <strong>Usage Patterns:</strong> Pages visited, time spent on
                  pages, interaction with website elements
                </li>
                <li>
                  <strong>Performance Data:</strong> Page load times, scroll
                  depth, form interactions
                </li>
              </ul>
              <p className="mt-3 text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <strong>Important:</strong> If you decline cookies, we do not
                collect any of this analytics data. Only essential website
                functionality cookies are used.
              </p>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-6">
                2.3 Cookies and Tracking Technologies
              </h3>
              <p>We use different types of cookies based on your consent:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Essential Cookies:</strong> Always active - Required
                  for website functionality, security, and consent preferences
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Only with your consent -
                  Google Analytics for website performance analysis
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings
                  (theme, language preferences, cookie consent choice)
                </li>
              </ul>
              <p className="mt-3 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <strong>Your Choice:</strong> You can accept or decline cookies
                when you first visit our website. You can change your choice at
                any time through your browser settings.
              </p>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p>
                We use your information for the following business purposes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>
                  <strong>Business Communications:</strong> Responding to
                  inquiries, providing project quotes, discussing technical
                  requirements
                </li>
                <li>
                  <strong>Service Delivery:</strong> Managing projects,
                  providing technical consulting, and delivering development
                  services
                </li>
                <li>
                  <strong>Website Improvement:</strong> Analyzing website
                  performance, understanding user behavior, optimizing user
                  experience
                </li>
                <li>
                  <strong>Marketing:</strong> Sharing relevant content, case
                  studies, and service updates (with consent)
                </li>
                <li>
                  <strong>Legal Compliance:</strong> Meeting legal obligations,
                  resolving disputes, enforcing agreements
                </li>
                <li>
                  <strong>Security:</strong> Protecting against fraud,
                  unauthorized access, and security vulnerabilities
                </li>
              </ul>
            </section>

            {/* Google Analytics */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Google Analytics (Consent-Based)
              </h2>
              <p>
                <strong>Only when you accept cookies</strong>, we use Google
                Analytics 4 (GA4) to analyze website traffic and improve our
                services. Google Analytics collects anonymous usage data
                including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Pages visited and time spent on each page</li>
                <li>Geographic location (country/city level)</li>
                <li>Device and browser information</li>
                <li>Traffic sources and referral information</li>
                <li>User interactions and engagement metrics</li>
              </ul>
              <p className="mt-4">
                <strong>Your Control:</strong> You can decline analytics
                tracking through our cookie consent banner. If you decline, no
                analytics data is collected. You can also opt-out later by
                installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Google Analytics opt-out browser add-on
                </a>
                .
              </p>
              <p className="mt-3 text-sm bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <strong>No Consent = No Tracking:</strong> If you decline
                cookies, Google Analytics is completely disabled and no usage
                data is collected about your visit.
              </p>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Information Sharing and Disclosure
              </h2>
              <p>
                We do not sell, trade, or rent your personal information. We may
                share information in the following limited circumstances:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Trusted third-party
                  services (email providers, analytics, hosting) under strict
                  confidentiality agreements
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law,
                  court order, or to protect our legal rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with
                  merger, acquisition, or sale of business assets (with prior
                  notice)
                </li>
                <li>
                  <strong>Consent:</strong> When you explicitly consent to
                  sharing for specific purposes
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                information:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Encryption:</strong> SSL/TLS encryption for data
                  transmission
                </li>
                <li>
                  <strong>Access Controls:</strong> Limited access to personal
                  information on need-to-know basis
                </li>
                <li>
                  <strong>Secure Storage:</strong> Protected servers and
                  databases with regular security updates
                </li>
                <li>
                  <strong>Regular Monitoring:</strong> Continuous monitoring for
                  security vulnerabilities
                </li>
              </ul>
              <p className="mt-4">
                While we strive to protect your information, no method of
                electronic transmission or storage is 100% secure. We cannot
                guarantee absolute security but commit to promptly addressing
                any security incidents.
              </p>
            </section>

            {/* Your Rights (GDPR) */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Your Privacy Rights (GDPR)
              </h2>
              <p>
                Under the General Data Protection Regulation (GDPR), you have
                the following rights:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Right to Access:</strong> Request copies of your
                  personal information
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Request correction of
                  inaccurate information
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request deletion of your
                  personal information
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> Request
                  limitation of how we process your information
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Request transfer
                  of your information to another service
                </li>
                <li>
                  <strong>Right to Object:</strong> Object to processing based
                  on legitimate interests
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent
                  for marketing communications
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{" "}
                <strong>info@bitloom.sk</strong>. We will respond within 30 days
                of receiving your request.
              </p>
            </section>

            {/* Cookie Management */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Cookie Management and Consent
              </h2>
              <p>
                You have full control over cookie consent and can manage your
                preferences through:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Cookie Consent Banner:</strong> Accept or decline
                  cookies when you first visit our website
                </li>
                <li>
                  <strong>Browser Settings:</strong> Configure your browser to
                  block or delete cookies (this will override your consent
                  choice)
                </li>
                <li>
                  <strong>Third-party Tools:</strong> Use privacy tools and
                  browser extensions
                </li>
              </ul>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What happens when you choose:
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong className="text-green-600 dark:text-green-400">
                      ✓ Accept Cookies:{" "}
                    </strong>
                    Google Analytics is enabled to help us improve our website
                  </li>
                  <li>
                    <strong className="text-red-600 dark:text-red-400">
                      ✗ Decline Cookies:{" "}
                    </strong>
                    Only essential functionality cookies are used, no analytics
                    tracking
                  </li>
                </ul>
              </div>
              <p className="mt-4">
                <strong>Note:</strong> Disabling essential cookies may limit
                website functionality and user experience. Analytics cookies are
                optional.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Data Retention
              </h2>
              <p>We retain your information for the following periods:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Contact Inquiries:</strong> 3 years from last
                  communication
                </li>
                <li>
                  <strong>Project Communications:</strong> 5 years after project
                  completion
                </li>
                <li>
                  <strong>Analytics Data:</strong> 26 months (Google Analytics
                  default) - only if consent was given
                </li>
                <li>
                  <strong>Cookie Consent Preferences:</strong> 12 months from
                  last visit
                </li>
                <li>
                  <strong>Essential Cookies:</strong> Session-based or until
                  browser closure
                </li>
              </ul>
              <p className="mt-4">
                We will delete or anonymize your information when it&apos;s no
                longer needed for legitimate business purposes.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. International Data Transfers
              </h2>
              <p>
                Your information may be transferred to and processed in
                countries outside the European Economic Area (EEA), including
                the United States (Google Analytics). We ensure appropriate
                safeguards are in place:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Google Analytics: Covered by Google&apos;s EU-US Data Privacy
                  Framework certification
                </li>
                <li>
                  Contractual protections: Standard contractual clauses for data
                  transfers
                </li>
                <li>
                  Adequacy decisions: Transfers to countries with adequate data
                  protection levels
                </li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Children&apos;s Privacy
              </h2>
              <p>
                Our website and services are not directed to children under 16
                years of age. We do not knowingly collect personal information
                from children under 16. If we become aware that we have
                collected information from a child under 16, we will take steps
                to delete such information promptly.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically to reflect
                changes in our practices, technology, or legal requirements. We
                will notify you of significant changes by:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Posting the updated policy on our website</li>
                <li>Updating the &quot;Last Updated&quot; date</li>
                <li>
                  Sending email notifications for material changes (if
                  applicable)
                </li>
              </ul>
              <p className="mt-4">
                Your continued use of our website after changes constitutes
                acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                13. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Legal Information
                  </h4>
                  <p>
                    <strong>Bitloom s.r.o.</strong>
                  </p>
                  <p>Business ID: 56397631</p>
                  <p>Tax ID: 2122301907</p>
                  <p>VAT ID: SK2122301907</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Contact Details
                  </h4>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:info@bitloom.sk"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      info@bitloom.sk
                    </a>
                  </p>
                  <p>Location: Košice, Slovakia</p>
                  <p>
                    Website:{" "}
                    <a
                      href="https://bitloom.sk"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      bitloom.sk
                    </a>
                  </p>
                </div>
              </div>
              <p className="mt-4">
                For GDPR-related requests or data protection concerns, please
                use the subject line &quot;Privacy Request&quot; in your email
                to ensure prompt handling.
              </p>
            </section>

            {/* Compliance Statement */}
            <section className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This Privacy Policy is designed to comply with the EU General
                Data Protection Regulation (GDPR), Slovak data protection laws,
                and international privacy best practices. We are committed to
                transparent communication, remote-first cooperation, and
                open-mindedness in all our data practices.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                <strong>Company Registration:</strong> Bitloom s.r.o. is a
                limited liability company registered in Slovakia with Business
                ID 56397631, Tax ID 2122301907, and VAT ID SK2122301907.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
