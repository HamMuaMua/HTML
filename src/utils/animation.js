/**
 * 动画效果工具
 */

// 渐显动画
export const fadeIn = (element, duration = 300) => {
  element.style.opacity = 0;
  element.style.display = 'block';
  
  let start = null;
  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.min(progress / duration, 1);
    element.style.opacity = opacity;
    
    if (progress < duration) {
      window.requestAnimationFrame(animate);
    }
  };
  
  window.requestAnimationFrame(animate);
};

// 滚动动画
export const scrollToElement = (element, duration = 500, offset = 0) => {
  const start = window.pageYOffset;
  const to = element.getBoundingClientRect().top + start - offset;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + (to - start) * easeInOutCubic(progress));
    
    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  requestAnimationFrame(animateScroll);
};

// 音乐波动画
export const createMusicWave = (element) => {
  const wave = document.createElement('div');
  wave.className = 'music-wave';
  element.appendChild(wave);
  
  setTimeout(() => {
    wave.remove();
  }, 2000);
};

// 序列动画
export const staggerAnimation = (elements, animationFunc, delay = 100) => {
  elements.forEach((el, index) => {
    setTimeout(() => animationFunc(el), index * delay);
  });
};
