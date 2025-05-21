export default async function registrationApi(
  formData: FormData,
  currentState: boolean,
  setCurrentState: (currentState: boolean) => void,
) {
  try {
    console.log(currentState);
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/customers`,
        {
          method: 'POST',
          body: JSON.stringify(fetchObj),
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        },
      );
      if (response.status === 201 && response.ok === true) {
        console.log(response, response.status, response.ok);
        setCurrentState((currentState = true));
        console.log(currentState);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
