// let url = '/blog/docker使用教程.md'
// $.get(url, function(response, status, xhr){
//     $("#md").html(marked(response));
// });

let blog = new Vue({
    el: "#blog",
    data: {
        uid: 1,
        item: {},
        form: {
            username: "",
            imgUrl: "",
            content: ""
        },
        msgs: []
    },
    computed: {
        canSub: function () {
            return (!this.form.username || !this.form.content || !this.form.imgUrl);
        }
    },
    methods: {
        doSubmit() {
            let that = this;
            that.form.date = nowdate();
            that.form.content = encodeURI(that.form.content);
            that.form.username = encodeURI(that.form.username);
            that.form.date = encodeURI(that.form.date);
            that.form.blogId = that.uid;
            axios.post('http://ustb.peijunjie.cn:3000/msgsInsert', that.form)
                .then(function (response) {
                    that.form.content = '';
                    that.form.username = decodeURI(that.form.username);
                })
                .catch(function (error) {
                    that.form.content = decodeURI(that.form.content);
                    that.form.username = decodeURI(that.form.username);
                    alert("发表失败")
                });
        },
        getMsgs() {
            let that = this;
            axios.post('http://ustb.peijunjie.cn:3000/msgsQueryByBid', { blogId: this.uid })
                .then(function (response) {
                    const compare = function (obj1, obj2) {
                        var val1 = obj1.uid;
                        var val2 = obj2.uid;
                        if (val1 > val2) {
                            return -1;
                        } else if (val1 < val2) {
                            return 1;
                        } else {
                            return 0;
                        }
                    };
                    that.msgs = response.data;
                    that.msgs.forEach(item => {
                        item.content = decodeURI(item.content);
                        item.username = decodeURI(item.username);
                        item.date = calcRelativeTime(decodeURI(item.date));
                    });
                    that.msgs = that.msgs.sort(compare);
                })
                .catch(function (error) {
                    console.log("获取msg失败");
                });
        }
    },
    mounted: function () {
        let that = this;
        window.addEventListener('pageshow', function () {
            $.ajax({
                url: "/js/blog.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    let allBlog = data.read.concat(data.daily, data.study, data.other);
                    const compare = function (obj1, obj2) {
                        var val1 = obj1.uid;
                        var val2 = obj2.uid;
                        if (val1 < val2) {
                            return -1;
                        } else if (val1 > val2) {
                            return 1;
                        } else {
                            return 0;
                        }
                    };
                    allBlog = allBlog.sort(compare);
                    that.item = allBlog[that.uid - 1];
                }
            })
        });
        this.getMsgs();
    }
})