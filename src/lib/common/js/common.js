/* 通用组件 */
(function(){
	var voc = {}
	window.vocCommon = voc;

	//tab选项卡
	voc.tabMenu = function(tabDom, currentClass, contentDom){
			$(tabDom).find("li").click(function(){
					var index = $(this).index();
					$(this).addClass(currentClass).siblings("li").removeClass(currentClass);
					$(this).parents(tabDom).next(contentDom).children().eq(index).addClass(currentClass).siblings().removeClass(currentClass);
			});
	}

	//弹出框
	voc.popup = function(clickDom, popContent){
			//定义弹出框的DOM结构
			var html = '<div class="popup" id="popup">'+
							'<p class="popupBg"></p>'+
							'<div class="popupWrap">'+
								'<span class="closePopup">关闭</span>'+
								'<div class="popupContent"></div>'+
							'</div>'+
						'</div>	';
			//点击显示弹出框
			$(clickDom).click(function(){
					if( $("#popup").length==0 ){
							$("body").append(html); //如果页面中不存在弹出框，则添加到body中
					}
					$("#popup .popupContent").html(popContent); //弹出框内添加指定内容
					$("#popup").fadeIn();
					
					//关闭弹出框
					$("#popup .closePopup, #popup .popupBg").click(function(){
							$("#popup").fadeOut();												
					});
			});
	}
	
	//右侧居中快捷按纽组，设置margin-top
	voc.setFixedToolsTop = function(fixedToolsDom){
			var toolsDomH = $(fixedToolsDom).height();
			$(fixedToolsDom).css("margin-top", -toolsDomH/2);
	}
	
	//汉宝包折叠菜单 （下拉菜单）
	voc.dropDownMenu = function(clickDom, className, dropDownMenu){
			$(clickDom).click(function(){
					$(this).parents().toggleClass(className);
					$(this).siblings(dropDownMenu).slideToggle();
			});
	}
	
	//容器渲染图表
	voc.loadSheet = function(sheetDom, dataOption){
			var sheetDom = echarts.init(document.getElementById(sheetDom));
			sheetDom.setOption(dataOption);
	}
	
	//导航跟随线位置设置
	voc.navLinePosition = function(navLi, navLine){
			var navLiLen = $(navLi).length;
			$(navLi).find("a").hover(function(){
					var liWidth = $(this).width();
					var clientL = $(this)[0].offsetLeft; //nav需设置position
					$(navLi).parents().find(navLine).width(liWidth).css("margin-left", clientL+1);
			})
	}
	
})();


$(function(){
	//顶部导航 蓝色跟随线位置设定
	vocCommon.navLinePosition(".top .nav li", ".navLine");
});

