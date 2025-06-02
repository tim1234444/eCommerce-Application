export async function getUserProfile() {
  const token = localStorage.getItem('access_token');
  const customerId = localStorage.getItem('customerId');

  if (!token || !customerId) {
    throw new Error('Нет доступа к данным пользователя');
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/customers/${customerId}`,
    {
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${token}`,
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
