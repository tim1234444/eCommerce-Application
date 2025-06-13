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
      localStorage.setItem('cartId', `${data.id}`);
      console.log('Create cart response: ', data);
    }
  } catch (error) {
    console.error(error);
  }
}
