import Testimonials from './Testimonials.js';

export default class WishesForm {
  constructor() {
    this.testimonials = new Testimonials();
  }

  render() {
    return `
      <div class="section-title">
        <h2>毕业寄语</h2>
        <p>为同学们送上你的祝福</p>
      </div>
      <form class="wishes-form glass" id="wish-form">
        <div class="form-group">
          <label for="name">你的名字</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="message">祝福留言</label>
          <textarea id="message" required></textarea>
        </div>
        <button type="submit" class="btn">提交祝福</button>
      </form>
    `;
  }

  init() {
    const form = document.getElementById('wish-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (name && message) {
        this.testimonials.addWish(name, message);
        form.reset();
      } else {
        alert('请填写完整信息！');
      }
    });
  }
}
