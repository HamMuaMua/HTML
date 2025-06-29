export default class Gallery {
    constructor() {
        this.categories = ['classroom', 'activity', 'sports', 'graduation'];
    }

    render() {
        return `
        <section class="gallery" id="gallery">
            <h2 class="section-title">班级相册</h2>
            <div class="gallery-tabs">
                ${this.categories.map(cat => `
                    <button class="gallery-tab" data-category="${cat}">
                        ${this.getCategoryName(cat)}
                    </button>
                `).join('')}
            </div>
            <div class="gallery-sections">
                ${this.categories.map(cat => `
                    <div class="gallery-section" id="${cat}">
                        ${this.renderImages(cat)}
                    </div>
                `).join('')}
            </div>
        </section>
        `;
    }

    renderImages(category) {
        // 实际项目中这里应该从assets/images/gallery加载图片
        return `
            <div class="gallery-section-item">
                <img src="src/assets/images/gallery/${category}/01.jpg" 
                     alt="${category}-1" 
                     class="gallery-section-img">
            </div>
            <!-- 其他图片... -->
        `;
    }

    init() {
        // 初始化标签切换和图片点击事件
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
