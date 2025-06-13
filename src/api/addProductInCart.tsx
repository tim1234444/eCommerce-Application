import getCookie from './getCoockie';

export default async function addProductInCart(
  id: string,
  countProduct: number = 1,
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
                action: 'addLineItem',
                productId: `${id}`,
                variantId: 1,
                quantity: countProduct,
              },
            ],
          }),
        },
      );
      const data = await response.json();
      localStorage.setItem('versionCart', data.version);
    }
  } catch (error) {
    console.error(error);
  }
}
