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
// instead of showing every indexed item by default.
const applyEmptySearchStyles = () => {
  if (!ninjaKeys.shadowRoot || ninjaKeys.shadowRoot.querySelector("#empty-search-style")) {
    return;
  }
  const style = document.createElement("style");
  style.id = "empty-search-style";
  style.textContent = `
    :host([data-empty-search]) .ninja-action,
    :host([data-empty-search]) .group-header {
      display: none !important;
    }
  `;
  ninjaKeys.shadowRoot.appendChild(style);
};

if (ninjaKeys.shadowRoot) {
  applyEmptySearchStyles();
} else {
  customElements.whenDefined("ninja-keys").then(applyEmptySearchStyles);
}

// start hidden, since the modal opens with no query typed yet
ninjaKeys.setAttribute("data-empty-search", "");

ninjaKeys.addEventListener("change", (e) => {
  const query = (e.detail && e.detail.search) || "";
  if (query.trim().length === 0) {
    ninjaKeys.setAttribute("data-empty-search", "");
  } else {
    ninjaKeys.removeAttribute("data-empty-search");
  }
});
