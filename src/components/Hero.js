export default class Hero {
  render() {
    return `
      <div class="hero-content glass">
        <h1>一年同窗 · 一生情谊</h1>
        <p>初三(2)班毕业纪念 · 2024-2025学年</p>
        <div class="hero-buttons">
          <a href="#gallery" class="btn">查看相册</a>
          <a href="#wishes" class="btn btn-outline">写下祝福</a>
        </div>
      </div>
      <div class="scroll-down" id="scroll-down">
        <i class="fas fa-chevron-down"></i>
      </div>
    `;
  }

  init() {
    // 滚动箭头点击事件
    document.getElementById('scroll-down').addEventListener('click', () => {
      document.querySelector('#timeline').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  }
}
