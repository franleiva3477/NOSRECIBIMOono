<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';
$pdo = new conexion();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        handleGetRequest($pdo);
        break;
    case 'POST':
        handlePostRequest($pdo);
        break;
    case 'PUT':
        handlePutRequest($pdo);
        break;
    case 'DELETE':
        handleDeleteRequest($pdo);
        break;
    case 'OPTIONS':
        header("HTTP/1.1 200 OK");
        break;
    default:
        header("HTTP/1.1 405 Method Not Allowed");
        break;
}

//get
function handleGetRequest($pdo) {
    if (isset($_GET['idPersona'])) {
        $sql = $pdo->prepare("
            SELECT p.idPersona, p.perNombre, p.perApellido, p.perDni, 
                   p.perContrasena, p.rolID, r.rolNombre
            FROM personas p
            LEFT JOIN roles r ON p.rolID = r.idRol
            WHERE p.idPersona = :idPersona
        ");
        $sql->bindValue(':idPersona', $_GET['idPersona']);
        $sql->execute();
        echo json_encode($sql->fetch(PDO::FETCH_ASSOC));
    }
    else if (isset($_GET['rolID'])) {
        $sql = $pdo->prepare("
            SELECT p.idPersona, p.perNombre, p.perApellido, p.perDni, 
                   p.perContrasena, p.rolID, r.rolNombre
            FROM personas p
            LEFT JOIN roles r ON p.rolID = r.idRol
            WHERE p.rolID = :rolID
            ORDER BY p.perApellido, p.perNombre
        ");
        $sql->bindValue(':rolID', $_GET['rolID']);
        $sql->execute();
        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
    }
    else {
        $sql = $pdo->prepare("
            SELECT p.idPersona, p.perNombre, p.perApellido, p.perDni, 
                   p.perContrasena, p.rolID, r.rolNombre
            FROM personas p
            LEFT JOIN roles r ON p.rolID = r.idRol
            ORDER BY p.perApellido, p.perNombre
        ");
        $sql->execute();
        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
    }

    header("HTTP/1.1 200 OK");
    exit;
}

//post
function handlePostRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['perNombre'], $data['perApellido'], $data['perDni'], $data['perContrasena'], $data['rolID'])) {
        echo json_encode(['error' => 'Faltan datos obligatorios']);
        http_response_code(400);
        exit;
    }

    $sql = $pdo->prepare("
        INSERT INTO personas (perNombre, perApellido, perDni, perContrasena, rolID)
        VALUES (:perNombre, :perApellido, :perDni, :perContrasena, :rolID)
    ");

    $sql->bindValue(':perNombre', $data['perNombre']);
    $sql->bindValue(':perApellido', $data['perApellido']);
    $sql->bindValue(':perDni', $data['perDni']);
    $sql->bindValue(':perContrasena', $data['perContrasena']);
    $sql->bindValue(':rolID', $data['rolID']);

    if ($sql->execute()) {
        $data['idPersona'] = $pdo->lastInsertId();
        echo json_encode($data);
        http_response_code(201);
    } else {
        echo json_encode(['error' => 'Error al insertar persona']);
        http_response_code(500);
    }

    exit;
}

//put
function handlePutRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['idPersona'])) {
        echo json_encode(["error" => "Falta idPersona"]);
        http_response_code(400);
        exit;
    }

    $sql = $pdo->prepare("
        UPDATE personas SET
            perNombre = :perNombre,
            perApellido = :perApellido,
            perContrasena = :perContrasena
        WHERE idPersona = :idPersona
    ");

    $sql->bindValue(':perNombre', $data['perNombre']);
    $sql->bindValue(':perApellido', $data['perApellido']);
    $sql->bindValue(':perContrasena', $data['perContrasena']);
    $sql->bindValue(':idPersona', $data['idPersona']);

    if ($sql->execute()) {
        echo json_encode(["mensaje" => "Persona actualizada correctamente"]);
        http_response_code(200);
    } else {
        echo json_encode(["error" => "Error al actualizar persona"]);
        http_response_code(500);
    }

    exit;
}

//eliminar
function handleDeleteRequest($pdo) {
    if (!isset($_GET['idPersona'])) {
        echo json_encode(['error' => 'Falta idPersona']);
        http_response_code(400);
        exit;
    }

    $sql = $pdo->prepare("DELETE FROM personas WHERE idPersona = :idPersona");
    $sql->bindValue(':idPersona', $_GET['idPersona']);

    if ($sql->execute()) {
        echo json_encode(['mensaje' => 'Persona eliminada correctamente']);
        http_response_code(200);
    } else {
        echo json_encode(['error' => 'Error al eliminar persona']);
        http_response_code(500);
    }

    exit;
}
