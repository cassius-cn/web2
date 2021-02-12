// let url = '/blog/docker使用教程.md'
// $.get(url, function(response, status, xhr){
//     $("#md").html(marked(response));
// });

let blog = new Vue({
    el:"#blog",
    data:{
        uid:"1",
        item:{}
    },
    methods:{

    },
    mounted:function(){
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
                    that.item = allBlog[that.uid-1];
                }
            })
        });
    }
})