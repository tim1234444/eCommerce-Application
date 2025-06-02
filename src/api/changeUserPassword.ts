export async function changeCustomerPassword(
  customerId: string,
  version: number,
  currentPassword: string,
  newPassword: string,
) {
  const token = localStorage.getItem('access_token');

  if (!token || !customerId) {
    throw new Error('Нет доступа к смене пароля');
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/customers/password`,
    {
      method: 'POST',
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: customerId,
        version,
        currentPassword,
        newPassword,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Ошибка при смене пароля');
  }

  return await response.json();
}
