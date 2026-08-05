# AIO Shoe Store

A modern, production-minded e-commerce demo built with Next.js and TypeScript — demonstrates secure auth, catalog & cart flows and pragmatic full‑stack patterns that matter for shipping real web products.

---

## Demo

![demo](https://github.com/sobhanhsa/aio-shoe-store/blob/main/demo.gif)

(Use the demo above for a quick visual tour — run the app locally to try the full flows.)

---

## Quick pitch

AIO Shoe Store is a full‑stack TypeScript demo that shows practical experience building secure, usable ecommerce flows (auth, product catalog, cart persistence) with Next.js and MongoDB — valuable for teams shipping user-facing web products.

---

## Key features (benefit-focused)

- Secure authentication and authorization
  - Email/password sign-up and login using bcrypt + JWT so user sessions are secure and portable.
- Product catalog with search & filters
  - Debounced search + SWR caching keeps browsing fast and reduces backend load.
- Persistent shopping cart
  - Local and server-backed cart flows ensure a consistent shopping experience across sessions and devices.
- Validation and runtime safety
  - Zod schemas validate inputs at the API boundary to prevent runtime errors and simplify debugging.
- Developer ergonomics
  - TypeScript-first codebase, ESLint, and consistent npm scripts make the repo easy to review and iterate on.
- Responsive UI
  - Accessible, mobile-friendly layouts and components so the product works well on all devices.

---

## Tech stack

- Languages & runtime: TypeScript, Node.js
- Framework: Next.js (app directory)
- Database: MongoDB (Mongoose)
- State & data fetching: Zustand, SWR
- Validation & auth: Zod, bcrypt, jsonwebtoken (JWT)
- UI & utilities: RSuite, Swiper, React-Icons, React-Toastify
- Tooling: ESLint, TypeScript

---

## High-level architecture / How it works

- Next.js provides both the frontend and backend API routes (co-located for clear ownership of full‑stack flows).
- Mongoose models persist users, products, and cart state to MongoDB.
- Auth flow: passwords hashed with bcrypt; JWTs sign sessions and are validated on protected API routes.
- Client/server data strategy: SWR for server-driven resources (catalog, product detail) with revalidation; Zustand for ephemeral client state (cart UI, toggles).
- Zod schemas validate request bodies and form inputs to reduce runtime issues and keep client/server contracts aligned.

---

## Environment variables

Create a `.env.local` file in the project root with the variables used by the app. Example names used in the project:

```env
SECRET=your_jwt_secret_or_similar
SALTROUNDS=10
NEXT_PUBLIC_API_URL=http://localhost:3000
DB_URl=mongodb://<user>:<password>@localhost:27017/shoestore
```

Note: variable names above are the ones already referenced in the repo; if you prefer `JWT_SECRET` or `MONGO_URI` those are also common variants — update code or env accordingly.

---

## Installation & setup (run locally)

1. Clone and install

```bash
git clone https://github.com/sobhanhsa/aio-shoe-store.git
cd aio-shoe-store
npm install
```

2. Add environment variables in `.env.local` (see Environment variables section).

3. Run the development server

```bash
npm run dev
# Open http://localhost:3000
```

4. Production build

```bash
npm run build
npm start
```

Tips:
- If you don't have MongoDB locally, use MongoDB Atlas and set `DB_URl` accordingly.
- Linting: `npm run lint`.

---

## What I learned / challenges solved

- Working with TypeScript across the full stack (shared types, API models, and React props) and balancing type safety with developer ergonomics.
- Designing clear server/client boundaries: choosing when to offload logic to API routes vs keeping it in components and how SWR/Zustand fit together.
- Implementing secure auth: bcrypt for password hashing and JWTs for session management; protecting endpoints and validating tokens.
- Using Zod to maintain a single source of truth for validation and reduce surface area for bugs.
- Performance tradeoffs: debounce on search inputs and SWR caching strategies to minimize requests while keeping UX fast.

These are resume‑friendly takeaways I discuss in interviews to demonstrate impact and learning.

---

## Future improvements

- Add test coverage: unit, integration, and E2E (Jest + Playwright).
- CI/CD pipeline (GitHub Actions) for build, lint, and test automation.
- Dockerize the app and provide a docker-compose for local dev with MongoDB.
- Role-based admin panel for product management and analytics.
- Integrate payments (Stripe) and implement full order lifecycle.
- Add image optimization + CDN support for production performance.

---

## Contact / Links

- GitHub: https://github.com/sobhanhsa
- LinkedIn: https://www.linkedin.com/in/sobhangss
- Email: sobhanhsa1@gmail.com

---

If you'd like, I can further tailor this README for hiring managers by adding a one-page summary, visual badges, or callouts that map features to specific interview topics.
