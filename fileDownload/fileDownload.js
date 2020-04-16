function FactoryFileDownload(type, config) {
    if (this instanceof FactoryFileDownload) {
        return this[type](config);
    } else {
        return new FactoryFileDownload(type, config)
    }
}
FactoryFileDownload.prototype = {
    single: function (done = function () { }) {
        /* 
        <botton class='singleFileDownload-button'></botton>
        FactoryFileDownload('single',(res)=> {
            var target = res.target;
        });
        */
        var buttonDom = document.querySelector('.singleFileDownload-button');
        buttonDom.addEventListener('click', (e) => {
            done({ target: e.currentTarget });
        })
    },
    singles: function (done = function () { }) {
        /* 
        <botton class='singleFileDownload-button'></botton>
        FactoryFileDownload('singles',(res)=> {
            var target = res.target;
        });
        */
        var buttonDoms = document.querySelectorAll('.singleFileDownload-button');
        buttonDoms.forEach(item => {
            item.addEventListener('click', click);
        })
        function click(e) {
            done({ target: e.currentTarget });
        }

    }
}