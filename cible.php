<?php
$name = isset($_POST['name']) ? $_POST['name'] : '';
$nameArray = ["Amandine", "Cedric", "Juline", "Laurine", "Jean-Baptiste"];
$json = file_get_contents ('file.json');
$array = json_decode($json);
$resultatTirage = '';

if ($name) {

  if ($array->$name) {
    //If user already played, send resultname in array instead of string
    $data['resultat'] = array(
      0 => $array->$name
    );

  } else {

    //list of already chosen names
    foreach($array as $key) {
      $output_arr[] = $key;
    };

    //Remove already chosen names from array
    foreach ($output_arr as $key => $value) {
      if ($value) {
        $myKey = array_search($value, $nameArray);
        unset($nameArray[$myKey]);
      }
    };

    //Remove current user from array so that he doesnt choose himself from array
    foreach ($nameArray as $key2 => $value2) {
      if ($value2 == $name) {
        unset($nameArray[$key2]);
      }
    }

    $resultatTirage = $nameArray[array_rand($nameArray, 1)];
    $array->$name = $resultatTirage;
    file_put_contents("file.json", json_encode($array));
    $data['resultat'] = $resultatTirage;
  };

  $data['file'] = json_decode(file_get_contents ('file.json'));
  echo json_encode($data);

//just to show file on init
} else {
  echo $json;
}

?>
