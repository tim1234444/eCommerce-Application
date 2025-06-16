import getCookie from './getCoockie';

export default async function getProductsResultLimits(
  direction: string,
  setProducts: (prev: never[]) => void,
) {
  try {
    const counterStart = 0;
    const counterFinish = 6;
    const response: Response = await fetch(
      `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/product-projections`,
      {
        method: 'GET',
        headers: {
          Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
        },
      },
    );
    const data = await response.json();
    const prevArr = await data.results.slice(counterStart, counterFinish);
    const nextArr = await data.results.slice(counterFinish);
    console.log(data, prevArr, nextArr);

    if (direction === 'prev') {
      setProducts(await data.results.slice(counterStart, counterFinish));
    }
    if (direction === 'next') {
      setProducts(await data.results.slice(counterFinish));
    }

    console.log('response getProductsResultLimits function: ', data.count);
  } catch (error) {
    console.error(error);
  }
}
