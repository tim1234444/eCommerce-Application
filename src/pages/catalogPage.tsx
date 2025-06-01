import { useEffect, useState } from 'react';
import getProductsList from '../api/getProductsList';
import ProductCard from '../components/productCard/ProductCard';
import Layout from '../components/layout/Layout';
export default function CatalogPage() {
  const [products, setProducts] = useState<[]>([]);
  useEffect(() => {
    const p = getProductsList();
    p.then(async (data) => {
      setProducts(data);
    });
  }, []);

  return (
    <Layout>
      <ul className="products-list">
        {products.map((product) => {
          const {
            id,
            masterData: {
              current: {
                name,
                description,
                masterVariant: { images, prices },
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
              prices={prices[2]}
            />
          );
        })}
      </ul>
    </Layout>
  );
}
