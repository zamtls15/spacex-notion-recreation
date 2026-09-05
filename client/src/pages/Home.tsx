/* Design philosophy: faithful Notion-style editorial document shell; content-first blocks, quiet aerospace accents, and responsive continuity. */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Command,
  ExternalLink,
  Menu,
  Moon,
  MoreHorizontal,
  Orbit,
  PanelRight,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";

const assetPath = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const coverImage = assetPath("spacex-cover.jpg");
const credentialImage = assetPath("access-credential.jpg");
const orbitalImage = assetPath("orbital-network.jpg");
const logoImage = assetPath("spacex-mark.png");

const sections = [
  { id: "overview", label: "Overview", number: "00" },
  { id: "access-tiers", label: "Access tiers", number: "01" },
  { id: "why-program", label: "Why this program", number: "02" },
  { id: "credentials", label: "Badge cards", number: "03" },
  { id: "next-step", label: "Private briefing", number: "04" },
];

const accessTiers = [
  {
    id: "explorer",
    number: "01",
    eyebrow: "EXPLORER ACCESS",
    title: "A credible first orbit.",
    price: "$10,000",
    fit: "Professionals and first-time participants who want an entry point into the ecosystem without overcommitting financially.",
    image: orbitalImage,
    imageAlt: "Orbital network diagram with four access points",
    includes: [
      "One live, interactive virtual session with moderated discussion.",
      "Direct Q&A opportunity with curated speakers or thought leaders.",
      "Instant issue of a digital credential confirming verified participation.",
    ],
    accent: "orange",
  },
  {
    id: "innovator",
    number: "02",
    eyebrow: "INNOVATOR ACCESS",
    title: "Move beyond the screen.",
    price: "$18,000+",
    fit: "Business leaders, founders, and forward-thinking professionals ready to form meaningful in-person connections.",
    image: credentialImage,
    imageAlt: "Graphite access credential on a warm ivory desk",
    includes: [
      "A small-group private Q&A session for intimate knowledge exchange.",
      "Professional photo opportunity to mark the experience.",
      "One signed, authenticated collectible artifact.",
      "A combined digital + physical credential for lasting recognition.",
    ],
    accent: "blue",
  },
  {
    id: "visionary",
    number: "03",
    eyebrow: "VISIONARY ACCESS",
    title: "Conversations with consequence.",
    price: "$35,000+",
    fit: "Executives, serious investors, and thought leaders who want depth, intimacy, and curated engagement beyond transactional meetings.",
    image: coverImage,
    imageAlt: "Blue planet horizon viewed from orbit",
    includes: [
      "A private dinner with curated discussion themes.",
      "Intimate networking with a hand-selected group of vetted peers.",
      "Structured deep-dive conversations focused on strategy and innovation.",
      "A premium Visionary-level credential with collectible significance.",
    ],
    accent: "violet",
  },
  {
    id: "titan",
    number: "04",
    eyebrow: "TITAN ACCESS",
    title: "Build the room around you.",
    price: "$2.5M+",
    fit: "A custom, concierge-level engagement for clients who need the highest level of discretion, creative control, and execution.",
    image: credentialImage,
    imageAlt: "Premium graphite credential and paper sleeve",
    includes: [
      "A customized keynote or private appearance tailored to client goals.",
      "Custom event design from content to logistics, security, and delivery.",
      "A legacy-level collectible credential for a historic tier.",
      "Concierge support including planning, logistics, and high-security execution.",
    ],
    accent: "graphite",
  },
];

const reasons = [
  {
    icon: Sparkles,
    label: "Curated intimacy",
    text: "Focused, high-value engagements where the room is deliberately small.",
  },
  {
    icon: ShieldCheck,
    label: "Credentialed exclusivity",
    text: "Verified digital and physical access tokens that mark the relationship.",
  },
  {
    icon: Clock3,
    label: "Operational integrity",
    text: "Confidentiality, discretion, and seamless execution from first contact to close.",
  },
  {
    icon: Users,
    label: "Networking leverage",
    text: "Meaningful peer connections at every membership tier, without forced proximity.",
  },
];

function Logo({ className = "" }: { className?: string }) {
  return <img src={logoImage} alt="SPACEX access mark" className={className} />;
}

function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <Moon size={16} strokeWidth={1.8} /> : <Sun size={16} strokeWidth={1.8} />}
    </button>
  );
}

function AccessTierCard({ tier }: { tier: (typeof accessTiers)[number] }) {
  return (
    <article className={`tier-card accent-${tier.accent}`} id={tier.id}>
      <div className="tier-topline">
        <span className="tier-number">{tier.number}</span>
        <span className="tier-eyebrow">{tier.eyebrow}</span>
        <span className="tier-price">{tier.price}</span>
      </div>
      <div className="tier-card-grid">
        <div className="tier-copy">
          <h3>{tier.title}</h3>
          <div className="fit-label">WHO IT&apos;S FOR</div>
          <p className="tier-fit">{tier.fit}</p>
          <div className="includes-heading">
            <span>WHAT&apos;S INCLUDED</span>
            <ArrowDownRight size={15} strokeWidth={1.8} />
          </div>
          <ul className="include-list">
            {tier.includes.map((item) => (
              <li key={item}>
                <span className="check-mark"><Check size={13} strokeWidth={2.5} /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="tier-image-wrap">
          <img src={tier.image} alt={tier.imageAlt} className="tier-image" />
          <div className="image-label">FIG. {tier.number} / ACCESS ARTIFACT</div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("spacex-theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(stored ?? (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("spacex-theme", theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.1, 0.35, 0.7] },
    );
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const currentLabel = useMemo(() => sections.find((section) => section.id === activeSection)?.label ?? "Overview", [activeSection]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="workspace-pill" type="button" onClick={() => scrollTo("overview")} aria-label="Go to page overview">
            <Logo className="workspace-logo" />
            <span>SPACEX HQ</span>
          </button>
          <ChevronRight className="crumb-chevron" size={14} />
          <span className="crumb-current">Access program</span>
        </div>
        <div className="topbar-right">
          <span className="saved-status"><span className="saved-dot" />Saved</span>
          <button type="button" className="topbar-action hide-mobile" onClick={() => setShowSearch(true)} aria-label="Search page" title="Search page">
            <Search size={16} strokeWidth={1.8} />
          </button>
          <button type="button" className="topbar-action hide-mobile" aria-label="Share page" title="Share page">
            <Share2 size={16} strokeWidth={1.8} />
          </button>
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "light" ? "dark" : "light")} />
          <button type="button" className="topbar-action mobile-only" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Open page navigation">
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="page-layout">
        <aside className={`left-rail ${mobileMenuOpen ? "is-open" : ""}`}>
          <div className="rail-brand">
            <Logo className="rail-logo" />
            <div>
              <span className="rail-brand-name">SPACEX</span>
              <span className="rail-brand-sub">Private access</span>
            </div>
            <button type="button" className="rail-close mobile-only" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation"><X size={17} /></button>
          </div>
          <div className="rail-rule" />
          <div className="rail-section-label">ON THIS PAGE</div>
          <nav className="section-nav" aria-label="Page sections">
            {sections.map((section) => (
              <button
                type="button"
                key={section.id}
                className={`section-link ${activeSection === section.id ? "is-active" : ""}`}
                onClick={() => scrollTo(section.id)}
              >
                <span className="section-link-number">{section.number}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
          <div className="rail-bottom">
            <div className="rail-meta"><span className="rail-meta-dot" />Private circulation</div>
            <div className="rail-meta">v1.0 · 2024</div>
            <button className="rail-help" type="button" onClick={() => setShowSearch(true)}><CircleHelp size={15} />Page help <Command size={12} /><span>K</span></button>
          </div>
        </aside>

        <main className="document" id="main">
          <section className="cover" id="overview" aria-label="SPACEX access program cover">
            <img src={coverImage} alt="Blue planet horizon viewed from orbit" className="cover-image" />
            <div className="cover-scrim" />
            <div className="cover-meta"><span>ACCESS BRIEF</span><span>04 / 04</span></div>
            <div className="cover-caption">A private access program for people building what comes next.</div>
          </section>

          <div className="document-body">
            <div className="page-heading">
              <div className="page-icon"><Logo /></div>
              <div className="page-kicker">PRIVATE ACCESS PROGRAM <span /> EDITION 01</div>
              <h1>SPACEX</h1>
              <p className="page-lede">This program exists for those who don&apos;t settle for surface-level engagement. It&apos;s for executives, investors, entrepreneurs, and innovators who understand that true access isn&apos;t casual — it&apos;s curated, credentialed, and structured for maximum value.</p>
              <div className="page-meta-row"><span><Orbit size={14} /> A layered ecosystem of access</span><span><ShieldCheck size={14} /> Digital + physical credentials</span></div>
            </div>

            <div className="mobile-toc">
              <div className="mobile-toc-label"><PanelRight size={14} /> Currently reading</div>
              <button type="button" onClick={() => setMobileMenuOpen((value) => !value)}>{currentLabel}<ChevronRight size={15} /></button>
            </div>

            <section className="intro-callout">
              <div className="callout-icon"><Orbit size={17} strokeWidth={1.7} /></div>
              <div>
                <strong>Access is structured. The opportunity is not.</strong>
                <p>Every plan is anchored by <b>Exclusive Access Credentials</b> — digital and physical tokens that open a layered ecosystem of experiences, opportunities, and networks.</p>
              </div>
            </section>

            <section className="content-section" id="access-tiers">
              <div className="section-intro">
                <div className="section-kicker"><span className="section-index">01</span> ACCESS TIERS</div>
                <h2>Choose the distance<br className="desktop-only" /> you want to travel.</h2>
                <p>Each tier is designed with a different degree of proximity, privacy, and participation. Start with the level of access that matches the work in front of you.</p>
              </div>
              <div className="tier-list">
                {accessTiers.map((tier) => <AccessTierCard key={tier.id} tier={tier} />)}
              </div>
            </section>

            <section className="content-section why-section" id="why-program">
              <div className="section-intro compact-intro">
                <div className="section-kicker"><span className="section-index">02</span> THE DIFFERENCE</div>
                <h2>Why choose<br className="desktop-only" /> this program?</h2>
                <p>High-trust access is not a volume product. It is the result of deliberate curation, operational precision, and a shared respect for the room.</p>
              </div>
              <div className="reason-list">
                {reasons.map(({ icon: Icon, label, text }, index) => (
                  <div className="reason-row" key={label}>
                    <div className="reason-index">0{index + 1}</div>
                    <div className="reason-icon"><Icon size={17} strokeWidth={1.7} /></div>
                    <div className="reason-copy"><h3>{label}</h3><p>{text}</p></div>
                    <ArrowUpRight className="reason-arrow" size={16} strokeWidth={1.7} />
                  </div>
                ))}
              </div>
            </section>

            <section className="content-section credentials-section" id="credentials">
              <div className="credential-art"><img src={credentialImage} alt="Graphite access credential on an ivory desk" /><span>PHYSICAL + DIGITAL / VERIFIED</span></div>
              <div className="credential-copy">
                <div className="section-kicker"><span className="section-index">03</span> ACCESS CREDENTIALS</div>
                <h2>Carry proof of<br className="desktop-only" /> the relationship.</h2>
                <p>Each badge serves as a verified credential for entry to specific events, locations, and experiences. It is both a practical access token and a tangible record of having been in the room.</p>
                <div className="credential-points">
                  <div><b>01</b><span>Verified entry</span><small>Credentialed access to specific experiences.</small></div>
                  <div><b>02</b><span>Collectible signal</span><small>A physical artifact with lasting significance.</small></div>
                  <div><b>03</b><span>Network leverage</span><small>A clear signal to other vetted participants.</small></div>
                </div>
              </div>
            </section>

            <section className="feedback-section">
              <div className="feedback-topline"><span className="section-kicker"><span className="section-index">04</span> FIELD NOTES</span><span className="feedback-status">VERIFIED FEEDBACK ONLY</span></div>
              <div className="feedback-panel">
                <div className="feedback-quote-mark">“</div>
                <div>
                  <h2>What our customers think.</h2>
                  <p>Customer feedback is intentionally not reproduced here without verified source material and permission. This space is reserved for authenticated field notes from the program.</p>
                  <span className="feedback-note"><ShieldCheck size={14} /> No unverified testimonials presented</span>
                </div>
              </div>
            </section>

            <section className="next-step" id="next-step">
              <div className="next-step-number">05</div>
              <div className="next-step-copy"><div className="section-kicker">PRIVATE BRIEFING</div><h2>Start with a<br className="desktop-only" /> better question.</h2><p>Tell us which room you are trying to reach and what you want to make possible there. We&apos;ll respond with the appropriate access path.</p></div>
              <button type="button" className="briefing-button" onClick={() => window.alert("Private briefing requests are coming soon.")}><span>Request a private briefing</span><ArrowUpRight size={17} /></button>
            </section>

            <footer className="document-footer"><div><Logo className="footer-logo" /></div><span>SPACEX HQ · PRIVATE CIRCULATION · EDITION 01</span><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top <ArrowUpRight size={14} /></button></footer>
          </div>
        </main>

        <aside className="right-outline" aria-label="Current page section">
          <div className="outline-line" />
          <span>{currentLabel}</span>
          <div className="outline-progress"><span style={{ height: `${Math.max(18, ((sections.findIndex((section) => section.id === activeSection) + 1) / sections.length) * 100)}%` }} /></div>
        </aside>
      </div>

      {showSearch && (
        <div className="search-modal" role="dialog" aria-modal="true" aria-label="Page search" onClick={() => setShowSearch(false)}>
          <div className="search-card" onClick={(event) => event.stopPropagation()}>
            <div className="search-header"><span><Search size={16} /> Search this page</span><button type="button" onClick={() => setShowSearch(false)} aria-label="Close search"><X size={17} /></button></div>
            <div className="search-input-wrap"><Search size={16} /><input autoFocus placeholder="Search access, credential, network..." /><kbd>ESC</kbd></div>
            <div className="search-hint">Search is a visual placeholder for this static recreation.</div>
          </div>
        </div>
      )}
    </div>
  );
}
