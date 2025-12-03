<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Content-Type: application/json; charset=UTF-8");
include 'conexion.php';
$pdo = new conexion();

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

// Maneja solicitudes GET - funcionando
function handleGetRequest($pdo) {

    // --- 1) Buscar por ID ---
    if (isset($_GET['idLibro'])) {

        $sql = $pdo->prepare("
            SELECT 
                l.idLibro,
                l.libTitulo,
                l.libAnio,
                l.libNotaDeContenido,

                a.autNombre,
                a.autApellido,

                e.ediNombre AS editorial,
                m.matNombre AS materia

            FROM libros l
            LEFT JOIN autores a ON l.autorID = a.idAutor
            LEFT JOIN editoriales e ON l.editorialID = e.idEditorial
            LEFT JOIN materias m ON l.materiaID = m.idMateria

            WHERE idLibro = :idLibro
        ");

        $sql->bindValue(':idLibro', $_GET['idLibro']);
        $sql->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }


    // --- 2) Buscar por título ---
    if (isset($_GET['libTitulo'])) {

        $titulo = '%' . strtolower($_GET['libTitulo']) . '%';

        $sql = $pdo->prepare("
            SELECT 
                l.idLibro,
                l.libTitulo,
                l.libAnio,
                l.libNotaDeContenido,

                a.autNombre,
                a.autApellido,

                e.ediNombre AS editorial,
                m.matNombre AS materia

            FROM libros l
            LEFT JOIN autores a ON l.autorID = a.idAutor
            LEFT JOIN editoriales e ON l.editorialID = e.idEditorial
            LEFT JOIN materias m ON l.materiaID = m.idMateria

            WHERE LOWER(l.libTitulo) LIKE :titulo
        ");

        $sql->bindValue(':titulo', $titulo);
        $sql->execute();

        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }


    // --- 3) Obtener todos los libros con JOIN ---
    $sql = $pdo->prepare("
        SELECT 
            l.idLibro,
            l.libTitulo,
            l.libAnio,
            l.libNotaDeContenido,

            a.autNombre,
            a.autApellido,

            e.ediNombre AS editorial,
            m.matNombre AS materia

        FROM libros l
        LEFT JOIN autores a ON l.autorID = a.idAutor
        LEFT JOIN editoriales e ON l.editorialID = e.idEditorial
        LEFT JOIN materias m ON l.materiaID = m.idMateria
    ");

    $sql->execute();

    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
    exit;
}


function handlePostRequest($pdo) {
    $data = json_decode(file_get_contents("php://input"));
    
    // Verifica si se proporcionan los campos necesarios
    if (isset($data->libTitulo) && isset($data->libAnio)  && isset($data->EditorialID)  
    && isset($data->autorID) && isset($data->materiaID) && isset($data->libNotaDeContenido)) {
        $sql = "INSERT INTO LIBROS (libTitulo, libAnio ,EditorialID,  autorID, MateriaID, libNotaDeContenido) 
                VALUES (:libTitulo, :libAnio,  :EditorialID,  :autorID,  :materiaID, :libNotaDeContenido)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':libTitulo', $data->libTitulo);
        $stmt->bindParam(':libAnio', $data->libAnio);
        $stmt->bindParam(':EditorialID', $data->EditorialID);
        $stmt->bindParam(':autorID', $data->autorID);
        $stmt->bindParam(':materiaID', $data->MateriaID);
        $stmt->bindParam(':libNotaDeContenido', $data->libNotaDeContenido);

        if ($stmt->execute()) {
            $idPost = $pdo->lastInsertId();
            header('Content-Type: application/json');
            echo json_encode(['id' => $idPost, 'message' => 'Libro agregado correctamente']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Error al agregar el libro']);
        }
        
        
    } 
}



    // Creamos la consulta UPDATE
    function handlePutRequest($pdo) {
        $data = json_decode(file_get_contents("php://input"));
        $idLibro = $_GET['idLibro'] ?? null;
    
        // Verifica si se proporciona 'idLibro' y otros campos necesarios
        if ($idLibro && isset($data->libTitulo) && isset($data->libAnio)  && isset($data->EditorialID) && isset($data->materiaID) && isset($data->libNotaDeContenido)) {
            $sql = "UPDATE Libros 
                    SET libTitulo = :libTitulo, libAnio = :libAnio,
                        EditorialID = :EditorialID,  autorID = :autorID, materiaID = :materiaID, libNotaDeContenido = :libNotaDeContenido 
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
                header("HTTP/1.1 200 OK");
                echo json_encode(['message' => 'Actualización exitosa']);
            } else {
                header("HTTP/1.1 500 Internal Server Error");
                echo json_encode(['error' => 'No se pudo actualizar el libro']);
            }
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['error' => 'Entrada inválida']);
        }
        exit;
    }

    function handleDeleteRequest($pdo) {
        $idLibro = $_GET['idLibro'] ?? null;
    
        if ($idLibro) {
            $sql = "DELETE FROM Libros WHERE idLibro = :idLibro";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':idLibro', $idLibro);
    
            if ($stmt->execute()) {
                header("HTTP/1.1 200 OK");
                echo json_encode(['message' => 'Libro eliminado correctamente']);
            } else {
                header("HTTP/1.1 500 Internal Server Error");
                echo json_encode(['error' => 'No se pudo eliminar el libro']);
            }
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['error' => 'Falta el parámetro idLibro']);
        }
    
        exit;
    }
    