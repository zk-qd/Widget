function FactoryProgress(type, config) {
    if (this instanceof FactoryProgress) {
        return new this[type](config);
    } else {
        return new FactoryProgress(type, config);
    }
}
FactoryProgress.prototype = {
    simple:/* 
        usage:
        var progress = FactoryProgress('simple',{duration: 2000})
        // 在执行auto的时候 才会获取对应元素，所以可以先创建进度对象
        progress.auto()
        progress.full();
        progress.clear()
    */ function () {
            return function simple(config = {}) {
                // 到90的时间
                this.duration = config.duration || 5000;
                this.autoState = false;
                // 初始进度 
                var per = 0;
                var increment = (90 / (this.duration / (1000 / 60))).toFixed(3) - 0;

                // 传入百分比
                function setProgress() {
                    this.barDom.style.transform = `translateX(${-(100 - Math.round(this.per))}%)`;
                    this.perDom.textContent = Math.round(this.per) + '%';
                };
                // 在进度开始时候获取元素
                function getDom() {
                    this.barDom = document.querySelector('.progress-bar');
                    this.perDom = document.querySelector('.progress-percentage');
                    this.barDom.style.transition = 'transform 60ms linear';
                }
                // 速度
                // 改变per 就可以改变进度
                Object.defineProperty(this, 'per', {
                    configurable: true,
                    enumerable: true,
                    get() {
                        return per;
                    },
                    set(value) {
                        per = value;
                        setProgress.call(this);
                    }
                });
                // 自动进度
                simple.prototype.auto = function () {
                    getDom.call(this);
                    this.clear();
                    this.autoState = true;
                    function step() {
                        if (!this.autoState || this.per > 89.5) {
                            this.autoState = false;
                            return;
                        };
                        this.per += increment;
                        window.requestAnimationFrame(step.bind(this))
                    }
                    window.requestAnimationFrame(step.bind(this))
                };
                // 清除进度
                simple.prototype.clear = function () {
                    this.barDom.style.display = 'none';
                    this.autoState = false;
                    this.per = 0;
                    setTimeout(() => {
                        this.barDom.style.display = 'block';
                    }, 1000 / 60);
                };
                // 加满进度
                simple.prototype.full = function () {
                    this.per = 100;
                }
            }
        }()

}