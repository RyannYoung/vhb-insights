import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="w-full bg-base-100 rounded-t-xl p-4 mt-auto">
      <div className="flex justify-center items-center h-full gap-24">
        <Logo />
        <div className="font-display text-sm">All rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
