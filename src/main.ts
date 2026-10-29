import "./style.css";

interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  url?: string;
}

const projects: Project[] = [
  {
    title: "ScreenMind",
    year: "2026",
    description:
      "A local, screen-aware AI assistant for Linux. Highlight text or a window, press a hotkey, and a floating overlay answers via a local LLM — no cloud, no telemetry.",
    tags: ["Rust", "Local AI", "Ollama"],
    url: "https://github.com/TYDev01/ScreenMind",
  },
  {
    title: "Kohona Wallet",
    year: "2026",
    description:
      "A decentralised privacy wallet for everyday transactions, designed to keep ordinary payments private by default.",
    tags: ["TypeScript", "Web3", "Privacy"],
    url: "https://github.com/TYDev01/Kohona-Wallet",
  },
  {
    title: "Sassaby",
    year: "2026",
    description:
      "A crypto off-ramp platform that bridges crypto to local bank accounts across Africa. Users deposit to a desk address and receive fiat in any local bank — no wallet connection required.",
    tags: ["Blockchain", "Bitcoin L2", "DeFi"],
    url: "https://github.com/TYDev01/sassaby",
  },
  {
    title: "Air-Claim",
    year: "2026",
    description:
      "A parametric flight-delay insurance dApp on the Celo network, with a small staked “Games Lounge” on the side.",
    tags: ["Celo", "Solidity", "dApp"],
    url: "https://github.com/TYDev01/Air-Claim",
  },
  {
    title: "E-Findr",
    year: "2026",
    description:
      "An event photo-discovery platform that lets attendees instantly find every photo they appear in, without scrolling through thousands of images.",
    tags: ["TypeScript", "AI", "Product"],
    url: "https://github.com/TYDev01/E-Findr",
  },
  {
    title: "PerUse AI",
    year: "2026",
    description:
      "A marketplace where creators publish AI-powered tools and users pay per use, deployed on Locus.",
    tags: ["TypeScript", "AI", "Marketplace"],
    url: "https://github.com/TYDev01/PerUse-Ai",
  },
];

/** Render the work list from data. */
function renderProjects(): void {
  const list = document.querySelector<HTMLUListElement>("#work-list");
  const count = document.querySelector<HTMLSpanElement>(".section__count");
  if (!list) return;

  list.innerHTML = projects
    .map(
      (p) => `
      <li class="work-item" ${p.url ? `data-url="${p.url}"` : ""}>
        <span class="work-item__title">${p.title}</span>
        <span class="work-item__year">${p.year}</span>
        <p class="work-item__desc">${p.description}</p>
        <div class="work-item__tags">
          ${p.tags.map((t) => `<span>${t}</span>`).join("")}
        </div>
      </li>`
    )
    .join("");

  if (count) count.textContent = `${projects.length.toString().padStart(2, "0")} projects`;

  list.querySelectorAll<HTMLLIElement>(".work-item").forEach((item) => {
    const url = item.dataset.url;
    if (url) item.addEventListener("click", () => window.open(url, "_blank"));
  });
}

/** Reveal elements as they scroll into view. */
function initReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

type Theme = "light" | "dark";

/** Persisted light/dark toggle, defaulting to the system preference. */
function initTheme(): void {
  const root = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
  const stored = localStorage.getItem("theme") as Theme | null;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial: Theme = stored ?? (prefersDark ? "dark" : "light");

  root.setAttribute("data-theme", initial);

  toggle?.addEventListener("click", () => {
    const next: Theme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

function setYear(): void {
  const el = document.querySelector<HTMLSpanElement>("#year");
  if (el) el.textContent = new Date().getFullYear().toString();
}

renderProjects();
initReveal();
initTheme();
setYear();
