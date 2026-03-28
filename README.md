# 🍔 Food Station - Modern Food Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.5+-6366f1?style=for-the-badge)](https://better-auth.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

Welcome to **Food Station**, a premium, high-performance web application designed for a seamless food ordering experience. Built with the latest technologies like **Next.js 16 (App Router)** and **React 19**, it offers a buttery-smooth UI and robust features for customers, food providers, and administrators.

---

## 🚀 Experience the Live App
- **Frontend Live URL**: [food-station-bd.vercel.app](https://food-station-bd.vercel.app)
- **Backend API URL**: [food-station-backend.vercel.app](https://food-station-backend.vercel.app)

---

## ✨ Key Features
- **Modern UI/UX**: Crafted with Tailwind CSS 4 and Lucide icons for a premium feel.
- **Dynamic Cart System**: Real-time price calculation, quantity adjustments, and persistent cart management.
- **Auth Roles**: Dedicated dashboards for **Admin**, **Providers**, and **Customers**.
- **Stripe Payments**: Fully integrated secure payment gateway for effortless transactions.
- **Interactive Meal Details**: Choose between different sizes and add-ons with instant total updates.
- **Micro-Animations**: Enhanced user engagement using Lottie animations and framer-motion-like transitions.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop devices.
- **Server Actions & Better Auth**: Leveraging modern authentication workflows for security and performance.

---

## 🛠️ Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Animations**: [Lottie React](https://github.com/LottieFiles/lottie-react)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm / yarn / pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stackbymazed/food-station-frontend.git
   cd food_station_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=https://food-station-backend.vercel.app
   # Add your Stripe Public Key and other necessary keys here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view your app.

---

## 🔐 Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin1234` |
| **Provider** | `provider@gmail.com` | `Provider123` |

---

## 📂 Project Structure
```bash
src/
├── app/          # Next.js App Router (Pages & Layouts)
├── components/   # Reusable UI Components
├── hooks/        # Custom React Hooks
├── lib/          # Utilities & API Clients
├── store/        # Zustand State Management
└── types/        # TypeScript Definitions
```

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the ISC License. See `LICENSE` for more information.

---

## 📩 Contact
**Mazed** - [GitHub Profile](https://github.com/stackbymazed)

**Repo Link**: [https://github.com/stackbymazed/food-station-frontend](https://github.com/stackbymazed/food-station-frontend)
