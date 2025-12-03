<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include 'conexion.php';
$pdo = new conexion();


// =========================
//          GET
// =========================
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // GET POR ID
    if (isset($_GET['id'])) {
        $sql = $pdo->prepare("SELECT idMateria, matNombre FROM materias WHERE idMateria = :id");
        $sql->bindValue(':id', $_GET['id']);
        $sql->execute();

        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    // GET GENERAL
    $sql = $pdo->prepare("SELECT idMateria, matNombre FROM materias");
    $sql->execute();
    echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
    exit;
}


// =========================
//          POST
// =========================
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['matNombre'])) {
        http_response_code(400);
        echo json_encode(["error" => "Falta el nombre de la materia"]);
        exit;
    }

    $sql = $pdo->prepare("INSERT INTO materias (matNombre) VALUES (?)");
    $sql->execute([$data['matNombre']]);

    http_response_code(201);
    echo json_encode(["message" => "Materia creada exitosamente"]);
    exit;
}


// =========================
//          PUT
// =========================
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id']) || !isset($data['matNombre'])) {
        http_response_code(400);
        echo json_encode(["error" => "Faltan parámetros"]);
        exit;
    }

    $sql = $pdo->prepare("UPDATE materias SET matNombre = ? WHERE idMateria = ?");
    $sql->execute([$data['matNombre'], $data['id']]);

    echo json_encode(["message" => "Materia actualizada correctamente"]);
    exit;
}


// =========================
//          DELETE
// =========================
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Falta el parámetro id"]);
        exit;
    }

    $sql = $pdo->prepare("DELETE FROM materias WHERE idMateria = ?");
    $sql->execute([$_GET['id']]);

    echo json_encode(["message" => "Materia eliminada correctamente"]);
    exit;
}
