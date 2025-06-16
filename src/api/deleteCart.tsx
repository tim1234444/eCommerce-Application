import getCookie from './getCoockie';

export default async function deleteProductCart() {
  try {
    if (localStorage.getItem('customerId')) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/carts/${localStorage.getItem('cartId')}?version=${localStorage.getItem('versionCart')}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
          },
        },
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(`Response resolve: `, response, `Response data: `, data);
        localStorage.removeItem('versionCart');
        localStorage.removeItem('cartId');
        localStorage.removeItem('countItems');
        return true;
      }
      if (response.status === 400) {
        const errorResponse = new Error(
          `Response resolve with status code: ${data.statusCode}. ${data.message}`,
        );
        throw errorResponse;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
