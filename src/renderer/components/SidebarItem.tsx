import { Modes } from '../utils/Utils';

interface Props {
  icon?: React.ReactNode;
  title: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarItem = ({ title, icon, isActive, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${
        isActive && 'bg-primary text-primary-content'
      } flex items-center hover:cursor-pointer transition hover:bg-primary hover:text-primary-content p-3 gap-4 rounded-lg`}
    >
      {icon}
      <span className="font-heading tracking-widest uppercase">{title}</span>
    </div>
  );
};

export default SidebarItem;
