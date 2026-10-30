# MAISON NAILS — Haute Atelier Paris & London

A luxury, interactive digital flagship for **MAISON NAILS** featuring an interactive 3D nail sculpture atelier, editorial photography, and a multi-step booking engine.

## 🚀 One-Click Deploy to Vercel

The project is pre-configured for Vercel with a production-ready [`vercel.json`](./vercel.json).

### Method 1: Via Vercel Dashboard (Recommended)
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** > **"Project"**.
3. Import the GitHub repository: **`Chirag0005/nails`**.
4. The build settings are auto-detected:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.

### Method 2: Via Vercel CLI
```bash
npx vercel
```
For production:
```bash
npx vercel --prod
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **3D Graphics**: Three.js (WebGL procedural physical sculpture & studio lighting)
- **Icons**: Lucide React
- **Confetti**: Canvas Confetti
- **Styling**: Vanilla CSS Design System with CSS Custom Properties

---

## 💻 Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
