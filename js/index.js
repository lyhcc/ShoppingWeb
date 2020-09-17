a = [];
var we = new Vue({
	el:"#app",
	data:{
        fv:false,
		arr:[],
		et:"df",
        bb:"",
		ws:"",
		wert:0,
	    er:"",
		but:false,
		we:[]
	},methods:{
		ed:function(){
			this.we="";
			this.but=true;
			this.fv=false;
			document.getElementById("sure").disabled="disabled";

		},
		add:function(e){
			this.we[e].num++;


		},
		subtract:function(e){
			if (this.we[e].num<=0){
				alert('受不了啦，宝贝不能再减少啦')
				this.count=0;
			}else {
				this.we[e].num-=1;
			}
		},
		wq:function(e){
			//点击方框
			//console.log(this.we[e].checked)
			var  arrs=[];
			this.we[e].checked=!this.we[e].checked
			if(this.we[e].checked){
				document.getElementById("list").getElementsByClassName("et")[e].style.backgroundColor="red";

			}else{
				document.getElementById("list").getElementsByClassName("et")[e].style.backgroundColor="";
				//this.fv=false;
			}
			for (var i = 0;i<this.we.length;i++){

				arrs.push(this.we[i].checked);

			}
			if(arrs.indexOf(false)==-1){
				this.fv=true

			}else{
				this.fv=false
			}

		},

		fun:function(e){
			var  arrs=[];
		   this.ws=e;
			//console.log(this.ws==0)
			//删除

           if(this.ws !==(this.we.length-1)){
			   this.we[this.ws].checked== this.we[this.ws+1].checked;

		   }else{

		   }
			this.we.splice(e,1)
			for (var i = 0;i<this.we.length;i++){

				arrs.push(this.we[i].checked);

			}
			if(arrs.indexOf(false)==-1){
				this.fv=true
			}else{
				this.fv=false
			}
			for(var i=0;i<this.we.length;i++){
				if(this.we[i].checked){
					document.getElementById("list").getElementsByClassName("et")[i].style.backgroundColor="red";
				}else{
					document.getElementById("list").getElementsByClassName("et")[i].style.backgroundColor="";
				}
			}

			if(this.we==""){
				//this.ert=true;
				this.but=true;
				this.fv=false;
				document.getElementById("sure").disabled="disabled";


			}


		},
		sd:function(){
			console.log(this.we.length)
			if(this.fv){
				for(var i =0;i<this.we.length;i++){
					this.we[i].checked=false
					document.getElementById("list").getElementsByClassName("et")[i].style.backgroundColor="";
				}

			}else{
				for(var i =0;i<this.we.length;i++){
					console.log(i)

					this.we[i].checked=true
					this.fv=true;
					document.getElementById("list").getElementsByClassName("et")[i].style.backgroundColor="red";
				}
			}
		},
		wer:function(index){
			//this.sxc(index);
		//	console.log(Math.floor(this.we[index].price*Number(this.we[index].num)))
			return Math.floor(this.we[index].price*Number(this.we[index].num));

		},

		sde:function(){
			var  total=0;
			for(var i=0;i<this.we.length;i++){
				if(this.we[i].checked){
					total+=parseInt(this.we[i].num);
				}
			}
           return total;
         },
		wry:function(){
			var  totall=0;
			for(var i=0;i<this.we.length;i++){
				if(this.we[i].checked){
					totall+=parseInt(this.we[i].num*this.we[i].price);
				}
			}
			return totall;
		}



	},computed:{
		length:function(){
			return this.we.length;
		}


	},mounted:function() {
		/*for (var i = 0; i < this.we.length; i++) {
			this.arr.push(this.we[i].checked);
			console.log(this.arr[0]);
		}*/
		/*for (var i = 0;i<this.we.length;i++){
			var  arrs=[];
			arrs.push(this.we[i].checked);
			console.log(arrs)
		}*/
	},created:function () {
        $.ajax({
            url: "http://106.14.28.54/kill/get/record",
            data: {},
            type: "GET",
            async: false,  // 同步操作
            dataType: "json",
            success: function (data) {
                a = JSON.stringify(data)
            },
            beforeSend: function(xhr) {

                xhr.setRequestHeader("Authorization", "Basic OTdlMjVmNWJiMTdjNzI2MzVjOGU3NjlhOTI3ZTA3M2Q5MWZmMTA3ZDM2YTZkOWE5Og==");
            }
        });
		this.we=JSON.parse(a)

    }
})
