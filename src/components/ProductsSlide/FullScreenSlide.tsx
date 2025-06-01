type Props = {
  src: string;
};

export default function FullScreenSlide({ src }: Props) {
  return (
    <>
      <div className="closs-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="41"
          viewBox="0 0 32 32"
        >
          <defs></defs>
          <title />
          <g id="cross">
            <line className="cls-1" x1="7" x2="25" y1="7" y2="25" />
            <line className="cls-1" x1="7" x2="25" y1="25" y2="7" />
          </g>
        </svg>
      </div>
      <img src={src} alt="Картинка" />
    </>
  );
}
