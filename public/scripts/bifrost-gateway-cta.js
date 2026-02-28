(function() {
  'use strict';

  // Cohort definitions for A/B testing
  var COHORTS = [
    {
      id: 'enterprise',
      title: 'Enterprise AI Gateway',
      subtitle: 'Route, govern, and observe AI traffic across your organization with ultra-low latency, high throughput.',
      primaryBtn: { text: 'Book a Demo', url: 'https://www.getmaxim.ai/bifrost/book-a-demo?utm_medium=articles_cta_sidebar&utm_source=articles&utm_campaign=enterprise' },
      secondaryBtn: { text: 'Learn More', url: 'https://www.getmaxim.ai/bifrost/enterprise?utm_medium=articles_cta_sidebar&utm_source=articles&utm_campaign=enterprise' }
    },
    {
      id: 'mcp',
      title: 'MCP Gateway',
      subtitle: 'Turn AI models into action-capable agents with 50% fewer tokens and full security control.',
      primaryBtn: { text: 'Learn More', url: 'https://www.getmaxim.ai/bifrost/resources/mcp-gateway?utm_medium=articles_cta_sidebar&utm_source=articles&utm_campaign=mcp' },
      secondaryBtn: { text: 'View Docs', url: 'https://docs.getbifrost.ai/mcp/overview?utm_medium=articles_cta_sidebar&utm_source=articles&utm_campaign=mcp' }
    },
    {
      id: 'claude-code',
      title: 'Claude Code + Bifrost',
      subtitle: 'Enterprise controls for Claude Code: multi-provider routing, budgets, and guardrails.',
      primaryBtn: { text: 'See How It Works', url: 'https://www.getmaxim.ai/bifrost/resources/claude-code?utm_medium=articles_cta_sidebar&utm_source=articles&utm_campaign=claude-code' },
      secondaryBtn: { text: 'Visit Github', url: 'https://github.com/maximhq/bifrost?utm_medium=articles_cta_sidebar&utm_source=articles&utm_campaign=claude-code' }
    },
    {
      id: 'benchmarks',
      title: '50x Faster Than LiteLLM',
      subtitle: '11µs overhead at 5,000 RPS. See the benchmarks that prove Bifrost\'s performance.',
      primaryBtn: { text: 'View Benchmarks', url: 'https://www.getmaxim.ai/bifrost/resources/benchmarks?utm_medium=articles_cta_sidebar&utm_source=articles&utm_campaign=benchmarks' },
      secondaryBtn: { text: 'Visit Github', url: 'https://github.com/maximhq/bifrost?utm_medium=articles_cta_sidebar&utm_source=articles&utm_campaign=benchmarks' }
    }
  ];

  // Tags that trigger the Bifrost Gateway CTA
  var BIFROST_TAGS = ['LLM Gateway', 'AI Gateway', 'MCP Gateway', 'AI Governance'];

  // Get random cohort on every page load
  function getCohort() {
    return COHORTS[Math.floor(Math.random() * COHORTS.length)];
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

  function injectStyles() {
    if (document.getElementById('bifrost-gateway-cta-styles')) return;
    
    var style = document.createElement('style');
    style.id = 'bifrost-gateway-cta-styles';
    style.textContent = [
      '.bgw-card{background:#fff;border:1px solid #e5e5e5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;overflow:hidden;position:relative}',
      '.bgw-card::before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle,#e5e5e5 1px,transparent 1px);background-size:16px 16px;opacity:0.5;pointer-events:none}',
      '.bgw-corner{position:absolute;width:6px;height:6px}',
      '.bgw-corner-tl{top:-1px;left:-1px;border-top:1px solid #d1d5db;border-left:1px solid #d1d5db}',
      '.bgw-corner-tr{top:-1px;right:-1px;border-top:1px solid #d1d5db;border-right:1px solid #d1d5db}',
      '.bgw-corner-bl{bottom:-1px;left:-1px;border-bottom:1px solid #d1d5db;border-left:1px solid #d1d5db}',
      '.bgw-corner-br{bottom:-1px;right:-1px;border-bottom:1px solid #d1d5db;border-right:1px solid #d1d5db}',
      '.bgw-content{position:relative;padding:24px 20px;text-align:center}',
      '.bgw-logo{margin-bottom:16px;display:flex;justify-content:center}',
      '.bgw-logo img{height:32px;width:auto;display:block}',
      '.bgw-title{font-size:16px;font-weight:700;color:#0a3d4a;margin:0 0 8px 0;line-height:1.3}',
      '.bgw-subtitle{font-size:13px;color:#64748b;margin:0 0 20px 0;line-height:1.5}',
      '.bgw-buttons{display:flex;flex-direction:column;gap:8px}',
      '.bgw-btn{display:flex;align-items:center;justify-content:center;padding:10px 16px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;text-decoration:none;transition:all 0.15s ease;font-family:"SF Mono",Monaco,Consolas,monospace;position:relative}',
      '.bgw-btn-primary{background:#33C09E;color:#fff;border:2px solid #82ceb6;box-shadow:0 0 8px rgba(51,192,158,0.3)}',
      '.bgw-btn-primary:hover{background:#2aa382;box-shadow:0 0 12px rgba(51,192,158,0.5);transform:translateY(-1px)}',
      '.bgw-btn-primary .bgw-btn-corner{position:absolute;width:4px;height:4px}',
      '.bgw-btn-primary .bgw-btn-corner-tl{top:-1px;left:-1px;border-top:1px solid #177B62;border-left:1px solid #177B62}',
      '.bgw-btn-primary .bgw-btn-corner-tr{top:-1px;right:-1px;border-top:1px solid #177B62;border-right:1px solid #177B62}',
      '.bgw-btn-primary .bgw-btn-corner-bl{bottom:-1px;left:-1px;border-bottom:1px solid #177B62;border-left:1px solid #177B62}',
      '.bgw-btn-primary .bgw-btn-corner-br{bottom:-1px;right:-1px;border-bottom:1px solid #177B62;border-right:1px solid #177B62}',
      '.bgw-btn-secondary{background:transparent;color:#0a3d4a;border:1px solid #e5e5e5}',
      '.bgw-btn-secondary:hover{background:#f8fafc;border-color:#d1d5db}'
    ].join('');
    document.head.appendChild(style);
  }

  function buildGatewayCard(cohort) {
    return '<div class="bgw-card">' +
      '<div class="bgw-corner bgw-corner-tl"></div>' +
      '<div class="bgw-corner bgw-corner-tr"></div>' +
      '<div class="bgw-corner bgw-corner-bl"></div>' +
      '<div class="bgw-corner bgw-corner-br"></div>' +
      '<div class="bgw-content">' +
        '<div class="bgw-logo">' +
          '<img src="https://ik.imagekit.io/Maxim/Bifrost-logo.svg" alt="Bifrost" />' +
        '</div>' +
        '<h4 class="bgw-title">' + cohort.title + '</h4>' +
        '<p class="bgw-subtitle">' + cohort.subtitle + '</p>' +
        '<div class="bgw-buttons">' +
          '<a href="' + cohort.primaryBtn.url + '" class="bgw-btn bgw-btn-primary" target="_blank" rel="noopener noreferrer">' +
            cohort.primaryBtn.text +
            '<span class="bgw-btn-corner bgw-btn-corner-tl"></span>' +
            '<span class="bgw-btn-corner bgw-btn-corner-tr"></span>' +
            '<span class="bgw-btn-corner bgw-btn-corner-bl"></span>' +
            '<span class="bgw-btn-corner bgw-btn-corner-br"></span>' +
          '</a>' +
          '<a href="' + cohort.secondaryBtn.url + '" class="bgw-btn bgw-btn-secondary" target="_blank" rel="noopener noreferrer">' +
            cohort.secondaryBtn.text +
          '</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function injectGatewayCard(cohort) {
    // Check if already injected
    if (document.getElementById('bifrost-gateway-cta')) {
      return true;
    }

    // Only inject if right sidebar exists (means promo or product card was rendered)
    var rightSidebar = document.getElementById('maxim-right-sidebar');
    if (!rightSidebar) {
      console.log('Bifrost Gateway CTA: No sidebar found, skipping injection');
      return false;
    }

    var wrapper = document.createElement('div');
    wrapper.id = 'bifrost-gateway-cta';
    wrapper.setAttribute('data-cohort', cohort.id);
    wrapper.innerHTML = buildGatewayCard(cohort);

    // Prepend to sidebar so it appears at the top
    rightSidebar.insertBefore(wrapper, rightSidebar.firstChild);
    console.log('Bifrost Gateway CTA: Injected into sidebar with cohort:', cohort.id);

    // Track view
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'gateway_cta_view',
        'cohort_id': cohort.id,
        'cohort_title': cohort.title,
        'page_url': window.location.href
      });
    }

    // Track clicks
    var links = wrapper.querySelectorAll('a.bgw-btn');
    for (var i = 0; i < links.length; i++) {
      (function(link) {
        link.addEventListener('click', function() {
          if (window.dataLayer) {
            window.dataLayer.push({
              'event': 'gateway_cta_click',
              'cohort_id': cohort.id,
              'click_type': link.classList.contains('bgw-btn-primary') ? 'primary' : 'secondary',
              'button_text': link.textContent.trim(),
              'destination': link.href
            });
          }
        });
      })(links[i]);
    }

    return true;
  }

  function init() {
    if (!hasBifrostTag()) {
      console.log('Bifrost Gateway CTA: Article does not have a Bifrost tag (LLM Gateway, AI Gateway, MCP Gateway, or AI Governance)');
      return;
    }

    var cohort = getCohort();
    console.log('Bifrost Gateway CTA: Selected cohort:', cohort.id);
    
    injectStyles();

    var attempts = 0;
    var maxAttempts = 50;
    
    function tryInject() {
      attempts++;
      if (injectGatewayCard(cohort)) {
        return;
      }
      if (attempts < maxAttempts) {
        setTimeout(tryInject, 100);
      } else {
        console.log('Bifrost Gateway CTA: Could not find sidebar after ' + maxAttempts + ' attempts');
      }
    }

    setTimeout(tryInject, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }
})();
