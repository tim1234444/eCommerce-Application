import getCookie from './getCoockie';

export default async function deleteProductInCart(
  id: string,
  countProduct: number = 0,
) {
  try {
    if (localStorage.getItem('customerId')) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/carts/${localStorage.getItem('cartId')}`,
        {
          method: 'POST',
          headers: {
            Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            version: Number(localStorage.getItem('versionCart')),
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: `${id}`,

                quantity: countProduct,
              },
            ],
          }),
        },
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(`Response resolve: `, response, `Response data: `, data);
        localStorage.setItem('versionCart', data.version);
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
