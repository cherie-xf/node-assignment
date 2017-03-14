$(function(){
    var failedAlert = $("#failed-alert");
    var successAlert = $("#success-alert");
    var limit = 6;
    alertClean();
    $('.top-class input.form-check-input').on('change', function(evt) {
       if($('.top-class input.form-check-input:checked').length >= limit) {
              //this.checked = false;
              $('.top-group input.form-check-input:not(:checked)').prop('disabled', true);
       } else {
              $('.top-group input.form-check-input:not(:checked)').prop('disabled', false);
       }
    });

    $('#pizza-form').submit(function(){
         //var chkbxValues = $(".tehAwesomeCheckboxen").val();
         var checkValues = $('.top-class input.form-check-input:checked').map(function(){
             return $(this).val();
         }).get();
         $("#topping").val( checkValues.join(",") );
         return validate();
    });

    function validate(){
      var topping = $("#topping").val();
      var tele = $("#tel").val();
      var address = $("#address").val();
      var phone_pattern = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;
      var message = [];
      if(!$.trim(topping)){
        message.push('<li>please select toppings;</li>');
      }
      if(!$.trim(tele) && !phone_pattern.test( tele)){
        message.push('<li>please input valid telephone number;</li>');
      }
      if(!$.trim(address)){
        message.push('<li>please input address;</li>');
      }
      if(message.length > 0){
        failedAlert.find('ul').append(message.join(" "));
        failedAlert.fadeIn();
        failedAlert.addClass("in");
        return false;
      }
      return true;
    }

    function alertClean(){
      failedAlert.find('ul').html('');
      successAlert.find('ul').html('');
      failedAlert.hide();
      successAlert.hide();
    }
})
