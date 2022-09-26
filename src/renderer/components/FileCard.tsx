import { AiFillFile } from 'react-icons/ai';

interface Props {
  file: File;
}

const FileCard = ({ file }: Props) => {
  return (
    <div className="w-fit bg-white p-4">
      <div className="flex items-center gap-2">
        <AiFillFile />
        <span className="text-sm font-mono">{file.name.split('_')[2]}</span>
      </div>
    </div>
  );
};

export default FileCard;
