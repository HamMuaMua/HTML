/**
 * 高级滚动效果插件
 */
export const initScrollEffects = () => {
  // 1. 导航栏滚动效果
  const navbar = document.querySelector('.navbar');
  const heroSection = document.querySelector('.hero');
  
  const handleNavbarScroll = () => {
    const heroHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;
    
    // 滚动超过英雄区域时改变导航栏样式
    navbar.classList.toggle('scrolled', scrollPosition > heroHeight * 0.8);
    
    // 视差效果
    if (heroSection) {
      const parallaxValue = scrollPosition * 0.3;
      heroSection.style.backgroundPositionY = `${parallaxValue}px`;
    }
  };

  // 2. 滚动触发动画
  const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.dataset.animate;
          
          element.classList.add('animate__animated', `animate__${animationType}`);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
  };

  // 3. 平滑滚动锚点链接
  const setupSmoothLinks = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // 4. 滚动进度指示器
  const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = 'var(--accent-color)';
    progressBar.style.zIndex = '1000';
    progressBar.style.width = '0';
    progressBar.style.transition = 'width 0.1s linear';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      progressBar.style.width = `${progress}%`;
    });
  };

  // 初始化所有滚动效果
  window.addEventListener('scroll', debounce(handleNavbarScroll, 20));
  window.addEventListener('load', () => {
    animateOnScroll();
    setupSmoothLinks();
    createScrollProgress();
  });
};

// 防抖函数
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
