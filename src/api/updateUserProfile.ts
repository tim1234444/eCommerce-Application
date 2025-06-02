import type { CustomerUpdateAction } from '@commercetools/platform-sdk';
import getCookie from './getCoockie';
interface Address {
  id: string;
  streetName: string;
  streetNumber?: string | number;
  postalCode: string;
  city: string;
  country: string;
  state?: string;
}

interface Customer {
  id: string;
  version: number;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
}

export async function updateUserProfileCT(
  id: string,
  version: number,
  updatedFields: CustomerUpdateAction[],
): Promise<Customer> {
  const res = await fetch(
    `https://api.europe-west1.gcp.commercetools.com/ecommerce-application-co/customers/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: updatedFields,
      }),
    },
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Ошибка обновления профиля');
  }

  return res.json();
}
