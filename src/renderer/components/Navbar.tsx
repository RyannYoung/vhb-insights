import Dropzone from './DropZone';
import { BiHelpCircle } from 'react-icons/bi';

interface Props {
  title?: string;
  menuitems: string[];
  callback: (files: File[]) => void;
}

const Navbar = ({ callback }: Props) => (
  <div className="bg-base-100 drop-shadow text-white p-4">
    <div className="flex items-center basis-5/6">
      <Dropzone className="w-full" callback={callback} />
      <div
        tabIndex={0}
        className="flex py-4 basis-1/6 text-center justify-center rounded-md bg-primary px-4 hover:bg-primary-focus gap-2 m-2"
      >
        <span className="font-heading tracking-widest uppercase">
          Need Help?
        </span>
        <BiHelpCircle className="text-2xl" />
      </div>
    </div>
  </div>
);

export default Navbar;
