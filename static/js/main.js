$(document).ready(function () {
  
  $('.nav-click').on('click', function(){
    $('.main').toggleClass('toggle-page');
    $(this).toggleClass('active')
  });
  $('.icon-left-pannel').on('click', function(){
    $('.left-pannel').toggle();
    $(this).toggleClass('active')
  });

  $('.filter-btn').on('click', function(){
    $('.box-filter').toggle();
  });
  $('.close-filter').on('click', function(){
    $('.box-filter').hide();
  });
  $('.a-dropdown').click(function(e){
    $('.a-dropdown').toggleClass('active');
    $(".box-dropdown").toggleClass('show');
  });

  $('.left-menu, .content-main').click(function(){
    $('.a-dropdown').removeClass('active');
    $(".box-dropdown").removeClass('show');
  });

  var Privileges = jQuery('#position');
var select = this.value;
Privileges.change(function () {
    if ($(this).val() == 'admin') {
        $('.admin-div').show();
    }else $('.admin-div').hide(); 
    if ($(this).val() == 'director') {
      $('.director-div').show();
    }else $('.director-div').hide(); 
});


});