import getCookie from './getCoockie';

export default async function createCart() {
  try {
    if (localStorage.getItem('customerId')) {
      const customerId = localStorage.getItem('customerId');
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/carts`,
        {
          method: 'POST',
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: `${customerId}`,
            currency: 'USD',
          }),
        },
      );
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('cartId', `${data.id}`);
      } else {
        const errorResponse = new Error(
          `Response resolve with status code: ${data.code}. ${data.message}`,
        );
        throw errorResponse;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
