// Cookie consent: Google Tag Manager loads only after an explicit Accept
(function () {
    "use strict";

    const consentDiv = document.getElementById("consentDiv");
    if (!consentDiv) {
        return;
    }

    const storageKey = "cookieConsentChoice";
    const gtmId = consentDiv.getAttribute("data-gtm-id");
    const settings = document.getElementById("cookieSettings");
    const settingsButton = document.getElementById("cookieSettingsButton");
    const acceptButton = document.getElementById("consentAcceptButton");
    let gtmLoaded = false;
    let settingsReopened = false;

    const readChoice = function () {
        try {
            return localStorage.getItem(storageKey);
        } catch (e) {
            return null;
        }
    };

    const saveChoice = function (choice) {
        try {
            localStorage.setItem(storageKey, choice);
        } catch (e) {
            // Without storage the choice applies to the current page only
        }
    };

    const loadTagManager = function () {
        if (gtmLoaded || !gtmId) {
            return;
        }
        gtmLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(gtmId);
        document.head.appendChild(script);
    };

    // Removes Google Analytics cookies on this host and its parent domains
    const clearAnalyticsCookies = function () {
        const hostParts = window.location.hostname.split(".");
        const domainAttributes = [""];
        for (let i = 0; i < hostParts.length - 1; i++) {
            domainAttributes.push("; domain=." + hostParts.slice(i).join("."));
        }
        document.cookie.split(";").forEach(function (cookie) {
            const name = cookie.split("=")[0].trim();
            if (/^_(ga|gid|gat)(_|$)/.test(name)) {
                domainAttributes.forEach(function (domainAttribute) {
                    document.cookie = name + "=; Max-Age=0; path=/" + domainAttribute;
                });
            }
        });
    };

    const storedChoice = readChoice();
    if (storedChoice === "accepted") {
        loadTagManager();
    } else {
        clearAnalyticsCookies();
        if (storedChoice !== "declined") {
            consentDiv.hidden = false;
        }
    }

    if (settings) {
        settings.hidden = false;
    }

    consentDiv.addEventListener("click", function (event) {
        const button = event.target.closest("button[data-consent-choice]");
        if (!button) {
            return;
        }
        const choice = button.getAttribute("data-consent-choice");
        saveChoice(choice);
        consentDiv.hidden = true;
        if (choice === "accepted") {
            loadTagManager();
        } else {
            clearAnalyticsCookies();
            // Tags already running on this page stop only when it is reloaded
            if (gtmLoaded) {
                window.location.reload();
                return;
            }
        }
        if (settingsReopened && settingsButton) {
            settingsReopened = false;
            settingsButton.focus();
        }
    });

    if (settingsButton) {
        settingsButton.addEventListener("click", function () {
            settingsReopened = true;
            consentDiv.hidden = false;
            if (acceptButton) {
                acceptButton.focus();
            }
        });
    }

    // A page restored from the back/forward cache keeps the state it was left in
    window.addEventListener("pageshow", function (event) {
        if (!event.persisted) {
            return;
        }
        const choice = readChoice();
        if (gtmLoaded && choice !== "accepted") {
            window.location.reload();
        } else if (choice === "accepted") {
            consentDiv.hidden = true;
            loadTagManager();
        } else if (choice === "declined") {
            consentDiv.hidden = true;
        }
    });
})();
