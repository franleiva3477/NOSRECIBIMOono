<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión y librería JWT
require_once __DIR__ . '/vendor/autoload.php';
include 'conexion.php';
include_once 'cors.php';

use Firebase\JWT\JWT;

$pdo = new conexion();
$secret_key = "claveSuperSecreta2025"; // Clave privada para firmar el JWT

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->Dni) && isset($data->contrasena)) {
        // Buscar usuario por DNI
        $sql = $pdo->prepare("SELECT * FROM personas WHERE perDni = :dni");
        $sql->bindParam(':dni', $data->Dni);
        $sql->execute();
        $usuario = $sql->fetch(PDO::FETCH_ASSOC);

        if ($usuario && $data->contrasena === $usuario['perContrasena']) {
            // Busca EL nombre del rol
            $rolQuery = $pdo->prepare("SELECT rolNombre FROM roles WHERE idRol = :rolID");
            $rolQuery->bindParam(':rolID', $usuario['rolID']);
            $rolQuery->execute();
            $rol = $rolQuery->fetchColumn();

            // Crear token JWT
            $payload = [
                "iss" => "http://localhost",
                "aud" => "http://localhost",
                "iat" => time(),
                "exp" => time() + (60 * 60), 
                "data" => [
                    "idPersona" => $usuario['idPersona'],
                    "perNombre" => $usuario['perNombre'],
                    "perApellido" => $usuario['perApellido'],
                    "perDni" => $usuario['perDni'],
                    "rol" => $rol
                ]
            ];

            $jwt = JWT::encode($payload, $secret_key, 'HS256');

            echo json_encode([
                "success" => true,
                "token" => $jwt,
                "rol" => $rol,
                "usuario" => $usuario
            ]);
        } else {
            echo json_encode(["success" => false, "mensaje" => "DNI o contraseña incorrectos."]);
        }
    } else {
        echo json_encode(["success" => false, "mensaje" => "Faltan datos en la solicitud."]);
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
}
?>
 