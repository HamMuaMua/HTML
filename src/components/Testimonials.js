import { getWishes, saveWishes } from '../utils/storage.js';

export default class Testimonials {
  constructor() {
    this.wishes = getWishes() || [
      {
        name: '张三',
        message: '这一年是我最珍贵的回忆！',
        timestamp: Date.now()
      },
      // 其他初始留言...
    ];
  }

  render() {
    return `
      <div class="section-title">
        <h2>同窗心语</h2>
        <p>听听同学们的心声</p>
      </div>
      <div class="testimonial-container" id="testimonial-container">
        ${this.wishes.map((wish, index) => `
          <div class="testimonial-card glass">
            <div class="testimonial-content">${wish.message}</div>
            <div class="testimonial-author">
              <h4>- ${wish.name}</h4>
              <div class="wish-date">
                ${new Date(wish.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  init() {
    this.setupScrollAnimation();
  }

  setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.testimonial-card').forEach(card => {
      observer.observe(card);
    });
  }

  addWish(name, message) {
    const newWish = {
      name,
      message,
      timestamp: Date.now()
    };
    this.wishes.push(newWish);
    saveWishes(this.wishes);
    this.render(); // 重新渲染
  }
}
