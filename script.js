//get value of each property
var getCurrentTable = function(result) {
  var count = 0;
  $.each(result, function(k, v) {
    if (result.hasOwnProperty(v)) ++count;
  });
  return count;
};

$(document).ready(function(){
  $.ajax({
    type: "POST",
    url: "cible.php",
    success: function(result) {
      result = JSON.parse(result);
      if (getCurrentTable(result) < 5) {
        $('#tableau').html('<h3>' + getCurrentTable(result) + ' participant(s) sur 5 validé(s)' + '</h3>'
        + '</h6>La liste des résultats sera visible lorsque tout le monde aura joué</h6>');
      };
      if (getCurrentTable(result) === 5) {
        $("#bouton").attr("disabled", true);
        tbl_row = '<table class="table"><tr><th>Nom</th><th>offre à : </th></tr>';
          $.each(result, function(k, v) {
            tbl_row += '<tr><td>' + k + '</td><td>' + v + '</td></tr>'
          });
        tbl_row += '</table>';
        $('#tableau').replaceWith(tbl_row);
        }
    }
  });

  $("#bouton").click(function(event){
    //prevents form from reloading
    event.preventDefault();

    var name = $("#select").val();
    if (name && name !== '...') {
      $('#panneau').css({ display: 'block'});
      $('#prenom').html(name);
      $('#valider').click(function(event) {
        event.preventDefault();
        $('.loader').css({ display: 'block' });
        setTimeout(function(){
          $('.loader').css({ display: 'none' });
          $.ajax({
            type: "POST",
            url: "cible.php",
            data: 'name='+ $( "#select" ).val(),
            success: function(result){
              result = JSON.parse(result);
              $('#resultat').css({ display: 'block'});
              $('#resultat').html('Tu as tiré au sort : ' + result.resultat);
              $('#tableau').html('<h3>' + getCurrentTable(result.file) + ' participant(s) sur 5 validé(s)' + '</h3>'
              + '</h6>La liste des résultats sera visible lorsque tout le monde aura joué</h6>');

              if (getCurrentTable(result.file) === 5) {
                tbl_row = '<table class="table"><tr><th>Nom</th><th>offre à : </th></tr>';
                  $.each(result.file, function(k, v) {
                    tbl_row += '<tr><td>' + k + '</td><td>' + v + '</td></tr>'
                  });
                tbl_row += '</table>';
                $('#tableau').replaceWith(tbl_row);
                }

              }
          });
        }, 2000);


      })
    }

  });//bouton
});//document ready
