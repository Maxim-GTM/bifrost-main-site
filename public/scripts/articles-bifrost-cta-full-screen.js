(function() {
  'use strict';

  // ============================================================
  // A/B TEST COHORTS - Each cohort has different content
  // ============================================================

  var COHORTS = [
    {
      id: 'open-source',
      tagline: "[ WE'RE OPEN SOURCE ]",
      heading: 'Scale with the {accent}Fastest Enterprise AI Gateway{/accent}',
      description: 'Built for enterprise-grade reliability, governance, and scale. Deploy in seconds.',
      primaryBtn: { 
        text: 'Book a Demo', 
        url: 'https://www.getmaxim.ai/bifrost/book-a-demo?utm_medium=articles_cta_modal&utm_source=articles&utm_campaign=open-source' 
      }
    },
    {
      id: 'enterprise',
      tagline: "[ ENTERPRISE AI GATEWAY ]",
      heading: 'Build with the {accent}Fastest OSS Enterprise AI Gateway{/accent}',
      description: 'Route, govern, and observe AI traffic across your organization with ultra-low latency, high throughput.',
      primaryBtn: { 
        text: 'Request Enterprise License', 
        url: 'https://www.getmaxim.ai/bifrost/enterprise?utm_medium=articles_cta_modal&utm_source=articles&utm_campaign=enterprise' 
      }
    },
    {
      id: 'mcp',
      tagline: "[ MCP GATEWAY ]",
      heading: 'Turn AI Models into {accent}Action-Capable Agents{/accent}',
      description: 'Enable AI models to discover and execute external tools dynamically with the fastest open-source MCP gateway.',
      primaryBtn: { 
        text: 'Learn More', 
        url: 'https://www.getmaxim.ai/bifrost/resources/mcp-gateway?utm_medium=articles_cta_modal&utm_source=articles&utm_campaign=mcp' 
      }
    },
    {
      id: 'claude-code',
      tagline: "[ CLAUDE CODE + BIFROST ]",
      heading: 'Enterprise LLM Gateway for {accent}Claude Code{/accent}',
      description: 'Use Bifrost to scale Claude Code across your organization with multi-provider routing, cost controls, security guardrails, role-based access control, and compliance-ready governance.',
      primaryBtn: { 
        text: 'See How It Works', 
        url: 'https://www.getmaxim.ai/bifrost/resources/claude-code?utm_medium=articles_cta_modal&utm_source=articles&utm_campaign=claude-code' 
      }
    },
    {
      id: 'benchmarks',
      tagline: "[ PERFORMANCE BENCHMARKS ]",
      heading: '{accent}50x Faster{/accent} Than LiteLLM',
      description: '11µs overhead at 5,000 RPS. Built in Go for maximum throughput and minimal latency. See our benchmarks.',
      primaryBtn: { 
        text: 'View Benchmarks', 
        url: 'https://www.getmaxim.ai/bifrost/resources/benchmarks?utm_medium=articles_cta_modal&utm_source=articles&utm_campaign=benchmarks' 
      }
    }
  ];

  // ============================================================
  // SETTINGS - Behavior configuration
  // ============================================================

  var SETTINGS = {
    triggerDelay: 10000,          // Show modal after X ms (0 = disable auto-show)
    showOnExitIntent: true,       // Show when mouse leaves viewport
    cookieName: 'bifrost_cta_dismissed',
    cookieExpireDays: 1
  };

  // Tags that trigger the modal (article must have one of these)
  var BIFROST_TAGS = ['LLM Gateway', 'AI Gateway', 'MCP Gateway', 'AI Governance'];

  // Logo URL (hosted on ImageKit)
  var LOGO_URL = 'https://ik.imagekit.io/Maxim/Bifrost-logo.svg';

  // Logo link destination
  var LOGO_LINK = 'https://www.getmaxim.ai/bifrost';

  // ============================================================
  // DO NOT EDIT BELOW THIS LINE (unless you know what you're doing)
  // ============================================================

  // Get random cohort on every page load
  function getCohort() {
    return COHORTS[Math.floor(Math.random() * COHORTS.length)];
  }

  function formatHeading(text) {
    return text
      .replace('{accent}', '<span class="bifrost-heading-accent">')
      .replace('{/accent}', '</span>');
  }

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
    return document.cookie.indexOf(SETTINGS.cookieName + '=1') !== -1;
  }

  function setDismissedCookie() {
    var date = new Date();
    date.setTime(date.getTime() + (SETTINGS.cookieExpireDays * 24 * 60 * 60 * 1000));
    document.cookie = SETTINGS.cookieName + '=1;expires=' + date.toUTCString() + ';path=/';
  }

  function injectStyles() {
    var style = document.createElement('style');
    style.id = 'bifrost-cta-styles';
    style.textContent = '.bifrost-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999999;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:opacity 0.3s ease,visibility 0.3s ease;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,sans-serif}.bifrost-modal-overlay.active{opacity:1;visibility:visible}.bifrost-modal{position:relative;box-sizing:border-box;display:flex;flex-direction:column;border:1px solid #e5e5e5;background-color:white;background-image:radial-gradient(circle,#e5e5e5 1px,transparent 1px);background-size:16px 16px;max-width:420px;width:90%;margin:16px;transform:scale(0.9) translateY(20px);transition:transform 0.3s ease}.bifrost-modal-overlay.active .bifrost-modal{transform:scale(1) translateY(0)}.bifrost-corner{position:absolute;width:8px;height:8px}.bifrost-corner-tl{top:0;left:0;transform:translate(-2px,-2px);border-top:1px solid #35c09e;border-left:1px solid #35c09e}.bifrost-corner-tr{top:0;right:0;transform:translate(2px,-2px);border-top:1px solid #35c09e;border-right:1px solid #35c09e}.bifrost-corner-bl{bottom:0;left:0;transform:translate(-2px,2px);border-bottom:1px solid #35c09e;border-left:1px solid #35c09e}.bifrost-corner-br{bottom:0;right:0;transform:translate(2px,2px);border-bottom:1px solid #35c09e;border-right:1px solid #35c09e}.bifrost-modal-content{position:relative;display:flex;flex-direction:column;gap:32px;padding:40px 32px}.bifrost-close-btn{position:absolute;top:12px;right:12px;width:28px;height:28px;background:transparent;border:1px solid #e5e5e5;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#6b7280;transition:background-color 0.2s,color 0.2s}.bifrost-close-btn:hover{background-color:#f3f4f6;color:#111827}.bifrost-logo-section{display:flex;flex-direction:column;align-items:center;gap:12px}.bifrost-logo-link{text-decoration:none}.bifrost-tagline{color:#35c09e;font-family:"SF Mono",Monaco,Consolas,monospace;font-size:12px;font-weight:500;letter-spacing:0.02em}.bifrost-text-section{text-align:center}.bifrost-heading{font-size:24px;line-height:1.3;font-weight:700;color:#111827;margin:0 0 12px 0}.bifrost-heading-accent{color:#35c09e}.bifrost-description{font-size:14px;line-height:1.6;color:#6b7280;margin:0;max-width:320px;margin-left:auto;margin-right:auto}.bifrost-buttons-section{display:flex;flex-direction:column;align-items:center;gap:12px}.bifrost-primary-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 20px;font-family:"SF Mono",Monaco,Consolas,monospace;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:white;background-color:#33C09E;border:2px solid #82ceb6;box-shadow:0 0 4px rgba(51,192,158,0.8);cursor:pointer;text-decoration:none;transition:background-color 0.2s}.bifrost-primary-btn:hover{background-color:#33A68B}.bifrost-btn-corner{position:absolute;width:4px;height:4px}.bifrost-btn-corner-tl{top:-0.5px;left:-0.5px;border-top:1px solid #177B62;border-left:1px solid #177B62}.bifrost-btn-corner-tr{top:-0.5px;right:-0.5px;border-top:1px solid #177B62;border-right:1px solid #177B62}.bifrost-btn-corner-bl{bottom:-0.5px;left:-0.5px;border-bottom:1px solid #177B62;border-left:1px solid #177B62}.bifrost-btn-corner-br{bottom:-0.5px;right:-0.5px;border-bottom:1px solid #177B62;border-right:1px solid #177B62}';
    document.head.appendChild(style);
  }

  function createModal(cohort) {
    var overlay = document.createElement('div');
    overlay.id = 'bifrost-cta-overlay';
    overlay.className = 'bifrost-modal-overlay';
    overlay.setAttribute('data-cohort', cohort.id);
    
    var html = '<div class="bifrost-modal">' +
      '<div class="bifrost-corner bifrost-corner-tl"></div>' +
      '<div class="bifrost-corner bifrost-corner-tr"></div>' +
      '<div class="bifrost-corner bifrost-corner-bl"></div>' +
      '<div class="bifrost-corner bifrost-corner-br"></div>' +
      '<div class="bifrost-modal-content">' +
        '<button class="bifrost-close-btn" aria-label="Close modal">' +
          '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1L13 13M13 1L1 13"/></svg>' +
        '</button>' +
        '<div class="bifrost-logo-section">' +
          '<a href="' + LOGO_LINK + '" target="_blank" rel="noopener noreferrer" class="bifrost-logo-link">' +
            '<img src="' + LOGO_URL + '" alt="Bifrost" style="height:45px;width:auto;" />' +
          '</a>' +
          '<div class="bifrost-tagline">' + cohort.tagline + '</div>' +
        '</div>' +
        '<div class="bifrost-text-section">' +
          '<h3 class="bifrost-heading">' + formatHeading(cohort.heading) + '</h3>' +
          '<p class="bifrost-description">' + cohort.description + '</p>' +
        '</div>' +
        '<div class="bifrost-buttons-section">' +
          '<a href="' + cohort.primaryBtn.url + '" target="_blank" rel="noopener noreferrer" class="bifrost-primary-btn">' +
            cohort.primaryBtn.text +
            '<span class="bifrost-btn-corner bifrost-btn-corner-tl"></span>' +
            '<span class="bifrost-btn-corner bifrost-btn-corner-tr"></span>' +
            '<span class="bifrost-btn-corner bifrost-btn-corner-bl"></span>' +
            '<span class="bifrost-btn-corner bifrost-btn-corner-br"></span>' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</div>';
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    // Track view
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'bifrost_modal_view',
        'cohort_id': cohort.id,
        'page_url': window.location.href
      });
    }

    // Track click
    var primaryBtn = overlay.querySelector('.bifrost-primary-btn');
    if (primaryBtn) {
      primaryBtn.addEventListener('click', function() {
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'bifrost_modal_click',
            'cohort_id': cohort.id,
            'button_text': cohort.primaryBtn.text,
            'destination': cohort.primaryBtn.url
          });
        }
      });
    }

    return overlay;
  }

  function showModal() {
    var overlay = document.getElementById('bifrost-cta-overlay');
    if (overlay && !isDismissed()) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function hideModal() {
    var overlay = document.getElementById('bifrost-cta-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      setDismissedCookie();
    }
  }

  function init() {
    if (!hasBifrostTag()) {
      console.log('Bifrost CTA Modal: Article does not have a Bifrost tag (LLM Gateway, AI Gateway, MCP Gateway, or AI Governance)');
      return;
    }
    if (isDismissed()) {
      console.log('Bifrost CTA Modal: Modal was previously dismissed');
      return;
    }
    if (document.getElementById('bifrost-cta-overlay')) return;

    var cohort = getCohort();
    console.log('Bifrost CTA Modal: Selected cohort:', cohort.id);

    injectStyles();
    var overlay = createModal(cohort);

    var closeBtn = overlay.querySelector('.bifrost-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideModal);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        hideModal();
      }
    });

    if (SETTINGS.triggerDelay > 0) {
      setTimeout(showModal, SETTINGS.triggerDelay);
    }

    if (SETTINGS.showOnExitIntent) {
      document.addEventListener('mouseout', function(e) {
        if (e.clientY < 10 && !isDismissed()) {
          showModal();
        }
      });
    }
  }

  window.BifrostCTA = {
    show: showModal,
    hide: hideModal,
    init: init
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
