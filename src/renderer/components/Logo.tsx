import logo from '../assets/logo-cropped.png';

const Logo = () => {

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="h-12 w-12 rounded-md aspect-video">
        <img src={logo} alt="vhb logo" className="object-contain h-full" />
      </div>
      <div>
        <h1 className="text-xl uppercase leading-snug font-heading">
          Insights
        </h1>
        <span className="text-xs leading-snug uppercase font-heading">
          by VHB
        </span>
      </div>
    </div>
  );
};

export default Logo;
