import getCookie from './getCoockie';

export default async function getProductsList(sortParam = '') {
  try {
    const baseUrl = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/product-projections/search`;
    const sortQuery = sortParam ? `?sort=${encodeURIComponent(sortParam)}` : '';
    const url = `${baseUrl}${sortQuery}`;

    const response: Response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
      },
    });
    if (response.status === 200 && response.ok === true) {
      const data = await response.json();
      console.log(data, data.results);
      return data.results;
    } else {
      const err = new Error(
        `Response error status code = ${response.status} and status ok = ${response.ok}`,
      );
      throw err;
    }
  } catch (error) {
    console.error(error);
  }
}
