import { useEffect, useState } from 'react';
import getProductsList from '../api/getProductsList';
// import searchProducts from '../api/searchProducts';
import ProductCard from '../components/productCard/ProductCard';
import Layout from '../components/layout/Layout';
import getCartByCustomerID from '../api/getCartByCustomerID';

// interface IProduct {
//   id: string;
//   masterData: {
//     current: {
//       description: {
//         'en-US': string;
//       };
//       name: {
//         'en-US': string;
//       };
//       masterVariant: {
//         prices: {
//           country: string;
//           id: string;
//           key: string;
//           value: {
//             centAmount: number;
//             currencyCode: string;
//             fractionDigits: number;
//             type: string;
//           };
//           discounted: {
//             value: {
//               centAmount: number;
//               currencyCode: string;
//             };
//           };
//         }[];
//         images: { url: string }[];
//         sku: string;
//       };
//     };
//   };
// }

// type NormalizedProduct = {
//   id: string;
//   name: { [locale: string]: string };
//   description?: { [locale: string]: string };
//   images: [{ url: string }];
//   prices: {
//     value: {
//       centAmount: string;
//       currencyCode: string;
//     };
//     discounted: {
//       value: {
//         centAmount: string;
//         currencyCode: string;
//       };
//     };
//   }[];
// };

export default function CatalogPage() {
  const [sortKey, setSortKey] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  // const controllerRef = useRef<AbortController | null>(null);
  // const normalizeProduct = (product: IProduct): NormalizedProduct => {
  // const normalizeProduct = (product: IProduct) => {
  //   console.log(product);
  //   // if (product.masterData) {
  //   //   const {
  //   //     id,
  //   //     masterData: {
  //   //       current: {
  //   //         name,
  //   //         description,
  //   //         masterVariant: { images, prices, sku },
  //   //       },
  //   //     },
  //   //   } = product;
  //   //   return { id, name, description, images, prices };
  //   // } else {
  //   //   const {
  //   //     id,
  //   //     name,
  //   //     description,
  //   //     masterVariant: { images, prices },
  //   //   } = product;
  //   //   return { id, name, description, images, prices };
  //   // }
  // };

  useEffect(() => {
    const products = getProductsList();
    products.then((data) => {
      getCartByCustomerID();
      setProducts(data);
    });
    // const loadData = async () => {
    //   if (controllerRef.current) {
    //     controllerRef.current.abort();
    //   }
    //   const controller = new AbortController();
    //   controllerRef.current = controller;
    // const sortParam = `${sortKey} ${sortOrder}`;
    //   let rawProducts = [];
    //   getCartByCustomerID();
    //   try {
    //     //     if (searchTerm.trim()) {
    //     //       rawProducts = await searchProducts(searchTerm, sortParam);
    //     //     } else {
    //     //       rawProducts = await getProductsList(sortParam);
    //     //     }
    //     // const normalized = rawProducts.map(normalizeProduct);
    //     const prod = await getProductsList(sortParam);
    //     setProducts(prod);
    //     console.log(products);
    //   } catch {
    //     console.log('');
    //   }
    // };
    // loadData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  {
    console.log('Products: ', products);
  }
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
            ({ id, name, description, images, prices, masterVariant }) => (
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
    </Layout>
  );
}
