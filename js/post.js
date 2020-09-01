var apiBaseURL ="http://localhost:9001";
var postData;
var commentData;
var postTemplate;
var commentTemplate;
var commentPostData = {};
var editModeEnabled = false;
var commentEditID;
var postID = window.location.search.substring(1).split('=')[1];

$("#reply_text").hide();
$("#edit_text").hide();

$.ajax(apiBaseURL + "/posts/" + postID)
  .done(function(data) {
    postData = data;
    postTemplate = $("#post_template").html();
    var renderedPost = Mustache.render(postTemplate, postData);
    $("#post_container").append(renderedPost);
    getComments()
  }).fail(function() {
    alert( "error" );
  });

$("#comments_container").on("click", ".reply_btn", function(){
  $("#edit_text").hide();
  editModeEnabled = false;

  var buttonID = this.id;
  var replyID = buttonID.split('_')[1];
  commentPostData["parent_id"] = replyID;

  var parentComment = $.grep(commentData, function(obj){return obj.id == replyID;})[0]
  if(parentComment.parent_id){
    commentPostData.parent_id = parentComment.parent_id;
  } else {
    commentPostData.parent_id = null;
  }
  $("#reply_username").html(parentComment.user);
  $("#reply_text").show();
});

$("#cancel_reply_btn").click(function(){
  $("#reply_text").hide();
  commentPostData["parent_id"] = null;
});

$("#comments_container").on("click", ".edit_btn", function(){
  $("#reply_text").hide();
  editModeEnabled = true;

  var buttonID = this.id;
  commentEditID = buttonID.split('_')[1];

  var editComment = $.grep(commentData, function(obj){return obj.id == commentEditID;})[0]  
  commentPostData = editComment;
  $("#edit_username").html(editComment.user);
  $("#user_name_in").val(editComment.user);
  $("#comment_body_in").val(editComment.content);
  $("#edit_text").show();
});

$("#cancel_edit_btn").click(function(){
  $("#edit_text").hide();
  $("#comment_body_in").val("");
});

$("#comment_submit_btn").click(function(){
  commentPostData["user"] = $("#user_name_in").val();
  commentPostData["content"] = $("#comment_body_in").val();
  var d = new Date();
  commentPostData["date"] = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

  var HTTPMethod = "POST";
  var AJAXURL = apiBaseURL + "/posts/" + postID + "/comments";

  if(editModeEnabled){
    HTTPMethod = "PUT";
    AJAXURL = apiBaseURL + "/comments/" + commentEditID;
  }

  $.ajax({
    type: HTTPMethod,
    url: AJAXURL,
    data: commentPostData
  })
  .done(function(data) {
    getComments();
  }).fail(function() {
    alert( "error" );
  });
});



function getComments(){
  $.ajax( apiBaseURL + "/posts/" + postID + "/comments")
    .done(function(data) {
      $("#comments_container").html("");
      $("#reply_text").hide();
      $("#edit_text").hide();
      $("#comment_body_in").val("");
      editModeEnabled = false;
      
      commentData = data;
      commentTemplate = $("#comment_template").html();
      for(var i = 0; i < commentData.length; i++){
        if(commentData[i].parent_id !== undefined){
          if(commentData[i].parent_id){
            var parentComment = $.grep(commentData, function(obj){return obj.id == commentData[i].parent_id;})[0]

            commentData[i]["parent_user"] = parentComment.user;
            var renderedComment = Mustache.render(commentTemplate, commentData[i]);
            $("#comment_"+commentData[i].parent_id).after(renderedComment);
          } else {
            var renderedComment = Mustache.render(commentTemplate, commentData[i]);
            $("#comments_container").append(renderedComment); 
          }
        } else {
          var renderedComment = Mustache.render(commentTemplate, commentData[i]);
          $("#comments_container").append(renderedComment); 
        }
      }
    });
}