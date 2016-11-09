<?php
$name = isset($_POST['name']) ? $_POST['name'] : '';
$nameArray = ["Amandine", "Cédric", "Juline", "Laurine", "Jean-Baptise"];
$json = file_get_contents ('file.json');
$array = json_decode($json);

if ($array->$name) {
  echo 'Tu as déjà joué petit coquin. Tu dois offrir un cadeau à: '. $array->$name;
} else {
  //list of already chosen names
  $alreadyChosen = array_values(get_object_vars($array));

  //Remove current user from array so that he doesnt choose himself and already chosen names from array
  foreach ($alreadyChosen as $key => $value) {
    if ($value) {
      unset($nameArray[$key]);
    }
  };
  foreach ($nameArray as $key2 => $value2) {
    if ($value2 == $name) {
      unset($nameArray[$key2]);
    }
  }
var_dump($nameArray);

  // $rand_keys = array_rand($nameArray, 1);
  // echo $nameArray[$rand_keys];
};


// foreach ($array as $key => $value) {
//
//   if ($key == $select) {
//   }
// }



// echo '{
//   "current": {
//     "current1": 1,
//     "current2": 2
//   },
//   "old": {
//     "old1": 11,
//     "old2": 22
//   }
// }';

?>
