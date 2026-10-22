import LegalScreen, { Section } from "../../components/legal/LegalLayout";

export default function TermsScreen() {
  return (
    <LegalScreen
      title="Terms of Service"
      heading="Simple rules for using SnapNote."
      intro="These Terms of Service explain the rules that apply when you use SnapNote."
      footerNote="Please replace the contact and jurisdiction placeholders before publishing the app."
    >
      <Section number="01" title="Acceptance of Terms">
        By creating an account or using SnapNote, you agree to these Terms of
        Service and our Privacy Policy. If you do not agree with these terms,
        please do not use the service.
      </Section>

      <Section number="02" title="Your Account">
        You are responsible for maintaining the security of your account and for
        activity that occurs through your account. You must provide information
        that is accurate and keep your account information reasonably up to
        date.
      </Section>

      <Section number="03" title="Authentication">
        SnapNote may allow you to authenticate using third-party providers such
        as Google or X. Your use of those providers is also governed by their
        own terms and policies.
      </Section>

      <Section number="04" title="Your Content">
        You retain ownership of the photos, notes, and other content you create
        or upload to SnapNote.
        {"\n\n"}
        By using SnapNote, you grant us the limited permission needed to store,
        process, synchronize, display, and otherwise provide the service for
        your content.
        {"\n\n"}
        We do not claim ownership of your personal content.
      </Section>

      <Section number="05" title="Acceptable Use">
        You agree not to use SnapNote to upload, store, transmit, or distribute
        content that is unlawful, fraudulent, abusive, threatening, malicious,
        or that infringes another person's rights.
        {"\n\n"}
        You must not attempt to interfere with the operation or security of
        SnapNote, gain unauthorized access to accounts or systems, or use the
        service to distribute malware or other harmful material.
      </Section>

      <Section number="06" title="Prohibited Content">
        You are responsible for ensuring that content you upload does not
        violate applicable law or the rights of others, including copyright,
        privacy, publicity, and intellectual property rights.
      </Section>

      <Section number="07" title="Service Availability">
        We aim to keep SnapNote available and reliable, but we do not guarantee
        that the service will always be uninterrupted, error-free, or available
        on every device or network.
        {"\n\n"}
        We may temporarily suspend or modify parts of the service for
        maintenance, security, updates, or other operational reasons.
      </Section>

      <Section number="08" title="Third-Party Services">
        SnapNote may depend on third-party services for authentication, hosting,
        storage, databases, and other infrastructure. We are not responsible for
        the availability or policies of services controlled by third parties.
      </Section>

      <Section number="09" title="Intellectual Property">
        The SnapNote application, branding, design, software, and associated
        materials, excluding content provided by users or third parties, are
        owned by or licensed to SnapNote and are protected by applicable
        intellectual property laws.
      </Section>

      <Section number="10" title="Account Suspension or Termination">
        You may stop using SnapNote at any time.
        {"\n\n"}
        We may suspend or terminate access where reasonably necessary to protect
        the service, other users, comply with law, address abuse, or respond to
        serious violations of these terms.
      </Section>

      <Section number="11" title="Disclaimer">
        SnapNote is provided on an "as available" and "as is" basis to the
        extent permitted by applicable law. We make no guarantees that the
        service will meet every requirement or always operate without
        interruption or errors.
      </Section>

      <Section number="12" title="Limitation of Liability">
        To the maximum extent permitted by applicable law, SnapNote and its
        operators will not be liable for indirect, incidental, special,
        consequential, or similar damages arising from your use of or inability
        to use the service.
      </Section>

      <Section number="13" title="Changes to These Terms">
        We may update these Terms of Service as SnapNote evolves or as legal
        requirements change. When material changes are made, we may provide
        reasonable notice through the app or another appropriate method.
      </Section>

      <Section number="14" title="Governing Law">
        These Terms are subject to the laws and jurisdiction that apply to the
        SnapNote operator, except where applicable law requires otherwise.
        {"\n\n"}
        Before publishing the app, replace this section with the specific
        jurisdiction that legally applies to you.
      </Section>

      <Section number="15" title="Contact">
        For questions regarding these Terms of Service, contact us using your
        designated SnapNote support email address.
      </Section>
    </LegalScreen>
  );
}
