<?php
require 'rb.php';

//header('Content-Type: application/json');
//error_reporting(E_ALL);
//ini_set("display_errors", 0);
// ################# DB & CONFIG ###########################

R::setup('mysql:host=localhost;dbname=stoodle', 'root', '');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// ################# DB & CONFIG ###########################
$json = json_decode(file_get_contents("php://input"), true);
$type = $json['type'];
$data = $json['data'];

function getSql($query)
{
  return R::getAll($query);
}

function storeSql($query)
{
  try {
    R::exec($query);
  } catch (Exception $error) {
    echo json_encode(['error', $error]);
  }
}

switch ($type) {
  case 'get':
    echo json_encode(getSql($data));
    break;
  case 'set':
    storeSql($data);
    break;
  default:
    break;
}

