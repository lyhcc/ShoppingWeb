Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


Vue.component(
            'tab-2', {
                data() {
                    return {
                        pros1: [],
                        pros2: [],
                        pros3: []
                    }
                },
                mounted() {
                    this.getApiData();
                    setInterval(function () {

                    }, 1000);
                },
                methods: {

                    getApiData() {


                        var startTime = new Date(new Date(new Date().toLocaleDateString()).getTime()).Format("yyyy-MM-dd hh:mm:ss");
                        var endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1 + 24 * 60 * 60 * 1000).Format("yyyy-MM-dd hh:mm:ss");

                        _this = this;
                        $.ajax({
                            url:'http://106.14.28.54/kill/get/goodsInfo/'+startTime+'/'+endTime,
                            type:"get",
                            dataType:'json',
                            async: false,
                            success:function(res){
                                d = JSON.stringify(res)
                                d = JSON.parse(d)
                                for(var i = 0;i<d.length;i++){
                                    var sDate = new Date(d[i].startTime)
                                    if(sDate.getHours()==10){
                                        _this.pros1.push(d[i])
                                    }else if(sDate.getHours()==14){
                                        _this.pros2.push(d[i])
                                    }else if (sDate.getHours() == 16) {
                                        _this.pros3.push(d[i])
                                    }
                                }
                            }
                        })
                        /*var url = "tab-2.json"; //json地址

                        axios.get(url).then(function (result) {
                            _this.pros1 = result.data.pros1;
                            _this.pros2 = result.data.pros2;
                            _this.pros3 = result.data.pros3;
                        })*/
                    }
                },
                template: `<div id="t-2">
                    <ul>
                        <li class="nav">
                            <span>限时秒杀</span><span>距离下场 </span><span id="showtime"><span>01</span> : <span>00</span> :
                                <span>00</span></span>
                            <span><a class="selected">10:00-已结束</a></span>
                            <span><a>14:00-正在疯抢</a></span>
                            <span><a>16:00-即将疯抢</a></span>
                        </li>
                        <li>
                            <div class="content-box">
                                <ul class="content">
                                    <li v-for="item in pros1" >
                                        <a href="#">
                                            <img :src="item.image">   
                                                <div class="killid">{{item.killId}}</div>                            
                                                <div class="title">{{item.goodsName}}</div>
                                                <div class="price"><span>当前仅剩:{{item.goodsNums}}件</span>
                                                </div>
                                                <div class="myprice">￥{{item.price}}元</div>
                                                <div class="box1"> <div class="btn-over">已结束</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="content-box" id="box">
                                <ul class="content">
                                    <li v-for="item in pros2" >
                                        <a href="#">
                                            <img :src="item.image">  
                                                <div class="killid">{{item.killId}}</div>                            
                                                <div class="title">{{item.goodsName}}</div>
                                                <div class="price"><span>当前仅剩:{{item.goodsNums}}件</span>
                                                </div>
                                                <div class="myprice">￥{{item.price}}元</div>
                                                <div class="box2"><div class="btn-purchase" id="buy">立即秒杀</div></div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="content-box">
                                 <ul class="content">
                                    <li v-for="item in pros3" >
                                        <a href="#">
                                            <img :src="item.image">    
                                                <div class="killid">{{item.killId}}</div>                           
                                                <div class="title">{{item.goodsName}}</div>
                                                <div class="price"><span>当前仅剩:{{item.goodsNums}}件</span>
                                                </div>
                                                <div class="myprice">￥{{item.price}}元</div>
                                                <div class="box3"><div class="btn-purchase2" >即将开始</div></div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        
                        </li>
                    </ul>
                </div> `

            })

        var vm = new Vue({
            el: '#app',
        })