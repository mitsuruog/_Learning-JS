(function(){
	
	var handler = function(e){
		
		e.preventDefault();
	
		var $main = $('#main');
		
		console.log('triggerd!!' + e.target);
		
		//↓これでも大丈夫なんだけど、onしたタイミングでclickイベントが発火してしまう。
		//$main.html($main.html()).off('click', handler).on('click', handler);
	
	}
		
	$(document).on('click', '.btn', handler);
		
})();