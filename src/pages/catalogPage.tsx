import { useEffect, useState } from 'react';
import getProductsList from '../api/getProductsList';
import ProductCard from '../components/productCard/ProductCard';
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
            current: {
              name,
              description,
              masterVariant: { images },
            },
          },
        } = product;
        return (
          <ProductCard
            key={id}
            id={id}
            name={name}
            images={images}
            description={description}
          />
        );
      })}
    </ul>
  );
}
