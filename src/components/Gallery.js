export default class Gallery {
  constructor() {
    this.categories = {
      classroom: ['01.jpg', '02.jpg', '03.jpg', '04.jpg'],
      activity: ['01.jpg', '02.jpg', '03.jpg', '04.jpg'],
      sports: ['01.jpg', '02.jpg', '03.jpg', '04.jpg'],
      graduation: ['01.jpg', '02.jpg', '03.jpg', '04.jpg']
    };
  }

  render() {
    return `
      <div class="section-title">
        <h2>班级相册</h2>
        <p>定格青春最美的瞬间</p>
      </div>
      <div class="gallery-tabs">
        ${Object.keys(this.categories).map(cat => `
          <div class="gallery-tab" data-tab="${cat}">
            ${this.getCategoryName(cat)}
          </div>
        `).join('')}
      </div>
      <div class="gallery-sections">
        ${Object.entries(this.categories).map(([cat, images]) => `
          <div class="gallery-section" id="${cat}">
            ${images.map(img => `
              <div class="gallery-section-item">
                <img src="src/assets/images/gallery/${cat}/${img}" 
                     alt="${this.getCategoryName(cat)}照片" 
                     class="gallery-section-img">
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }

  init() {
    this.setupTabSwitching();
    this.setupImageZoom();
  }

  setupTabSwitching() {
    const tabs = document.querySelectorAll('.gallery-tab');
    tabs[0].classList.add('active'); // 默认激活第一个标签
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        
        // 更新标签状态
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // 切换内容区域
        document.querySelectorAll('.gallery-section').forEach(section => {
          section.classList.remove('active');
        });
        document.getElementById(target).classList.add('active');
      });
    });
  }

  setupImageZoom() {
    document.querySelectorAll('.gallery-section-img').forEach(img => {
      img.addEventListener('dblclick', () => {
        openModal('image', img.src);
      });
    });
  }

  getCategoryName(category) {
    const names = {
      classroom: '课堂时光',
      activity: '班级活动',
      sports: '体育风采',
      graduation: '毕业留念'
    };
    return names[category];
  }
}
