<?php
include 'db.php';
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$config = new Config();
$conn = $config->conn;
$key = "Sachinpadit13redsdbjdsmfbdgfgifh"; // Ensure this key matches the one used during token creation

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';

if (!$authHeader) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized: Token missing"]);
    exit();
}

if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized: Invalid token format!"]);
    exit();
}
$token = $matches[1];
try {
    $decoded = JWT::decode($token, new Key($key, 'HS256'));
    $userId = $decoded->user_id;
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized: Invalid or expired token!", "error" => $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['books']) || !is_array($data['books'])) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid request: books array required"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO books (title, author, user_id) VALUES (?, ?, ?)");

foreach ($data['books'] as $book) {
    if (!isset($book['title']) || !isset($book['author'])) {
        continue;
    }
    
    $stmt->bind_param("ssi", $book['title'], $book['author'], $userId);
    $stmt->execute();
}

echo json_encode(["message" => "Books added successfully"]);

$stmt->close();
$conn->close();
?>
