import { useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  color: '#bdbdbd',
  outline: 'none',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface Props {
  callback: (files: File[]) => void;
  className: string;
}

export default function StyledDropzone({ callback, className }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    callback(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { 'application/json': ['.json'] }, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div
      className={`${className} bg-base-100 border-2 border-dashed hover:border-primary rounded-md hover:cursor-pointer transition`}
    >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="flex gap-2 items-center py-4 px-6">
          <FiUpload className="text-xl" />
          <p className="font-display">Upload files here...</p>
        </div>
      </div>
    </div>
  );
}
