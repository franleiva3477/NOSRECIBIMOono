<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include 'conexion.php';
$pdo = new conexion();

// uso la misma clave que en el verificador
$secret_key = "claveSuperSecreta2025";
//aca valido por el token y si puede hacer uso de los metodos


function validarToken($secret_key) {
    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["error" => "Token no enviado"]);
        exit;
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return $decoded->data; 
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Token inválido", "detalle" => $e->getMessage()]);
        exit;
    }
}


switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        handleGetRequest($pdo);
        break;

    case 'POST':
        $user = validarToken($secret_key);   // exige token
        // solo puede crearlos el bibliotecario como hago en el routing
        if ($user->rol !== "bibliotecario") {
            http_response_code(403);
            echo json_encode(["error" => "No autorizado (solo bibliotecario puede agregar libros)"]);
            exit;
        }
        handlePostRequest($pdo);
        break;

    case 'PUT':
        $user = validarToken($secret_key);   // lo mismo que en post
        if ($user->rol !== "bibliotecario") {
            http_response_code(403);
            echo json_encode(["error" => "No autorizado (solo bibliotecario puede editar libros)"]);
            exit;
        }
        handlePutRequest($pdo);
        break;

    case 'DELETE':
        $user = validarToken($secret_key);   // lo mismo que en los otros
        if ($user->rol !== "bibliotecario") {
            http_response_code(403);
            echo json_encode(["error" => "No autorizado (solo bibliotecario puede eliminar libros)"]);
            exit;
        }
        handleDeleteRequest($pdo);
        break;

    case 'OPTIONS':
        header("HTTP/1.1 200 OK");
        break;

    default:
        header("HTTP/1.1 405 Method Not Allowed");
        break;
}




function handleGetRequest($pdo) {

    // busca por ID
    if (isset($_GET['idLibro'])) {
        $sql = $pdo->prepare("
            SELECT l.idLibro, l.libTitulo, l.libAnio, l.libNotaDeContenido,
                   a.autNombre, a.autApellido,
                   e.ediNombre AS editorial, m.matNombre AS materia
            FROM libros l
            LEFT JOIN autores a ON l.autorID = a.idAutor
            LEFT JOIN editoriales e ON l.editorialID = e.idEditorial
            LEFT JOIN materias m ON l.materiaID = m.idMateria
            WHERE idLibro = :idLibro
        ");
        $sql->bindValue(':idLibro', $_GET['idLibro']);
        $sql->execute();
        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    // busca por titulo pero casi no lo suo
    if (isset($_GET['libTitulo'])) {
        $titulo = '%' . strtolower($_GET['libTitulo']) . '%';

        $sql = $pdo->prepare("
            SELECT l.idLibro, l.libTitulo, l.libAnio, l.libNotaDeContenido,
                   a.autNombre, a.autApellido,
                   e.ediNombre AS editorial, m.matNombre AS materia
            FROM libros l
            LEFT JOIN autores a ON l.autorID = a.idAutor
            LEFT JOIN editoriales e ON l.editorialID = e.idEditorial
            LEFT JOIN materias m ON l.materiaID = m.idMateria
            WHERE LOWER(l.libTitulo) LIKE :titulo
        ");
        $sql->bindValue(':titulo', $titulo);
        $sql->execute();
        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    // trae a  todos
    $sql = $pdo->prepare("
        SELECT l.idLibro, l.libTitulo, l.libAnio, l.libNotaDeContenido,
               a.autNombre, a.autApellido,
               e.ediNombre AS editorial, m.matNombre AS materia
        FROM libros l
        LEFT JOIN autores a ON l.autorID = a.idAutor
        LEFT JOIN editoriales e ON l.editorialID = e.idEditorial
        LEFT JOIN materias m ON l.materiaID = m.idMateria
    ");
    $sql->execute();
    echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
    exit;
}




function handlePostRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"));

    if (!isset($data->libTitulo) || !isset($data->libAnio) ||
        !isset($data->EditorialID) || !isset($data->autorID) ||
        !isset($data->materiaID) || !isset($data->libNotaDeContenido)) 
    {
        http_response_code(400);
        echo json_encode(["error" => "Faltan campos obligatorios"]);
        exit;
    }

    $sql = "INSERT INTO libros (libTitulo, libAnio, EditorialID, autorID, materiaID, libNotaDeContenido)
            VALUES (:libTitulo, :libAnio, :EditorialID, :autorID, :materiaID, :libNotaDeContenido)";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':libTitulo', $data->libTitulo);
    $stmt->bindParam(':libAnio', $data->libAnio);
    $stmt->bindParam(':EditorialID', $data->EditorialID);
    $stmt->bindParam(':autorID', $data->autorID);
    $stmt->bindParam(':materiaID', $data->materiaID);
    $stmt->bindParam(':libNotaDeContenido', $data->libNotaDeContenido);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Libro agregado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al agregar el libro"]);
    }
}



// put
function handlePutRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"));
    $idLibro = $_GET['idLibro'] ?? null;

    if (!$idLibro) {
        echo json_encode(["error" => "Se requiere idLibro"]);
        exit;
    }

    $sql = "UPDATE libros SET 
            libTitulo = :libTitulo, libAnio = :libAnio,
            EditorialID = :EditorialID, autorID = :autorID,
            materiaID = :materiaID, libNotaDeContenido = :libNotaDeContenido
            WHERE idLibro = :idLibro";

    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':libTitulo', $data->libTitulo);
    $stmt->bindParam(':libAnio', $data->libAnio);
    $stmt->bindParam(':EditorialID', $data->EditorialID);
    $stmt->bindParam(':autorID', $data->autorID);
    $stmt->bindParam(':materiaID', $data->materiaID);
    $stmt->bindParam(':libNotaDeContenido', $data->libNotaDeContenido);
    $stmt->bindParam(':idLibro', $idLibro);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Libro actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al actualizar el libro"]);
    }
}



// delet
function handleDeleteRequest($pdo) {
    $idLibro = $_GET['idLibro'] ?? null;

    if (!$idLibro) {
        echo json_encode(["error" => "Falta idLibro"]);
        exit;
    }

    $sql = "DELETE FROM libros WHERE idLibro = :idLibro";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':idLibro', $idLibro);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Libro eliminado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al eliminar el libro"]);
    }
}
?>
