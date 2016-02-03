

window.onload=function(){

 
//////////////******************tab************/
	var icon_bottom21a=getClass("icon_bottom21a");
	var xin=getClass("xin");
	for(var i=0;i<icon_bottom21a.length;i++){
		icon_bottom21a[i].index=i;
		icon_bottom21a[i].onmouseover=function(){
			xin[this.index].style.display="block";

		}
		icon_bottom21a[i].onmouseout=function(){
			xin[this.index].style.display="none";
			
		}
	} 

	var dapai=getClass("icon_top2_tab");
	var pic=getClass("icon_bottom21");
	for(var i=0;i<dapai.length;i++){
		dapai[i].index=i;
		dapai[i].onclick=function(){
			for(var j=0;j<pic.length;j++){
				pic[j].style.display="none";
				dapai[j].style.fontWeight="normal";
				dapai[j].style.textDecoration="none";
				dapai[j].style.color="#9c9c9c";

			}

			pic[this.index].style.display="block";
			this.style.fontWeight="bold";
			this.style.textDecoration="underline";
			this.style.color="black";
 		}
	}

///////////////上边的下拉菜单开始/////////////////////

	 
		var yiji=$(".yiji");
		var erji=$(".erji");


   		for(var i=0;i<yiji.length;i++){
 			yiji[i].index=i;
 			hover(yiji[i],function(){
  				var lis=$("li",erji[this.index]);
				var h=lis[0].offsetHeight;
 				erji[this.index].style.height=0;
 				yiji[this.index].style.background="#fff";
  				erji[this.index].style.border="1px solid #ddd";
  				yiji[this.index].style.borderBottom="none";
 				erji[this.index].style.borderTop="none";
 				animate(erji[this.index],{height:lis.length*h},600,Tween.Linear);
 			},function(){
  				yiji[this.index].style.border="none";
 				yiji[this.index].style.background="none";
 				erji[this.index].style.border="none";

   				animate(erji[this.index],{height:0},600,Tween.Linear);
 			})
		}











///////////////上边的下拉菜单结束/////////////////////

///////////////最右侧  滑动效果的实现开始
 

    var ddd=$(".ddd");//一级菜单名
    var donghuay=$(".donghuay");//二级菜单名
     // var donghuayerima=$(".donghuayerima")[0];
     for(var i=0;i<ddd.length;i++){
    	ddd[i].index=i;
    	hover(ddd[i],function(){
    		ddd[this.index].style.backgroundColor="#c40000";
    		donghuay[this.index].style.display="block";
     		animate(donghuay[this.index],{right:15},500);
     	},function(){
    		ddd[this.index].style.backgroundColor="#000";
    		donghuay[this.index].style.display="none";
    		animate(donghuay[this.index],{right:55},500);
    	})
    }


    var ddd1=$(".ddd1")[0];
    var donghuay1=$(".donghuay1")[0];
    hover(ddd1,function(){
    		donghuay1.style.display="block";
     },function(){
    		donghuay1.style.display="none";
     })


 
    



///////////////最右侧  滑动效果的实现结束





////////////////////banner轮播图***************/////////

 
	var imgs_b=$(".imgs_b");
	var circle=$(".circle");
	var mainbox=$(".mainbox")[0];
 	var num=1;
	var yanse=["#fcf8cb","#DCDCDC","#E60432","#E90131","#FFD101","#F64F3D"];

	function move(){
		if(num==6){
			num=0;
		}
		for(var i=0;i<imgs_b.length;i++){
			imgs_b[i].style.zIndex=2;
			circle[i].style.background="#000";
 		}
		imgs_b[num].style.zIndex=5;
		circle[num].style.background="#c40000";
		mainbox.style.background=yanse[num];
		num++;
	}

	var t=setInterval(move,2000);
	for(var i=0;i<circle.length;i++){
		circle[i].index=i;
		circle[i].onmouseover=function(){
			clearInterval(t);
			for(var j=0;j<circle.length;j++){
				circle[j].style.background="#000";
				imgs_b[j].style.zIndex=2;

			}
			imgs_b[this.index].style.zIndex=5;
			this.style.background="#c40000";
			mainbox.style.background=yanse[this.index];
		}
		circle[i].onmouseout=function(){
			t=setInterval(move,2000);
			num=this.index+1;
		}
	}



/////**********************楼层的跳转*******//
 
 	var search=$(".zuitopbox")[0];
		var flagdown=true;
		var flagup=true;
		var lc=$(".firstbox");
		var jump=$(".jump")[0];
		var btn=$("li",jump);
 //按钮控制滚动条
 	//按需加载
		var lc=$(".firstbox");
 		var ch=document.documentElement.clientHeight;

 		window.onscroll=function(){//搜索框的显示与隐藏

			
			var scrollT=getScrollT();

			 //楼层的跳转
			//var jump=$(".jump")[0];
			if(scrollT<=1100||scrollT>=6800){
				jump.style.display="none";
			}else{
				jump.style.display="block";
			}


			if(scrollT>=800){
				 if(flagdown){//为了保证页面往下拉时只有一个animate执行
					animate(search,{top:0},500,Tween.Linear);
				 	flagdown=false;
				 	flagup=true;
 				 } 
 			}else{
				if(flagup){
					animate(search,{top:-50},500,Tween.Linear);
					flagup=false;
					flagdown=true;
				}
 			}
			

			for(var i=0;i<lc.length;i++){
				if(lc[i].offsetTop<scrollT+ch){//当前楼层到顶部的高度，如果小于页面内容超出浏览器的距离加上浏览器的距离时。
					var imgss=$("img",lc[i]);//获得当前楼层的所有图片
					for(var j=0;j<imgss.length;j++){//遍历图片，再把每个图片的aa值，赋给src即可
						imgss[j].src=imgss[j].getAttribute("aa");
					}
				}
			}
		


//按钮控制滚动条
for(var i=0;i<btn.length;i++){
	btn[i].index=i;
	btn[i].onclick=function(){
		//lc[this.index].t;
		//获取滚动条的对象
		var obj=document.documentElement.scrollTop?document.documentElement:document.body;
		// obj.scrollTop=lc[this.index].t;
		animate(obj,{scrollTop:lc[this.index].t},500,Tween.Linear);
		//当前按钮的对应楼层赋值给滚动条
/*		tishi[this.index].style.display="block";
*/ 	}
}
 //滚动条  控制  左侧按钮
		for(var i=0;i<lc.length;i++){
 			lc[i].t=lc[i].offsetTop;
 			if(lc[i].t<scrollT+400){
				for(var j=0;j<btn.length;j++){
  					tishi[j].style.display="none";

 				}
  				tishi[i].style.display="block";
 
 			}
 		}
 
}

 

//左侧按钮效果    ｄｅ　效果

   // var ddd=$(".ddd");//一级菜单名
    var tishi=$(".tishi");
    //二级菜单名
      for(var i=0;i<btn.length;i++){
    	btn[i].index=i;
    	hover(btn[i],function(){
      		tishi[this.index].style.display="block";
      	},function(){
     		tishi[this.index].style.display="none";
     	})
   
    }
    

///////////*****************楼层跳转结束*?////////



//////**********楼层的轮播图*********////
function luobo(num1){
 		var first_lefttubig=$(".first_lefttubig")[num1];
		var jiantouz=$(".jiantouz")[num1];
		var jiantouy=$(".jiantouy")[num1];
 		function moveLeft(){ 
 				var first=getFirst(first_lefttubig);
				var last=getLast(first_lefttubig);
				animate(first_lefttubig,{left:-190},600,Tween.Linear,function(){
	 				first_lefttubig.appendChild(first);
					first_lefttubig.style.left=0;
   				});
  		}
 		function moveRight(){
 				var last=getLast(first_lefttubig);
 				first_lefttubig.style.left=-190+"px";
				first_lefttubig.insertBefore(last,getFirst(first_lefttubig));
				animate(first_lefttubig,{left:0},600,Tween.Linear);
 		}
 		 jiantouz.onmouseover=function(){
		 	clearInterval(t1);
		 }
		 jiantouy.onmouseover=function(){
		 	clearInterval(t1);
		 }
 
		 jiantouz.onmouseout=jiantouy.onmouseout=function(){
		 	t1=setInterval(moveLeft,2000);
		 }

		  jiantouz.onclick=function(){
		 	moveLeft();
		 }
		 jiantouy.onclick=function(){
		 	moveRight();
		 }  


		  var t1=setInterval(moveLeft,2000);

 }

 
		    for(var i=0;i<6;i++){
    			luobo(i);
    		} 


 /////////////////////*8888888888//////////////////


 //图片的左移效果


function yidongh(num2){
	var first_right=$(".first_right")[num2];
	   var moveimg=$("img",first_right);
	   for(var i=0;i<moveimg.length;i++){
	   	moveimg[i].index=i;
	   	moveimg[i].onmouseover=function(){
	   		moveimg[this.index].style.cssText="position:relative;left:-5px;"
	   		  
	   	}
	   	moveimg[i].onmouseout=function(){
	   		moveimg[this.index].style.cssText="position:relative;left:0px;"
	   	 
	   	}
	}
 
}

for(var i=0;i<12;i++){
	yidongh(i);
}


/////******************?????///////////左移效果

////////////////////**banner左侧*****************??///////////





// var menucon=$('.main_left1')[0];
// var highlight=$(".highlight")[0];

    var lefts=$('.jxsc');
    var cai=$('.caidans');
    var highlight=$(".highlight");
    var highlight2=$(".highlight2");
    var highlight3=$(".highlight3");
  	// var arrzi=["red","blue","yellow","red","blue","yellow","red","blue","yellow"];
	
	for(var i=0;i<highlight.length;i++){
			highlight[i].style.color="red";
	} 
	for(var i=0;i<highlight2.length;i++){
			highlight2[i].style.color="blue";
	} 
	for(var i=0;i<highlight3.length;i++){
			highlight3[i].style.color="green";
	} 
     for(var i=0;i<lefts.length;i++){
    	lefts[i].index=i;
     	hover(lefts[i],function(){
    		for(var j=0;j<cai.length;j++){
    			cai[j].style.display="none";
    		}
    			cai[this.index].style.display="block";
     	},function(){
    		cai[this.index].style.display="none";
    	})
    	
    }


///////////////////////////////////
 
}














