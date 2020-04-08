!function (window) {
    // 组件 tab切换不请求数据
    function Tabbar(header, body) {
        this.header = header;
        this.body = body;
        Tabbar.prototype.bind = function () {
            this.header.addEventListener('click', (e) => {
                // 当前元素
                let current = e.currentTarget,
                    // 子元素
                    child = e.target,
                    // 子元素集合
                    children,
                    // 点击索引
                    index;
                if (current === child) return;
                children = Array.from(current.children);
                index = children.findIndex(item => item === child);
                // 切换header
                children.forEach(item => item.classList.contains('active') && item.classList.remove('active'));
                child.classList.add('active');
                // 切换body
                Array.from(this.body.children).forEach(item => item.classList.contains('active') && item.classList.remove('active'));
                this.body.children[index].classList.add('active');
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
        // 构造器
        this.bind();
    }
    function multiple() {
        const headers = document.querySelectorAll('.tab-header');
        const bodys = document.querySelectorAll('.tab-body');
        if (!(headers.length && bodys.length)) return;
        if (headers.length !== bodys.length) throw new Error('headers length of bodys range ')
        Array.from(headers).forEach((item, index) => new Tabbar(item, bodys[index]));
    }
    multiple();
}(window)