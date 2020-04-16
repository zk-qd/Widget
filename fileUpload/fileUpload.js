function FactoryFileUpload(type, config) {
    if (this instanceof FactoryFileUpload) {
        return this[type](config);
    } else {
        return new FactoryFileUpload(type, config)
    }
}
FactoryFileUpload.prototype = {
    single: function (done = function () { }) {
        /* 
        结构
        <input type="file" class="singleFileUpload-file" style="display: none">
        <button type="button" class="singleFileUpload-button">选择文件</button>
        用法
        FactoryFileUpload('single',(res)=> {
                    var formData = res.formData;
					var files = res.files;
					formData.append('multipartFile',files[0]);
            http.request();
        })
        */
        var fileDom = document.querySelector('.singleFileUpload-file');
        var buttonDom = document.querySelector('.singleFileUpload-button');
        buttonDom.addEventListener('click', () => {
            fileDom.click();
        })
        fileDom.addEventListener('input', function (e) {
            var current = e.currentTarget;
            var formData = new FormData();
            // formData.append('multipartFile', e.currentTarget.files[0]);
            setTimeout(() => current.value = '');
            done({ formData: formData, target: current, files: current.files });
        });
    },
    singles: function (done = function () { }) {
        /* 
        结构
        <input type="file" class="singleFileUpload-file" style="display: none">
        <button type="button" class="singleFileUpload-button">选择文件</button>
        用法
        FactoryFileUpload('singles',(res)=> {
                    var formData = res.formData;
					var files = res.files;
					formData.append('multipartFile',files[0]);
            http.request();
        })
        */
        // 循环绑定多个
        var fileDoms = document.querySelectorAll('.singleFileUpload-file');
        var buttonDoms = document.querySelectorAll('.singleFileUpload-button');
        buttonDoms.forEach((item, index) => {
            item.addEventListener('click', () => {
                fileDoms[index].click();
            })
        })
        fileDoms.forEach(item => {
            item.addEventListener('input', input);
        })
        function input(e) {
            var current = e.currentTarget;
            var formData = new FormData();
            // formData.append('multipartFile', e.currentTarget.files[0]);
            setTimeout(() => current.value = '');
            done({ formData: formData, target: current, files: current.files });
        }
    }
}