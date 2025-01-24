<?php
// Habilita el acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Habilita los métodos HTTP permitidos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Establece el tipo de contenido de la respuesta como JSON
header("Content-Type: application/json; charset=UTF-8");
// Habilita las cabeceras permitidas
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'conexion.php';

$pdo = new Conexion();

// Maneja la solicitud según el método HTTP
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
        // Maneja las solicitudes preflight
        header("HTTP/1.1 200 OK");
        break;
    default:
        header("HTTP/1.1 405 Method Not Allowed");
        break;
}

// Maneja solicitudes GET
function handleGetRequest($pdo) {
    /*
    GET
Por ID (idRol):
Parámetro: idRol=1
Retorno: Información del rol con ID 1.
Por nombre (rolNombre):
Parámetro: rolNombre=admin
Retorno: Información de los roles cuyo nombre contenga "admin".
    
    */
    // Si se proporciona el parámetro 'idRol', busca por ID
    if (isset($_GET['idRol'])) {
        $sql = $pdo->prepare("SELECT * FROM Roles WHERE idRol=:idRol");
        $sql->bindValue(':idRol', $_GET['idRol']);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
    } 
    
    // Si se proporciona el parámetro 'rolNombre', busca por nombre
    elseif (isset($_GET['rolNombre'])) {
        $rolNombre = strtolower($_GET['rolNombre']);
        $sql = $pdo->prepare("SELECT * FROM Roles WHERE LOWER(rolNombre) LIKE :rolNombre");
        $sql->bindValue(':rolNombre', '%' . $rolNombre . '%', PDO::PARAM_STR);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
    } 
    // Si no se proporciona ningún parámetro, obtiene todos los roles
    else {
        $sql = $pdo->prepare("SELECT * FROM Roles");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
    }
    exit;
}
/*
    POST
    Crear un nuevo rol:
    Cuerpo JSON: {"rolNombre": "nuevoRol"}
    Retorno: ID del nuevo rol creado.
    */
// Maneja solicitudes POST
function handlePostRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"));
    // Verifica si se proporciona 'rolNombre'
    if (isset($data->rolNombre)) {
        $sql = "INSERT INTO Roles (rolNombre) VALUES (:rolNombre)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':rolNombre', $data->rolNombre);
        if ($stmt->execute()) {
            $idPost = $pdo->lastInsertId();
            header("HTTP/1.1 201 Created");
            echo json_encode($idPost); // Retorna el ID del rol creado
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['error' => 'No se pudo crear el rol']);
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(['error' => 'Entrada inválida']);
    }
    exit;
}
/*
PUT
Actualizar un rol existente:
Cuerpo JSON: {"idRol": 1, "rolNombre": "rolActualizado"}
Retorno: Mensaje de actualización exitosa.

*/
// Maneja solicitudes PUT
function handlePutRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"));
    // Verifica si se proporcionan 'idRol' y 'rolNombre'
    if (isset($data->idRol) && isset($data->rolNombre)) {
        $sql = "UPDATE Roles SET rolNombre = :rolNombre WHERE idRol = :idRol";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':rolNombre', $data->rolNombre);
        $stmt->bindParam(':idRol', $data->idRol);
        if ($stmt->execute()) {
            header("HTTP/1.1 200 OK");
            echo json_encode(['message' => 'Actualización exitosa']); // Retorna un mensaje de éxito
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['error' => 'No se pudo actualizar el rol']);
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(['error' => 'Entrada inválida']);
    }
    exit;
}
/*
DELETE
Eliminar un rol por ID (idRol):
Parámetro: idRol=1
Retorno: Mensaje de eliminación exitosa.
*/
// Maneja solicitudes DELETE
function handleDeleteRequest($pdo) {
    // Verifica si se proporciona 'idRol'
    if (isset($_GET['idRol'])) {
        $sql = "DELETE FROM Roles WHERE idRol=:idRol";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':idRol', $_GET['idRol']);
        if ($stmt->execute()) {
            header("HTTP/1.1 200 OK");
            echo json_encode(['message' => 'Eliminación exitosa']); // Retorna un mensaje de éxito
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['error' => 'No se pudo eliminar el rol']);
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(['error' => 'Entrada inválida']);
    }
    exit;
}
?>                  