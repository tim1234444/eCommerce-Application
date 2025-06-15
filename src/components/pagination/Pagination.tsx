import './pagination.css';
import getProductsResultLimits from '../../api/getProductsResultLimits';
import { useState } from 'react';

interface ProductListProps {
  products: never[];
  setProducts: (products: never[]) => void;
}
export default function Pagintaion({
  products,
  setProducts,
}: ProductListProps) {
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(false);
  return (
    <div className="pagination">
      {products.length >= 6 ? (
        <>
          <button
            className="pagination-button--prev"
            disabled={prev}
            onClick={() => {
              setNext(false);
              setPrev(true);
              getProductsResultLimits('prev', setProducts);
            }}
          >
            Prev
          </button>
          <button
            className="pagination-button--next"
            disabled={next}
            onClick={() => {
              setPrev(false);
              setNext(true);
              getProductsResultLimits('next', setProducts);
            }}
          >
            Next
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
