Vue.component("navBox",{
    template:`<nav>
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
        <div class="nav-home">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xe60f;</span>
            <span>主页</span>
        </div>
        <div class="nav-blog">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xe625;</span>
            <span>博客</span>
        </div>
        <div class="nav-timeline">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xe645;</span>
            <span>时间轴</span>
        </div>
        <div class="nav-aphorism">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xe611;</span>
            <span>谨记</span>
        </div>

        <div class="nav-try">
            <span class="iconfont" id="icon" style="font-size: 18px;">&#xec41;</span>
            <span>尝试</span>
        </div>

    </div>
</nav>`,
    data(){
        return{
            
        } 
    }
    ,methods:{
       
        
    },
    mounted: function () {
        window.onscroll = function () {
            if ($(document).scrollTop() >= 60) {
                $("nav").css({ "background": '#fff'});
                $("nav").css({ "box-shadow": '0 0 5px 2px #b4c3c3'})
            }else{
                $("nav").css({ "background": 'rgba(250,250,250,0.2)'})
                $("nav").css({ "box-shadow": 'none'})
            }

        }
    }
})