import getCookie from './getCoockie';
export async function getToken() {
  const url = 'https://auth.europe-west1.gcp.commercetools.com/oauth/token';
  const credentials = btoa(
    `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`,
  );

  await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&scope=${import.meta.env.VITE_SCOPES}`, // Остальные параметры запроса
  })
    .then((response) => response.json())
    .then((data) => {
      document.cookie = `access_token=${data.access_token};max-age=172800`;
    });
}

export default async function registrationApi(
  formData: FormData,
  currentState: boolean,
  setCurrentState: (currentState: boolean) => void,
) {
  console.log(currentState);
  try {
    await getToken();
    const formRegistration = document.querySelector('.form-registration');
    if (formRegistration instanceof HTMLFormElement) {
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const email = formData.get('email');
      const dateOfBirth = formData.get('dateOfBirth');
      const password = formData.get('password');
      const streetName = formData.get('streetName');
      const streetNumber = formData.get('streetNumber');
      const postalCode = formData.get('postalCode');
      const city = formData.get('city');
      const country = formData.get('country');
      const isDefaultShippingAddress = formData.get('defaultShippingAddress');
      const fetchObj = {
        firstName: `${firstName}`.trim(),
        lastName: `${lastName}`.trim(),
        email: `${email}`.trim(),
        password: `${password}`.trim(),
        dateOfBirth: dateOfBirth,
        addresses: [
          {
            streetName: `${streetName}`.trim(),
            streetNumber: streetNumber,
            postalCode: postalCode,
            city: `${city}`,
            country: `${country}`.trim(),
          },
        ],
      };
      if (
        isDefaultShippingAddress !== null &&
        isDefaultShippingAddress === 'on'
      )
        Object.assign(fetchObj, { defaultShippingAddress: 0 });
      if (getCookie().access_token) {
        const response = await await fetch(
          `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/customers`,
          {
            method: 'POST',
            body: JSON.stringify(fetchObj),
            headers: {
              Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
            },
          },
        );
        if (response.status === 201 && response.ok === true) {
          const data = await response.json();
          localStorage.setItem('customerId', data.customer.id);
          setCurrentState((currentState = true));
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
