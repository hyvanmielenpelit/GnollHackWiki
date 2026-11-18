// Search field suggestions: a combobox with a listbox popup (WAI-ARIA APG pattern)
(function () {
  "use strict";

  const field = document.getElementById("search-query");
  if (!field) {
    return;
  }

  let list, status, controller, inputTimer, statusTimer;
  let paths = [];
  let active = -1;
  let current = "";

  const setActive = function (index) {
    active = index;
    for (const item of list.children) {
      item.setAttribute("aria-selected", String(item.id === "gh-search-option-" + index));
    }
    if (index < 0) {
      field.removeAttribute("aria-activedescendant");
    } else {
      field.setAttribute("aria-activedescendant", "gh-search-option-" + index);
    }
  };

  // Opens the list if it has suggestions, or closes it
  const show = function (open) {
    const count = open ? paths.length : 0;
    setActive(count ? active : -1);
    list.hidden = !count;
    field.setAttribute("aria-expanded", String(count > 0));
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () {
      status.textContent = count ? count + " suggestion" + (count > 1 ? "s" : "") : "";
    }, 300);
  };

  const go = function (index) {
    if (paths[index]) {
      show(false);
      location.assign(paths[index]);
    }
  };

  // OpenSearch suggestions: [query, titles, descriptions, urls]
  const suggest = function (value) {
    controller = new AbortController();
    fetch("/gollum/search/suggest?q=" + encodeURIComponent(value), { signal: controller.signal })
      .then(function (response) {
        return response.ok ? response.json() : Promise.reject(response.status);
      })
      .then(function (data) {
        if (value !== current) {
          return;
        }
        const titles = data[1] || [];
        const urls = data[3] || [];
        list.textContent = "";
        paths = [];
        for (let i = 0; i < titles.length && paths.length < 8; i++) {
          if (typeof titles[i] === "string" && typeof urls[i] === "string") {
            // The path only, so a local server stays local
            const url = new URL(urls[i], location.href);
            const item = document.createElement("li");
            item.id = "gh-search-option-" + paths.length;
            item.setAttribute("role", "option");
            item.textContent = titles[i];
            list.appendChild(item);
            paths.push(url.pathname + url.search + url.hash);
          }
        }
        active = -1;
        show(document.activeElement === field);
      })
      .catch(function () {
        if (value === current) {
          paths = [];
          show(false);
        }
      });
  };

  const onInput = function () {
    const value = field.value.trim();
    clearTimeout(inputTimer);
    if (controller) {
      controller.abort();
    }
    current = value;
    if (value.length < 2) {
      paths = [];
      show(false);
    } else {
      inputTimer = setTimeout(suggest, 150, value);
    }
  };

  // The list, the live region, and the ARIA attributes are added on first focus
  const setup = function () {
    field.insertAdjacentHTML("afterend",
      '<ul id="gh-search-suggestions" class="gh-search-suggestions" role="listbox" aria-label="Search suggestions" hidden></ul>' +
      '<div class="sr-only" aria-live="polite"></div>');
    list = field.nextElementSibling;
    status = list.nextElementSibling;
    field.setAttribute("role", "combobox");
    field.setAttribute("aria-autocomplete", "list");
    field.setAttribute("aria-expanded", "false");
    field.setAttribute("aria-controls", list.id);

    // Keeps the focus in the field, so blur does not close the list before a click
    list.addEventListener("mousedown", function (event) {
      event.preventDefault();
    });
    list.addEventListener("click", function (event) {
      go([...list.children].indexOf(event.target.closest("[role=option]")));
    });

    field.addEventListener("input", onInput);
    field.addEventListener("blur", function () {
      show(false);
    });
    field.addEventListener("keydown", function (event) {
      const open = !list.hidden;
      const key = event.key;
      if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing) {
        return;
      }
      if (key === "ArrowDown" && paths.length) {
        if (!open) {
          show(true);
        }
        setActive(open && active + 1 < paths.length ? active + 1 : 0);
      } else if (key === "ArrowUp" && open) {
        setActive(active > 0 ? active - 1 : paths.length - 1);
      } else if (key === "Enter" && open && active >= 0) {
        go(active);
      } else if (key === "Escape" && open) {
        show(false);
      } else if (key === "Escape" && field.value) {
        // A second Escape, with the list already closed, clears the field
        field.value = "";
        onInput();
      } else {
        return;
      }
      event.preventDefault();
    });
  };

  if (document.activeElement === field) {
    setup();
  } else {
    field.addEventListener("focus", setup, { once: true });
  }

  // "/" outside an editable element focuses the search field
  document.addEventListener("keydown", function (event) {
    const target = event.target;
    if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented ||
      target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) {
      return;
    }
    field.focus();
    if (document.activeElement === field) {
      event.preventDefault();
      field.select();
    }
  });
})();
