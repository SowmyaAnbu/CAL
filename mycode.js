$(document).ready(function() {

  //$("h2").next().hide();

  $("h2").click(function() {
    $(this).next().slideToggle(300);
	$(this).next().next().slideToggle(300);
  });
  

})
