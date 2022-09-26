import React from 'react';
import { AiFillCloseCircle, AiOutlineWarning } from 'react-icons/ai';

interface Props {
  title: string;
}

const NewFeature = ({ title }: Props) => {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <>
      {isVisible && (
        <div className="shadow font-secondary px-4 py-2 gap-2 rounded-xl text-warning-content bg-warning flex items-center font-normal">
          <AiOutlineWarning className="text-xl" />
          <span className="text-sm">Warning: {title}</span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-auto text-lg"
          >
            <AiFillCloseCircle />
          </button>
        </div>
      )}
    </>
  );
};

export default NewFeature;
