<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$country = $_POST['country'] ?? '';
$comment = $_POST['comment'] ?? '';

// Basic validation
if (empty($name) || empty($email) || empty($phone) || empty($country) || empty($comment)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Prepare email content
$to = 'info@coralcapitalpanama.com';
$subject = 'New Contact Form Submission from ' . $name;
$message = "New contact form submission:\n\n";
$message .= "Name: " . $name . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Phone: " . $phone . "\n";
$message .= "Country: " . $country . "\n";
$message .= "Comment: " . $comment . "\n\n";
$message .= "Submitted from: " . ($_SERVER['HTTP_REFERER'] ?? 'Unknown') . "\n";
$message .= "Date: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send message']);
}
?>