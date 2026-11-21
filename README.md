# Melati — Digital Marketing & Creative Studio

React + Vite portfolio website with a light pastel-blue look. Services include video production, social media marketing, ads management, and branding/creative design. It includes a video/photo project slideshow, banner ad and sponsored-content placements, testimonials, and contact links.

## Run locally
1. Extract this ZIP.
2. Open the extracted folder in Visual Studio Code.
3. Open Terminal → New Terminal.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL shown in the terminal (usually http://localhost:5173).

## Customize
Most website text and content is in `src/siteContent.js`: name, tagline, email, social links, intro, about, services, projects, ads and testimonials. Change design colors and layout in `src/styles.css`. Change page structure in `src/App.jsx`.

## Add portfolio videos and photos
Copy files into `public/media/`, then edit the `projects` array in `src/siteContent.js`.
Example video object:
```js
{ title: "Product Campaign", category: "Video Production", description: "A product promotional video.", type: "video", media: "/media/product-campaign.mp4", poster: "/media/product-cover.jpg", tag: "VIDEO FEATURE" }
```
Example image object:
```js
{ title: "Social Media Creative", category: "Social Media", description: "Campaign graphic.", type: "image", media: "/media/social-creative.jpg", poster: "", tag: "SOCIAL CAMPAIGN" }
```
Use MP4/H.264 for browser compatibility. Keep videos compressed for faster loading. Image slides auto-advance; video slides remain available for playback.

## Edit advertising
Change the `ads` array in `src/siteContent.js`. Update sponsor, headline, description, button and URL. Clearly label paid placements as ADVERTISEMENT or SPONSORED CONTENT. These are display placements only; ad serving, billing, scheduling and analytics are not included.

## Deploy to GitHub Pages
1. Create a GitHub repository named `melati-digital-marketing-portfolio`.
2. Replace `YOUR-USERNAME` in the commands below with your GitHub username:
```bash
git init
git add .
git commit -m "Create digital marketing portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/melati-digital-marketing-portfolio.git
git push -u origin main
```
3. In GitHub, open Settings → Pages and choose **GitHub Actions** as the source.
4. The included `.github/workflows/deploy.yml` deploys on pushes to `main`.
5. Your site URL will be `https://YOUR-USERNAME.github.io/melati-digital-marketing-portfolio/`.

Before publishing, replace sample contact details, media placeholders, social links and testimonial text. Only publish testimonials approved by the clients.
