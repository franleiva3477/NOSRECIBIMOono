<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "tu_clave_secreta"; // esta clave debería estar en .env

$datosUsuario = [
    "id" => 1,
    "nombre" => "Fran",
    "email" => "fran@example.com"
];

$token = JWT::encode($datosUsuario, $key, 'HS256');

echo json_encode([
    "token" => $token
]);
