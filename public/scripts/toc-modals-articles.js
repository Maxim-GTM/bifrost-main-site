(function(){
  'use strict';

  // Inject Bricolage Grotesque font
  var fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // Inject styles
  var styleEl = document.createElement('style');
  styleEl.id = 'maxim-sidebar-styles';
  styleEl.textContent = '#maxim-left-sidebar{position:absolute;left:-9999px;top:0;width:280px;max-height:calc(100vh - 180px);overflow-y:auto;overflow-x:hidden;z-index:10;font-family:"Bricolage Grotesque",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;opacity:0;transition:opacity 0.2s ease,top 0.1s ease;padding-bottom:20px}#maxim-left-sidebar.positioned{opacity:1}#maxim-left-sidebar.sticky{position:fixed;top:140px;max-height:calc(100vh - 160px)}#maxim-left-sidebar.at-footer{position:absolute}#maxim-left-sidebar::-webkit-scrollbar{display:none}#maxim-left-sidebar{scrollbar-width:none;-ms-overflow-style:none}#maxim-left-divider{display:none}#maxim-right-sidebar{position:fixed;left:-9999px;top:140px;width:280px;max-height:calc(100vh - 180px);overflow:visible;z-index:10;font-family:"Bricolage Grotesque",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;display:flex;flex-direction:column;gap:20px;padding-bottom:20px;opacity:0;transition:opacity 0.2s ease}#maxim-right-sidebar.positioned{opacity:1}#maxim-right-sidebar.at-footer{position:absolute}#maxim-right-divider{position:absolute;left:-9999px;top:140px;width:1px;background:rgba(0,0,0,0.08);z-index:9;opacity:0;transition:opacity 0.2s ease}#maxim-right-divider.positioned{opacity:1}.mtoc-section{background:transparent;border:1px solid rgba(0,0,0,0.12);border-radius:0;padding:20px 16px;display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box}.mtoc-header{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:rgba(10,61,74,0.6);margin:0 0 16px 0}.mtoc-list{list-style:none;margin:0;padding:0;padding-right:8px;display:flex;flex-direction:column;gap:12px;overflow:visible}.mtoc-item{position:relative;padding-left:0}.mtoc-item.level-3{padding-left:16px}.mtoc-link{font-size:14px;line-height:1.4;color:rgba(10,61,74,0.75);text-decoration:none;display:block;transition:color 150ms ease}.mtoc-item.level-3 .mtoc-link{font-size:13px;color:rgba(10,61,74,0.65)}.mtoc-link:hover{color:#0a3d4a}.mtoc-item.active .mtoc-link{color:#0a3d4a;font-weight:500}.mpromo-card{background:transparent;border:none;border-radius:0;padding:0;display:block;flex-shrink:0;cursor:pointer;transition:transform 150ms ease,box-shadow 150ms ease}.mpromo-card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.1)}.mpromo-card:active{transform:translateY(0);box-shadow:0 2px 6px rgba(0,0,0,0.08)}.mpromo-card img{width:100%;height:auto;display:block;border-radius:0}.mproduct-card{background:transparent;border:1px solid rgba(0,0,0,0.12);border-radius:0;padding:20px 16px;display:flex;flex-direction:column;gap:14px;flex-shrink:0}.mproduct-icon{width:18px;height:18px;color:#0a3d4a;flex-shrink:0}.mproduct-icon svg{width:100%;height:100%;display:block}.mproduct-heading{font-size:16px;font-weight:600;line-height:1.3;margin:0;color:#0a3d4a}.mproduct-text{font-size:13px;line-height:1.5;color:rgba(10,61,74,0.85);margin:0}.mproduct-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:#0a3d4a;text-decoration:none;transition:gap 150ms ease;margin-top:auto}.mproduct-link:hover{gap:8px}.mproduct-link svg{width:16px;height:16px;transition:transform 150ms ease}.mproduct-link:hover svg{transform:translateX(2px)}@media (max-width:1439px){#maxim-left-sidebar,#maxim-left-divider,#maxim-right-sidebar,#maxim-right-divider{display:none !important}}';
  document.head.appendChild(styleEl);

  // Check if screen is wide enough for sidebar
  function isScreenWideEnough() {
    return window.innerWidth >= 1440;
  }
  
  if (!isScreenWideEnough()) {
    console.log('Maxim TOC sidebar: Screen too narrow, widget disabled');
    return;
  }

  // URL pattern check - only show on individual article pages
  function isArticlePage() {
    var pathname = window.location.pathname;
    var articlePattern = /^\/articles\/[^\/]+\/?$/;
    var excludePatterns = [
      /^\/articles\/?$/,
      /^\/articles\/page\/\d+\/?$/,
      /^\/articles\/author\/[^\/]+\/?$/,
      /^\/articles\/tag\/[^\/]+\/?$/
    ];
    
    for (var i = 0; i < excludePatterns.length; i++) {
      if (excludePatterns[i].test(pathname)) {
        return false;
      }
    }
    
    return articlePattern.test(pathname);
  }
  
  if (!isArticlePage()) {
    console.log('Maxim TOC sidebar: Not an article page, widget disabled');
    return;
  }

  // SVG Icons
  var ICONS = {
    comparison: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3L4 7L8 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 7H16C18.2091 7 20 8.79086 20 11V11C20 13.2091 18.2091 15 16 15H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 21L8 17L4 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2V7.5L4.5 18C3.83333 19.1667 4.66667 21 6 21H18C19.3333 21 20.1667 19.1667 19.5 18L14 7.5V2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 2H10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.5 14H15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11L10 13L14 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3V18C3 19.1046 3.89543 20 5 20H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 14V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bifrost: '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 29.8125C17.3804297 29.8002539 18.2608594 29.7880078 19.1679688 29.7753906C20.0097266 29.7734570 20.8514844 29.7715234 21.7187500 29.7695312C22.4915430 29.7654233 23.2643359 29.7613154 24.0605469 29.7570801C26 30 26 30 28 32C28.1875 34.5625 28.1875 34.5625 28 37C26.3779949 38.6215051 24.5797697 38.1294075 22.34375 38.1328125C20.9341602 38.1347461 20.9341602 38.1347461 19.4960938 38.1367188C18.5073828 38.1328516 17.5186719 38.1289844 16.5 38.125C15.5112891 38.1288672 14.5225781 38.1327344 13.5039062 38.1367188C12.5641797 38.1354297 11.6244531 38.1341406 10.65625 38.1328125C9.78806641 38.1316846 8.91988281 38.1305566 8.02539062 38.1294145C6 38 6 38 5 37C4.95919217 35.0004164 4.95745644 32.9995475 5 31C8.5360396 29.2319802 12.6057126 29.8153509 16.5 29.8125Z" fill="currentColor"/><path d="M10.65625 1.8671875C12.0658398 1.8652539 12.0658398 1.8652539 13.5039062 1.8632812C14.4926172 1.8671484 15.4813281 1.8710156 16.5 1.875C18.0156164 1.8692117 18.0156164 1.8692117 19.5625 1.8632812C20.5390625 1.8645703 21.5156250 1.8658594 22.5234375 1.8671875C23.4287109 1.8684961 24.3339844 1.8698047 25.2656250 1.8710938C27.34375 2 27.34375 2 28.34375 3C28.53125 5.4375 28.53125 5.4375 28.34375 8C26.34375 10 26.34375 10 24.4042969 10.2429324C23.6315039 10.2388235 22.8587109 10.2347147 22.0625 10.2304688C20.7998633 10.2275809 20.7998633 10.2275809 19.5117188 10.2246094C18.6312891 10.2123633 17.7508594 10.2001172 16.84375 10.1875C15.9633203 10.1871094 15.0828906 10.1867188 14.1757812 10.1863281C7.62455115 10.1411870 7.62455115 10.1411870 5.34375 9C5.30120644 6.9996650 5.30294217 4.9987961 5.34375 3C6.96575515 1.3662074 8.76398031 1.8578050 10.65625 1.8671875Z" fill="currentColor"/><path d="M16.5625 15.9375C17.696875 15.958125 18.83125 15.97875 20 16C20 18.64 20 21.28 20 24C17.6670523 24.0424172 15.3329743 24.0409294 13 24C12 23 12 23 11.8125 20C11.9931299 15.6648834 12.0547947 16.0154861 16.5625 15.9375Z" fill="currentColor"/><path d="M31 22.875C34 23 34 23 35 24C35.125 27 35.125 27 35 30C34 31 34 31 30.4375 31.0625C29.303125 31.041875 28.16875 31.02125 27 31C26.9575828 28.6670523 26.9590706 26.3329743 27 24C28 23 28 23 31 22.875Z" fill="currentColor"/><path d="M27 9C29.3329478 8.9575828 31.6670257 8.9590706 34 9C35 10 35 10 35.125 13C35 16 35 16 34 17C31 17.125 31 17.125 28 17C27 16 27 16 26.9375 12.4375C26.958125 11.303125 26.97875 10.16875 27 9Z" fill="currentColor"/></svg>'
  };

  // Configuration
  var CONFIG = {
    toc: {
      title: 'ON THIS PAGE',
      headingSelector: 'h2, h3',
      scrollOffset: 100
    },
    promoCard: {
      enabled: true,
      image: 'https://ik.imagekit.io/Maxim/Sidebar-CTA/eval-modal.png',
      ctaUrl: 'https://www.getmaxim.ai/evals-handbook?utm_medium=articles_cta_modal_group&utm_source=articles'
    },
    productCards: {
      'prompt-engineering': {
        icon: ICONS.flask,
        heading: 'Experimentation',
        text: 'Iterate on prompts and agents, run evaluations, and deploy confidently',
        linkText: 'Learn More',
        linkUrl: 'https://www.getmaxim.ai/products/experimentation?utm_medium=articles_cta_modal_group&utm_source=articles'
      },
      'evals': {
        icon: ICONS.search,
        heading: 'Agent simulation and evaluation',
        text: 'Simulate and evaluate agent interactions across scenarios and user personas',
        linkText: 'Learn More',
        linkUrl: 'https://www.getmaxim.ai/products/agent-simulation-evaluation?utm_medium=articles_cta_modal_group&utm_source=articles'
      },
      'observability': {
        icon: ICONS.chart,
        heading: 'Agent observability',
        text: 'Monitor granular traces and ensure quality of agent in production',
        linkText: 'Learn More',
        linkUrl: 'https://www.getmaxim.ai/products/agent-observability?utm_medium=articles_cta_modal_group&utm_source=articles'
      },
      'default': {
        icon: ICONS.bifrost,
        heading: 'Bifrost: The fastest enterprise AI gateway',
        text: 'Built for enterprise-grade reliability, governance, and scale',
        linkText: 'Learn More',
        linkUrl: 'https://www.getmaxim.ai/bifrost?utm_medium=articles_cta_modal_group&utm_source=articles'
      }
    }
  };

  var MEMBER_CHECK_URL = location.origin + '/members/api/member/';
  
  // Tags that should show Bifrost CTA instead of Evals Handbook
  var BIFROST_TAGS = ['LLM Gateway', 'AI Gateway', 'MCP Gateway', 'AI Governance'];

  function hasBifrostTag() {
    var metaTags = document.querySelectorAll('meta[property="article:tag"]');
    for (var i = 0; i < metaTags.length; i++) {
      var content = metaTags[i].getAttribute('content');
      if (BIFROST_TAGS.indexOf(content) !== -1) return true;
    }
    return false;
  }

  function detectArticleTag() {
    var metaTags = document.querySelectorAll('meta[property="article:tag"]');
    for (var i = 0; i < metaTags.length; i++) {
      var content = metaTags[i].getAttribute('content');
      if (content === 'Observability') return 'observability';
      if (content === 'Prompt Engineering') return 'prompt-engineering';
      if (content === 'Evals') return 'evals';
    }
    return 'default';
  }

  function calculateSidebarPositions() {
    var contentSelectors = [
      '.gh-content.gh-canvas',
      '.gh-content',
      '.gh-canvas',
      'article.gh-article',
      'article',
      '.article-content',
      '.post-content',
      '.content-wrapper',
      'main',
      '.post-full-content'
    ];
    
    var contentContainer = null;
    for (var i = 0; i < contentSelectors.length; i++) {
      contentContainer = document.querySelector(contentSelectors[i]);
      if (contentContainer) {
        console.log('Maxim Sidebars: Found content container with selector:', contentSelectors[i]);
        break;
      }
    }
    
    var windowWidth = window.innerWidth;
    
    if (!contentContainer) {
      console.log('Maxim Sidebars: No content container found, using viewport fallback');
      return {
        left: { sidebarLeft: 20, sidebarTop: 140 },
        right: { dividerLeft: windowWidth - 320, sidebarLeft: windowWidth - 290 }
      };
    }
    
    var contentElements = contentContainer.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    var actualContentLeftEdge = null;
    var actualContentRightEdge = null;
    
    if (contentElements.length > 0) {
      var minLeft = Infinity;
      var maxRight = 0;
      for (var i = 0; i < contentElements.length; i++) {
        var rect = contentElements[i].getBoundingClientRect();
        if (rect.left < minLeft) minLeft = rect.left;
        if (rect.right > maxRight) maxRight = rect.right;
      }
      actualContentLeftEdge = minLeft;
      actualContentRightEdge = maxRight;
    }
    
    var containerRect = contentContainer.getBoundingClientRect();
    var contentLeftEdge = actualContentLeftEdge || containerRect.left;
    var contentRightEdge = actualContentRightEdge || containerRect.right;
    
    var spaceLeft = contentLeftEdge;
    var spaceRight = windowWidth - contentRightEdge;
    
    var authorSidebar = document.querySelector('.gh-article-sidebar');
    var topPosition = 140;
    
    if (authorSidebar) {
      var authorRect = authorSidebar.getBoundingClientRect();
      var authorBottom = authorRect.bottom + window.scrollY;
      topPosition = authorBottom + 20;
    }
    
    var leftPositions;
    if (spaceLeft < 320) {
      leftPositions = { sidebarLeft: 20, sidebarTop: topPosition };
    } else {
      leftPositions = { sidebarLeft: contentLeftEdge - 310, sidebarTop: topPosition };
    }
    
    var rightPositions;
    if (spaceRight < 320) {
      rightPositions = { dividerLeft: windowWidth - 320, sidebarLeft: windowWidth - 290 };
    } else {
      rightPositions = { dividerLeft: contentRightEdge + 20, sidebarLeft: contentRightEdge + 30 };
    }
    
    return { left: leftPositions, right: rightPositions };
  }

  function updatePositions() {
    var positions = calculateSidebarPositions();
    
    var leftSidebar = document.getElementById('maxim-left-sidebar');
    if (leftSidebar) {
      leftSidebar.style.left = positions.left.sidebarLeft + 'px';
      leftSidebar.style.top = positions.left.sidebarTop + 'px';
      leftSidebar.classList.add('positioned');
    }
    
    var rightDivider = document.getElementById('maxim-right-divider');
    var rightSidebar = document.getElementById('maxim-right-sidebar');
    
    if (rightDivider) {
      rightDivider.style.left = positions.right.dividerLeft + 'px';
      rightDivider.classList.add('positioned');
    }
    
    if (rightSidebar) {
      rightSidebar.style.left = positions.right.sidebarLeft + 'px';
      rightSidebar.classList.add('positioned');
    }
  }

  function buildDividers() {
    var rightDivider = document.createElement('div');
    rightDivider.id = 'maxim-right-divider';
    document.body.appendChild(rightDivider);
    
    function updateDividerHeight() {
      var footer = document.querySelector('footer, .footer, .gh-footer, [role="contentinfo"]');
      if (footer) {
        var footerTop = footer.offsetTop;
        var dividerTop = 140;
        var height = footerTop - dividerTop - 60;
        rightDivider.style.height = height + 'px';
      }
    }
    
    setTimeout(function() { updatePositions(); }, 100);
    setTimeout(updateDividerHeight, 100);
    
    window.addEventListener('resize', function() {
      updateDividerHeight();
      updatePositions();
    });
    
    return { rightDivider: rightDivider };
  }

  function extractHeadings() {
    var contentSelectors = [
      '.gh-content.gh-canvas',
      '.gh-content',
      'article.gh-article .gh-canvas',
      'article',
      '.article-content',
      '.post-content',
      'main'
    ];
    
    var articleContent = null;
    for (var i = 0; i < contentSelectors.length; i++) {
      articleContent = document.querySelector(contentSelectors[i]);
      if (articleContent) break;
    }
    
    if (!articleContent) return [];
    
    var headings = articleContent.querySelectorAll(CONFIG.toc.headingSelector);
    var tocItems = [];
    
    var excludedSections = [
      '.gh-read-next', '.read-next', '.related-posts', '.post-footer',
      '.article-footer', '.gh-article-sidebar', '[class*="read-next"]',
      '[class*="related"]', 'aside', 'footer'
    ];
    
    for (var i = 0; i < headings.length; i++) {
      var heading = headings[i];
      var isExcluded = false;
      
      for (var j = 0; j < excludedSections.length; j++) {
        if (heading.closest(excludedSections[j])) {
          isExcluded = true;
          break;
        }
      }
      
      if (isExcluded) continue;
      
      if (!heading.id) {
        var text = heading.textContent.trim();
        var id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/--+/g, '-')
          .substring(0, 50);
        heading.id = id || 'heading-' + i;
      }
      
      tocItems.push({
        id: heading.id,
        text: heading.textContent.trim(),
        level: parseInt(heading.tagName.substring(1)),
        element: heading
      });
    }
    
    return tocItems;
  }

  function buildTOC(tocItems) {
    if (tocItems.length === 0) return '';
    
    var listItems = '';
    for (var i = 0; i < tocItems.length; i++) {
      var item = tocItems[i];
      listItems += '<li class="mtoc-item level-' + item.level + '" data-heading-id="' + item.id + '">' +
        '<a href="#' + item.id + '" class="mtoc-link">' + item.text + '</a></li>';
    }
    
    return '<div class="mtoc-section"><h4 class="mtoc-header">' + CONFIG.toc.title + '</h4>' +
      '<ul class="mtoc-list">' + listItems + '</ul></div>';
  }
  
  function buildLeftSidebar() {
    if (document.getElementById('maxim-left-sidebar')) return null;
    
    var tocItems = extractHeadings();
    var tocHTML = buildTOC(tocItems);
    
    if (!tocHTML) return null;
    
    var sidebar = document.createElement('div');
    sidebar.id = 'maxim-left-sidebar';
    sidebar.setAttribute('role', 'complementary');
    sidebar.setAttribute('aria-label', 'Table of contents');
    sidebar.innerHTML = tocHTML;
    document.body.appendChild(sidebar);
    
    setTimeout(function() { updatePositions(); }, 100);
    
    if (tocItems.length > 0) {
      setupTOCInteractions(sidebar, tocItems);
    }
    
    setupLeftSidebarSticky(sidebar);
    
    return sidebar;
  }
  
  function setupLeftSidebarSticky(sidebar) {
    var initialTopPosition = null;
    var stickyThreshold = null;
    var currentState = 'absolute';
    var lastScrollY = 0;
    
    function calculateThreshold() {
      var positions = calculateSidebarPositions();
      initialTopPosition = positions.left.sidebarTop;
      stickyThreshold = initialTopPosition - 140;
      return positions;
    }
    
    function handleScroll() {
      var scrollTop = window.scrollY || window.pageYOffset;
      
      if (Math.abs(scrollTop - lastScrollY) < 5 && currentState !== 'absolute') return;
      lastScrollY = scrollTop;
      
      if (initialTopPosition === null || stickyThreshold === null) {
        calculateThreshold();
        if (initialTopPosition === null || stickyThreshold === null) return;
      }
      
      var footer = document.querySelector('footer, .footer, .gh-footer, [role="contentinfo"]');
      var positions = calculateSidebarPositions();
      var targetState = 'absolute';
      
      if (footer) {
        var footerTop = footer.offsetTop;
        var sidebarHeight = sidebar.offsetHeight;
        var sidebarBottomIfSticky = scrollTop + 140 + sidebarHeight;
        
        if (sidebarBottomIfSticky >= footerTop - 20) {
          targetState = 'footer';
        } else if (scrollTop >= stickyThreshold) {
          targetState = 'sticky';
        }
      } else if (scrollTop >= stickyThreshold) {
        targetState = 'sticky';
      }
      
      if (targetState !== currentState) {
        currentState = targetState;
        sidebar.classList.remove('sticky', 'at-footer');
        
        if (targetState === 'footer') {
          sidebar.classList.add('at-footer');
          sidebar.style.position = 'absolute';
          sidebar.style.left = positions.left.sidebarLeft + 'px';
          sidebar.style.top = (footer.offsetTop - sidebar.offsetHeight - 20) + 'px';
        } else if (targetState === 'sticky') {
          sidebar.classList.add('sticky');
          sidebar.style.position = 'fixed';
          sidebar.style.left = positions.left.sidebarLeft + 'px';
          sidebar.style.top = '140px';
        } else {
          sidebar.style.position = 'absolute';
          sidebar.style.left = positions.left.sidebarLeft + 'px';
          sidebar.style.top = initialTopPosition + 'px';
        }
      }
    }
    
    setTimeout(function() {
      calculateThreshold();
      handleScroll();
    }, 200);
    
    var scrollTimeout = null;
    var isScrolling = false;
    
    window.addEventListener('scroll', function() {
      if (isScrolling) return;
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      handleScroll();
      scrollTimeout = setTimeout(function() {
        handleScroll();
        isScrolling = false;
        scrollTimeout = null;
      }, 50);
    }, { passive: true });
    
    var resizeTimeout = null;
    window.addEventListener('resize', function() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        currentState = 'absolute';
        initialTopPosition = null;
        stickyThreshold = null;
        calculateThreshold();
        handleScroll();
        resizeTimeout = null;
      }, 150);
    });
    
    window.addEventListener('load', function() {
      setTimeout(function() {
        currentState = 'absolute';
        initialTopPosition = null;
        stickyThreshold = null;
        calculateThreshold();
        handleScroll();
      }, 300);
    });
  }

  function buildPromoCard() {
    if (!CONFIG.promoCard.enabled) return '';
    // Skip promo card for Bifrost-related tags (handled by bifrost-gateway-cta.js)
    if (hasBifrostTag()) return '';
    return '<a href="' + CONFIG.promoCard.ctaUrl + '" class="mpromo-card" data-card="promo">' +
      '<img src="' + CONFIG.promoCard.image + '" alt="Download Evals Handbook"></a>';
  }

  function buildProductCard() {
    var articleTag = detectArticleTag();
    var productData = CONFIG.productCards[articleTag];
    if (!productData) return '';
    
    return '<div class="mproduct-card">' +
      '<div class="mproduct-icon">' + productData.icon + '</div>' +
      '<h4 class="mproduct-heading">' + productData.heading + '</h4>' +
      '<p class="mproduct-text">' + productData.text + '</p>' +
      '<a href="' + productData.linkUrl + '" class="mproduct-link" data-card="product" data-tag="' + articleTag + '">' +
      productData.linkText + ICONS.arrow + '</a></div>';
  }

  function buildRightSidebar() {
    if (document.getElementById('maxim-right-sidebar')) return null;
    
    var promoHTML = buildPromoCard();
    var productHTML = buildProductCard();
    
    if (!promoHTML && !productHTML) return null;
    
    var sidebar = document.createElement('div');
    sidebar.id = 'maxim-right-sidebar';
    sidebar.setAttribute('role', 'complementary');
    sidebar.setAttribute('aria-label', 'Promotional content');
    sidebar.innerHTML = promoHTML + productHTML;
    document.body.appendChild(sidebar);
    
    var images = sidebar.querySelectorAll('img');
    if (images.length > 0) {
      var imagesLoaded = 0;
      var totalImages = images.length;
      
      var checkAllImagesLoaded = function() {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
          setTimeout(function() { updatePositions(); }, 100);
        }
      };
      
      for (var i = 0; i < images.length; i++) {
        if (images[i].complete) {
          checkAllImagesLoaded();
        } else {
          images[i].addEventListener('load', checkAllImagesLoaded);
          images[i].addEventListener('error', checkAllImagesLoaded);
        }
      }
    } else {
      setTimeout(function() { updatePositions(); }, 100);
    }
    
    var articleTag = detectArticleTag();
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'sidebar_view',
        'page_url': window.location.href,
        'sidebar_type': 'promotional',
        'article_tag': articleTag
      });
    }
    
    var cards = sidebar.querySelectorAll('[data-card]');
    for (var i = 0; i < cards.length; i++) {
      (function(el) {
        el.addEventListener('click', function() {
          var cardType = el.getAttribute('data-card');
          var tag = el.getAttribute('data-tag');
          if (window.dataLayer) {
            window.dataLayer.push({
              'event': 'sidebar_card_click',
              'card_type': cardType,
              'article_tag': tag || 'unknown',
              'destination': el.href
            });
          }
        });
      })(cards[i]);
    }
    
    setupFooterDetection(sidebar, 'right');
    
    return sidebar;
  }

  function setupTOCInteractions(sidebar, tocItems) {
    var tocLinks = sidebar.querySelectorAll('.mtoc-link');
    var tocListItems = sidebar.querySelectorAll('.mtoc-item');
    
    for (var i = 0; i < tocLinks.length; i++) {
      (function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          var targetId = link.getAttribute('href').substring(1);
          var targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            var offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - CONFIG.toc.scrollOffset;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            
            if (window.dataLayer) {
              window.dataLayer.push({
                'event': 'toc_click',
                'heading': targetElement.textContent.trim()
              });
            }
          }
        });
      })(tocLinks[i]);
    }
    
    function scrollTOCToActiveItem(activeItem) {
      if (!activeItem) return;
      
      var tocContainer = sidebar;
      var itemRect = activeItem.getBoundingClientRect();
      var containerRect = tocContainer.getBoundingClientRect();
      
      var itemTop = itemRect.top - containerRect.top + tocContainer.scrollTop;
      var itemBottom = itemTop + itemRect.height;
      
      var containerScrollTop = tocContainer.scrollTop;
      var containerHeight = tocContainer.clientHeight;
      var containerScrollBottom = containerScrollTop + containerHeight;
      
      if (itemTop < containerScrollTop + 50) {
        tocContainer.scrollTo({ top: itemTop - 50, behavior: 'smooth' });
      } else if (itemBottom > containerScrollBottom - 50) {
        tocContainer.scrollTo({ top: itemBottom - containerHeight + 50, behavior: 'smooth' });
      }
    }
    
    var activeIndex = -1;
    
    function updateActiveSection() {
      var scrollPos = window.scrollY + CONFIG.toc.scrollOffset + 50;
      var newActiveIndex = -1;
      
      for (var i = tocItems.length - 1; i >= 0; i--) {
        var heading = tocItems[i].element;
        if (heading.offsetTop <= scrollPos) {
          newActiveIndex = i;
          break;
        }
      }
      
      if (newActiveIndex !== activeIndex) {
        for (var i = 0; i < tocListItems.length; i++) {
          tocListItems[i].classList.remove('active');
        }
        if (newActiveIndex >= 0) {
          tocListItems[newActiveIndex].classList.add('active');
          scrollTOCToActiveItem(tocListItems[newActiveIndex]);
        }
        activeIndex = newActiveIndex;
      }
    }
    
    var scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(function() {
        updateActiveSection();
        scrollTimeout = null;
      }, 50);
    }, { passive: true });
    
    setTimeout(updateActiveSection, 100);
  }

  function setupFooterDetection(sidebar, side) {
    if (side === 'left') return;
    
    var isAbsolute = false;
    
    function checkFooterProximity() {
      var footer = document.querySelector('footer, .footer, .gh-footer, [role="contentinfo"]');
      if (!footer) return;
      
      var scrollTop = window.scrollY || window.pageYOffset;
      var footerTopFromDocStart = footer.offsetTop;
      var sidebarHeight = sidebar.offsetHeight;
      var sidebarTop = 140;
      var sidebarBottomIfFixed = scrollTop + sidebarTop + sidebarHeight;
      
      if (sidebarBottomIfFixed >= footerTopFromDocStart - 20) {
        if (!isAbsolute) {
          isAbsolute = true;
          sidebar.classList.add('at-footer');
          var leftValue = getComputedStyle(sidebar).left;
          sidebar.style.left = leftValue;
          sidebar.style.top = (footerTopFromDocStart - sidebarHeight - 20) + 'px';
          sidebar.classList.add('positioned');
        }
      } else {
        if (isAbsolute) {
          isAbsolute = false;
          sidebar.classList.remove('at-footer');
          sidebar.style.position = '';
          sidebar.style.top = '';
          sidebar.style.left = '';
          updatePositions();
        }
      }
    }
    
    var scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(function() {
        checkFooterProximity();
        scrollTimeout = null;
      }, 10);
    }, { passive: true });
    
    setTimeout(checkFooterProximity, 100);
  }

  function isMember() {
    return fetch(MEMBER_CHECK_URL, { credentials: 'same-origin' })
      .then(function(res) { return res.status === 200; })
      .catch(function() { return false; });
  }

  function init() {
    isMember().then(function(member) {
      if (!member) {
        buildDividers();
        buildLeftSidebar();
        buildRightSidebar();
      }
    }).catch(function() {
      buildDividers();
      buildLeftSidebar();
      buildRightSidebar();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 50);
  }

})();
