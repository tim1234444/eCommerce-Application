import getCookie from './getCoockie';
export async function getUserProfile() {
  const customerId = localStorage.getItem('customerId');

  if (!getCookie().access_token || !customerId) {
    throw new Error('Нет доступа к данным пользователя');
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/customers/${customerId}`,
    {
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Ошибка при загрузке профиля пользователя');
  }

  const userData = await response.json();
  return userData;
}
