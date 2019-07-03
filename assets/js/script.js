/*-------------------------------------------
gnavi fixed
--------------------------------------------*/
jQuery(function($) {
	var nav    = $('.l-header__inner__gnavi'),
			offset = nav.offset();
	$(window).scroll(function () {
		if($(window).scrollTop() > offset.top) {
			nav.addClass('fixed');
		} else {
			nav.removeClass('fixed');
		}
	});
});

/*-------------------------------------------
SP gnavi
--------------------------------------------*/
$(function() {
    $('.menubtn').click(function(){
		$(this).next().slideToggle();
		$(this).toggleClass("active");

		//メニュー開く時メニュー以外動かないように、かつ閉じるときに一番上に戻らないように
		if($(this).hasClass('active')){
			scrollTop = $(window).scrollTop();
			if(scrollTop == 0){
				localStorage.setItem('bodyscrolltop', 0);
			}else{
				localStorage.setItem('bodyscrolltop', scrollTop);
			}
			$('body').css({
				'position': 'fixed',
				'top': -localStorage.getItem('bodyscrolltop')
			});
		}else{
			setTimeout(function(){
				$('body').css({
					'position': 'relative',
					'top':0
				})
				$(window).scrollTop(localStorage.getItem('bodyscrolltop'));
			}, 200);
		}
	});
});



/*-------------------------------------------
ページ内リンク用
--------------------------------------------*/
$(function() {
	$('.scrl').click(function() {
		// スクロールの速度
		var speed = 400; // ミリ秒
		// アンカーの値取得
		var href= $(this).attr("href");
		// 移動先を取得
		var target = $(href == "#" || href == "" ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top;
		// スムーススクロール
		$('body,html').animate({scrollTop:position - 100}, speed, 'swing');
		return false;
	});

	//別ページのアンカーに飛ぶ時
	var myurl = location.href;
	if(myurl.match('#')){
		var anc = myurl.substr(myurl.indexOf('#'));
		var headerHight = 130;
		var speed = 500;
		var target = $(anc);
		var position = target.offset().top-headerHight;
		$("html, body").animate({scrollTop:position}, speed, "swing");
	}
});


/*-------------------------------------------
フッター
--------------------------------------------*/
$(function() {
	
	var footerId = "footer";
	//メイン
	function footerFixed(){
		//ドキュメントの高さ
		var dh = document.getElementsByTagName("body")[0].clientHeight;
		//フッターのtopからの位置
		document.getElementById(footerId).style.top = "0px";
		var ft = document.getElementById(footerId).offsetTop;
		//フッターの高さ
		var fh = document.getElementById(footerId).offsetHeight;
		//ウィンドウの高さ
		if (window.innerHeight){
			var wh = window.innerHeight;
		}else if(document.documentElement && document.documentElement.clientHeight != 0){
			var wh = document.documentElement.clientHeight;
		}
		if(ft+fh<wh){
			document.getElementById(footerId).style.position = "relative";
			document.getElementById(footerId).style.top = (wh-fh-ft-1)+"px";
		}
	}
	
	//文字サイズ
	function checkFontSize(func){
	
		//判定要素の追加	
		var e = document.createElement("div");
		var s = document.createTextNode("S");
		e.appendChild(s);
		e.style.visibility="hidden"
		e.style.position="absolute"
		e.style.top="0"
		document.body.appendChild(e);
		var defHeight = e.offsetHeight;
		
		//判定関数
		function checkBoxSize(){
			if(defHeight != e.offsetHeight){
				func();
				defHeight= e.offsetHeight;
			}
		}
		setInterval(checkBoxSize,1000)
	}
	
	//イベントリスナー
	function addEvent(elm,listener,fn){
		try{
			elm.addEventListener(listener,fn,false);
		}catch(e){
			elm.attachEvent("on"+listener,fn);
		}
	}

	addEvent(window,"load",footerFixed);
	addEvent(window,"load",function(){
		checkFontSize(footerFixed);
	});
	addEvent(window,"resize",footerFixed);
	
});




/*
 * fixSvgIntrinsicSizing
 * IEのインラインSVGの固有サイズ表示をSVG1.1仕様に修正
 * おまけで、preserveAspectRatioが'slice'だった場合に'overflow:hidden'を適用
 * 注意：svg要素にはviewBox属性を必須としています
 * なお、特定のsvg要素への適用を避けたい場合には、そのsvg要素にclass="noFixSvgIntrinsicSizing"を付与してください
 * Fix inline SVG intrinsic sizing in IE.
 * Plus, add 'overflow:hidden' when preserveAspectRatio has 'slice' value.
 * NOTE: 'viewBox' attribute is required in svg element.
 * To prevent applying to the specific svg element, add class="noFixSvgIntrinsicSizing" to that svg element.
 * Copyright (c) 2014-2016 Kazz
 * http://asamuzak.jp
 * Dual licensed under MIT or GPL
 * http://asamuzak.jp/license
 */

(function(_win, _doc) {
  "use strict";
  if(_doc.documentMode) {
    var fixSvgIntrinsicSizing = function() {
      function getAspect(o) {
        return (o = o.split(" ")) && o[3] / o[2];
      }
      var x = _doc.querySelectorAll("svg[viewBox]");
      if(x) {
        for(var y, z, a, b, i = 0, l = x.length; i < l; i++) {
          y = x[i];
          if(!/noFixSvgIntrinsicSizing/.test(y.className.baseVal)) {
            y.hasAttribute("preserveAspectRatio") &&
              /slice/.test(y.getAttribute("preserveAspectRatio")) &&
              (y.style.overflow = "hidden");
            a = _doc.defaultView.getComputedStyle(y, "").width;
            b = _doc.defaultView.getComputedStyle(y, "").height;
            y.style.width = "";
            y.style.height = "";
            z = _doc.defaultView.getComputedStyle(y, "").height;
            if(z !== "150px") {
              y.style.width = a;
              y.style.height = b;
            }
            else {
              z = _doc.defaultView.getComputedStyle(y, "").width;
              a = /([0-9\.]+)px/.exec(z)[1] * 1;
              b = getAspect(y.getAttribute("viewBox"));
              a * b > _doc.documentElement.offsetHeight && (
                y.style.height = (a * b) + "px",
                z = _doc.defaultView.getComputedStyle(y, "").width,
                a = /([0-9\.]+)px/.exec(z)[1] * 1
              );
              y.style.width = z;
              y.style.height = (a * b) + "px";
            }
          }
        }
      }
    };
    _doc.addEventListener("DOMContentLoaded", fixSvgIntrinsicSizing, false);
    _win.addEventListener("resize", fixSvgIntrinsicSizing, false);
  }
})(window, document);