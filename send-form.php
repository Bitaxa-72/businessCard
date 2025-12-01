<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
    exit;
}

$fio = isset($_POST['fio']) ? trim($_POST['fio']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$social = isset($_POST['social']) ? trim($_POST['social']) : '';
$messageText = isset($_POST['message']) ? trim($_POST['message']) : '';
$intent = isset($_POST['intent']) ? trim($_POST['intent']) : '';

if ($fio === '' || $email === '' || $social === '' || $messageText === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все обязательные поля.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Некорректный email.']);
    exit;
}

$to = 'vitaly.butenev@gmail.com';

$subject = 'Новая заявка с сайта vitaly.frontend';
if ($intent !== '') {
    $subject .= ' [' . $intent . ']';
}

$bodyLines = [
    'Новая заявка с сайта-визитки:',
    '',
    'Имя: ' . $fio,
    'Email: ' . $email,
    'Соцсеть / мессенджер: ' . $social,
    'Цель формы (intent): ' . ($intent !== '' ? $intent : 'не указано'),
    '',
    'Описание задачи:',
    $messageText,
    '',
    'IP отправителя: ' . ($_SERVER['REMOTE_ADDR'] ?? 'неизвестно'),
    'User-Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'неизвестно')
];

$body = implode("\n", $bodyLines);

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: vitaly.frontend <no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'localhost') . '>';
$headers[] = 'Reply-To: ' . $email;

$success = mail($to, $encodedSubject, $body, implode("\r\n", $headers));

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Не удалось отправить письмо. Попробуйте позже.']);
}
