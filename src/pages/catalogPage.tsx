import { useEffect, useState } from 'react';
import getProductsList from '../api/getProductsList';

export default function CatalogPage() {
  const [products, setProducts] = useState<[]>([]);
  useEffect(() => {
    const p = getProductsList();
    p.then(async (data) => {
      setProducts(data);
    });
  }, []);

  return (
    <ul>
      {products.map((product) => {
        const {
          id,
          masterData: {
            current: { name },
          },
        } = product;
        return <li key={id}>{`${name['en-US']}`}</li>;
      })}
    </ul>
  );
}
