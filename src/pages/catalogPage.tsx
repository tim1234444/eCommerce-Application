import { useEffect, useState } from 'react';
import getProductsList from '../api/getProductsList';
import searchProducts from '../api/searchProducts';
import ProductCard from '../components/productCard/ProductCard';
import Layout from '../components/layout/Layout';

type NormalizedProduct = {
  id: string;
  name: { [locale: string]: string };
  description?: { [locale: string]: string };
  images: [{ url: string }];
  prices: {
    value: {
      centAmount: string;
      currencyCode: string;
    };
    discounted: {
      value: {
        centAmount: string;
        currencyCode: string;
      };
    };
  }[];
};

export default function CatalogPage() {
  const [sortKey, setSortKey] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<NormalizedProduct[]>([]);

  const normalizeProduct = (product:any): NormalizedProduct => {
    if (product.masterData) {
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
      return { id, name, description, images, prices };
    } else {
      const {
        id,
        name,
        description,
        masterVariant: { images, prices },
      } = product;
      return { id, name, description, images, prices };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const sortParam = `${sortKey} ${sortOrder}`;
    let rawProducts = [];

    if (searchTerm.trim()) {
      rawProducts = await searchProducts(searchTerm, sortParam);
    } else {
      rawProducts = await getProductsList(sortParam); 
    }

      const normalized = rawProducts.map(normalizeProduct);
      setProducts(normalized);
    };

    loadData();
  }, [searchTerm, sortKey, sortOrder]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
        {products.map(({ id, name, description, images, prices }) => (
          <ProductCard
            key={id}
            id={id}
            name={{ 'en-US': name?.['en'] || name?.['en-US'] || 'No name' }}
            description={{
              'en-US': description?.['en'] || description?.['en-US'] || '',
            }}
            images={images}
            prices={prices?.[2]}
          />
        ))}
      </ul>
    </Layout>
  );
}
