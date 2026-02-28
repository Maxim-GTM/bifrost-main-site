(function() {
    function injectStyles() {
      if (document.getElementById('maxim-testimonial-styles')) return;
      var style = document.createElement('style');
      style.id = 'maxim-testimonial-styles';
      style.textContent = '.maxim-testimonial-banner{margin:32px 0;padding:32px;background:linear-gradient(135deg,#E5F9F6 0%,#D4F5F0 50%,#C8F2EB 100%);border-radius:0;box-shadow:0 4px 16px rgba(138,228,219,0.3);border:1px solid rgba(138,228,219,0.2)}.maxim-testimonial-quote{font-size:1.5rem;line-height:1.6;color:#1e293b;margin-bottom:16px}.maxim-testimonial-attribution{display:flex;align-items:center;gap:8px;font-size:1.25rem;color:#475569;margin-bottom:24px}.maxim-testimonial-author{font-weight:600;color:#0f172a}.maxim-testimonial-company{color:#0d9488;text-decoration:none;transition:color 200ms ease;font-weight:500}.maxim-testimonial-company:hover{color:#0f766e;text-decoration:underline}.maxim-testimonial-video-intro{font-size:1.125rem;color:#475569;margin:24px 0 16px 0;font-weight:500}.maxim-testimonial-video{position:relative;width:100%;max-width:720px;border-radius:0;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1)}.maxim-testimonial-video video{width:100%;height:auto;display:block;cursor:pointer}@media (max-width:1023px){.maxim-testimonial-banner{display:none}}';
      document.head.appendChild(style);
    }
  
    const MEMBER_CHECK_URL = `${location.origin}/members/api/member/`;
    const DESKTOP_MIN_WIDTH = 1024;
    const VIDEO_URL = 'https://maxim-cdn.t3.storage.dev/Video_Assets/akshay-bifrost-video.mp4';
    const VIDEO_THUMBNAIL = 'https://maxim-cdn.t3.storage.dev/Image_Assets/akshay-video-thumbnail.png';
    const BIFROST_TAGS = ['LLM Gateway', 'AI Gateway', 'MCP Gateway', 'AI Governance'];
    
    // Single testimonial content shown for Bifrost-tagged articles
    const TESTIMONIAL_CONTENT = {
      quote: '"Just purely because of the choices we have made, the multi-layered architecture, we are able to build the best in class features in Bifrost."',
      author: 'Akshay Deo',
      authorTitle: 'CTO',
      companyName: 'Maxim AI',
      companyUrl: 'https://www.getmaxim.ai/bifrost',
      videoIntro: 'Watch how Bifrost helps teams scale enterprise AI applications.',
      videoUrl: VIDEO_URL,
      thumbnail: VIDEO_THUMBNAIL
    };
    
    function isDesktop() {
      return window.innerWidth >= DESKTOP_MIN_WIDTH;
    }
    
    async function isMember() {
      try {
        const res = await fetch(MEMBER_CHECK_URL, { credentials: 'same-origin' });
        return res.status === 200;
      } catch (err) {
        return false;
      }
    }
    
    function hasBifrostTag() {
      const metaTags = document.querySelectorAll('meta[property="article:tag"]');
      for (let meta of metaTags) {
        const content = meta.getAttribute('content');
        if (BIFROST_TAGS.indexOf(content) !== -1) return true;
      }
      return false;
    }
    
    function createTestimonialBanner(config, articleTag) {
      const banner = document.createElement('div');
      banner.className = 'maxim-testimonial-banner';
      banner.setAttribute('data-tag', articleTag);
      
      banner.innerHTML = `
        <div class="maxim-testimonial-quote">
          ${config.quote}
        </div>
        <div class="maxim-testimonial-attribution">
          <span class="maxim-testimonial-author">— ${config.author},</span>
          <span>${config.authorTitle} at <a href="${config.companyUrl}" class="maxim-testimonial-company" target="_blank" rel="noopener">${config.companyName}</a></span>
        </div>
        <div class="maxim-testimonial-video-intro">
          ${config.videoIntro}
        </div>
        <div class="maxim-testimonial-video">
          <video 
            controls
            preload="metadata"
            poster="${config.thumbnail}"
            title="${config.companyName} Testimonial Video">
            <source src="${config.videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `;
      
      return banner;
    }
    
    function findFirstParagraphAfterElement(element) {
      let sibling = element.nextElementSibling;
      
      while (sibling) {
        // Check if it's a paragraph with substantial content
        if (sibling.tagName === 'P' && sibling.textContent.trim().length > 50) {
          return sibling;
        }
        sibling = sibling.nextElementSibling;
      }
      
      return null;
    }
    
    function insertTestimonialBanner() {
      // Desktop only check
      if (!isDesktop()) {
        console.log('Maxim Testimonial: Mobile/tablet detected, skipping banner');
        return;
      }
      
      // Prevent duplicate banners
      if (document.querySelector('.maxim-testimonial-banner')) {
        return;
      }
      
      if (!hasBifrostTag()) {
        console.log('Bifrost Testimonial: No matching Bifrost tag found');
        return;
      }
      
      const config = TESTIMONIAL_CONTENT;
      const article = document.querySelector('.gh-content, article, .post-content');
      if (!article) return;
      
      // Find all headings (h1, h2, h3, h4, h5, h6) in the article
      const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      // Look for a heading that mentions "Maxim AI" (case insensitive)
      let targetHeading = null;
      for (let heading of headings) {
        const headingText = heading.textContent.toLowerCase();
        if (headingText.includes('maxim ai') || headingText.includes('maxim')) {
          targetHeading = heading;
          break;
        }
      }
      
      if (!targetHeading) {
        console.log('Maxim Testimonial: No heading mentioning Maxim AI found, skipping banner');
        return;
      }
      
      // Find the first paragraph after this heading
      const firstParagraph = findFirstParagraphAfterElement(targetHeading);
      
      if (!firstParagraph) {
        console.log('Maxim Testimonial: No paragraph found after Maxim AI heading, skipping banner');
        return;
      }
      
      // Insert banner after the first paragraph following the heading
      const testimonialBanner = createTestimonialBanner(config, 'bifrost');
      firstParagraph.parentNode.insertBefore(testimonialBanner, firstParagraph.nextSibling);
      console.log(`Bifrost Testimonial: Inserted banner after paragraph following "${targetHeading.textContent.trim()}"`);
    }
    
    async function init() {
      const member = await isMember();
      if (!member) {
        injectStyles();
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', insertTestimonialBanner);
        } else {
          insertTestimonialBanner();
        }
      }
    }
    
    init();
  })();
  