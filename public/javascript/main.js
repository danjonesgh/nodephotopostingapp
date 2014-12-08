$(".btn-danger").click(function() {
	var p = $(this).parent();
	ajaxRemove($(this).val(), function(success) {
		if(success) {
			console.log('succes deleting??');
			p.remove();

		}
		else {
			console.log('problem removing row??');
		}
	});
});



function ajaxRemove(pictureName, callback) {
	var request = $.ajax({
  	type: "POST",
  	url: "/removepost",
  	data: { picture: pictureName}
	});


  request.done(function( msg ) {
  	console.log('ajax call done');
  	console.log(msg);
  	callback(true);
  });

  request.fail(function(jqXHR, text) {
  	console.log('ajax failed');
  	callback(false);
  });
}
