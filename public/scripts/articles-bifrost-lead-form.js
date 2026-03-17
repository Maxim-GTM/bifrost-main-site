(function () {
    'use strict';
  
    var WEBHOOK_URL =
      'https://api.clay.com/v3/sources/webhook/pull-in-data-from-a-webhook-006d8118-8e8e-4271-a043-d4b76dffcb7f';
  
    var COOKIE_NAME = 'bifrost_ebook_dismissed';
    var COOKIE_EXPIRE_DAYS = 1;
    var TRIGGER_DELAY_MS = 30000;
    var SHOW_ON_SCROLL_PERCENT = 30;
    var MIN_SCREEN_WIDTH = 768;

    var COMPANY_SIZES = ['1-10', '11-50', '51-100', '101-500', '501-1000', '1000+'];

    var BIFROST_TAGS = ['LLM Gateway', 'AI Gateway', 'MCP Gateway', 'AI Governance'];

    // ============================================================
    // CAMPAIGN CONFIG — from <script> data attributes
    // ============================================================
  
    function getScriptConfig() {
      var scripts = document.querySelectorAll('script[src*="articles-bifrost-lead-form"]');
      var el = scripts[scripts.length - 1];
      return {
        ebookTitle: (el && el.getAttribute('data-ebook-title')) || 'Bifrost: The Enterprise AI Gateway',
        ebookUrl: (el && el.getAttribute('data-ebook-url')) || '#',
        teaserTagline: (el && el.getAttribute('data-teaser-tagline')) || '[ FREE EBOOK ]',
        teaserHeading:
          (el && el.getAttribute('data-teaser-heading')) || 'The Enterprise AI Gateway Guide',
        teaserDescription:
          (el && el.getAttribute('data-teaser-description')) ||
          'A technical deep-dive into deploying, governing, and scaling LLM infrastructure.',
      };
    }
  
    // ============================================================
    // HELPERS
    // ============================================================

    function hasBifrostTag() {
      var metaTags = document.querySelectorAll('meta[property="article:tag"]');
      for (var i = 0; i < metaTags.length; i++) {
        var content = metaTags[i].getAttribute('content');
        if (BIFROST_TAGS.indexOf(content) !== -1) {
          return true;
        }
      }
      return false;
    }
  
    function isDismissed() {
      return document.cookie.indexOf(COOKIE_NAME + '=1') !== -1;
    }
  
    function setDismissedCookie() {
      var d = new Date();
      d.setTime(d.getTime() + COOKIE_EXPIRE_DAYS * 86400000);
      document.cookie = COOKIE_NAME + '=1;expires=' + d.toUTCString() + ';path=/';
    }
  
    function esc(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
  
    // ============================================================
    // STYLES
    // ============================================================
  
    var PANEL_W = '380px';
  
    function injectStyles() {
      if (document.getElementById('bfr-dl-styles')) return;
      var s = document.createElement('style');
      s.id = 'bfr-dl-styles';
      s.textContent = [
        '.bfr-dl-panel{position:absolute !important;bottom:0 !important;right:0 !important;width:' + PANEL_W + ' !important;background:#fff !important;border:1px solid #e2e5e9 !important;border-radius:0 !important;box-shadow:0 8px 32px rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.06) !important;overflow:hidden !important;opacity:0;transform:translateY(12px) scale(.98);transition:opacity .3s ease,transform .3s ease;pointer-events:none;display:none}',
        '.bfr-dl-panel.visible{display:block !important;opacity:1 !important;transform:translateY(0) scale(1) !important;pointer-events:auto !important}',

        // Accent bar at top
        '.bfr-dl-accent-bar{height:3px;background:linear-gradient(90deg,#33C09E 0%,#2BA085 50%,#177B62 100%)}',

        // Close
        '.bfr-dl-close{position:absolute !important;top:12px !important;right:12px !important;width:28px !important;height:28px !important;background:rgba(255,255,255,.85) !important;backdrop-filter:blur(4px) !important;border:1px solid #e2e5e9 !important;border-radius:6px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;color:#9ca3af !important;transition:background .15s,color .15s,border-color .15s !important;z-index:3 !important;padding:0 !important}',
        '.bfr-dl-close:hover{background:#fff !important;color:#111827 !important;border-color:#d1d5db !important}',

        // ---- Teaser ----
        '.bfr-dl-teaser-inner{padding:28px 24px 24px}',
        '.bfr-dl-teaser-header{display:flex;align-items:flex-start;gap:14px;margin-bottom:14px}',
        '.bfr-dl-teaser-icon{flex-shrink:0;width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%);display:flex;align-items:center;justify-content:center}',
        '.bfr-dl-tagline{font-family:"SF Mono",Monaco,Consolas,monospace !important;font-size:10px !important;font-weight:600 !important;letter-spacing:.08em !important;color:#33C09E !important;margin:0 0 4px !important;text-transform:uppercase !important}',
        '.bfr-dl-teaser-h{font-size:16px !important;font-weight:700 !important;color:#111827 !important;margin:0 !important;line-height:1.35 !important}',
        '.bfr-dl-teaser-p{font-size:13px !important;color:#6b7280 !important;margin:0 0 18px !important;line-height:1.5 !important}',
        '.bfr-dl-teaser-btn{display:flex !important;align-items:center !important;justify-content:center !important;gap:8px !important;width:100% !important;height:40px !important;font-family:"SF Mono",Monaco,Consolas,monospace !important;font-size:12px !important;font-weight:600 !important;text-transform:uppercase !important;letter-spacing:.06em !important;color:#fff !important;background:#33C09E !important;border:none !important;border-radius:8px !important;cursor:pointer !important;transition:background .15s !important;position:relative !important}',
        '.bfr-dl-teaser-btn:hover{background:#2BA085 !important}',

        // ---- Form ----
        '.bfr-dl-form-inner{padding:24px 24px 20px}',
        '.bfr-dl-form-h{font-size:16px !important;font-weight:700 !important;color:#111827 !important;margin:0 0 2px !important}',
        '.bfr-dl-form-sub{font-size:12px !important;color:#9ca3af !important;margin:0 0 16px !important}',
        '.bfr-dl-row{display:flex !important;gap:10px !important}',
        '.bfr-dl-field{display:flex !important;flex-direction:column !important;margin-bottom:10px !important;flex:1 !important}',
        '.bfr-dl-label{font-size:11px !important;font-weight:600 !important;color:#374151 !important;margin-bottom:3px !important;letter-spacing:.02em !important}',
        '.bfr-dl-input,.bfr-dl-select{width:100% !important;box-sizing:border-box !important;height:34px !important;padding:0 10px !important;font-size:13px !important;font-family:inherit !important;color:#111827 !important;background:#f9fafb !important;border:1px solid #e2e5e9 !important;border-radius:6px !important;outline:none !important;transition:border-color .15s,box-shadow .15s,background .15s !important}',
        '.bfr-dl-input:focus,.bfr-dl-select:focus{border-color:#33C09E !important;box-shadow:0 0 0 2px rgba(51,192,158,.12) !important;background:#fff !important}',
        '.bfr-dl-input::placeholder{color:#9ca3af !important}',
        '.bfr-dl-select{appearance:none !important;-webkit-appearance:none !important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\' stroke=\'%239ca3af\' stroke-width=\'1.5\'%3E%3Cpath d=\'M3 4.5L6 7.5L9 4.5\'/%3E%3C/svg%3E") !important;background-repeat:no-repeat !important;background-position:right 10px center !important;padding-right:28px !important}',

        // Submit
        '.bfr-dl-submit{position:relative !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;gap:8px !important;width:100% !important;height:40px !important;margin-top:6px !important;font-family:"SF Mono",Monaco,Consolas,monospace !important;font-size:12px !important;font-weight:600 !important;text-transform:uppercase !important;letter-spacing:.06em !important;color:#fff !important;background:#33C09E !important;border:none !important;border-radius:8px !important;cursor:pointer !important;transition:background .15s !important}',
        '.bfr-dl-submit:hover{background:#2BA085 !important}',
        '.bfr-dl-submit:disabled{opacity:.6 !important;cursor:not-allowed !important}',

        // Success
        '.bfr-dl-success{text-align:center;padding:32px 24px}',
        '.bfr-dl-success-icon{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%);margin-bottom:14px}',
        '.bfr-dl-success h4{font-size:16px !important;font-weight:700 !important;color:#111827 !important;margin:0 0 6px !important}',
        '.bfr-dl-success p{font-size:13px !important;color:#6b7280 !important;margin:0 0 18px !important}',

        // Error
        '.bfr-dl-error{font-size:11px !important;color:#dc2626 !important;margin:6px 0 0 !important;display:none !important}',
        '.bfr-dl-error.show{display:block !important}',

        // Hide on small screens
        '@media(max-width:767px){#bfr-dl-widget{display:none !important}}',
      ].join('\n');
      document.head.appendChild(s);
    }
  
    // ============================================================
    // MARKUP HELPERS
    // ============================================================

    var CLOSE_SVG = '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1L13 13M13 1L1 13"/></svg>';
    var ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 7h12M8 2l5 5-5 5"/></svg>';
    var BOOK_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#33C09E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8M8 11h5"/></svg>';
    var CHECK_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
  
    // ============================================================
    // BUILD UI
    // ============================================================
  
    var state = { phase: 'idle' };
  
    function buildWidget(cfg) {
      var wrap = document.createElement('div');
      wrap.id = 'bfr-dl-widget';
      wrap.setAttribute('style',
        'position:fixed !important;bottom:90px !important;right:24px !important;' +
        'z-index:2147483640 !important;transform:none !important;' +
        'will-change:auto !important;contain:none !important;' +
        'width:' + PANEL_W + ' !important;height:0 !important;overflow:visible !important;' +
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,sans-serif !important;' +
        'line-height:1.5 !important;-webkit-font-smoothing:antialiased !important;'
      );
  
      // ---- Teaser Panel ----
      var teaser = document.createElement('div');
      teaser.className = 'bfr-dl-panel';
      teaser.id = 'bfr-dl-teaser';
      teaser.innerHTML =
        '<div class="bfr-dl-accent-bar"></div>' +
        '<button class="bfr-dl-close" id="bfr-dl-teaser-close" aria-label="Close">' + CLOSE_SVG + '</button>' +
        '<div class="bfr-dl-teaser-inner">' +
          '<div class="bfr-dl-teaser-header">' +
            '<div class="bfr-dl-teaser-icon">' + BOOK_SVG + '</div>' +
            '<div>' +
              '<p class="bfr-dl-tagline">' + esc(cfg.teaserTagline) + '</p>' +
              '<h4 class="bfr-dl-teaser-h">' + esc(cfg.teaserHeading) + '</h4>' +
            '</div>' +
          '</div>' +
          '<p class="bfr-dl-teaser-p">' + esc(cfg.teaserDescription) + '</p>' +
          '<button class="bfr-dl-teaser-btn" id="bfr-dl-teaser-action">Download Free Copy ' + ARROW_SVG + '</button>' +
        '</div>';
  
      // ---- Form Panel ----
      var sizeOpts = '<option value="" disabled selected>Select</option>';
      for (var i = 0; i < COMPANY_SIZES.length; i++) {
        sizeOpts += '<option value="' + COMPANY_SIZES[i] + '">' + COMPANY_SIZES[i] + '</option>';
      }
  
      var formPanel = document.createElement('div');
      formPanel.className = 'bfr-dl-panel';
      formPanel.id = 'bfr-dl-form-panel';
      formPanel.innerHTML =
        '<div class="bfr-dl-accent-bar"></div>' +
        '<button class="bfr-dl-close" id="bfr-dl-form-close" aria-label="Close">' + CLOSE_SVG + '</button>' +
        '<div class="bfr-dl-form-inner">' +
          '<p class="bfr-dl-tagline">' + esc(cfg.teaserTagline) + '</p>' +
          '<h4 class="bfr-dl-form-h">' + esc(cfg.teaserHeading) + '</h4>' +
          '<p class="bfr-dl-form-sub">Fill in your details to get the free ebook.</p>' +
          '<form id="bfr-dl-form" autocomplete="on">' +
            '<div class="bfr-dl-row">' +
              '<div class="bfr-dl-field"><label class="bfr-dl-label" for="bfr-fname">First Name</label><input class="bfr-dl-input" id="bfr-fname" name="firstName" placeholder="Jane" required></div>' +
              '<div class="bfr-dl-field"><label class="bfr-dl-label" for="bfr-lname">Last Name</label><input class="bfr-dl-input" id="bfr-lname" name="lastName" placeholder="Doe" required></div>' +
            '</div>' +
            '<div class="bfr-dl-field"><label class="bfr-dl-label" for="bfr-email">Company Email</label><input class="bfr-dl-input" id="bfr-email" name="email" type="email" placeholder="jane@company.com" required></div>' +
            '<div class="bfr-dl-field"><label class="bfr-dl-label" for="bfr-company">Company</label><input class="bfr-dl-input" id="bfr-company" name="companyName" placeholder="Acme Inc." required></div>' +
            '<div class="bfr-dl-row">' +
              '<div class="bfr-dl-field"><label class="bfr-dl-label" for="bfr-size">Company Size</label><select class="bfr-dl-select" id="bfr-size" name="companySize" required>' + sizeOpts + '</select></div>' +
              '<div class="bfr-dl-field"><label class="bfr-dl-label" for="bfr-role">Role</label><input class="bfr-dl-input" id="bfr-role" name="role" placeholder="Engineering Lead" required></div>' +
            '</div>' +
            '<button type="submit" class="bfr-dl-submit" id="bfr-dl-submit-btn">Download Ebook ' + ARROW_SVG + '</button>' +
            '<p class="bfr-dl-error" id="bfr-dl-error"></p>' +
          '</form>' +
        '</div>';
  
      wrap.appendChild(teaser);
      wrap.appendChild(formPanel);
      (document.documentElement || document.body).appendChild(wrap);
      return { wrap: wrap, teaser: teaser, formPanel: formPanel };
    }
  
    // ============================================================
    // PHASE TRANSITIONS
    // ============================================================
  
    function showTeaser(els) {
      if (state.phase !== 'idle') return;
      state.phase = 'teaser';
      els.formPanel.classList.remove('visible');
      els.teaser.classList.add('visible');
      console.log('Bifrost Ebook CTA: Teaser shown');
    }
  
    function showForm(els) {
      state.phase = 'form';
      els.teaser.classList.remove('visible');
      setTimeout(function () {
        els.formPanel.classList.add('visible');
      }, 80);
    }
  
    function showSuccess(els, cfg) {
      state.phase = 'success';
      var inner = els.formPanel.querySelector('.bfr-dl-form-inner');
      inner.innerHTML =
        '<div class="bfr-dl-success">' +
          '<div class="bfr-dl-success-icon">' + CHECK_SVG + '</div>' +
          '<h4>Thanks! Your download is ready.</h4>' +
          (cfg.ebookUrl && cfg.ebookUrl !== '#'
            ? '<a href="' + esc(cfg.ebookUrl) + '" target="_blank" rel="noopener" style="font-size:12px;color:#6b7280;text-decoration:underline;cursor:pointer">Download didn\'t start? Click here.</a>'
            : '') +
        '</div>';

      if (cfg.ebookUrl && cfg.ebookUrl !== '#') {
        var a = document.createElement('a');
        a.href = cfg.ebookUrl;
        a.target = '_blank';
        a.rel = 'noopener';
        a.click();
      }
    }
  
    function dismiss(els) {
      els.teaser.classList.remove('visible');
      els.formPanel.classList.remove('visible');
      setDismissedCookie();
      state.phase = 'dismissed';
    }
  
    // ============================================================
    // WEBHOOK
    // ============================================================
  
    function submitToWebhook(formData, cfg, els) {
      var btn = document.getElementById('bfr-dl-submit-btn');
      var errEl = document.getElementById('bfr-dl-error');
      btn.disabled = true;
      btn.textContent = 'Submitting...';
      errEl.classList.remove('show');
  
      var payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        companyName: formData.companyName,
        companySize: formData.companySize,
        role: formData.role,
        ebookTitle: cfg.ebookTitle,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href,
      };

      var parts = [];
      for (var key in payload) {
        if (payload.hasOwnProperty(key)) {
          parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]));
        }
      }
      var encoded = parts.join('&');
  
      var sent = false;
      try {
        fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encoded,
        });
        sent = true;
      } catch (e) {}
  
      if (!sent) {
        try {
          if (navigator.sendBeacon) {
            navigator.sendBeacon(
              WEBHOOK_URL,
              new Blob([encoded], { type: 'application/x-www-form-urlencoded' })
            );
          }
        } catch (e) {}
      }
  
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'bifrost_ebook_download', ebook_title: cfg.ebookTitle, email: formData.email });
      }
  
      showSuccess(els, cfg);
    }
  
    // ============================================================
    // INIT
    // ============================================================
  
    function init() {
      if (window.innerWidth < MIN_SCREEN_WIDTH) return;
      if (!hasBifrostTag()) {
        console.log('Bifrost Ebook CTA: Article does not have a Bifrost tag (' + BIFROST_TAGS.join(', ') + ')');
        return;
      }
      if (isDismissed()) {
        console.log('Bifrost Ebook CTA: Dismissed (cookie set), will reappear after expiry');
        return;
      }
  
      var cfg = getScriptConfig();
      console.log('Bifrost Ebook CTA: Initializing for "' + cfg.ebookTitle + '"');
      injectStyles();
      var els = buildWidget(cfg);
  
      // Close buttons
      document.getElementById('bfr-dl-teaser-close').addEventListener('click', function (e) {
        e.stopPropagation();
        dismiss(els);
      });
      document.getElementById('bfr-dl-form-close').addEventListener('click', function (e) {
        e.stopPropagation();
        dismiss(els);
      });
  
      // Teaser CTA -> form
      document.getElementById('bfr-dl-teaser-action').addEventListener('click', function (e) {
        e.stopPropagation();
        showForm(els);
      });
  
      // Form submit
      document.getElementById('bfr-dl-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var f = e.target;
        var data = {
          firstName: f.firstName.value.trim(),
          lastName: f.lastName.value.trim(),
          email: f.email.value.trim(),
          companyName: f.companyName.value.trim(),
          companySize: f.companySize.value,
          role: f.role.value.trim(),
        };
  
        var freeEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com', 'protonmail.com'];
        var emailDomain = data.email.split('@')[1];
        if (emailDomain && freeEmailDomains.indexOf(emailDomain.toLowerCase()) !== -1) {
          var errEl = document.getElementById('bfr-dl-error');
          errEl.textContent = 'Please use your company email address.';
          errEl.classList.add('show');
          return;
        }
  
        submitToWebhook(data, cfg, els);
      });
  
      // Triggers
      if (TRIGGER_DELAY_MS > 0) {
        setTimeout(function () { showTeaser(els); }, TRIGGER_DELAY_MS);
      }
  
      if (SHOW_ON_SCROLL_PERCENT > 0) {
        var scrollTriggered = false;
        window.addEventListener('scroll', function () {
          if (scrollTriggered || state.phase !== 'idle') return;
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (docHeight > 0 && (scrollTop / docHeight) * 100 >= SHOW_ON_SCROLL_PERCENT) {
            scrollTriggered = true;
            showTeaser(els);
          }
        });
      }
  
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && state.phase !== 'idle' && state.phase !== 'dismissed') {
          dismiss(els);
        }
      });
    }
  
    window.BifrostEbookCTA = {
      init: init,
      show: function () {
        var t = document.getElementById('bfr-dl-teaser');
        if (t) t.classList.add('visible');
      },
    };
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
