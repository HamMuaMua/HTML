export default class Timeline {
  constructor() {
    this.events = [
      {
        date: '2024年9月',
        title: '新的开始',
        description: '初三开学，我们组成了(2)班。虽然来自不同班级，但很快便融入了这个温暖的集体。',
        image: 'timeline/01.jpg'
      },
      // 其他事件数据...
    ];
  }

  render() {
    return `
      <div class="section-title">
        <h2>时光印记</h2>
        <p>短暂却珍贵的初三时光</p>
      </div>
      <div class="timeline-container">
        ${this.events.map((event, index) => `
          <div class="timeline-item" data-image="src/assets/images/${event.image}">
            <div class="timeline-content glass">
              <div class="timeline-date">${event.date}</div>
              <h3>${event.title}</h3>
              <p>${event.description}</p>
              ${event.image ? `
                <div class="timeline-media-options">
                  <span class="timeline-media-btn">
                    <i class="fas fa-image"></i> 查看照片
                  </span>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  init() {
    this.setupScrollAnimation();
    this.setupImagePreview();
  }

  setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
  }

  setupImagePreview() {
    document.querySelectorAll('.timeline-media-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const timelineItem = e.target.closest('.timeline-item');
        const imageUrl = timelineItem.getAttribute('data-image');
        // 需要提前在utils/dom.js中实现openModal函数
        openModal('image', imageUrl);
      });
    });
  }
}
