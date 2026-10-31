import LegalScreen, { Section } from "../../src/components/legal/LegalLayout";

export default function PrivacyPolicyScreen() {
  return (
    <LegalScreen
      title="Privacy Policy"
      heading="Your privacy matters."
      intro="SnapNote is designed to help you capture and organize your memories. This Privacy Policy explains what information we collect, how we use it, and the choices you have."
      footerNote="Please replace the contact information above with your actual support/privacy email before publishing the app."
    >
      <Section number="01" title="Information We Collect">
        We may collect information you provide when creating or using your
        SnapNote account, including your name, email address, profile
        information, and authentication information provided through services
        such as Google or X.
        {"\n\n"}
        We also collect content you choose to create or upload, including notes,
        photographs, captions, and other information you save inside SnapNote.
      </Section>

      <Section number="02" title="How We Use Your Information">
        We use your information to provide, maintain, secure, and improve
        SnapNote. This includes authenticating your account, synchronizing your
        content, displaying your notes and photos, providing support, and
        communicating with you about important service-related matters.
      </Section>

      <Section number="03" title="Photos and User Content">
        Photos, notes, and other content you create belong to you. SnapNote
        processes this content only as necessary to provide the features you
        use, such as storing, synchronizing, and displaying your content across
        supported devices.
      </Section>

      <Section number="04" title="Authentication Providers">
        If you sign in using Google or X, we may receive information that the
        provider makes available to us, such as your name, email address,
        profile identifier, and profile image where permitted.
        {"\n\n"}
        Your use of Google or X is also subject to their respective privacy
        policies and terms.
      </Section>

      <Section number="05" title="Data Storage and Security">
        We use reasonable technical and organizational measures to protect your
        information against unauthorized access, alteration, disclosure, or
        destruction.
        {"\n\n"}
        No internet service can guarantee absolute security, so we cannot
        promise that your information will always be completely secure.
      </Section>

      <Section number="06" title="Data Sharing">
        We do not sell your personal information.
        {"\n\n"}
        We may share information with service providers that help us operate
        SnapNote, such as authentication, hosting, storage, database, and
        infrastructure providers. These providers may access information only as
        necessary to provide their services.
        {"\n\n"}
        We may also disclose information when required by law or when reasonably
        necessary to protect the rights, safety, and security of SnapNote, our
        users, or others.
      </Section>

      <Section number="07" title="Data Retention and Deletion">
        We retain your information for as long as reasonably necessary to
        provide SnapNote and fulfill the purposes described in this policy.
        {"\n\n"}
        You may request deletion of your account and associated personal
        information, subject to information we may be required to retain for
        legal, security, or legitimate business purposes.
      </Section>

      <Section number="08" title="Your Choices">
        You can choose whether to provide certain information, although some
        information may be required for account creation or specific SnapNote
        features.
        {"\n\n"}
        You may also request access to, correction of, or deletion of your
        personal information where applicable.
      </Section>

      <Section number="09" title="Children's Privacy">
        SnapNote is not intended for children who are not legally permitted to
        use the service. We do not knowingly collect personal information from
        children in violation of applicable law.
      </Section>

      <Section number="10" title="Changes to This Policy">
        We may update this Privacy Policy from time to time. When material
        changes are made, we may provide appropriate notice within the app or
        through other reasonable means.
      </Section>

      <Section number="11" title="Contact Us">
        If you have questions about this Privacy Policy or your personal
        information, contact us at your designated SnapNote support or privacy
        email address.
      </Section>
    </LegalScreen>
  );
}
