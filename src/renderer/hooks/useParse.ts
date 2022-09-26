import { useEffect, useState } from 'react';

/**
 * Parses the json into the correct data set format
 * @param json
 */
export function useParse<T>(files: File[]): T[] {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    setData(() => []);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        setData((prev) => [...prev, JSON.parse(reader.result as string)]);
      };

      reader.readAsText(file);
    });
  }, [files]);

  return data;
}
