$(document).ready(function(){

  // $.ajax({
  //   type: "GET",
  //   url: "cible.php",
  //   dataType: 'json',
  //   success: function(result){
  //     $('#tableau').html(JSON.stringify(result.old));
  //   }
  // });

  $("#bouton").click(function(event){
    //prevents form from reloading
    event.preventDefault();

    var name = $("#select").val();

    if (name && name !== '...') {
      $('#panneau').css({ display: 'block'});
      $('#prenom').html(name);

      $.ajax({
        type: "POST",
        url: "cible.php",
        data: 'name='+ $( "#select" ).val(),
        success: function(result){ console.log(result);
          $('#resultat').html(result);
        }
      });
    }

  });//bouton
});//document ready
