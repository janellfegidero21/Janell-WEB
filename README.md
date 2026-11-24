# Janell-Joy Fegidero - Enhanced Portfolio

Enhanced version of the Digital Marketing & Creative Studio portfolio with **Framer Motion animations**, **dark/light mode**, and **smooth micro-interactions**.

## ✨ Animation Features Added

### Entrance Animations
- **Staggered reveals** - Elements cascade in with 80ms delays
- **Fade + slide up** - Sections animate from bottom on scroll
- **Scale + fade** - Cards and images scale in smoothly

### Scroll-Triggered (Intersection Observer)
- `whileInView` on all major sections
- Viewport margin: `-100px` for early triggering
- `once: true` - animations run once per session

### Hover Micro-Interactions
- **Buttons**: Scale (1.02-1.05), translateY(-2px), box-shadow
- **Cards**: Lift (-4px to -6px), border color change, shadow
- **Icons**: Scale (1.1), rotate (3-5°), spring physics
- **Navigation links**: Horizontal slide (x: 4px)
- **Social links**: Lift + scale
- **Thumbnail buttons**: Y-offset + scale

### Tap/Click Feedback
- All interactive elements: `scale(0.95-0.98)`
- Lightbox close: rotate + scale spring
- Filter tabs: spring with bounce

### Continuous Animations
- **Floating stars** (hero): 3s ease-in-out infinite
- **Orbit dot** (hero): 10s linear infinite
- **Sparkles** (placeholder): 2s pulse infinite
- **Heart icons** (brand): 3s rotating infinite

### Page Transitions
- **Lightbox**: Fade + scale (0.2s enter/exit)
- **Mobile menu**: Height + opacity (0.3s)
- **Gallery lightbox**: Staggered content entry
- **Image switching**: Smooth cross-fade

### Dark/Light Mode
- CSS custom properties for all colors
- localStorage persistence
- System preference detection
- Smooth 350ms transitions on toggle
- Header hide/show on scroll direction

## 📁 Project Structure

```
enhanced-portfolio/
├── public/
│   ├── Font-Picture.jpg          # Hero portrait
│   ├── certificate-01.jpg        # Certificate image
│   ├── hero-video.mp4            # About section background video
│   └── media/                    # Project & gallery media
│       ├── Clothing Campaign/
│       ├── Real State/
│       ├── Car Dealer/
│       ├── Picture Gallery/
│       └── Spot Light/
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Main component with all animations
│   ├── styles.css                # Complete design system + animations
│   └── siteContent.js            # All content/data (edit this!)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

```bash
cd enhanced-portfolio
npm install
npm run dev
```

Open `http://localhost:5173` (Vite default port)

## 🎨 Customization

### Content
Edit `src/siteContent.js` - all text, images, projects, services, testimonials

### Colors & Theme
Modify CSS custom properties in `src/styles.css`:
```css
:root {
  --accent: #5c99c5;        /* Primary brand color */
  --gold: #d5a64d;          /* Accent gold */
  --fg: #2d3d50;            /* Text color */
  --bg: #fafafa;            /* Background */
  /* ... more tokens */
}
```

### Animations
Adjust Framer Motion variants in `App.jsx`:
- `staggerContainer` / `staggerItem` - List animations
- `sectionVariants` - Section reveal
- Component-level `initial/animate/whileHover/whileTap`

### Reduced Motion
Automatically respects `prefers-reduced-motion` - all animations disable

## 📦 Build for Production

```bash
npm run build
```

Output in `dist/` - ready for Netlify, Vercel, GitHub Pages, etc.

## 🛠 Tech Stack

- **React 18** + **Vite 6**
- **Framer Motion 11** - Animation library
- **Lucide React** - Icons
- **CSS Custom Properties** - Design tokens
- **DM Sans + Playfair Display** - Typography

## 📱 Responsive Breakpoints

- `480px` - Mobile (single column grids)
- `650px` - Tablet (2-col grids, mobile nav)
- `768px` - Small desktop
- `850px` - Medium desktop
- `1120px` - Max content width
- `1200px` - Max header width

## ♿ Accessibility

- Semantic HTML5
- ARIA labels on all interactive elements
- Focus-visible styles
- `prefers-reduced-motion` support
- Keyboard navigation (gallery lightbox)
- Alt text on all images

## 🔧 Adding New Animations

```jsx
// Basic pattern
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  whileHover={{ y: -4 }}
  whileTap={{ scale: 0.98 }}
>
  Content
</motion.div>

// Staggered list
<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>...</motion.div>
  ))}
</motion.div>
```

## 📄 License

Personal portfolio - customize freely!