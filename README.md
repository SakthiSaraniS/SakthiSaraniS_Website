# Sakthi Sarani S — Portfolio Website

Personal portfolio site showcasing my projects, technical skills, and experience — built to demonstrate not just what I've built, but how I engineer software: performant, secure, accessible, and production-ready by design.

🔗 **Live site:** [sakthisaranis-website.vercel.app](https://sakthisaranis-website.vercel.app)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Tooling:** ESLint, Prettier, Husky + lint-staged (pre-commit enforcement)
- **Hosting:** Vercel (CI/CD via automatic deploy previews on every PR)

## Getting Started

Clone and run locally:

```bash
git clone https://github.com/SakthiSaraniS/SakthiSaraniS_Website.git
cd SakthiSaraniS_Website
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project Structure

app/ → App Router pages and layouts
public/ → Static assets

## Development Workflow

- `main` is the production branch — always deployable.
- Feature work happens on `feature/*` branches, merged via pull request.
- Every PR automatically gets a Vercel preview deployment.
- Pre-commit hooks (Husky + lint-staged) auto-lint and format staged files.

## Roadmap

This project is being built incrementally with a focus on production-grade practices: performance optimization, security hardening, accessibility (WCAG AA), and CI/CD — documented as the project progresses.

## License

MIT
