var apiBaseURL = "http://localhost:9001"
var postData;
var postTemplate;

$.ajax(apiBaseURL + "/posts")
	.done(function(data) {
		postData = data;
		postTemplate = $("#post_template").html();
		for (var i = 0; i < postData.length; i++) {
			var rendered = Mustache.render(postTemplate, postData[i]);
				$("#post_list_container").append(rendered);
		}

	}).fail(function() {
		alert( "error" );
	});