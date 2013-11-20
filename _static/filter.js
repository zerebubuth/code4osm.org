// from http://jsfiddle.net/nanoquantumtech/Ddnuh/
$(document).ready(function () {
    $('.results > li').hide();

    $('div.tags').on('click', 'input:checkbox', function () {
	if ($('div.tags').find('input:checked').length == 0) {
	    $('.results > div').show();
	} else {
            $('.results > div').hide();
            $('div.tags').find('input:checked').each(function () {
		$('.results > div.' + $(this).attr('rel')).show();
            });
	}
    });
});
