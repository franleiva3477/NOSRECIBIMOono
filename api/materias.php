<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include 'conexion.php';
$pdo = new conexion();

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $sql=$pdo->prepare("SELECT * FROM `Materia` WHERE =:id");
        $sql->bindValue(':id', $_GET['id']);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
        exit;
    }else{
        $sql=$pdo->prepare("SELECT  matNombre FROM `Materias`");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
        exit;
    }
}


elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['matNombre'])) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(["error" => "Falta el nombre de la materia"]);
            exit;
        }

        $sql = $pdo->prepare("INSERT INTO materias (matNombre) VALUES (?)");
        $sql->execute([$data['matNombre']]);

        header("HTTP/1.1 201 Created");
        echo json_encode(["message" => "Materia creada exitosamente"]);
        exit;
    } catch (PDOException $e) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(["error" => $e->getMessage()]);
        exit;
    }
}

elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['id']) || !isset($data['matNombre'])) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(["error" => "Faltan parámetros"]);
            exit;
        }

        $sql = $pdo->prepare("UPDATE materias SET matNombre = ? WHERE idMateria = ?");
        $sql->execute([$data['matNombre'], $data['id']]);

        header("HTTP/1.1 200 OK");
        echo json_encode(["message" => "Materia actualizada exitosamente"]);
        exit;
    } catch (PDOException $e) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(["error" => $e->getMessage()]);
        exit;
    }
}

elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    try {
        if (!isset($_GET['id'])) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(["error" => "Falta el parámetro 'id'"]);
            exit;
        }

        $sql = $pdo->prepare("DELETE FROM materias WHERE idMateria = ?");
        $sql->execute([$_GET['id']]);

        header("HTTP/1.1 200 OK");
        echo json_encode(["message" => "Materia eliminada exitosamente"]);
        exit;
    } catch (PDOException $e) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(["error" => $e->getMessage()]);
        exit;
    }
}