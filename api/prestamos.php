<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json");

include "conexion.php";
$pdo = new Conexion();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    //
    case 'GET':

    // Obtener préstamos por persona
    if (isset($_GET['personaID'])) {

        $personaID = $_GET['personaID'];

        $sql = $pdo->prepare("
            SELECT 
                p.idPrestamo,
                p.presFechaSal,
                p.presFechaDev,
                p.presObservacion,
                per.perNombre,
                per.perApellido,
                l.libTitulo
            FROM prestamos p
            INNER JOIN personas per ON p.personaID = per.idPersona
            INNER JOIN libros l ON p.libroID = l.idLibro
            WHERE p.personaID = :personaID
        ");

        $sql->bindValue(':personaID', $personaID);
        $sql->execute();

        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    // Obtener todos los préstamos
    $sql = $pdo->query("
        SELECT 
            p.idPrestamo,
            p.presFechaSal,
            p.presFechaDev,
            p.presObservacion,
            per.perNombre,
            per.perApellido,
            l.libTitulo
        FROM prestamos p
        LEFT JOIN personas per ON p.personaID = per.idPersona
        LEFT JOIN libros l ON p.libroID = l.idLibro
    ");

    echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
    exit;

    
    // post
    case 'POST':

        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['personaID'], $data['libroID'], $data['presFechaSal'])) {
            echo json_encode(['error' => 'Faltan datos obligatorios']);
            http_response_code(400);
            exit;
        }

        $sql = $pdo->prepare("
            INSERT INTO prestamos (personaID, libroID, presFechaSal, presFechaDev, presObservacion)
            VALUES (:personaID, :libroID, :presFechaSal, :presFechaDev, :presObservacion)
        ");

        $sql->bindValue(':personaID', $data['personaID']);
        $sql->bindValue(':libroID', $data['libroID']);
        $sql->bindValue(':presFechaSal', $data['presFechaSal']);
        $sql->bindValue(':presFechaDev', empty($data['presFechaDev']) ? NULL : $data['presFechaDev']);
        $sql->bindValue(':presObservacion', empty($data['presObservacion']) ? NULL : $data['presObservacion']);
        if ($sql->execute()) {
            $data['idPrestamo'] = $pdo->lastInsertId();
            echo json_encode($data);
        } else {
            echo json_encode(['error' => 'Error al insertar préstamo']);
            http_response_code(500);
        }

        exit;

    //put
    case 'PUT':

        if (!isset($_GET['idPrestamo'])) {
            echo json_encode(['error' => 'Se requiere idPrestamo']);
            exit;
        }

        $idPrestamo = $_GET['idPrestamo'];
        $data = json_decode(file_get_contents("php://input"), true);

        $sql = $pdo->prepare("
            UPDATE prestamos
            SET presFechaDev = :presFechaDev,
                presObservacion = :presObservacion
            WHERE idPrestamo = :idPrestamo
        ");

        $sql->bindValue(':idPrestamo', $idPrestamo);
        $sql->bindValue(':presFechaDev', empty($data['presFechaDev']) ? NULL : $data['presFechaDev']);
$sql->bindValue(':presObservacion', empty($data['presObservacion']) ? NULL : $data['presObservacion'] ?? '');

        if ($sql->execute()) {
            echo json_encode(['mensaje' => 'Préstamo actualizado']);
        } else {
            echo json_encode(['error' => 'Error al actualizar préstamo']);
        }

        exit;

    // eliminar
    case 'DELETE':

        if (!isset($_GET['idPrestamo'])) {
            echo json_encode(['error' => 'Se requiere idPrestamo']);
            exit;
        }

        $idPrestamo = $_GET['idPrestamo'];

        $sql = $pdo->prepare("DELETE FROM prestamos WHERE idPrestamo = :idPrestamo");
        $sql->bindValue(':idPrestamo', $idPrestamo);

        if ($sql->execute()) {
            echo json_encode(['mensaje' => 'Préstamo eliminado']);
        } else {
            echo json_encode(['error' => 'Error al eliminar préstamo']);
        }

        exit;
}
