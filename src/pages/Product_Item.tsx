import { useEffect, useRef, useState } from 'react';
import { getProduct } from '../api/GetProductItem';
import Layout from '../components/layout/Layout';
import ProductNavSlide from '../components/ProductsSlide/ProductNavSlide';
import ProductSlide from '../components/ProductsSlide/ProductSlide';
import '../ProductItem.css';
import { Link, useParams } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, EffectFade, Navigation } from 'swiper/modules';
import FullScreenSlide from '../components/ProductsSlide/FullScreenSlide';
import type { SwiperRef } from 'swiper/react';
interface Product {
  id: string;
  masterData: {
    current: {
      description: {
        'en-US': string;
      };
      name: {
        'en-US': string;
      };
      masterVariant: {
        prices: {
          country: string;
          id: string;
          key: string;
          value: {
            centAmount: number;
            currencyCode: string;
            fractionDigits: number;
            type: string;
          };
        }[];
        images: { url: string }[];
      };
    };
  };
}

export default function ProductItem() {
  const { productId } = useParams<string>(); // productId будет "номер товара"

  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [data, setData] = useState<Product | null>(null);
  const [fullscreenSwiper, setFullscreenSwiper] = useState<SwiperType | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef<SwiperRef | null>(null);
  const price = data?.masterData.current.masterVariant.prices?.[0]?.value;

  const formattedPrice = price
    ? (price.centAmount / 10 ** price.fractionDigits).toFixed(
        price.fractionDigits,
      )
    : '';
  useEffect(() => {
    async function fetchData() {
      if (productId) {
        const result = await getProduct(productId);
        setData(result);
        setIsLoading(true);
      }
    }

    fetchData();
  }, [productId]);
  const handleSlideClick = (index: number) => {
    if (fullscreenSwiper) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
      if (sliderRef.current && sliderRef.current.style) {
        sliderRef.current.style.display = 'flex';
      }
      fullscreenSwiper.slideToLoop(index, 0);
      setIsOpen(true);
    }
  };

  // Обработчик закрытия при клике вне элементов
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        !target.closest('.swiper-button-prev') &&
        !target.closest('.swiper-button-next') &&
        !target.closest('.swiper-slide img')
      ) {
        document.body.style.overflowY = 'scroll';
        if (sliderRef.current && sliderRef.current.style) {
          sliderRef.current.style.display = 'none';
        }
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);
  return (
    <Layout>
      {IsLoading ? (
        <section className="product-main">
          <div className="product-main__container">
            <div className="product-main__body">
              <div className="product-main__slider">
                <div className="product-main__wrap">
                  <Swiper
                    modules={[Thumbs, Navigation]}
                    navigation={{
                      nextEl: '.product-main__next',
                      prevEl: '.product-main__prev',
                    }}
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                    className="slider-nav"
                    observer={true}
                    observeParents={true}
                    slidesPerView={4}
                    spaceBetween={15}
                    speed={500}
                    direction="vertical"
                  >
                    {data?.masterData.current.masterVariant.images.map(
                      (image, index) => (
                        <SwiperSlide
                          className="slider-nav__slide"
                          onClick={() => handleSlideClick(index)}
                        >
                          <ProductNavSlide
                            src={image.url}
                            key={image.url}
                          ></ProductNavSlide>
                        </SwiperSlide>
                      ),
                    )}
                  </Swiper>
                  <div className="product-main__buttons">
                    <button
                      type="button"
                      className="product-main__prev swiper-button-prev _icon-arrow"
                    ></button>
                    <button
                      type="button"
                      className="product-main__next swiper-button-next _icon-arrow"
                    ></button>
                  </div>
                </div>
                <div className="product-main__box">
                  <Swiper
                    modules={[Thumbs, EffectFade]}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="slider-main"
                    observer={true}
                    observeParents={true}
                    slidesPerView={1}
                    spaceBetween={10}
                    speed={700}
                    effect="fade"
                  >
                    {data?.masterData.current.masterVariant.images.map(
                      (image, index) => (
                        <SwiperSlide
                          className="slider-main__slide"
                          onClick={() => handleSlideClick(index)}
                        >
                          <ProductSlide
                            src={image.url}
                            key={image.url}
                          ></ProductSlide>
                        </SwiperSlide>
                      ),
                    )}
                  </Swiper>
                </div>
              </div>
              <Swiper
                modules={[Navigation]}
                navigation={{
                  nextEl: '.fullscreen-slider .swiper-button-next',
                  prevEl: '.fullscreen-slider .swiper-button-prev',
                }}
                onSwiper={setFullscreenSwiper}
                ref={sliderRef}
                className="fullscreen-slider"
                observer={true}
                observeParents={true}
                slidesPerView={1}
                speed={700}
              >
                {data?.masterData.current.masterVariant.images.map((image) => (
                  <SwiperSlide>
                    <FullScreenSlide
                      src={image.url}
                      key={image.url}
                    ></FullScreenSlide>
                  </SwiperSlide>
                ))}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </Swiper>
              <div className="product-main__content">
                <h1 className="product-main__title">
                  {data?.masterData.current.name['en-US']}
                </h1>
                <h2>{formattedPrice} USD</h2>
                <div
                  className="product-main__desc"
                  dangerouslySetInnerHTML={{
                    __html: data?.masterData.current.description['en-US'] || '',
                  }}
                />
              </div>
            </div>
          </div>
          <Link to="/catalog" className="product-main-back">
            Back to catalog
          </Link>
        </section>
      ) : (
        ''
      )}
    </Layout>
  );
}
