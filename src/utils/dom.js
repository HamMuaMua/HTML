/**
 * DOM 操作工具集
 */

// 模态框控制
export const openModal = (type, content) => {
  const modal = document.getElementById(`${type}-modal`);
  const contentElement = type === 'image' 
    ? modal.querySelector('img')
    : modal.querySelector('iframe');
  
  contentElement.src = content;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // 绑定关闭事件
  modal.querySelector('.close-modal').onclick = () => closeModal(type);
  modal.onclick = (e) => e.target === modal && closeModal(type);
};

export const closeModal = (type) => {
  const modal = document.getElementById(`${type}-modal`);
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  if (type === 'video') modal.querySelector('iframe').src = '';
};

// 平滑滚动
export const smoothScroll = (target, offset = 80) => {
  const element = document.querySelector(target);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// 动态加载图片
export const lazyLoadImages = () => {
  const lazyImages = document.querySelectorAll('[data-src]');
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px 0px'
  });

  lazyImages.forEach(img => imageObserver.observe(img));
};

// 元素可见性检测
export const observeElements = (selector, callback, options = {}) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => callback(entry));
  }, {
    threshold: 0.1,
    ...options
  });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
  return observer;
};
