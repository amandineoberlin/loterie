//get value of each property
var getCurrentParticipants = function(result) {
  var count = 0;
  $.each(result, function(k, v) {
    if (result.hasOwnProperty(v)) ++count;
  });
  return count;
};

var displayResults = function (result) {
  $('#tableau').html('<h3>' + getCurrentParticipants(result) + ' participant(s) sur 5 validé(s)' + '</h3>'
  + '</h6>La liste des résultats sera visible lorsque tout le monde aura joué</h6>');
};

var buildResultTable = function (result) {
  tbl_row = '<table class="table table-striped"><tr class="success"><th>Nom</th><th>offre à : </th></tr>';
    $.each(result, function(k, v) {
      tbl_row += '<tr><td><strong>' + k + '</strong></td><td>' + v + '</td></tr>'
    });
  tbl_row += '</table>';
  $('#tableau').replaceWith(tbl_row);
}

$(document).ready(function(){
  $.ajax({
    type: "POST",
    url: "cible.php",
    success: function(result) {
      result = JSON.parse(result);
      if (getCurrentParticipants(result) === 5) {
        $("#bouton").attr("disabled", true);
        buildResultTable(result);
      } else {
        displayResults(result);
      }
    }
  });

  $("#bouton").click(function(event){

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

              displayResults(result.file);
              if (getCurrentParticipants(result.file) === 5) {
                buildResultTable(result.file);
              }
            }
          });
        }, 2000);
      })
    }

  });//bouton
});//document ready
