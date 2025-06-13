import getCookie from './getCoockie';
import createCart from './createCart';
export default async function getCartByCustomerID() {
  try {
    if (localStorage.getItem('customerId')) {
      const customerId = localStorage.getItem('customerId');
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/carts/customer-id=${customerId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
          },
        },
      );
      const data = await response.json();
      console.log('Get carts by id response: ', data);
      if (data.statusCode === 200) {
        console.log('user has cart');
      }
      if (data.statusCode === 404) {
        // throw new Error(`${data.message}`);
        await createCart();
      }
    }
  } catch (error) {
    console.error(error);
  }
}
