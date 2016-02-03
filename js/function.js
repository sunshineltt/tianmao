	//兼容函数
	//功能：兼容IE8 通过类名获取元素
	//参数说明：
	function getClass(classname,obj){
		var obj=obj||document;
		if(obj.getElementByClassName){//判断w3c浏览器
			return obj.getElementByClassName(classname);//结果返回
		}
		else{//否则IE8
            var all=obj.getElementsByTagName("*");//用标签名获取到所有元素，是一个集合
            var arr=[];
            //新数组，用来保存找到的元素
            for(var i=0;i<all.length;i++){
            	//遍历all
            	if(checkRel(all[i].className,classname)){
            		arr.push(all[i]);
            		//末尾添加元素
            	}
            }return arr;
		}
	}

	
		//"inner one"["inner","one"]
		//参数说明：str-多个类名的集合以后的字符串
		          //val-想找的类名
		function checkRel(str,val){
			var newarr=str.split(" ");
			//字符串转换成数组，以空格拆分
			for(var i=0;i<newarr.length;i++){//遍历数组
				if(newarr[i]==val){
				//如果数组中的值与val相同
					return true;
					//函数返回true，表示找到
				}
			}
			return false;
			//如果没有找到，返回false
		}
	var box=getClass("box")[0];
	var inner=getClass("inner",box);
	//alert(inner.length);
//***************************************
//可以获取与设置纯文本函数
//obj:哪个对象用这个方法
//val:接收第二个实参，表示设置一个文本
function getText(obj,val){//undefined
	if(val==undefined){
		//如果val为undefined，表示只有一个参数,这个函数实现的功能获取文本
		if(obj.innerText){
		//如果为真是IE8浏览器
		return obj.innerText;
	}
	else{
		//w3c浏览器
		return obj.textContent;
	}
	}
	else{
		//如果val不是undefined，表示要设置文本
		if(obj.innerText||obj.innerText==""){
			//当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本
			//如果为真是IE8浏览器
			obj.innerText=val;
		}
		else{//w3c浏览器
			obj.textContent=val;
		}
	}
	
}


//**************************************
//获取样式
//obj:哪个对象
//attr:哪个属性

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,null)[attr];
	}
}
/*
**********************************************************
$(".box");   类名
$("#first"); ID名
$("div");    标签名
*/
	function $(select,obj){
		var obj=obj||document;
		if(typeof select=="string"){
			select=select.replace(/^\s*|\s*$/g,"");
			//去掉字符串前后的空格
			if(select.charAt(0)=="."){
				return getClass(select.slice(1),obj);
			}
			else if(select.charAt(0)=="#"){
				return obj.getElementById(select.slice(1));
			}
			else if(/^[a-z|1-6]{1,10}$/g.test(select)){
				return obj.getElementsByTagName(select);
			}	
		}
		else if(typeof select=="function"){
				window.onload=function(){
					select();
				}
			}

	}
//**************************************************************
//getChilds(parent);
//"a"获取元素子节点的兼容函数
//"b"获取元素+文本节点
function getChilds(parent,type){
	 var type=type||"a";
     var childs=parent.childNodes;
     //所有儿子
     var arr=[];
;     for(var i=0;i<childs.length;i++){
	if(type=="a"){
		if(childs[i].nodeType==1){
            arr.push(childs[i]);
     	}
	}
	else if(type=="b"){//元素+文本
          if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
            arr.push(childs[i]);
     	}
	}
     	
     }return arr;
}

//********************************************
//6.先获得第一个子节点

function getFirst(parent){
	return getChilds(parent)[0];
}


//7.获得最后一个子节点

function getLast(parent){
	// parent.length=arguments.length;
	return getChilds(parent)[getChilds(parent).length-1];
}

 

//8,。获得一个指定节点

function getNum(parent,num){
	return getChilds(parent)[num];
}


//9.下一个兄弟节点；

function getNext(obj){
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
 		while(next.nodeType==3||next.nodeType==8){
		 
			next=next.nextSibling;
			if(next==null){
				return false;
			}
 	}
	 
	return next;
}



// 10.上一个兄弟节点

function getUp(obj){
	var up=obj.previousSibling;
	 if(up==null){
		return false;
	} //空格
 		while(up.nodeType==3||up.nodeType==8){
		 
			up=up.previousSibling;
			if(up==null){
				return false;
			}
 	}
	 
	return up;
}

//************************************************************************************
//插入到某个对象之后
//对象·insertBefore(obj,obj1)
//插入到下一个对象之前
//重点 给对象的原型添加此方法
//原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前（插入到下一个对象之前）
//obj1:插入的那个对象
//obj2:插入哪个对象的后面
Object.prototype.insertAfter=function(obj1,obj2){
	var next=getNext(obj2);
	if(next){
	this.insertBefore(obj1,next);}
	else{
	this.appendChild(obj1);
  }

}



//12.兼容问题     获取滚动条与页面顶部之间的距离
function getScrollT(){
	var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
 	return scrollT;

}

//13.为一个元素添加多个事件的方法
//obj :给那个对象添加
//ev：什么事件
//fun:事件处理程序

 function addEvent(obj,ev,fun){
	if(obj.addEventListener){//ff
		return obj.addEventListener(ev,function(){
			fun.call(obj);
		},false);
	}else{//在IE8中,this不是指的当前对象，是指的window
		return obj.attachEvent("on"+ev,function(){
			fun.call(obj);
		});
	}
} 



//14.为一个元素添加多个事件的方法
//obj :给那个对象添加
//ev：什么事件
//fun:事件处理程序

 function removeEvent(obj,ev,fun){
	if(obj.addEventListener){//ff
		return obj.removeEventListener(ev,function(){
			fun.call(obj);
		},false);
	}else{//在IE8中,this不是指的当前对象，是指的window
		return obj.detachEvent("on"+ev,function(){
			fun.call(obj);
		});
	}
} 



/***********************/
function getCW(){
	return document.documentElement.clientWidth;
}


function getCH(){
	return document.documentElement.clientHeight;
}
///////************/


/************////////////////
//实现 拖拽效果

function drag(obj){
		var cw=getCW();
		var ch=getCH();
		var ow=obj.offsetWidth;
		var oh=obj.offsetHeight;



		obj.onmousedown=function(e){
			var ev=e||window.event;
			var ox=ev.offsetX;
			var oy=ev.offsetY;
			//阻止浏览器的默认行为
			
			if (ev.preventDefault ){
				ev.preventDefault(); //阻止默认浏览器动作(W3C)
			}
				
			else{
				ev.returnValue = false;//IE中阻止函数器默认动作的
			}
			


			document.onmousemove=function(e){
				var ev=e||window.event;
				var cx=ev.clientX;
				var cy=ev.clientY;
				
				//事件委托的思想
				var newx=cx-ox;
				var newy=cy-oy; 
				if(newx<=0){
					newx=0;
				}
				if(newx>(cw-ow)){
					newx=cw-ow;
				}

				if(newy<=0){
					newy=0;
				}
				if(newy>(ch-oh)){
					newy=ch-oh;
				}

				obj.style.left=newx+"px";
				obj.style.top=newy+"px";
 			}

 		}



		obj.onmouseup=function(){
			document.onmousemove=null;


		}
}





/*
obj  是指哪个对象添加滚轮事件
upfun:处理滚轮向上的函数
downfun:处理滚轮向下的函数
*/
function mouseWheel(obj,upfun,downfun){
		if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
		}else if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);
			//chrome,safari -webkit-
			obj.addEventListener("DOMMouseScroll",scrollFn,false);
			//firefox -moz-
		} 

		function scrollFn(e){
			var ev=e||window.event;

			if (ev.preventDefault){
				ev.preventDefault(); //阻止默认浏览器动作(W3C)
			}
			
			else{
				ev.returnValue = false;//IE中阻止函数器默认动作的
			//方式
			}
			
 
			var num=ev.detail||ev.wheelDelta;;
			
			if(num==-3||num==120){
				//向上
				if(upfun){
					upfun();
				}
				
			}
 
			if(num==3||num==-120){
				//向上
				if(downfun){
					downfun();
				}
				
			}

		}

	}
	



//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
















 