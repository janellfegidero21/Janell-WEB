import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Sun,
  Moon,
} from "lucide-react";
import { site } from "./siteContent.js";
import { useInView } from "framer-motion";

const icons = [Video, Share2, Target, Palette];

// Custom hook for scroll direction
function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState("up");
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY;
    };
    window.addEventListener("scroll", updateScrollDir, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);
  return scrollDir;
}

// Stagger container variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Section reveal variant
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ========================================
// COMPONENTS
// ========================================

function Ad({ ad }) {
  return (
    <motion.article
      className="ad"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <motion.small
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {ad.label} · {ad.sponsor}
        </motion.small>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {ad.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {ad.description}
        </motion.p>
        <motion.a
          className="link"
          href={ad.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ x: 6 }}
          whileTap={{ scale: 0.98 }}
        >
          {ad.button} <ArrowUpRight size={16} />
        </motion.a>
      </div>
      <motion.div
        className="ad-icon"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.05, rotate: 5 }}
      >
        <Sparkles size={38} />
      </motion.div>
    </motion.article>
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

function ToolCard({ tool, index }) {
  const Icon = tool.icon;
  return (
    <motion.div
      className="tool-card"
      style={{ "--tool-color": tool.color }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="tool-icon"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon size={25} strokeWidth={1.8} />
      </motion.div>
      <motion.span>{tool.name}</motion.span>
    </motion.div>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [lightbox, setLightbox] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const cats = ["All", ...new Set(site.projects.map((p) => p.category))];
  const items = site.projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  const item = items[index] || items[0];

  useEffect(() => setIndex(0), [filter]);
  useEffect(() => {
    if (!auto || items.length < 2 || item?.type === "video") return;
    const t = setInterval(() => setIndex((n) => (n + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [auto, items.length, item?.type]);

  if (!item) return null;
  const media = item.media && !item.media.includes("replace-with-");
  const move = (d) => {
    setIndex((n) => (n + d + items.length) % items.length);
    setAuto(false);
  };

  return (
    <motion.div
      className="portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="filters"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {cats.map((c, i) => (
          <motion.button
            key={c}
            className={filter === c ? "active" : ""}
            onClick={() => setFilter(c)}
            variants={staggerItem}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {c}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="screen"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {media && item.type === "video" ? (
          <motion.video
            key={item.media}
            src={item.media}
            poster={item.poster || undefined}
            controls
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : media ? (
          <motion.img
            key={item.media}
            src={item.media}
            alt={item.title}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <motion.div
            className="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={40} />
            </motion.div>
            <motion.small
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {item.tag}
            </motion.small>
            <motion.strong
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {item.title}
            </motion.strong>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Add your {item.type === "video" ? "MP4 video" : "photo"} to{" "}
              <code>public/media</code>
            </motion.p>
          </motion.div>
        )}

        <motion.span
          className="count"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {index + 1} / {items.length}
        </motion.span>

        {media && item.type === "image" && (
          <motion.button
            className="expand-media"
            onClick={() => setLightbox(true)}
            aria-label="View image full screen"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={16} /> View image
          </motion.button>
        )}
      </motion.div>

      <motion.div
        className="work-meta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.small
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {item.category} · {item.tag}
          </motion.small>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {item.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {item.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="controls"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={() => move(-1)}
            aria-label="Previous"
            whileHover={{
              scale: 1.1,
              background: "var(--accent)",
              color: "white",
              borderColor: "var(--accent)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft />
          </motion.button>
          <motion.button
            onClick={() => move(1)}
            aria-label="Next"
            whileHover={{
              scale: 1.1,
              background: "var(--accent)",
              color: "white",
              borderColor: "var(--accent)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight />
          </motion.button>
          <motion.button
            onClick={() => {
              setAuto((v) => !v);
              setIsPlaying((v) => !v);
            }}
            aria-label={auto ? "Pause slideshow" : "Play slideshow"}
            whileHover={{
              scale: 1.1,
              background: "var(--accent)",
              color: "white",
              borderColor: "var(--accent)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause /> : <Play />}
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="dots"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        initials={{ opacity: 0, y: 10 }}
        animates={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {items.map((p, i) => (
          <motion.button
            key={p.title}
            className={i === index ? "active" : ""}
            onClick={() => {
              setIndex(i);
              setAuto(false);
            }}
            aria-label={`Show ${p.title}`}
            variants={staggerItem}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        ))}
      </motion.div>

      <motion.div
        className="thumbs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {items.map((p, i) => (
          <motion.button
            key={p.title}
            className={i === index ? "selected" : ""}
            onClick={() => {
              setIndex(i);
              setAuto(false);
            }}
            aria-label={`Select ${p.title}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
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
            </motion.span>
            <motion.small>{p.title}</motion.small>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {lightbox && media && item.type === "image" && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            onClick={() => setLightbox(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              aria-label="Close image"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(false);
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X />
            </motion.button>
            <motion.img
              src={item.media}
              alt={item.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Spotlight Thumbnail Button
function SpotlightThumb({ item, index, isActive, onClick }) {
  return (
    <motion.button
      className="spotlight-thumb-btn"
      onClick={onClick}
      aria-label={`View ${item.title}`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      style={{
        borderColor: isActive ? "var(--accent)" : "white",
        boxShadow: isActive ? "var(--shadow-md)" : "var(--shadow-sm)",
      }}
    >
      <motion.img
        src={item.image}
        alt={item.title}
        loading="lazy"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        className="thumb-label"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <small>{item.title}</small>
      </motion.div>
    </motion.button>
  );
}

// Gallery Card
function GalleryCard({ item, index, onClick, onKeyDown }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="gallery-card"
      key={index}
      role="button"
      tabIndex={0}
      onClick={() => onClick(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(index);
        }
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ scale: 1.01 }}
      style={{ transformOrigin: "center center" }}
    >
      <motion.img
        src={item.image} 
        alt={item.title}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="gallery-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {item.category}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {item.title}
        </motion.h3>
        <motion.small
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Click to preview ↗
        </motion.small>
      </motion.div>
    </motion.div>
  );
}

// Gallery Lightbox
function GalleryLightbox({ item, index, total, onClose, onPrev, onNext }) {
  return (
    <motion.div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        className="gallery-lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close preview"
        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{
          scale: 1.15,
          rotate: 90,
          background: "rgba(255,255,255,0.28)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <X size={28} />
      </motion.button>

      <motion.button
        className="gallery-lightbox-nav prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.28)" }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={32} />
      </motion.button>

      <motion.div
        className="gallery-lightbox-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={item.image}
          alt={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
        <motion.div
          className="gallery-lightbox-info"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span>{item.category}</motion.span>
          <motion.h3>{item.title}</motion.h3>
          <motion.small>
            {index + 1} / {total}
          </motion.small>
        </motion.div>
      </motion.div>

      <motion.button
        className="gallery-lightbox-nav next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.28)" }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={32} />
      </motion.button>
    </motion.div>
  );
}

// Certificate Card
function CertificateCard({ cert, index }) {
  return (
    <motion.div
      className="certificate-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <motion.div
        className="certificate-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.img
          src={cert.image}
          alt={cert.title}
          initial={{ scale: 1.02 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      <motion.div
        className="certificate-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.span className="certificate-label">
          {cert.label || "CERTIFICATE"}
        </motion.span>
        <motion.h3>{cert.title}</motion.h3>
        <motion.p>{cert.issuer}</motion.p>
        <motion.small>{cert.date}</motion.small>
      </motion.div>
    </motion.div>
  );
}

// Service Card
function ServiceCard({ service, index }) {
  const Icon = icons[index % icons.length];
  return (
    <motion.article
      className="service"
      key={`${import.meta.env.BASE_URL}certificate-01.jpg`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <motion.span
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon />
      </motion.span>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {service.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {service.text}
      </motion.p>
      <motion.small
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {service.detail}
      </motion.small>
    </motion.article>
  );
}

// Testimonial Card
function TestimonialCard({ testimonial, index }) {
  return (
    <motion.article
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <motion.b
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
      >
        “
      </motion.b>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {testimonial.quote}
      </motion.p>
      <motion.strong
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        {testimonial.name}
      </motion.strong>
      <motion.small
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {testimonial.role}
      </motion.small>
    </motion.article>
  );
}

// Social Link
function SocialLink({ social }) {
  const iconMap = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    linkedin: Linkedin,
    twitter: Twitter,
    whatsapp: MessageCircle,
    messenger: MessageCircle,
    globe: Globe,
  };
  const Icon = iconMap[social.icon] || Globe;

  return (
    <motion.a
      key={social.name}
      href={social.url}
      target="_blank"
      rel="noreferrer"
      aria-label={social.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={14} />
      {social.name}
    </motion.a>
  );
}

// Header Component
function Header({ scrollDir }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const nav = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Services", "#services"],
    ["Our Work", "#work"],
    ["Advertising", "#advertising"],
    ["Contact", "#contact"],
  ];

  return (
    <motion.header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--header-height)",
        background:
          scrollDir === "down"
            ? "rgba(15,20,25,0.85)"
            : "rgba(250,250,250,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        transition: "all var(--duration-base) var(--ease-out)",
        transform: scrollDir === "down" ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container-wide)",
          margin: "auto",
          padding: "0 5%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <motion.a
          className="brand"
          href="#home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.b
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ color: "var(--gold)" }}
          >
            ❤️
          </motion.b>
          <h2> {site.name} </h2>
          <motion.b
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            style={{ color: "var(--gold)" }}
          >
            ❤️
          </motion.b>
        </motion.a>

        <motion.nav
          className={open ? "open" : ""}
          initial={false}
          animate={{
            opacity: open ? 1 : 0,
            height: open ? "auto" : 0,
            padding: open ? "18px" : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          {nav.map(([n, h], i) => (
            <motion.a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 4, color: "var(--accent)" }}
            >
              {n}
            </motion.a>
          ))}
        </motion.nav>

        <motion.a
          className="navbtn"
          href="#contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Let's Talk ↗
        </motion.a>

        <motion.button
          className="menubtn"
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {open ? <X /> : <Menu />}
        </motion.button>

        <motion.button
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            color: "var(--fg)",
          }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
      </div>
    </motion.header>
  );
}

// ========================================
// MAIN APP
// ========================================
export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [theme, setTheme] = useState("light");
  const scrollDir = useScrollDirection();

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

  const handleGalleryOpen = (index) => setSelectedImage(index);
  const handleGalleryClose = () => setSelectedImage(null);
  const handleGalleryPrev = () =>
    setSelectedImage(
      (selectedImage - 1 + site.gallery.length) % site.gallery.length,
    );
  const handleGalleryNext = () =>
    setSelectedImage((selectedImage + 1) % site.gallery.length);

  // Scroll to top on route change
  const scrollToTop = useCallback((href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <motion.div
      id="home"
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Header scrollDir={scrollDir} />

      <main>
        {/* HERO */}
        <motion.section
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.small
              className="eyebrow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              DIGITAL MARKETING
            </motion.small>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {site.tagline}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {site.subTagline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {site.intro}
            </motion.p>

            <motion.div
              className="actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                className="btn dark"
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop("#services");
                }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Services <ArrowUpRight size={16} />
              </motion.a>
              <motion.a
                className="btn light"
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop("#work");
                }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Work <ExternalLink size={16} />
              </motion.a>
            </motion.div>

            <motion.div
              className="proof"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CheckCircle2 /> Creative content
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CheckCircle2 /> Strategic campaigns
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="portrait-frame"
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div className="portrait-inner">
                <motion.img
                  src={`${import.meta.env.BASE_URL}Font-Picture.jpg`}
                  alt="Marketing Portfolio"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.div>
              <p>
                {" "}
                <motion.span
                  className="center-name"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4>Janell-Joy A. Fegidero</h4>
                </motion.span>{" "}
              </p>
            </motion.div>

            <motion.span
              className="star star-top"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ✦
            </motion.span>
            <motion.span
              className="star star-bottom"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              ✦
            </motion.span>
            <motion.span
              className="orbit-dot"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.section>

        {/* STRIP */}
        <motion.div
          className="strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2>
            　 DIGITAL ADVERTISING　 • 　 META ADS MEDIA BUYER　 •　 LEAD
            GENERATION　 •　CAMPAIGN OPTIMIZATION{" "}
          </h2>
        </motion.div>

        {/* CERTIFICATES */}
        <motion.section
          className="section"
          id="certificates"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div className="heading" variants={staggerContainer}>
            <motion.div variants={staggerItem}>
              <motion.small className="eyebrow">
                PROFESSIONAL DEVELOPMENT
              </motion.small>
              <motion.h2>
                Course &<em>Certificate</em>
                <br />
              </motion.h2>
            </motion.div>
            <motion.p variants={staggerItem}>
              A collection of certifications, training programs, and
              achievements that represent my skills and growth.
            </motion.p>
          </motion.div>

          <motion.div className="certificate-grid" variants={staggerContainer}>
            {[
              {
                title: "Certified Meta Business Partner",
                issuer: "Marketing Master IO",
                date: "2025",
                image: `${import.meta.env.BASE_URL}certificate-01.jpg`,
                label: "CERTIFICATE",
              },
            ].map((cert, index) => (
              <CertificateCard key={index} cert={cert} index={index} />
            ))}
          </motion.div>
        </motion.section>

        {/* SPOTLIGHT */}
        <motion.section
          className="section spotlight-section"
          id="spotlight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div className="heading" variants={staggerContainer}>
            <motion.div variants={staggerItem}>
              <motion.small className="eyebrow">FEATURED WORK</motion.small>
              <motion.h2>
                {rawSpotlight.sectionTitle ||
                  rawSpotlight.title ||
                  "Featured Case Study"}
              </motion.h2>
            </motion.div>
            <motion.p variants={staggerItem}>
              {rawSpotlight.sectionDescription ||
                rawSpotlight.description ||
                ""}
            </motion.p>
          </motion.div>

          <motion.div
            className="spotlight-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="spotlight-main-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src={`${import.meta.env.BASE_URL}${mainItem.image}`}
                alt={mainItem.title}
                initial={{ scale: 1.02 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.div
                className="spotlight-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h3>{mainItem.title}</motion.h3>
                <motion.p>{mainItem.description}</motion.p>
              </motion.div>
            </motion.div>

            <motion.div
              className="spotlight-thumbs"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {subItems.map((item, i) => (
                <SpotlightThumb
                  key={i}
                  item={item}
                  index={i}
                  isActive={false}
                  onClick={() => handleSubItemClick(item, i)}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* SERVICES */}
        <motion.section
          className="section"
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div className="heading" variants={staggerContainer}>
            <motion.div variants={staggerItem}>
              <motion.small className="eyebrow">WHAT WE DO</motion.small>
              <motion.h2>
                Everything your brand needs
                <br />
                <em>to grow online.</em>
              </motion.h2>
            </motion.div>
            <motion.p variants={staggerItem}>
              Creative ideas meet smart digital strategy. Choose the support
              that fits your business goals.
            </motion.p>
          </motion.div>

          <motion.div className="services" variants={staggerContainer}>
            {site.services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </motion.div>
        </motion.section>

        {/* TOOLS */}
        <motion.section
          className="banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.section
            className="tools-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="tools-header" variants={staggerContainer}>
              <motion.span className="section-label" variants={staggerItem}>
                MY WORKSPACE · DIGITAL TOOLS
              </motion.span>
              <motion.h2 variants={staggerItem}>Tools I use.</motion.h2>
              <motion.p variants={staggerItem}>
                Platforms and applications I use for marketing, productivity,
                design, and collaboration.
              </motion.p>
            </motion.div>

            <motion.div className="tools-grid" variants={staggerContainer}>
              {tools.map((tool, i) => (
                <ToolCard key={tool.name} tool={tool} index={i} />
              ))}
            </motion.div>
          </motion.section>
        </motion.section>

        {/* ABOUT */}
        <motion.section
          className="section about"
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div
            className="hero-video"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.video
              src={`${import.meta.env.BASE_URL}hero-video.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            ></motion.video>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            
              <motion.h1
                className="eyebrow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                ABOUT <em>ME</em>
              </motion.h1>
            

            <motion.div
              className="about-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.p>
                Hi, I'm Janell — a Meta Ads Media Buyer with nearly two years of
                hands-on experience helping businesses grow through strategic
                Facebook and Instagram advertising.
              </motion.p>
              <motion.p>
                I specialize in planning, launching, managing, and optimizing
                paid advertising campaigns designed to generate quality leads,
                attract potential customers, and support business growth.
              </motion.p>
              <motion.p>
                I believe successful advertising goes beyond simply running ads.
                It requires understanding business goals, reaching the right
                audience, analyzing campaign performance, and making strategic
                adjustments to improve results.
              </motion.p>
              <motion.p>
                As I expand into the international market, I'm excited to
                collaborate with businesses, entrepreneurs, and marketing
                agencies that need reliable Meta Ads support.
              </motion.p>
            </motion.div>

            <motion.a
              className="link"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop("#contact");
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ x: 6 }}
            >
              Let's talk about your goals ↗
            </motion.a>
          </motion.div>
        </motion.section>

        {/* WORK / PORTFOLIO */}
        <motion.section
          className="work"
          id="work"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div className="section">
            <motion.div className="heading" variants={staggerContainer}>
              <motion.div variants={staggerItem}>
                <motion.small className="eyebrow">
                  SELECTED PROJECTS
                </motion.small>
                <motion.h2>
                  Work that makes
                  <br />
                  <em>an impression.</em>
                </motion.h2>
              </motion.div>
              <motion.p variants={staggerItem}>
                Explore video production, social media campaigns, and
                advertising creative.
              </motion.p>
            </motion.div>
            <Portfolio />
          </motion.div>
        </motion.section>

        {/* GALLERY */}
        <motion.section
          className="section"
          id="gallery"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div className="heading" variants={staggerContainer}>
            <motion.div variants={staggerItem}>
              <motion.small className="eyebrow">MY CREATIVE WORK</motion.small>
              <motion.h2>
                Explore my
                <br />
                <em>Gallery.</em>
              </motion.h2>
            </motion.div>
            <motion.p variants={staggerItem}>
              A collection of creative projects, digital campaigns, designs, and
              visual content.
            </motion.p>
          </motion.div>

          <motion.div className="gallery-grid" variants={staggerContainer}>
            {site.gallery.map((item, index) => (
              <GalleryCard
                key={index}
                item={{
                  image: item.image.replace("%20", " "),
                  title: item.title,
                  category: item.category,
                }}
                index={index}
                onClick={handleGalleryOpen}
                onKeyDown={() => {}}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedImage !== null && (
              <GalleryLightbox
                item={site.gallery[selectedImage]}
                index={selectedImage}
                total={site.gallery.length}
                onClose={handleGalleryClose}
                onPrev={handleGalleryPrev}
                onNext={handleGalleryNext}
              />
            )}
          </AnimatePresence>
        </motion.section>

        {/* ADVERTISING */}
        <motion.section
          className="section"
          id="advertising"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div className="heading" variants={staggerContainer}>
            <motion.div variants={staggerItem}>
              <motion.small className="eyebrow">
                PARTNERSHIPS & PROMOTIONS
              </motion.small>
              <motion.h2>
                Let's put your brand
                <br />
                <em>in the spotlight.</em>
              </motion.h2>
            </motion.div>
            <motion.p variants={staggerItem}>
              Promotional placements and sponsored stories for relevant brands
              and offers.
            </motion.p>
          </motion.div>
          <Ad ad={site.ads[1]} />
        </motion.section>

        {/* TESTIMONIALS */}
        <motion.section
          className="section testimonials"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.small
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            KIND WORDS
          </motion.small>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Built on good <em>collaborations.</em>
          </motion.h2>

          <motion.div className="quotes" variants={staggerContainer}>
            {site.testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </motion.div>

          <motion.p
            className="note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Replace sample text with real, approved client testimonials before
            publishing.
          </motion.p>
        </motion.section>

        {/* CONTACT */}
        <motion.section
          className="contact"
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.small
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            READY TO GROW?
          </motion.small>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Let's grow your
            <br />
            <em>business online.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tell us about your business, your goals, and the support you need.
          </motion.p>

          <motion.a
            className="btn dark"
            href={`mailto:${site.email}?subject=Let's%20grow%20my%20business`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Conversation <ArrowUpRight size={16} />
          </motion.a>

          <motion.div className="social" variants={staggerContainer}>
            <motion.a
              href={`mailto:${site.email}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -3, scale: 1.05 }}
            >
              <Mail size={14} /> {site.email}
            </motion.a>
            {site.socials.map((s) => (
              <SocialLink key={s.name} social={s} />
            ))}
          </motion.div>
        </motion.section>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.a className="brand" href="#home" whileHover={{ scale: 1.02 }}>
          <motion.b
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ color: "var(--gold)" }}
          >
            ❤️
          </motion.b>
          <motion.b
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            style={{ color: "var(--gold)" }}
          >
            ❤️
          </motion.b>
        </motion.a>
        <span>
          © {new Date().getFullYear()}. Digital Marketing & Creative Studio.
        </span>
        <motion.a href="#home" whileHover={{ y: -2 }}>
          Back to top ↑
        </motion.a>
      </motion.footer>
    </motion.div>
  );
}
