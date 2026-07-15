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
// instead of showing every indexed item by default. We only toggle the
// dedicated ".actions-list" results container (the same container
// ninja-keys itself uses internally for scroll-to-top on search), rather
// than hiding individual result rows — hiding rows directly previously
// collapsed the shared layout and pushed the input out of view. We use a
// MutationObserver rather than a one-time check because ninja-keys
// re-renders its shadow DOM via Lit on every keystroke.
let searchQueryIsEmpty = true;

const applyResultVisibility = () => {
  if (!ninjaKeys.shadowRoot) return;
  const actionsList = ninjaKeys.shadowRoot.querySelector(".actions-list");
  if (!actionsList) return;
  actionsList.style.display = searchQueryIsEmpty ? "none" : "";
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
