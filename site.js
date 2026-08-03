/* ============================================================
   YOUR DATA. This one file feeds every page.
   Add a paper here and it appears on both the home page
   (3 most recent) and publications.html. Keep the commas
   and quotes intact.
   ============================================================ */

const PEOPLE = [
  {
    name: "Ana Rivera",
    role: "Principal Investigator",
    photo: "",                       // e.g. "images/rivera.jpg" — leave "" for initials
    blurb: "PhD Stanford. Postdoc EMBL. Runs the lab, still pipettes on Fridays.",
    links: { Email: "mailto:rivera@example.edu", Scholar: "https://scholar.google.com/", CV: "cv.pdf" }
  },
  {
    name: "Marc Oduya",
    role: "Postdoctoral Fellow",
    photo: "",
    blurb: "Single-molecule imaging of translation in live embryos.",
    links: { Email: "mailto:oduya@example.edu", ORCID: "https://orcid.org/" }
  },
  {
    name: "Wei Chen",
    role: "Graduate Student",
    photo: "",
    blurb: "Optogenetic control of RNP granule assembly.",
    links: { Email: "mailto:chen@example.edu" }
  },
  {
    name: "Priya Nandakumar",
    role: "Research Technician",
    photo: "",
    blurb: "Zebrafish facility, library prep, keeper of the freezer map.",
    links: {}
  }
];

const PUBLICATIONS = [
  {
    year: 2025,
    authors: "Oduya M, Chen W, <b>Rivera A</b>",
    title: "Light-induced RNP condensation transiently represses translation of fate-determining mRNAs",
    venue: "bioRxiv 2025.04.11.612345",
    url: "https://www.biorxiv.org/",
    tags: ["preprint", "selected"]
  },
  {
    year: 2024,
    authors: "Chen W, Nandakumar P, <b>Rivera A</b>",
    title: "Ribosome profiling across the last progenitor division reveals a translational switch",
    venue: "Nature Cell Biology 26:1120–1133",
    url: "https://doi.org/10.1000/example",
    tags: ["selected"]
  },
  {
    year: 2024,
    authors: "Nandakumar P, <b>Rivera A</b>",
    title: "A low-cost mounting protocol for long-term light-sheet imaging of zebrafish embryos",
    venue: "Journal of Visualized Experiments 203:e65432",
    url: "https://doi.org/10.1000/example",
    tags: []
  },
  {
    year: 2022,
    authors: "<b>Rivera A</b>, Ito K, Feldman B",
    title: "Sequence determinants of RBP occupancy in the vertebrate 3' UTR",
    venue: "Molecular Cell 82:2201–2215",
    url: "https://doi.org/10.1000/example",
    tags: ["selected"]
  }
];


/* ============================================================
   Machinery below. It looks for containers by id and fills
   whichever ones exist on the current page, so the same file
   can be loaded everywhere.
   ============================================================ */

// Lab name into the colour-channel layers (home page only).
const heroTitle = document.querySelector(".merge");
if (heroTitle) heroTitle.dataset.text = heroTitle.textContent.trim();

// Copyright year in the footer.
document.querySelectorAll(".js-year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ---- People ----
const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join("");
const peopleGrid = document.getElementById("people-grid");
if (peopleGrid) {
  peopleGrid.innerHTML = PEOPLE.map(p => `
    <div class="person">
      ${p.photo
        ? `<img class="avatar" src="${p.photo}" alt="${p.name}">`
        : `<div class="avatar" role="img" aria-label="${p.name}">${initials(p.name)}</div>`}
      <h3>${p.name}</h3>
      <div class="role">${p.role}</div>
      <p>${p.blurb || ""}</p>
      <div class="links">${Object.entries(p.links || {})
        .map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>
    </div>`).join("");
}

// ---- Publications ----
// Add data-limit="3" to the container to show only the most recent few.
const pubList = document.getElementById("pub-list");

function renderPubs(filter) {
  if (!pubList) return;
  const limit = parseInt(pubList.dataset.limit, 10) || Infinity;
  const shown = PUBLICATIONS
    .filter(p => filter === "all" || (p.tags || []).includes(filter))
    .sort((a, b) => b.year - a.year)
    .slice(0, limit);

  const years = [...new Set(shown.map(p => p.year))];
  pubList.innerHTML = years.map(y => `
    <div class="year-block">
      <div class="yr">${y}</div>
      <div>${shown.filter(p => p.year === y).map(p => `
        <div class="pub">
          <span class="t">${(p.tags || []).includes("selected") ? '<span class="star" title="Selected">★</span> ' : ""}${p.title}</span>
          <span class="a">${p.authors}</span>
          <span class="j">${p.venue}${p.url ? ` · <a href="${p.url}">link</a>` : ""}</span>
        </div>`).join("")}
      </div>
    </div>`).join("") || `<p class="a">Nothing here yet.</p>`;
}
renderPubs("all");

const pubFilters = document.getElementById("pub-filters");
if (pubFilters) {
  pubFilters.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    [...e.currentTarget.children].forEach(b => b.setAttribute("aria-pressed", b === btn));
    renderPubs(btn.dataset.filter);
  });
}
