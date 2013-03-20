/**
 * 課題
 * イベントをバインドしたDOMを書き換えた場合、イベントがアンバインドされる。（ある意味当然）
 * 
 */
(function(){
	
	var handler = function(e){
		
		e.preventDefault();
	
		var $main = $('#main');
		
		console.log('triggerd!!' + e.target);
		
		//↓これでも大丈夫なんだけど、onしたタイミングでclickイベントが発火してしまう。
		//2回目以降はイベントは1回しか発火しないが、動きが微妙なので間違っているっぽい。
		//$main.html($main.html()).off('click', handler).on('click', handler);
	
	}
		
	//この書き方だと.btnのDOMが書き換わったタイミングでハンドラが削除される。
	//$('.btn').on('click', handler);
	//1.9以降はdocumentに対してバインドし、イベントバブリングでliveと同等のことを行う。
	$(document).on('click', '.btn', handler);
		
})();