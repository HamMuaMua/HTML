export default class Navbar {
  constructor() {
    this.links = [
      { href: '#home', text: '青春记忆' },
      { href: '#timeline', text: '时光印记' },
      { href: '#gallery', text: '班级相册' },
      { href: '#testimonials', text: '同窗心语' },
      { href: '#wishes', text: '毕业寄语' }
    ];
  }

  render() {
    return `
      <a href="#" class="logo">
        <i class="fas fa-bookmark"></i>初三(2)班
      </a>
      <div class="menu-toggle" id="mobile-menu">
        <i class="fas fa-bars"></i>
      </div>
      <ul class="nav-links" id="nav-links">
        ${this.links.map(link => `
          <li><a href="${link.href}">${link.text}</a></li>
        `).join('')}
      </ul>
    `;
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
  }

  setupScrollEffect() {
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  setupMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // 点击链接后关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}
