<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "tu_clave_secreta";

$headers = apache_request_headers();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["mensaje" => "Token no enviado"]);
    exit;
}

$token = str_replace("Bearer ", "", $headers['Authorization']);

try {
    $decoded = JWT::decode($token, new Key($key, 'HS256'));
    echo json_encode([
        "autenticado" => true,
        "usuario" => $decoded
    ]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        "mensaje" => "Token inválido",
        "error" => $e->getMessage()
    ]);
}
