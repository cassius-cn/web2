Vue.component("navBox", {
    template: `<nav @mouseleave="doHidden">
    <div class="left">
        <img src="/static/imgs/webIcon.jpg" alt="">
        <p>Cassius<span>的个人博客</span></p>
    </div>
    <div class="right">
        <div class="btn-theme">
            <span class="iconfont" id="icon" style="font-size: 24px;
                " @click="chgBgc">&#xe66f;</span>
            <div class="box" :class="{'hidden': isShow }"><h5>choose mode</h5>
            <div></div>
            </div>
        </div>
        <div class="search">
            <span class="iconfont" id="icon" style="font-size: 15px;cursor: pointer;" @click="doSearch">&#xe63b;</span>
            <input type="text" v-model="searchCnt" @keyup.enter="doSearch">
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

        <div class="nav-try" @click="goto(5)" @mouseenter="doShow">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xec41;</span>
            <span>尝试</span>
            <div class="box">
            <section v-for="item in tryCnt"><a :href="item.url" target="blank">{{item.title}}</a></section>
            </div>
        </div>

    </div>
</nav>`,
    data() {
        return {
            isShow: true,
            searchCnt: "",
            tryCnt: [{
                title: "数据库练习:网页版微信",
                url: "http://ustb.peijunjie.cn:8888/"
            }, {
                title: "3D旋转图片控件",
                url: "/test/3D旋转图片.html"
            }]
        }
    },
    methods: {
        doSearch() {
            alert("暂未完善")
        },
        chgBgc() {
            let bgc = document.querySelector(".bgcImg");
            let index = this.random(1, 9);
            bgc.style.backgroundImage = 'url(' + 'static/imgs/background' + index + '.jpg' + ')';
        },
        goto(index) {
            if (1 === index) {
                if (location.pathname !== '/index.html') {
                    location.href = '/index.html';
                }
            } else if (index === 2) {
                if (location.pathname !== '/blogSort.html') {
                    location.href = '/blogSort.html';
                }
            } else if (index === 3) {
                if (location.pathname !== '/timeLine.html') {
                    location.href = '/timeLine.html';
                }
            }
        },
        random(min, max) {
            var result = Math.floor(Math.random() * (max - min) + min);
            return result;
        },
        doShow() {
            let box = document.querySelector(".nav-try .box");
            box.style.display = "inherit";
        },
        doHidden() {
            let box = document.querySelector(".nav-try .box");
            box.style.display = "none";
        }

    },
    mounted: function() {
        //设置网站图标
        var linkzh = document.createElement('link');
        linkzh.setAttribute('type', 'image/x-icon');
        linkzh.setAttribute('rel', 'Shortcut Icon');
        linkzh.setAttribute('href', '/static/imgs/webIcon.ico');
        document.head.appendChild(linkzh);

        window.onscroll = function() {
            if ($(document).scrollTop() >= 60) {
                $("nav").css({ "background": '#fff' });
                $("nav").css({ "box-shadow": '0 0 2px 1px #b4c3c3' })
            } else {
                $("nav").css({ "background": 'rgba(250,250,250,0.5)' })
                $("nav").css({ "box-shadow": 'none' })
            }
            // 侧边栏滚动控制
            if (location.pathname === '/index.html') {
                let asideTop = 490; //侧边栏距顶部高度

                let pageBtm = document.querySelector("#nav-aside").offsetHeight + 180; //侧边栏停止时底部高度
                console.log(pageBtm)
                if ($(document).scrollTop() >= asideTop && ($(document).height() - $(document).scrollTop()) > pageBtm) {
                    $("#nav-aside").css({ "top": $(document).scrollTop() - asideTop + 'px' });
                } else if (($(document).height() - $(document).scrollTop()) <= pageBtm) {
                    $("#nav-aside").css({ "top": $(document).height() - pageBtm - asideTop + 'px' });
                } else {
                    $("#nav-aside").css({ "top": 0 + 'px' });
                }
            }

        }
    }
})