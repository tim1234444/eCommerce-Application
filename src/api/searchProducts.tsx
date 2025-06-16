import getCookie from './getCoockie';

function getFuzzyLevel(text: string): 0 | 1 | 2 {
  const length = text.trim().length;
  if (length <= 2) return 0;
  if (length <= 5) return 1;
  return 2;
}

export default async function searchProducts(searchTerm: string, sort?: string) {
  if (!searchTerm.trim()) return [];

  try {
    const fuzzy = true;
    const fuzzyLevel = getFuzzyLevel(searchTerm);
    const queryParams = new URLSearchParams({
      'text.en-US': searchTerm,
      fuzzy: String(fuzzy),
      fuzzyLevel: String(fuzzyLevel),
    });
    
    if (sort) {
      queryParams.set('sort', sort);
    }

    const url = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}/product-projections/search?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `${import.meta.env.VITE_TOKEN_TYPE} ${getCookie().access_token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      throw new Error(`Search request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error during product search:', error);
    return [];
  }
}
