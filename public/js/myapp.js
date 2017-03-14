$(function(){
    var limit = 6;
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
    });
})
