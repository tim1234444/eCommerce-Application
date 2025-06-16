import { useEffect, useState } from 'react';
import getProductsList from '../api/getProductsList';
import Pagintaion from '../components/pagination/Pagination';
import ProductCard from '../components/productCard/ProductCard';
import Layout from '../components/layout/Layout';
import getCartByCustomerID from '../api/getCartByCustomerID';

export default function CatalogPage() {
  const [sortKey, setSortKey] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsArray = getProductsList();
    productsArray.then((data) => {
      getCartByCustomerID();
      setProducts(data);
    });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  console.log('Products is: ', products);
  return (
    <Layout>
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Поиск товаров..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="sort-menu">
        <label>
          Сортировать по:
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="price">Цене</option>
            <option value="name.en-US">Названию</option>
          </select>
        </label>
        <label>
          Порядок:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">По возрастанию ↑</option>
            <option value="desc">По убыванию ↓</option>
          </select>
        </label>
      </div>
      <ul className="products-list">
        {products &&
          products.map(
            ({
              id,
              name,
              description,
              masterVariant: { images, prices },

              masterVariant,
            }) => (
              <ProductCard
                key={id}
                id={id}
                name={{ 'en-US': name?.['en'] || name?.['en-US'] || 'No name' }}
                description={{
                  'en-US': description?.['en'] || description?.['en-US'] || '',
                }}
                images={images}
                prices={prices?.[2]}
                masterVariant={masterVariant}
              />
            ),
          )}
      </ul>
      {products.length >= 6 ? (
        <Pagintaion products={products} setProducts={setProducts} />
      ) : (
        <div></div>
      )}
    </Layout>
  );
}
