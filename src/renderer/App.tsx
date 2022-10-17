import './App.css';
import 'tailwindcss/tailwind.css';

import { useState } from 'react';
import { AiFillPrinter, AiOutlineDownload } from 'react-icons/ai';
import { TbRefresh } from 'react-icons/tb';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

import Button from './components/Button';
import Footer from './components/Footer';
import Accumulator from './components/modes/Accumulator';
import Reaction from './components/modes/Reaction';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Table from './components/Table';
import { useParse } from './hooks/useParse';
import { Modes } from './utils/Utils';

/**
 * The root of the application
 * @returns The main application component
 */
const App = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<Modes>();

  const dataset = useParse<Data>(files); // Parse the dataset

  /**
   * Callback function for the dropzone functionality
   * @param droppedFiles The files drop into the dropzone
   */
  const onDrop = (droppedFiles: File[]) => {
    setFiles(droppedFiles);
  };

  /**
   * Displays the appropriate test depending on
   * the sidebar selection
   * @returns JSX mode component
   */
  const Display = () => {
    if (mode === Modes.Reaction) return <Reaction data={dataset} />;
    if (mode === Modes.Accumulator) return <Accumulator data={dataset} />;
    if (mode === Modes.Sequence) return <div>Sequence</div>;
    return <div>Nothing</div>;
  };

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen h-full bg-base-200 font-display">
      <div className="bg-base-200 flex flex-col h-full">
        <Sidebar
          onModeChange={(mode) => {
            setMode(mode);
          }}
        />

        <div className="ml-52 h-full">
          <Navbar
            menuitems={['Reaction', 'Accumulator', 'Sequence']}
            callback={onDrop}
          />
          <div className="w-full">
            <div className="grid grid-cols-2 mx-4 my-8 gap-4">
              <div className="prose">
                <h2 className="text-3xl font-bold">
                  Welcome {(dataset && dataset[0]?.user?.alias) || 'User'},
                </h2>
                <p>
                  To utilise the VHB insights applicaiton, please upload valid
                  JSON files in the dropbox above.
                </p>
                <div className="print:hidden flex gap-2 my-4">
                  <label
                    htmlFor="my-modal"
                    className="btn modal-button"
                    onClick={() =>
                      setTimeout(() => {
                        window.print();
                      }, 1)
                    }
                  >
                    <AiFillPrinter className="text-xl mr-2" />
                    Print
                  </label>
                  <Button
                    title="Download Summary"
                    icon={<AiOutlineDownload />}
                  />
                  <Button title="Refresh" icon={<TbRefresh />} />
                </div>
              </div>
              <div>
                {files.length > 0 && (
                  <>
                    <h2 className="mb-2 font-bold">Uploaded Files</h2>
                    <Table
                      className="print:hidden"
                      headings={['Name', 'Size']}
                      data={files}
                    />
                  </>
                )}
              </div>
            </div>
            <Display />
          </div>
        </div>
      </div>

      <Footer />

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Print Dialogue</h3>
          <p className="py-4">Now opening the local print service.</p>
          <p className="font-bold">
            We highly recommend setting your page size to{' '}
            <span className="text-primary">A3 LANDSCAPE</span> for best results!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Entry() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}
