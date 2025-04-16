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
Por ID (idAutor):
Parámetro: idEditorial=1
Retorno: Información del editorial con ID 1.
Por nombre (ediNombre):
Parámetro: ediNombre=Planeta
Retorno: Información de los editoriales cuyo nombre contenga "Planeta".
    
    */
    // Si se proporciona el parámetro 'idEditorial', busca por ID
    if (isset($_GET['idEditorial'])) {
        $sql = $pdo->prepare("SELECT * FROM Editoriales WHERE idEditorial=:idEditorial");
        $sql->bindValue(':idEditorial', $_GET['idEditorial']);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
    } 
    
    // Si se proporciona el autámetro 'ediNombre', busca por nombre
    elseif (isset($_GET['ediNombre'])) {
        $ediNombre = strtolower($_GET['ediNombre']);
        $sql = $pdo->prepare("SELECT * Editoriales WHERE LOWER(ediNombre) LIKE :ediNombre");
        $sql->bindValue(':ediNombre', '%' . $ediNombre . '%', PDO::PARAM_STR);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
    } 
    // Si no se proporciona ningún parámetro, obtiene todos las editoriales 
    else {
        $sql = $pdo->prepare("SELECT * FROM `editoriales`");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
    }
    exit;
}
/*
    POST
    Crear un nueva Editorial:
    Cuerpo JSON: {"ediNombre": "nuevaEditorial"}
    Retorno: ID del nueva editorial creado.
    */
// Maneja solicitudes POST
function handlePostRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"));
    // Verifica si se proporciona 'ediNombre'
    if (isset($data->ediNombre)) {
        $sql = "INSERT INTO Editoriales (ediDireccion, ediEmail, ediNombre, ediTelefono) 
        VALUES (:ediDireccion, :ediEmail, :ediNombre, :ediTelefono)";

        
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':ediDireccion', $data->ediDireccion);
        $stmt->bindParam(':ediEmail', $data->ediEmail);
        $stmt->bindParam(':ediNombre', $data->ediNombre);
        $stmt->bindParam(':ediTelefono', $data->ediTelefono);

        if ($stmt->execute()) {
            $idPost = $pdo->lastInsertId();
            header("HTTP/1.1 201 Created");
            echo json_encode($idPost); // Retorna el ID de la Editorial creada
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['error' => 'No se pudo crear la editorial']);
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(['error' => 'Entrada inválida']);
    }
    exit;
}
/*
PUT
Actualizar un Editorial existente:
Cuerpo JSON: {"idEditorial": 1, "ediNombre": "editorialActualizada"}
Retorno: Mensaje de actualización exitosa.

*/
// Maneja solicitudes PUT
function handlePutRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"));
    // Verifica si se proporcionan 'idEditorial' y 'ediNombre'
    if (isset($data->idEditorial) && isset($data->ediNombre)) {
        $sql = "UPDATE Editoriales SET ediDireccion = (:ediDireccion), ediEmail = (:ediEmail), ediNombre = (:ediNombre),
         ediTelefono = (:ediTelefono) WHERE idEditorial = (:idEditorial)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':ediDireccion', $data->ediDireccion);
        $stmt->bindParam(':ediEmail', $data->ediEmail);
        $stmt->bindParam(':ediNombre', $data->ediNombre);
        $stmt->bindParam(':ediTelefono', $data->ediTelefono);
        $stmt->bindParam(':idEditorial', $data->idEditorial);
        if ($stmt->execute()) {
            header("HTTP/1.1 200 OK");
            echo json_encode(['message' => 'Actualización exitosa']); // Retorna un mensaje de éxito
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['error' => 'No se pudo actualizar la Editorial']);
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(['error' => 'Entrada inválida']);
    }
    exit;
}
/*
DELETE
Eliminar un editorial por ID (idEditorial):
Parámetro: idEditorial=1
Retorno: Mensaje de eliminación exitosa.
*/
// Maneja solicitudes DELETE
function handleDeleteRequest($pdo) {
    // Verifica si se proporciona 'idEditorial'
    if (isset($_GET['idEditorial'])) {
        $sql = "DELETE FROM Editoriales WHERE idEditorial=:idEditorial";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':idEditorial', $_GET['idEditorial']);
        if ($stmt->execute()) {
            header("HTTP/1.1 200 OK");
            echo json_encode(['message' => 'Eliminación exitosa']); // Retorna un mensaje de éxito
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(['error' => 'No se pudo eliminar el editorial']);
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(['error' => 'Entrada inválida']);
    }
    exit;
}
?>