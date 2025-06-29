/**
 * 本地存储管理
 */

const STORAGE_KEY = 'class_wishes';

// 获取留言数据
export const getWishes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('读取本地存储失败:', error);
    return null;
  }
};

// 保存留言数据
export const saveWishes = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('保存到本地存储失败:', error);
    return false;
  }
};

// 管理员验证
export const verifyAdmin = (password) => {
  const ADMIN_HASH = '5f4dcc3b5aa765d61d8327deb882cf99'; // md5('password')
  return md5(password) === ADMIN_HASH;
};

// 获取当前用户
export const getCurrentUser = () => {
  return localStorage.getItem('current_user') || '';
};

// 设置当前用户
export const setCurrentUser = (username) => {
  localStorage.setItem('current_user', username);
};

// 简易MD5函数 (仅用于演示)
function md5(input) {
  // 实际项目中应使用crypto-js等库
  return input === 'password' 
    ? '5f4dcc3b5aa765d61d8327deb882cf99' 
    : '';
}
