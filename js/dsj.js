//实现tab-2（限时抢购）的选卡效果
var a = document.querySelectorAll(".nav a");
// console.log(a.length);
var c = document.querySelectorAll(".content-box");
for (var i = 0; i < a.length; i++) {
    a[i].index = i; //关键 将span与tc建立联系
    a[i].onmouseover = function () {
        for (var j = 0; j < a.length; j++) {
            a[j].className = "";
            c[j].style.display = "none";
        }
        this.className = "selected"; //span[i]==this
        // tc[i].style.display="block";
        c[this.index].style.display = "block";
    }
}
var orderInfo = {};
//秒杀点击事件


//定时显示相应可抢购的商品
var timeSchedule = setInterval(function () {
    let date = new Date();
    //当前时分秒
    var ch = date.getHours();
    var cm = date.getMinutes();
    var cs = date.getSeconds();

    let box1 = document.querySelectorAll(".box1");
    let box2 = document.querySelectorAll(".box2");
    let box3 = document.querySelectorAll(".box3");
    //alert(box1.length);
    //alert((ch>=14) + " " + (cm<=10) + " " + cs);

    if (cm <= 10) {
        if (ch == 10) {
            changeBox(box1, "<div class=\"btn-purchase buy\">立即秒杀</div>");
            changeBox(box2, "<div class=\"btn-purchase2\" >即将开始</div>");
            changeBox(box3, "<div class=\"btn-purchase2\" >即将开始</div>");


        } else if (ch == 14) {
            changeBox(box1, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box2, "<div class=\"btn-purchase\" id=\"buy\">立即秒杀</div>");
            changeBox(box3, "<div class=\"btn-purchase2\" >即将开始</div>");
        } else if (ch == 16) {
            changeBox(box1, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box2, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box3, "<div class=\"btn-purchase\" id=\"buy\">立即秒杀</div>");
        }else if(ch>16){
            changeBox(box1, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box2, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box3, "<div class=\"btn-over\" >已结束</div>");
        }else if (ch > 14) {
            changeBox(box1, "<div class=\"btn-over\">已结束</div>");
            changeBox(box2, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box3, "<div class=\"btn-purchase2\" >即将开始</div>");
        }else if (ch > 10) {
            changeBox(box2, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box2, "<div class=\"btn-purchase2\" >即将开始</div>");
            changeBox(box3, "<div class=\"btn-purchase2\" >即将开始</div>");
        }else{
            changeBox(box1, "<div class=\"btn-purchase2\" >即将开始</div>");
            changeBox(box2, "<div class=\"btn-purchase2\" >即将开始</div>");
            changeBox(box3, "<div class=\"btn-purchase2\" >即将开始</div>");
        }
    } else {
        if (ch >= 16) {
            changeBox(box1, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box2, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box3, "<div class=\"btn-over\" >已结束</div>");
        } else if (ch >= 14) {
            changeBox(box1, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box2, "<div class=\"btn-over\" >已结束</div>");
            changeBox(box3, "<div class=\"btn-purchase2\" >即将开始</div>");
        } else if (ch >= 10) {
            changeBox(box1, "<div class=\"btn-over\">已结束</div>");
            changeBox(box2, "<div class=\"btn-purchase2\" >即将开始</div>");
            changeBox(box3, "<div class=\"btn-purchase2\" >即将开始</div>");
        }else {
            changeBox(box1, "<div class=\"btn-purchase2\" >即将开始</div>");
            changeBox(box2, "<div class=\"btn-purchase2\" >即将开始</div>");
            changeBox(box3, "<div class=\"btn-purchase2\" >即将开始</div>");
        }
    }
    changeBox(box1, "<div class=\"btn-purchase buy\">立即秒杀</div>");

    $(".buy").each(function () {
        _this = this;
        $(this).click(function () {


            var phone = $('#loginClick').text();
            var killid = 10;
            if (phone == "登录") {
                return ;
            }

            $.ajax({
                url: "http://106.14.28.54/kill/buy/" + killid + "/" + phone,
                data: {
                },
                type: "GET",
                dataType: "json",
                async: false,
                success: function(data) {
                    data = JSON.parse(JSON.stringify(data));
                    if (data.status == 200) {
                        orderInfo = data.orderInfo;
                    }
                    $('#killid').text(orderInfo.killId);
                    $('#phone').text(orderInfo.phone);


                    //alert(JSON.stringify(data));

                }
            });
            $('#back').css("display", "block");   // 显示
            $("#showRename").css("display", "block");

            $("#back").bind("click", function(e) {   // 相当于点击空白消失
                $('#back').css("display", "none");
                $("#showRename").css("display", "none");
            });
        })
    });
    }, 500);
function changeBox(box,text) {
    for(var i=0;i<box.length;i++){
        box[i].innerHTML = text;
    }
}

//tab-2（限时抢购）的倒计时
var timer;
var span = document.querySelectorAll("#showtime>span");
var h = 0;
var m = 0;
var s = 0;
//补齐
function bq(num) {
    if (num < 10)
        num = '0' + num;
    return num;
}
//进行倒计时的显示
timer = setInterval(function run() {

    --s;
    if (s < 0) {
        --m;
        s = 59;
    }
    if (m < 0) {
        --h;
        m = 59
    }
    if (h < 0) {
        s = 0;
        m = 0;
        let date = new Date();
        var ch = date.getHours();
        var cm = date.getMinutes();
        var cs = date.getSeconds();
        //current hour 为当时时间的小时
        //调整下一个时间
        if (cs != 0) {
            m--;
            s = 60 - cs;
        }
        if (cm != 0) {
            if (h >= 0) {
                h--;
            }
            m = 60 - cm;
        }
        if (ch < 10) {
            h = h + 10 - ch;
        }else if (ch < 14) {
            h = h + 14 - ch;
        }else if (ch < 16) {

            h = h + 16 - ch;
        }else{
            h = h + 24 - ch + 10;
        }

    }
    //showtime.innerHTML=bq(h)+":"+bq(m)+":"+bq(s); 
    span[0].innerHTML = bq(h);
    span[1].innerHTML = bq(m);
    span[2].innerHTML = bq(s);

}, 1000);

