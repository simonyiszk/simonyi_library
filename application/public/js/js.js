$(document).ready(function() {
	var img = $('.left-section img');
	img.on('load', function() {
		$('.right-section').css('left', img.width());
	});
	
	$(window).resize(function() {
		$('.left-section').css('width', img.width());
		$('.right-section').css('left', img.width());
	});
});