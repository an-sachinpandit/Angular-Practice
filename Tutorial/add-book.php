<?php
include 'db.php';
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

// ✅ Get Token from Headers
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';

if (!$authHeader) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized: Token missing"]);
    exit();
}

// ✅ Validate Token
$stmt = $conn->prepare("SELECT id, name, email FROM users WHERE token = ?");
$stmt->bind_param("s", $authHeader);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    http_response_code(401);
    echo json_encode(["message" => "Unauthorized: Invalid or expired token"]);
    exit();
}

// ✅ Read JSON Input
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Check if books array exists
if (!isset($data['books']) || !is_array($data['books'])) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid request: books array required"]);
    exit();
}

// ✅ Prepare Insert Query
$stmt = $conn->prepare("INSERT INTO books (title, author, user_id) VALUES (?, ?, ?)");

// ✅ Loop through each book and insert into database
foreach ($data['books'] as $book) {
    if (!isset($book['title']) || !isset($book['author'])) {
        continue; // Skip invalid entries
    }
    
    $title = mysqli_real_escape_string($conn, $book['title']);
    $author = mysqli_real_escape_string($conn, $book['author']);
    $stmt->bind_param("ssi", $title, $author, $user['id']);
    $stmt->execute();
}

echo json_encode(["message" => "Books added successfully"]);

$stmt->close();
$conn->close();
?>
