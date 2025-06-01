type Props = {
  src: string;
};

export default function ProductSlide({ src }: Props) {
  return <img src={src} alt="Картинка" />;
}
