import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Video,
  Share2,
  Target,
  Palette,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  Mail,
  Instagram,
  Facebook,
  CheckCircle2,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  Globe,
  ExternalLink,
  BarChart3,
  BriefcaseBusiness,
  CalendarCheck,
  Table2,
  FolderOpen,
  FileText,
} from "lucide-react";
import { site } from "./siteContent.js";

const icons = [Video, Share2, Target, Palette];

function Ad({ ad }) {
  return (
    <article className="ad">
      <div>
        <small>
          {ad.label} · {ad.sponsor}
        </small>
        <h3>{ad.title}</h3>
        <p>{ad.description}</p>
        <a className="link" href={ad.url} target="_blank" rel="noreferrer">
          {ad.button} <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="ad-icon">
        <Sparkles size={38} />
      </div>
    </article>
  );
}

const tools = [
  { name: "Meta Ads Manager", icon: BarChart3, color: "#1877F2" },
  { name: "Meta Business Suite", icon: BriefcaseBusiness, color: "#0866FF" },
  { name: "Meta Events Manager", icon: CalendarCheck, color: "#5B6CFF" },
  { name: "Google Sheets", icon: Table2, color: "#188038" },
  { name: "Google Drive", icon: FolderOpen, color: "#4285F4" },
  { name: "Canva", icon: Palette, color: "#00A8E8" },
  { name: "Google Docs", icon: FileText, color: "#4285F4" },
  { name: "Google Chrome", icon: Globe, color: "#EA4335" },
  { name: "Google Meet", icon: Video, color: "#00897B" },
  { name: "Facebook", icon: Facebook, color: "#3104fa" },
  { name: "Instagram", icon: Instagram, color: "#F56040" },
];

function Portfolio() {
  const [filter, setFilter] = useState("All"),
    [index, setIndex] = useState(0),
    [auto, setAuto] = useState(true),
    [lightbox, setLightbox] = useState(false);
  const cats = ["All", ...new Set(site.projects.map((p) => p.category))],
    items = site.projects.filter(
      (p) => filter === "All" || p.category === filter,
    ),
    item = items[index] || items[0];
  useEffect(() => setIndex(0), [filter]);
  useEffect(() => {
    if (!auto || items.length < 2 || item?.type === "video") return;
    const t = setInterval(() => setIndex((n) => (n + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [auto, items.length, item?.type]);
  if (!item) return null;
  const media = item.media && !item.media.includes("replace-with-");
  const move = (d) => setIndex((n) => (n + d + items.length) % items.length);

  return (
    <div className="portfolio">
      <div className="filters">
        {cats.map((c) => (
          <button
            className={filter === c ? "active" : ""}
            onClick={() => setFilter(c)}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="screen">
        {media && item.type === "video" ? (
          <video
            key={item.media}
            src={item.media}
            poster={item.poster || undefined}
            controls
            playsInline
          />
        ) : media ? (
          <img src={item.media} alt={item.title} />
        ) : (
          <div className="placeholder">
            <Sparkles size={40} />
            <small>{item.tag}</small>
            <strong>{item.title}</strong>
            <p>
              Add your {item.type === "video" ? "MP4 video" : "photo"} to{" "}
              <code>public/media</code>
            </p>
          </div>
        )}
        <span className="count">
          {index + 1} / {items.length}
        </span>
        {media && item.type === "image" && (
          <button
            className="expand-media"
            onClick={() => setLightbox(true)}
            aria-label="View image full screen"
          >
            <ExternalLink size={16} /> View image
          </button>
        )}
      </div>
      <div className="work-meta">
        <div>
          <small>
            {item.category} · {item.tag}
          </small>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <div className="controls">
          <button onClick={() => move(-1)} aria-label="Previous">
            <ChevronLeft />
          </button>
          <button onClick={() => move(1)} aria-label="Next">
            <ChevronRight />
          </button>
          <button
            onClick={() => setAuto((v) => !v)}
            aria-label="Toggle slideshow"
          >
            {auto ? <Pause /> : <Play />}
          </button>
        </div>
      </div>
      <div className="dots">
        {items.map((p, i) => (
          <button
            key={p.title}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
            aria-label={`Show ${p.title}`}
          />
        ))}
      </div>
      <div className="thumbs">
        {items.map((p, i) => (
          <button
            key={p.title}
            className={i === index ? "selected" : ""}
            onClick={() => {
              setIndex(i);
              setAuto(false);
            }}
            aria-label={`Select ${p.title}`}
          >
            <span>
              {p.type === "video" ? (
                <Video size={17} />
              ) : (
                <img
                  src={
                    p.media && !p.media.includes("replace-with-")
                      ? p.media
                      : undefined
                  }
                  alt=""
                />
              )}
            </span>
            <small>{p.title}</small>
          </button>
        ))}
      </div>
      {lightbox && media && item.type === "image" && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={() => setLightbox(false)}
        >
          <button aria-label="Close image" onClick={() => setLightbox(false)}>
            <X />
          </button>
          <img src={item.media} alt={item.title} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Safe Spotlight state initialization
  const rawSpotlight = site.spotlight || {};
  const initialMainItem = rawSpotlight.mainItem || {
    image: rawSpotlight.mainImage || "media/Spot Light/Spotlight-01.jpg",
    title: rawSpotlight.title || "Featured Case Study",
    description: rawSpotlight.description || "A deep dive into our campaign.",
  };
  const initialSubItems =
    rawSpotlight.subItems ||
    (rawSpotlight.subImages || []).map((img, idx) => ({
      image: img,
      title: `Detail ${idx + 1}`,
      description: "",
    }));

  const [mainItem, setMainItem] = useState(initialMainItem);
  const [subItems, setSubItems] = useState(initialSubItems);

  const handleSubItemClick = (clickedItem, index) => {
    const oldMain = mainItem;
    setMainItem(clickedItem);
    const newSubs = [...subItems];
    newSubs[index] = oldMain;
    setSubItems(newSubs);
  };

  const nav = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Services", "#services"],
    ["Our Work", "#work"],
    ["Advertising", "#advertising"],
    ["Contact", "#contact"],
  ];

  return (
    <div id="home" className="app">
      <header>
        <a className="brand" href="#home">
          <b></b>
         <h2> ❤️ {site.name} ❤️ </h2> 
          <b></b>
        </a>
        <nav className={open ? "open" : ""}>
          {nav.map(([n, h]) => (
            <a href={h} key={h} onClick={() => setOpen(false)}>
              {n}
            </a>
          ))}
        </nav>
        <a className="navbtn" href="#contact">
          Let's Talk ↗
        </a>
        <button className="menubtn" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <section className="hero">
          <div>
            <small className="eyebrow">DIGITAL MARKETING</small>
            <h1>{site.tagline}</h1>
            <h2>{site.subTagline}</h2>
            <p>{site.intro}</p>
            <div className="actions">
              <a className="btn dark" href="#services">
                Explore Our Services ↗
              </a>
              <a className="btn light" href="#work">
                View Our Work
              </a>
            </div>
            <div className="proof">
              <span>
                <CheckCircle2 /> Creative content
              </span>
              <span>
                <CheckCircle2 /> Strategic campaigns
              </span>
            </div>
          </div>
          <div className="hero-right">
            <div className="portrait-frame">
              <div className="portrait-inner">
                <img
                  src={`${import.meta.env.BASE_URL}Font-Picture.jpg`}
                  alt="Marketing Portfolio"
                />
              </div>
              <span className="center-name">
                <h4>Janell-Joy A. Fegidero</h4>
              </span>
            </div>
            <h3>
              <span className="star star-top">✦</span>
            </h3>
            <span className="star star-bottom">✦</span>
            <span className="orbit-dot" />
          </div>
        </section>
        <div className="strip">
          <h2>
            {" "}
            　 DIGITAL ADVERTISING　 • 　 META ADS MEDIA BUYER　 •　 LEAD
            GENERATION　 •　CAPMPAIGN OPTIMIZATION{" "}
          </h2>
        </div>
        <section className="section" id="certificates">
          <div className="heading">
            <div>
              <small className="eyebrow">PROFESSIONAL DEVELOPMENT</small>
              <h2>
                Course &<em>Certificate</em>
                <br />
              </h2>
            </div>
            <p>
              A collection of certifications, training programs, and
              achievements that represent my skills and growth.
            </p>
          </div>
          <div className="certificate-grid">
            {[
              {
                title: "Certified Meta Business Partner",
                issuer: "Marketing Master IO",
                date: "2025",
                image: "/certificate-01.jpg",
              },
            ].map((cert, index) => (
              <div className="certificate-card" key={index}>
                <div className="certificate-image">
                  <img
                    src={`${import.meta.env.BASE_URL}certificate-01.jpg`}
                    alt={cert.title}
                  />
                </div>
                <div className="certificate-info">
                  <span className="certificate-label">CERTIFICATE</span>
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer}</p>
                  <small>{cert.date}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spotlight Section */}
        <section className="section spotlight-section" id="spotlight">
          <div className="heading">
            <div>
              <small className="eyebrow">FEATURED WORK</small>
              <h2>
                {rawSpotlight.sectionTitle ||
                  rawSpotlight.title ||
                  "Featured Case Study"}
              </h2>
            </div>
            <p>
              {rawSpotlight.sectionDescription ||
                rawSpotlight.description ||
                ""}
            </p>
          </div>

          <div className="spotlight-wrapper">
            {/* Featured Main Display with Active Caption */}
            <div className="spotlight-main-container">
              <img
                src={`${import.meta.env.BASE_URL}${mainItem.image}`}
                alt={mainItem.title}
              />
              <div className="spotlight-caption">
                <h3>{mainItem.title}</h3>
                <p>{mainItem.description}</p>
              </div>
            </div>

            {/* Thumbnail Row Below */}
            <div className="spotlight-thumbs">
              {subItems.map((item, i) => (
                <button
                  key={i}
                  className="spotlight-thumb-btn"
                  onClick={() => handleSubItemClick(item, i)}
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${item.image}`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="thumb-label">
                    <small>{item.title}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="heading">
            <div>
              <small className="eyebrow">WHAT WE DO</small>
              <h2>
                Everything your brand needs
                <br />
                <em>to grow online.</em>
              </h2>
            </div>
            <p>
              Creative ideas meet smart digital strategy. Choose the support
              that fits your business goals.
            </p>
          </div>
          <div className="services">
            {site.services.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <article className="service" key={s.title}>
                  <span>
                    <Icon />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <small>{s.detail}</small>
                </article>
              );
            })}
          </div>
        </section>
        <section className="banner">
          <section className="tools-section">
            <div className="tools-header">
              <span className="section-label">
                MY WORKSPACE · DIGITAL TOOLS
              </span>
              <h2>Tools I use.</h2>
              <p>
                Platforms and applications I use for marketing, productivity,
                design, and collaboration.
              </p>
            </div>
            <div className="tools-grid">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div className="tool-card" key={tool.name}>
                    <div
                      className="tool-icon"
                      style={{ "--tool-color": tool.color }}
                    >
                      <Icon size={25} strokeWidth={1.8} />
                    </div>
                    <span>{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
        <section className="section about" id="about">
          <div className="hero-video">
            <video
              src={`${import.meta.env.BASE_URL}hero-video.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            ></video>
          </div>
          <div>
            <h2 className="eyebrow">
              ABOUT <em>ME</em>
            </h2>
            <div className="about-description">
              <p>
                Hi, I'm Janell — a Meta Ads Media Buyer with nearly two years of
                hands-on experience helping businesses grow through strategic
                Facebook and Instagram advertising.
              </p>
              <p>
                I specialize in planning, launching, managing, and optimizing
                paid advertising campaigns designed to generate quality leads,
                attract potential customers, and support business growth.
              </p>
              <p>
                I believe successful advertising goes beyond simply running ads.
                It requires understanding business goals, reaching the right
                audience, analyzing campaign performance, and making strategic
                adjustments to improve results.
              </p>
              <p>
                As I expand into the international market, I'm excited to
                collaborate with businesses, entrepreneurs, and marketing
                agencies that need reliable Meta Ads support.
              </p>
            </div>
            <a className="link" href="#contact">
              Let's talk about your goals ↗
            </a>
          </div>
        </section>
        <section className="work" id="work">
          <div className="section">
            <div className="heading">
              <div>
                <small className="eyebrow">SELECTED PROJECTS</small>
                <h2>
                  Work that makes
                  <br />
                  <em>an impression.</em>
                </h2>
              </div>
              <p>
                Explore video production, social media campaigns, and
                advertising creative.
              </p>
            </div>
            <Portfolio />
          </div>
        </section>
        <section className="section" id="gallery">
          <div className="heading">
            <div>
              <small className="eyebrow">MY CREATIVE WORK</small>
              <h2>
                Explore my
                <br />
                <em>Gallery.</em>
              </h2>
            </div>
            <p>
              A collection of creative projects, digital campaigns, designs, and
              visual content.
            </p>
          </div>

          <div className="gallery-grid">
            {site.gallery.map((item, index) => (
              <div
                className="gallery-card"
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedImage(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedImage(index);
                  }
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}media/Picture%20Gallery/gallery-${String(index + 1).padStart(2, "0")}.jpg`}
                  alt={item.title}
                />
                <div className="gallery-overlay">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <small>Click to preview ↗</small>
                </div>
              </div>
            ))}
          </div>

          {/* GALLERY LIGHTBOX */}
          {selectedImage !== null && (
            <div
              className="gallery-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Image preview"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="gallery-lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close preview"
              >
                <X size={28} />
              </button>
              <button
                className="gallery-lightbox-nav prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(
                    (selectedImage - 1 + site.gallery.length) %
                      site.gallery.length,
                  );
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              <div
                className="gallery-lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`${import.meta.env.BASE_URL}media/Picture%20Gallery/gallery-${String(selectedImage + 1).padStart(2, "0")}.jpg`}
                  alt={site.gallery[selectedImage].title}
                />
                <div className="gallery-lightbox-info">
                  <span>{site.gallery[selectedImage].category}</span>
                  <h3>{site.gallery[selectedImage].title}</h3>
                  <small>
                    {selectedImage + 1} / {site.gallery.length}
                  </small>
                </div>
              </div>
              <button
                className="gallery-lightbox-nav next"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((selectedImage + 1) % site.gallery.length);
                }}
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          )}
        </section>

        <section className="section" id="advertising">
          <div className="heading">
            <div>
              <small className="eyebrow">PARTNERSHIPS & PROMOTIONS</small>
              <h2>
                Let's put your brand
                <br />
                <em>in the spotlight.</em>
              </h2>
            </div>
            <p>
              Promotional placements and sponsored stories for relevant brands
              and offers.
            </p>
          </div>
          <Ad ad={site.ads[1]} />
        </section>
        <section className="section testimonials">
          <small className="eyebrow">KIND WORDS</small>
          <h2>
            Built on good <em>collaborations.</em>
          </h2>
          <div className="quotes">
            {site.testimonials.map((t, i) => (
              <article key={i}>
                <b>“</b>
                <p>{t.quote}</p>
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </article>
            ))}
          </div>
          <p className="note">
            Replace sample text with real, approved client testimonials before
            publishing.
          </p>
        </section>
        <section className="contact" id="contact">
          <small className="eyebrow">READY TO GROW?</small>
          <h2>
            Let's grow your
            <br />
            <em>business online.</em>
          </h2>
          <p>
            Tell us about your business, your goals, and the support you need.
          </p>
          <a
            className="btn dark"
            href={`mailto:${site.email}?subject=Let's%20grow%20my%20business`}
          >
            Start a Conversation ↗
          </a>
          <div className="social">
            <a href={`mailto:${site.email}`}>
              <Mail /> {site.email}
            </a>
            {site.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
              >
                {s.icon === "instagram" ? (
                  <Instagram />
                ) : s.icon === "facebook" ? (
                  <Facebook />
                ) : s.icon === "youtube" ? (
                  <Youtube />
                ) : s.icon === "linkedin" ? (
                  <Linkedin />
                ) : s.icon === "twitter" ? (
                  <Twitter />
                ) : s.icon === "whatsapp" || s.icon === "messenger" ? (
                  <MessageCircle />
                ) : (
                  <Globe />
                )}
                {s.name}
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#home">
          <b>❤️</b>
          
          <b>❤️</b>
        </a>
        <span>
          © {new Date().getFullYear()} {site.name}. Digital Marketing & Creative
          Studio.
        </span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}
