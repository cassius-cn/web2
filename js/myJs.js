//获取时间 12:01:44 A.M.
function nowNumTime()
{
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var temp = '' + (hour>12 ? hour-12 : hour);
    if(hour === 0)
    {
        temp = '12'
    }
    temp = temp + (minute < 10 ? ':0' : ':') + minute;
    temp = temp + (second < 10 ? ':0' : ':') + second;
    temp = temp + (hour >= 12 ? ' P.M.' : 'A.M.');

    return temp;
}
//获取在min到max内的随机整数
function random(min, max) {
    var result = Math.floor(Math.random() * (max - min) + min);
    return result;
}
//获取随机rgb颜色
function randomColor() {
    var r = random(1, 256);
    var g = random(1, 256);
    var b = random(1, 256);
    var result = `rgb(${r},${g},${b})`;
    console.log(result)
    return result;
}
//获取时间   2020年10月14日 12:29:23
function nowdate()
{
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getUTCMonth() + 1;
    var date = now.getDate();
    var temp = '' + year + '年'+ month + '月' + date +'日 ';
    var hour = now.getHours();
    var minute = now.getMinutes();
    let second = now.getSeconds();
    temp += '' + hour; 
    temp = temp + (minute < 10 ? ':0' : ':') + minute + (second < 10 ? ':0' : ':') + second;
    return temp;
}
//获取样式   obj,"width"
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
}
//开始动画   oDiv,{"width":344}
function startAnimation(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        for (var attr in json) {
            var ctAttr = 0;
            if (attr === 'opacity') {
                ctAttr = parseFloat(getStyle(obj, attr));
            } else {
                ctAttr = parseInt(getStyle(obj, attr));
            }
            speed = (json[attr] - ctAttr) / 10;
            if (attr == 'opacity') {
                obj.style[attr] = ctAttr + speed;
            } else {
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                obj.style[attr] = ctAttr + speed + 'px';
            }
            if (json[attr] === ctAttr) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
                return;
            }
        }
    }, 30);
}
//calcRelativeTime("2020年12月12日 14:21:21")
function calcRelativeTime(time){ //time格式 2020年12月12日 14:21:21
    let now = new Date();
    let year = time.split("年")[0];
    let month = time.split("年")[1].split("月")[0];
    let day = time.split("年")[1].split("月")[1].split("日")[0];
    let hour = time.split("年")[1].split("月")[1].split("日")[1].split(" ")[1].split(":")[0];
    let minute = time.split("年")[1].split("月")[1].split("日")[1].split(" ")[1].split(":")[1];
    let second = time.split("年")[1].split("月")[1].split("日")[1].split(" ")[1].split(":")[2];

    let yearSub = now.getFullYear() - year;
    let monthSub = now.getUTCMonth() + 1 - month;
    let daySub = now.getDate() - day;
    let hourSub = now.getHours() - hour;
    let minuteSub = now.getMinutes() - minute;
    let secondSub = now.getSeconds() - second;
//     console.log(nowdate());
   //console.log(yearSub,monthSub,daySub,hourSub,minuteSub,secondSub);
    if(yearSub == 0 && monthSub == 0 && daySub == 0){
        let allsec = 3600 * hourSub + 60 * minuteSub + secondSub;
        if(allsec < 60){
            return allsec + "秒前";
        }else if(allsec >= 60 && allsec < 3600){
            return Math.floor(allsec/60) + '分钟前';
        }else{
            return Math.floor(allsec/3600) + '小时前';
        }
    }else{
        let maxDay = new Date(now.getFullYear(), now.getUTCMonth() + 1, 0).getDate();
        let allDay = 365 * yearSub + 30 * monthSub + daySub;
        if(allDay < maxDay){
            if(allDay == 1 && hourSub < 0){
                let allsec = 24 * 3600 + hourSub * 3600 + minuteSub * 60 + secondSub;
                if(allsec < 60){
                    return allsec + "秒前";
                }else if(allsec >= 60 && allsec < 3600){
                    return Math.floor(allsec/60) + '分钟前';
                }else{
                    return Math.floor(allsec/3600) + '小时前';
                }
            }else{
                return allDay + "天前";
            }
        }else if(allDay >= maxDay && allDay <= 365){
            return Math.floor(allDay/30) + "月前";
        }else{
            return Math.floor(allDay/365) + "年前";
        }
    }
}

//
// function $(selector){
//     if(document.querySelectorAll(selector).length === 1){
//         return document.querySelector(selector);
//     }else if(document.querySelectorAll(selector).length === 0){
//         console.log("error");
//     }else{
//         return document.querySelectorAll(selector);
//     }
// }