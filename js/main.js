var postData;
var postTemplate;

$.ajax("http://localhost:9001/posts")
	.done(function(data) {
		postData = data;
		postTemplate = $("#post_template").html();
		console.log(data);
		for (var i = 0; i < postData.length; i++) {
			var rendered = Mustache.render(postTemplate, postData[i]);
				$(".data_container").append(rendered);
		}

	}).fail(function() {
		alert( "error" );
	});