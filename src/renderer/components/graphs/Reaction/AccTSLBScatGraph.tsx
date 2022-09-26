import {
  Chart as Chartjs,
  CategoryScale,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  ScatterDataPoint,
  Title,
  Tooltip,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';
import { useEffect, useState } from 'react';
import { Line, Scatter } from 'react-chartjs-2';

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: Data[];
  title: string;
  description: string;
}

const AccTSLBScatGraph = ({ data, description, title }: Props) => {
  const [snapshots, setSnapshots] = useState<AccumulatorSnapshot[][]>([]);

  useEffect(() => {
    setSnapshots(() => data.map((item) => item.snapshots));
  }, [data]);

  useEffect(() => {}, [snapshots]);

  const lineData: ChartData<
    'scatter',
    (number | ScatterDataPoint | null)[],
    unknown
  > = {
    datasets: snapshots.map((item, index) => ({
      label: `Dataset ${index + 1}`,
      data: item.map((item) => {
        return {
          x: item.remainingTime,
          y: item.timeSinceLastButton,
        };
      }),

      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.1,
    })),
  };

  const lineOptions: _DeepPartialObject<ChartOptions<'scatter'>> = {
    responsive: true,
    elements: {
      point: {
        radius: 6,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Time since last button (s)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Remaining Time (s)',
        },
      },
    },
  };

  return (
    <div className="w-full h-full rounded-xl bg-white p-4">
      <h2 className="font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <Scatter data={lineData} options={lineOptions} />
    </div>
  );
};

export default AccTSLBScatGraph;
