export default async function registrationApi() {
  try {
    const formRegistration = document.querySelector('.form-registration');
    if (formRegistration instanceof HTMLFormElement) {
      const formData = new FormData(formRegistration);
      const firstName = `${formData.get('firstName')}`.trim();
      const lastName = `${formData.get('lastName')}`.trim();
      const email = `${formData.get('email')}`.trim();
      const password = `${formData.get('password')}`.trim();
      const streetName = `${formData.get('streetName')}`.trim();
      const streetNumber = `${formData.get('streetNumber')}`.trim();
      const postalCode = `${formData.get('postalCode')}`.trim();
      const city = `${formData.get('city')}`.trim();
      const country = `${formData.get('country')}`.trim();
      const fetchObj = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        addresses: [
          {
            streetName: streetName,
            streetNumber: streetNumber,
            postalCode: postalCode,
            city: city,
            country: country,
          },
        ],
      };
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
      console.log(response, response.status, response.ok);
    }
  } catch (error) {
    console.error(error);
  }
}
