export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#05050f] via-[#0b0b1f] to-[#161636] text-white text-center py-6">
      <p style={{ fontFamily: 'var(--font-manrope)' }} className="text-sm tracking-wide">
        &copy; 2025 MeetingSummarizer. Built by Team <br/>
        <a
          href="https://www.linkedin.com/company/quality-ai-io/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-700 hover:text-blue-300"
        >
           Sentienta QualityAI
        </a>{' '}
      </p>
    </footer>
  );
}
