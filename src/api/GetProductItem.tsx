import getCookie from './getCoockie';
export async function getProduct(productId: string) {
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const url = `https://api.europe-west1.gcp.commercetools.com/${projectKey}/products/${productId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
    },
  });

  const data = await response.json();
  return data;
}
