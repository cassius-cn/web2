// 侧边栏滚动控制
let asideTop = 490; //侧边栏距顶部高度
let pageBtm = 780; //侧边栏停止时底部高度
window.onscroll = function () {
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

const web = new Vue({
    el: "#main",
    data: {
        nowBlog: [],
        allBlog:[],
        curPage: 2,
        onePageNum: 2,
        pageNum: 0,
        indexs:[]
        },
    methods: {
        setIndexs(){
            this.pageNum = Math.ceil(this.allBlog.length/this.onePageNum);
            let arr = [this.curPage];
            if(this.curPage-1 >= 1){
                arr.unshift(this.curPage-1);
                if(this.curPage-2 >=1){
                    arr.unshift(this.curPage-2);
                    if(this.curPage+1 <= this.pageNum){
                        arr.push(this.curPage+1);
                        if(this.curPage+2 <= this.pageNum){
                            arr.push(this.curPage+2);
                        }else{
                            arr.unshift(this.curPage-3);
                        }
                    }else{
                        arr.unshift(this.curPage-4,this.curPage-3);
                    }
                }else{
                    arr.push(this.curPage+1,this.curPage+2,this.curPage+3);
                }
            }else{
                arr.push(this.curPage+1,this.curPage+2,this.curPage+3,this.curPage+4);
            }
            this.indexs = arr;
        },
        chgPage(index) {
            if(index===-1){
                this.curPage--;
                index = this.curPage;
                document.body.scrollTop = document.documentElement.scrollTop = 490;
            }else if(index===-2){
                this.curPage++;
                index = this.curPage;
                document.body.scrollTop = document.documentElement.scrollTop = 490;
            }else if(index === 0){
                index = this.curPage;
            }else{
                this.curPage = index;
                document.body.scrollTop = document.documentElement.scrollTop = 490;
            }
            
           this.setIndexs();
            this.nowBlog = index === this.pageNum ? this.allBlog.slice(index*this.onePageNum-this.onePageNum): this.allBlog.slice(index*this.onePageNum-this.onePageNum,index*this.onePageNum);
        }

    },
    mounted: function () {
        //设置主页导航栏为蓝色
        let btnHome = document.querySelector(".nav-home");
        btnHome.children[0].style.color = "#2F9CF1";
        btnHome.children[1].style.color = "#2F9CF1";
        //加载json
        let that = this;
        window.addEventListener('pageshow', function () {
            $.ajax({
                url: "/js/blog.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    that.allBlog = data.read.concat(data.daily, data.study, data.other);
                    const compare = function (obj1, obj2) {
                        var val1 = obj1.date;
                        var val2 = obj2.date;
                        if (val1 < val2) {
                            return 1;
                        } else if (val1 > val2) {
                            return -1;
                        } else {
                            return 0;
                        }
                    };
                    that.allBlog = that.allBlog.sort(compare);
                    that.chgPage(0);

                }
            })
        });
    }
})