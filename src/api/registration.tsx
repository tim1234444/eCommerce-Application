async function getToken() {
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
    .then((data) =>
      localStorage.setItem('access_token', `${data.access_token}`),
    );
}

export default async function registrationApi(
  formData: FormData,
  currentState: boolean,
  setCurrentState: (currentState: boolean) => void,
) {
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
      console.log(fetchObj);
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/customers`,
          {
            method: 'POST',
            body: JSON.stringify(fetchObj),
            headers: {
              Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${localStorage.getItem('access_token')}`,
            },
          },
        );
        console.log(response, response.status, response.ok);
        if (response.status === 201 && response.ok === true) {
          console.log(response, response.status, response.ok);
          setCurrentState((currentState = true));
          console.log(currentState);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
