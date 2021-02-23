let web = new Vue({
    el: "#main",
    data: {
        nowBlog: [],
        allBlog: [],
        curPage: 1,
        onePageNum: 5,
        pageNum: 0,
        indexs: [],
        types: [], //分类的标签集合
        allBlogArr: [], //所有博客 allBlogArr[0]为日常所有
        links: [{
                    "title": "暂无暂无暂无暂无",
                    "url": "https://baidu.com"
                },
                {
                    "title": "暂无暂无暂无",
                    "url": "https://baidu.com"
                },
                {
                    "title": "暂无暂无",
                    "url": "https://baidu.com"
                },
                {
                    "title": "暂无暂无暂无",
                    "url": "https://baidu.com"
                }
            ] //友链
    },
    methods: {
        chgUrl(index) {
            if (index != this.typeIndex) {
                location.href = "/blogSort.html?" + index;
            }
        },
        chgUrlLink(url) {
            location = url;
        },
        setIndexs() {
            this.pageNum = Math.ceil(this.allBlog.length / this.onePageNum);
            if (this.pageNum === 2) {
                this.indexs = [1, 2];
            }
            if (this.pageNum === 1) {
                this.indexs = [];
            }
            if (this.pageNum === 3) {
                this.indexs = [1, 2, 3];
            }
            if (this.pageNum === 4) {
                this.indexs = [1, 2, 3, 4];
            }
            if (this.pageNum > 4) {
                let arr = [this.curPage];
                if (this.curPage - 1 >= 1) {
                    arr.unshift(this.curPage - 1);
                    if (this.curPage - 2 >= 1) {
                        arr.unshift(this.curPage - 2);
                        if (this.curPage + 1 <= this.pageNum) {
                            arr.push(this.curPage + 1);
                            if (this.curPage + 2 <= this.pageNum) {
                                arr.push(this.curPage + 2);
                            } else {
                                arr.unshift(this.curPage - 3);
                            }
                        } else {
                            arr.unshift(this.curPage - 4, this.curPage - 3);
                        }
                    } else {
                        arr.push(this.curPage + 1, this.curPage + 2, this.curPage + 3);
                    }
                } else {
                    arr.push(this.curPage + 1, this.curPage + 2, this.curPage + 3, this.curPage + 4);
                }
                this.indexs = arr;
            }
        },
        chgPage(index) {
            if (index === -1) {
                this.curPage--;
                index = this.curPage;
                document.body.scrollTop = document.documentElement.scrollTop = 490;
            } else if (index === -2) {
                this.curPage++;
                index = this.curPage;
                document.body.scrollTop = document.documentElement.scrollTop = 490;
            } else if (index === 0) {
                index = this.curPage;
            } else {
                this.curPage = index;
                document.body.scrollTop = document.documentElement.scrollTop = 490;
            }

            this.setIndexs();
            this.nowBlog = index === this.pageNum ? this.allBlog.slice(index * this.onePageNum - this.onePageNum) : this.allBlog.slice(index * this.onePageNum - this.onePageNum, index * this.onePageNum);
        }

    },
    mounted: function() {
        //设置主页导航栏为蓝色
        let btnHome = document.querySelector(".nav-home");
        btnHome.children[0].style.color = "#2F9CF1";
        btnHome.children[1].style.color = "#2F9CF1";
        //加载json
        let that = this;
        window.addEventListener('pageshow', function() {
            $.ajax({
                url: "/js/json/blog.json",
                type: "GET",
                dataType: "json",
                success: function(data) {
                    let allBlog = [];
                    for (let item in data) {
                        that.types = that.types.concat(item);
                        that.allBlogArr.push(data[item]);
                        allBlog = allBlog.concat(data[item]);
                        that.typeNum++;
                    }
                    const compare = function(obj1, obj2) {
                        var val1 = obj1.uid;
                        var val2 = obj2.uid;
                        if (val1 < val2) {
                            return 1;
                        } else if (val1 > val2) {
                            return -1;
                        } else {
                            return 0;
                        }
                    };
                    that.allBlog = allBlog.sort(compare);
                    that.chgPage(0);

                }
            })
        });
    }
})