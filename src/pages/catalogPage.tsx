import { useEffect, useState } from 'react';
import getProductsList from '../api/getProductsList';

export default function CatalogPage() {
  const [products, setProducts] = useState<[]>([]);
  useEffect(() => {
    const p = getProductsList();
    p.then(async (data) => {
      console.log(data);
      setProducts(data);
    });
  }, []);

  return (
    <ul>
      {products.map((product) => {
        const {
          id,
          masterData: {
            current: {
              name,
              description,
              masterVariant: { images },
            },
          },
        } = product;
        return (
          <li key={id}>
            <h3>{`${name['en-US']}`}</h3>
            <img src={images[0]['url']} width={200} alt="" />
            <p>{`${description['en-US']}`}</p>
          </li>
        );
      })}
    </ul>
  );
}
