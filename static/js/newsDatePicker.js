$('#newsDatepicker a').on('click', function(e){
	e.preventDefault();
	$('#newsDatepicker').data("DateTimePicker").toggle();
})
var d = new Date;
$('#newsDatepicker').datetimepicker({
    locale: 'ru',
    format: 'YYYY-MM-DD',
    minDate: '2017-01-01',
    defaultDate: moment().format('YYYY-MM-DD'),
    maxDate: moment().format('YYYY-MM-DD'),
    useCurrent: true,
    enabledDates: news_dates.map(function(item){ return moment(item)})
});
$('#newsDatepicker').on('dp.change', function(e){
	setTimeout(function(){
		$.ajax({
			'url': '/ajax/getNews/' + $('#newsDatepicker input').val(), 
			'dataType': 'json',
			'success': function(data) {
				console.log(data);
			}
		})
	}, 100)
});
