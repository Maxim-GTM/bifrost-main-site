(function() {
  function injectStyles() {
    if (document.getElementById('maxim-incontent-cta-styles')) return;
    var style = document.createElement('style');
    style.id = 'maxim-incontent-cta-styles';
    style.textContent = '.maxim-content-banner{margin:32px 0;cursor:pointer;transition:transform 300ms ease}.maxim-content-banner:hover{transform:translateY(-2px)}.maxim-content-banner img{width:100%;height:auto;display:block;border-radius:16px;box-shadow:0 4px 16px rgba(138,228,219,0.2)}';
    document.head.appendChild(style);
  }

  const DEMO_URL = 'https://www.getmaxim.ai/demo';
  const MEMBER_CHECK_URL = `${location.origin}/members/api/member/`;
  const DESKTOP_BREAKPOINT = 1024; // Breakpoint for mobile vs desktop
  
  // CTA banner configuration for each tag with mobile and desktop versions
  const BANNER_CONFIG = {
    'observability': {
      desktop: {
        imageUrl: 'https://ik.imagekit.io/Maxim/In%20content%20CTA%20banner/Observability.png',
        altText: 'Maxim AI Observability'
      },
      mobile: {
        imageUrl: 'https://ik.imagekit.io/Maxim/In%20content%20CTA%20banner/Observability_mobile.png', // Update with your mobile asset URL
        altText: 'Maxim AI Observability'
      },
      utmMedium: 'cta_banner_observability'
    },
    'prompt-engineering': {
      desktop: {
        imageUrl: 'https://ik.imagekit.io/Maxim/In%20content%20CTA%20banner/Prompt.png',
        altText: 'Maxim AI Prompt Engineering'
      },
      mobile: {
        imageUrl: 'https://ik.imagekit.io/Maxim/In%20content%20CTA%20banner/Prompt_mobile.png', // Update with your mobile asset URL
        altText: 'Maxim AI Prompt Engineering'
      },
      utmMedium: 'cta_banner_prompt_engineering'
    },
    'evals': {
      desktop: {
        imageUrl: 'https://ik.imagekit.io/Maxim/In%20content%20CTA%20banner/Evaluation.png',
        altText: 'Maxim AI Evals'
      },
      mobile: {
        imageUrl: 'https://ik.imagekit.io/Maxim/In%20content%20CTA%20banner/Evaluation_mobile.png', // Update with your mobile asset URL
        altText: 'Maxim AI Evals'
      },
      utmMedium: 'cta_banner_evals'
    }
  };
  
  function isDesktop() {
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  }
  
  async function isMember() {
    try {
      const res = await fetch(MEMBER_CHECK_URL, { credentials: 'same-origin' });
      return res.status === 200;
    } catch (err) {
      return false;
    }
  }
  
  // Detect the article's tag
  function detectArticleTag() {
    // Check meta tags
    const metaTags = document.querySelectorAll('meta[property="article:tag"]');
    for (let meta of metaTags) {
      const content = meta.getAttribute('content');
      if (content === 'Observability') return 'observability';
      if (content === 'Prompt Engineering') return 'prompt-engineering';
      if (content === 'Evals') return 'evals';
    }
    
    return null;
  }
  
  function createBanner(bannerConfig, articleTag, position) {
    const deviceType = isDesktop() ? 'desktop' : 'mobile';
    const bannerData = bannerConfig[deviceType];
    
    const banner = document.createElement('a');
    banner.className = 'maxim-content-banner';
    banner.href = `${DEMO_URL}?utm_source=articles&utm_medium=${bannerConfig.utmMedium}&utm_campaign=inline_cta`;
    banner.setAttribute('data-tag', articleTag);
    banner.setAttribute('data-position', position);
    banner.setAttribute('data-device', deviceType);
    banner.innerHTML = `<img src="${bannerData.imageUrl}" alt="${bannerData.altText}" loading="lazy" />`;
    return banner;
  }
  
  function updateBannerImages() {
    const banners = document.querySelectorAll('.maxim-content-banner');
    const deviceType = isDesktop() ? 'desktop' : 'mobile';
    
    banners.forEach(banner => {
      const articleTag = banner.getAttribute('data-tag');
      const currentDevice = banner.getAttribute('data-device');
      
      // Only update if device type has changed
      if (currentDevice !== deviceType && BANNER_CONFIG[articleTag]) {
        const bannerData = BANNER_CONFIG[articleTag][deviceType];
        const img = banner.querySelector('img');
        if (img) {
          img.src = bannerData.imageUrl;
          img.alt = bannerData.altText;
          banner.setAttribute('data-device', deviceType);
        }
      }
    });
  }
  
  function insertBanners() {
    // Prevent duplicate banners
    if (document.querySelector('.maxim-content-banner')) {
      return;
    }
    
    // Detect the article tag
    const articleTag = detectArticleTag();
    
    // If no matching tag found, don't show banner
    if (!articleTag || !BANNER_CONFIG[articleTag]) {
      console.log('Maxim CTA: No matching tag found or banner not configured');
      return;
    }
    
    const bannerConfig = BANNER_CONFIG[articleTag];
    const article = document.querySelector('.gh-content, article, .post-content');
    if (!article) return;
    
    // Get all substantial paragraphs
    const allParagraphs = article.querySelectorAll('p');
    const substantialParagraphs = Array.from(allParagraphs).filter(p => 
      p.textContent.trim().length > 100 && !p.querySelector('img')
    );
    
    if (substantialParagraphs.length === 0) return;
    
    let bannersInserted = 0;
    
    // Banner 1: After first paragraph
    const firstParagraph = substantialParagraphs[0];
    if (firstParagraph) {
      const banner1 = createBanner(bannerConfig, articleTag, 'first');
      firstParagraph.parentNode.insertBefore(banner1, firstParagraph.nextSibling);
      bannersInserted++;
      console.log('Maxim CTA: Inserted banner 1 after first paragraph');
    }
    
    // Banner 2: Before first divider after 50% scroll
    const articleHeight = article.offsetHeight;
    const halfwayPoint = articleHeight / 2;
    const dividers = article.querySelectorAll('hr');
    
    let targetDivider = null;
    for (let divider of dividers) {
      const dividerPosition = divider.offsetTop;
      if (dividerPosition > halfwayPoint) {
        targetDivider = divider;
        break;
      }
    }
    
    if (targetDivider) {
      const banner2 = createBanner(bannerConfig, articleTag, 'middle');
      targetDivider.parentNode.insertBefore(banner2, targetDivider);
      bannersInserted++;
      console.log('Maxim CTA: Inserted banner 2 before divider at 50%+ scroll');
    } else {
      console.log('Maxim CTA: No divider found after 50% point, skipping banner 2');
    }
    
    // Banner 3: After last paragraph
    const lastParagraph = substantialParagraphs[substantialParagraphs.length - 1];
    if (lastParagraph) {
      const banner3 = createBanner(bannerConfig, articleTag, 'last');
      lastParagraph.parentNode.insertBefore(banner3, lastParagraph.nextSibling);
      bannersInserted++;
      console.log('Maxim CTA: Inserted banner 3 after last paragraph');
    }
    
    const deviceType = isDesktop() ? 'desktop' : 'mobile';
    console.log(`Maxim CTA: Total ${bannersInserted} ${articleTag} banners inserted for ${deviceType}`);
  }
  
  async function init() {
    const member = await isMember();
    if (!member) {
      injectStyles();
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertBanners);
      } else {
        insertBanners();
      }
      
      // Update banner images on window resize (with debouncing)
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          updateBannerImages();
        }, 250);
      });
    }
  }
  
  init();
})();