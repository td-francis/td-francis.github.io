let searchTheme = determineComputedTheme();
const ninjaKeys = document.querySelector("ninja-keys");

if (searchTheme === "dark") {
  ninjaKeys.classList.add("dark");
} else {
  ninjaKeys.classList.remove("dark");
}

const openSearchModal = () => {
  // collapse navbarNav if expanded on mobile
  const $navbarNav = $("#navbarNav");
  if ($navbarNav.hasClass("show")) {
    $navbarNav.collapse("hide");
  }
  ninjaKeys.open();
};

// Keep the results list empty until the user actually types something,
// instead of showing every indexed item by default. We use a
// MutationObserver (rather than an injected stylesheet) because ninja-keys
// re-renders its shadow DOM via Lit, which can wipe out elements we append
// ourselves; the observer re-applies the hide/show state after every render.
let searchQueryIsEmpty = true;

const applyResultVisibility = () => {
  if (!ninjaKeys.shadowRoot) return;
  const display = searchQueryIsEmpty ? "none" : "";
  ninjaKeys.shadowRoot.querySelectorAll(".ninja-action, .group-header").forEach((el) => {
    el.style.display = display;
  });
};

const startObservingResults = () => {
  if (!ninjaKeys.shadowRoot) return;
  applyResultVisibility();
  const observer = new MutationObserver(applyResultVisibility);
  observer.observe(ninjaKeys.shadowRoot, { childList: true, subtree: true });
};

if (ninjaKeys.shadowRoot) {
  startObservingResults();
} else {
  customElements.whenDefined("ninja-keys").then(startObservingResults);
}

ninjaKeys.addEventListener("change", (e) => {
  const query = (e.detail && e.detail.search) || "";
  searchQueryIsEmpty = query.trim().length === 0;
  applyResultVisibility();
});
