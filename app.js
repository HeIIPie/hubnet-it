// Экраны
const mainScreen = document.getElementById('main-screen');
const networksScreen = document.getElementById('networks-screen');
const profileScreen = document.getElementById('profile-screen');
const headerTitle = document.getElementById('header-title');

// Кнопки
const btnNetworks = document.getElementById('btn-networks');
const btnProfile = document.getElementById('btn-profile');
const btnBackNetworks = document.getElementById('btn-back-networks');
const btnBackProfile = document.getElementById('btn-back-profile');

// Переход в Сети
btnNetworks.addEventListener('click', () => {
    mainScreen.classList.add('hidden');
    networksScreen.classList.remove('hidden');
    headerTitle.textContent = 'Раздел: Сети';
});

// Назад из Сетей
btnBackNetworks.addEventListener('click', () => {
    networksScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    headerTitle.textContent = 'Hubnet IT';
});

// Переход в Профиль
btnProfile.addEventListener('click', () => {
    mainScreen.classList.add('hidden');
    profileScreen.classList.remove('hidden');
    headerTitle.textContent = 'Мой Профиль';
});

// Назад из Профиля
btnBackProfile.addEventListener('click', () => {
    profileScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    headerTitle.textContent = 'Hubnet IT';
});