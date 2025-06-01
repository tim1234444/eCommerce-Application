type Props = {
  src: string;
};

export default function ProductNavSlide({ src }: Props) {
  return <img src={src} alt="Картинка" />;
}
