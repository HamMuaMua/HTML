import Navbar from '../components/Navbar.js';
import Gallery from '../components/Gallery.js';
// 其他组件导入...

export default class App {
    constructor() {
        this.components = {
            navbar: new Navbar(),
            gallery: new Gallery()
            // 其他组件实例...
        };
    }

    init() {
        // 渲染所有组件
        Object.entries(this.components).forEach(([name, component]) => {
            const container = document.getElementById(name);
            if (container) {
                container.innerHTML = component.render();
                component.init();
            }
        });
    }
}
