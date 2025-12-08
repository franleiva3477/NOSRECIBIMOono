<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/vendor/autoload.php';
include 'conexion.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$pdo = new conexion();
$secret_key = "claveSuperSecreta2025";  
$domain = "http://localhost";



if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['validate'])) {

    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        echo json_encode(["valid" => false, "mensaje" => "Token no enviado"]);
        exit;
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        echo json_encode([
            "valid" => true,
            "data" => $decoded->data
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "valid" => false,
            "mensaje" => "Token inválido",
            "error" => $e->getMessage()
        ]);
    }

    exit;
}



// ============================================================================
// 💠 LOGIN NORMAL (genera token)
// ============================================================================
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!isset($data->Dni) || !isset($data->contrasena)) {
        echo json_encode(["success" => false, "mensaje" => "Faltan datos"]);
        exit;
    }

    // Buscar usuario por DNI
    $sql = $pdo->prepare("SELECT * FROM personas WHERE perDni = :dni");
    $sql->bindParam(':dni', $data->Dni);
    $sql->execute();
    $usuario = $sql->fetch(PDO::FETCH_ASSOC);

    if (!$usuario || $data->contrasena !== $usuario['perContrasena']) {
        echo json_encode(["success" => false, "mensaje" => "DNI o contraseña incorrectos"]);
        exit;
    }

    // Obtiene el rol
    $rolQuery = $pdo->prepare("SELECT rolNombre FROM roles WHERE idRol = :rolID");
    $rolQuery->bindParam(':rolID', $usuario['rolID']);
    $rolQuery->execute();
    $rol = $rolQuery->fetchColumn();


    // Crea  payload JWT
    $payload = [
        "iss" => $domain,
        "aud" => $domain,
        "iat" => time(),
        "exp" => time(60*60) , 
        "data" => [
            "idPersona" => $usuario['idPersona'],
            "perNombre" => $usuario['perNombre'],
            "perApellido" => $usuario['perApellido'],
            "perDni" => $usuario['perDni'],
            "rol" => $rol
        ]
    ];

    // Crea el  JWT
    $jwt = JWT::encode($payload, $secret_key, 'HS256');

    echo json_encode([
        "success" => true,
        "token" => $jwt,
        "rol" => $rol,
        "usuario" => $usuario
    ]);

    exit;
}



//si no esta la sesion activa te da error
header("HTTP/1.1 405 Method Not Allowed");
echo json_encode(["mensaje" => "Método no permitido"]);
?>
