# Barry's Kitchen Website

**Flavors That Speak Luxury** — Nigerian Catering Service · Fulshear, Texas

---

## Project Structure

```
barrys-kitchen/
├── index.html          ← The complete website (open this in browser)
├── images/
│   ├── logo.jpg
│   ├── Jollof_Rice.jpeg
│   ├── Fried_Rice.jpeg
│   ├── Efo_Riro.JPG
│   ├── Ewa_Agoyin.jpeg
│   ├── Fried_Plantain.jpeg
│   ├── Ofada_Sauce_Mixed_With_Assorted.jpeg
│   ├── Peppered_Chicken.jpeg
│   ├── Peppered_Fish.jpeg
│   ├── Porridge.jpeg
│   └── Pre_Set_Up_Spread.jpeg
└── README.md
```

---

## Opening in VS Code

1. Open VS Code
2. File → Open Folder → select the `barrys-kitchen` folder
3. Install the **Live Server** extension (by Ritwick Dey)
4. Right-click `index.html` → **Open with Live Server**
5. Your site opens at `http://127.0.0.1:5500`

---

## Adding More Photos

To add photos to the Gallery section:
1. Copy your new image files into the `images/` folder
2. Open `index.html` in VS Code
3. Find the `<!-- GALLERY -->` section
4. Add a new gallery cell using this template:

```html
<div class="gallery-cell reveal">
  <img src="images/YOUR_PHOTO_NAME.jpeg" alt="Description of dish" loading="lazy"/>
  <span class="gallery-label">Dish Name</span>
</div>
```

To make an image span 2 columns (wider), use:
```html
<div class="gallery-cell wide reveal">
```

---

## Launching to the Internet

### Option A — Netlify (Easiest, Free)
1. Go to https://netlify.com and create a free account
2. Drag and drop the entire `barrys-kitchen` folder onto their dashboard
3. You instantly get a live URL like `https://barrys-kitchen.netlify.app`
4. To use a custom domain (e.g. `www.barryskitchen.com`):
   - Buy domain at https://namecheap.com (~$12/year)
   - In Netlify → Domain Settings → Add custom domain
   - Update DNS nameservers as instructed

### Option B — GitHub Pages (Also Free)
1. Create a GitHub account at https://github.com
2. Create a new repository named `barrys-kitchen`
3. Upload all files (keeping the `images/` folder structure)
4. Go to Settings → Pages → Source: main branch
5. Your site goes live at `https://yourusername.github.io/barrys-kitchen`

---

## Contact Info (Update These in index.html if they change)

- **Email:** barryskitchenhtx@gmail.com
- **Phone:** 346-714-2255
- **Location:** Fulshear, Texas

---

## Built With

- Pure HTML5, CSS3, JavaScript (no frameworks needed)
- Google Fonts: Cormorant Garamond + DM Sans
- Fully accessible (ARIA labels, keyboard navigation, screen reader friendly)
- Fully responsive (mobile, tablet, desktop)
