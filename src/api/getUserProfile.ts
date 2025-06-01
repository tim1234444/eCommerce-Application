interface Address {
  streetName: string;
  streetNumber?: string | number;
  postalCode: string;
  city: string;
  state?: string;
  country: string;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: Address[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}

export async function getCurrentUserData(): Promise<CustomerData> {
  const token = localStorage.getItem('access_token');

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/me/`,
    {
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Ошибка при получении данных пользователя');
  }

  const data = await response.json();
  return data;
}
