const blog = new Vue({
    el: "#blog",
    data: {
        activities: []
    },
    methods: {
        chgUrl(url) {
            location.href = url;
        }
    },
    mounted: function() {
        //设置主页导航栏为蓝色
        let btnTL = document.querySelector(".nav-timeline");
        btnTL.children[0].style.color = "#2F9CF1";
        btnTL.children[1].style.color = "#2F9CF1";
        //加载json
        let that = this;
        window.addEventListener('pageshow', function() {
            $.ajax({
                url: "/js/json/timeline.json",
                type: "GET",
                dataType: "json",
                success: function(data) {
                    that.activities = data.line;
                }
            })
        });
    }
})