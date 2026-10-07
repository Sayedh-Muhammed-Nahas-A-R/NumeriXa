/* NumeriXa dashboard: live search + category filter.
   Cards are plain <a> links, so navigation works even without JavaScript. */
(function () {
  "use strict";

  var search = document.getElementById("search");
  var chips = document.querySelectorAll(".chip");
  var sections = document.querySelectorAll(".category");
  var empty = document.getElementById("empty");
  var activeFilter = "all";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function apply() {
    var q = (search.value || "").trim().toLowerCase();
    var visibleTotal = 0;

    sections.forEach(function (section) {
      var inCategory = activeFilter === "all" || section.dataset.cat === activeFilter;
      var visible = 0;

      section.querySelectorAll(".card").forEach(function (card) {
        var match = inCategory && (!q || card.dataset.name.indexOf(q) !== -1);
        card.hidden = !match;
        if (match) visible++;
      });

      section.hidden = visible === 0;
      visibleTotal += visible;
    });

    empty.classList.toggle("show", visibleTotal === 0);
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      activeFilter = chip.dataset.filter;
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c === chip));
      });
      apply();
    });
  });

  search.addEventListener("input", apply);

  // Press "/" anywhere to jump to search
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== search) {
      e.preventDefault();
      search.focus();
    }
  });
})();
