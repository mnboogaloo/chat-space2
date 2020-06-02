$(function(){ 
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
  	  var html =
  	    `<div class="upper-message" data-message-id= "${message.id}">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <p class="lower-message__image">
            ${image}
          </p>
        </div>  
        </div>`
    return html;
  }
  // function buildHTML(message) {
  //   if (message.content && message.image) {
  //     var html = `<div class="message">` +
  //       `<div class="upper-message">` +
  //       `<div class="upper-message__user-name">` +
  //       message.user_name +
  //       `</div>` +
  //       `<div class="upper-message__date">` +
  //       message.created_at +
  //       `</div>` +
  //       `</div>` +
  //       `<div class="lower-message">` +
  //       `<p class="lower-message__content">` +
  //       message.content +
  //       `</p>` +
  //       `<img src="` + message.image + `" class="lower-message__image" >` +
  //       `</div>` +
  //       `</div>`
  //   } else if (message.content) {
  //     var html = `<div class="message">` +
  //       `<div class="upper-message">` +
  //       `<div class="upper-message__user-name">` +
  //       message.user_name +
  //       `</div>` +
  //       `<div class="upper-message__date">` +
  //       message.created_at +
  //       `</div>` +
  //       `</div>` +
  //       `<div class="lower-message">` +
  //       `<p class="lower-message__content">` +
  //       message.content +
  //       `</p>` +
  //       `</div>` +
  //       `</div>`
  //   } else if (message.image) {
  //     var html = `<div class="message">` +
  //       `<div class="upper-message">` +
  //       `<div class="upper-message__user-name">` +
  //       message.user_name +
  //       `</div>` +
  //       `<div class="upper-message__date">` +
  //       message.created_at +
  //       `</div>` +
  //       `</div>` +
  //       `<div class="lower-message">` +
  //       `<img src="` + message.image + `" class="lower-message__image" >` +
  //       `</div>` +
  //       `</div>`
  //   };
  //   return html;
  // }

 $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.message-list').append(html);
    $('form')[0].reset();
    $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
   })
  .fail(function(){
    alert('メッセージ送信に失敗しました');
  })

  .always(function(data){　
  $(".form__submit").prop('disabled', false);
  })
  })
});
