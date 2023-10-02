(function(win) {
    var tid;
    function refreshRem() {
        let designSize = 100; // 设计图尺寸
        let html = document.documentElement;
        let wW = html.clientWidth;// 窗口宽度
        let rem = wW  / designSize;
        document.documentElement.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();

})(window);