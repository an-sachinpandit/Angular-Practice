<?php
include 'db.php';
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // Preflight request ke liye success response
    exit();
}


$config = new Config();
$conn = $config->conn;
$key = "Sachinpadit13redsdbjdsmfbdgfgifh";

// Check request method
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
} elseif ($method == 'GET') {
    $email = $_GET['email'] ?? '';
    $password = $_GET['password'] ?? '';
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Method not allowed"]);
    exit();
}

// Validate input
if (!$email || !$password) {
    echo json_encode(["message" => "Email and password are required"]);
    exit();
}

// Check user existence
$stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if ($user && password_verify($password, $user['password'])) {  
    // Generate Token
    // $token = bin2hex(random_bytes(32));

    // $stmt = $conn->prepare("UPDATE users SET token = ?, token_expiry = NOW() + INTERVAL 1 MINUTE WHERE id = ?");
    // $stmt->bind_param("si", $token, $user['id']);
    // $stmt->execute();

    // if ($stmt->affected_rows > 0) {
    //     echo json_encode(["token" => $token, "message" => "Login successful"]);
    // } else {
    //     echo json_encode(["message" => "Failed to update token"]);
    // }

    $payload = [
    "user_id" => $user['id'],
    "email" => $user['email'],
    "exp" => time() + 60,
    ];

    $jwt = JWT :: encode($payload, $key, 'HS256');

    echo json_encode(["token"=> $jwt, 
    "user"=> 
    ["id"=>$user['id'], "email"=>$user['email']]
    ]);

} else {
    echo json_encode(["message" => "Invalid credentials"]);
}

$conn->close();
?>
