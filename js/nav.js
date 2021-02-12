Vue.component("navBox", {
    template: `<nav>
    <div class="left">
        <img src="/static/imgs/headImg2.jpg" alt="">
        <p>Cassius<span>的个人博客</span></p>
    </div>
    <div class="right">
        <div class="btn-theme">
            <span class="iconfont" id="icon" style="font-size: 24px;
                ">&#xe66f;</span>
        </div>
        <div class="search">
            <span class="iconfont" id="icon" style="font-size: 15px;">&#xe63b;</span>
            <input type="text">
        </div>
        <div class="nav-home" @click="goto(1)">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xe60f;</span>
            <span>主页</span>
            
        </div>
        <div class="nav-blog" @click="goto(2)">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xe625;</span>
            <span>博客</span>
        </div>
        <div class="nav-timeline" @click="goto(3)">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xe645;</span>
            <span>时间轴</span>
        </div>
        <div class="nav-aphorism" @click="goto(4)">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xe611;</span>
            <span>谨记</span>
        </div>

        <div class="nav-try" @click="goto(5)">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xec41;</span>
            <span>尝试</span>
        </div>

    </div>
</nav>`,
    data() {
        return {

        }
    }
    , methods: {
        goto(index) {
            if (1 === index) {
                if (location.pathname !== '/index.html') {
                    location.href = '/index.html';
                }
            } else if (index === 2) {
                if (location.pathname !== '/blogSort.html') {
                    location.href = '/blogSort.html';
                }
            }
        }

    },
    mounted: function () {
        window.onscroll = function () {
            if ($(document).scrollTop() >= 60) {
                $("nav").css({ "background": '#fff' });
                $("nav").css({ "box-shadow": '0 0 5px 2px #b4c3c3' })
            } else {
                $("nav").css({ "background": 'rgba(250,250,250,0.2)' })
                $("nav").css({ "box-shadow": 'none' })
            }
            if ($(document).scrollTop() >= 60) {
                $("nav").css({ "background": '#fff' });
                $("nav").css({ "box-shadow": '0 0 5px 2px #b4c3c3' })
            } else {
                $("nav").css({ "background": 'rgba(250,250,250,0.2)' })
                $("nav").css({ "box-shadow": 'none' })
            }
            // 侧边栏滚动控制
            if (location.pathname === '/index.html') {
                let asideTop = 490; //侧边栏距顶部高度
                let pageBtm = 780; //侧边栏停止时底部高度
                if ($(document).scrollTop() >= asideTop && ($(document).height() - $(document).scrollTop()) > pageBtm) {
                    $("#nav-aside").css({ "top": $(document).scrollTop() - asideTop + 'px' });
                }
                else if (($(document).height() - $(document).scrollTop()) <= pageBtm) {
                    $("#nav-aside").css({ "top": $(document).height() - pageBtm - asideTop + 'px' });
                }
                else {
                    $("#nav-aside").css({ "top": 0 + 'px' });
                }
            }

        }
    }
})