import { useEffect, useState } from 'react';
import { AiFillInfoCircle, AiFillSetting } from 'react-icons/ai';
import { BiBrain } from 'react-icons/bi';
import { BsSpeedometer } from 'react-icons/bs';
import { GiGrowth } from 'react-icons/gi';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import { Modes } from '../utils/Utils';

interface Props {
  onModeChange: (mode: Modes) => void;
}

const Sidebar = ({ onModeChange }: Props) => {
  const [mode, setModes] = useState<Modes>(Modes.Reaction);

  useEffect(() => {
    onModeChange(mode);
  }, [mode]);

  return (
    <div className="flex flex-col w-52 drop-shadow-md h-screen bg-base-100 p-4 pt-8 fixed">
      <Logo />
      <div className="my-8 flex flex-col gap-2 h-full">
        <SidebarItem
          title="Reaction"
          icon={<BsSpeedometer className="text-3xl" />}
          onClick={() => setModes(Modes.Reaction)}
          isActive={mode === Modes.Reaction}
        />

        <SidebarItem
          title="Accumulator"
          icon={<GiGrowth className="text-3xl" />}
          onClick={() => setModes(Modes.Accumulator)}
          isActive={mode === Modes.Accumulator}
        />

        <SidebarItem
          title="Sequence"
          icon={<BiBrain className="text-3xl" />}
          onClick={() => setModes(Modes.Sequence)}
          isActive={mode === Modes.Sequence}
        />

        <div className="flex items-center hover:cursor-pointer mt-auto transition hover:bg-primary hover:text-primary-content p-3 gap-4 rounded-lg">
          <AiFillSetting className="text-3xl" />
          <span className="font-heading tracking-widest uppercase">
            Settings
          </span>
        </div>
        <div className="flex items-center hover:cursor-pointer transition hover:bg-primary hover:text-primary-content p-3 gap-4 rounded-lg">
          <AiFillInfoCircle className="text-3xl" />
          <span className="font-heading tracking-widest uppercase">About</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
