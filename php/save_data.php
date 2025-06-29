<?php
header('Content-Type: application/json');

// 确保目录存在
if (!file_exists('../data')) {
    mkdir('../data', 0755, true);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    echo json_encode(['success' => false, 'message' => 'Invalid data format']);
    exit;
}

try {
    // 保存到data.json文件
    file_put_contents('../data.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
