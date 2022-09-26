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
  ArcElement,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';
import { useEffect, useState } from 'react';
import { Line, Pie, Scatter } from 'react-chartjs-2';

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: Data[];
  title: string;
  description: string;
}
const AccHandDistGraph = ({ data, description, title }: Props) => {
  const [snapshots, setSnapshots] = useState<AccumulatorSnapshot[][]>([]);

  useEffect(() => {
    setSnapshots(() => data.map((item) => item.snapshots));
  }, [data]);

  useEffect(() => {
    console.log();
  }, [snapshots]);

  const lineData: ChartData<
    'pie',
    (number | ScatterDataPoint | null)[],
    unknown
  > = {
    labels: ['Left', 'Right'],
    datasets: [
      {
        data:
          snapshots.length > 0
            ? [
                snapshots
                  .map((item) =>
                    item
                      .map((item) => item?.activations?.hand)
                      .filter((item) => item === 1)
                  )
                  .flat().length,
                snapshots
                  .map((item) =>
                    item
                      .map((item) => item?.activations?.hand)
                      .filter((item) => item === 0)
                  )
                  .flat().length,
              ]
            : [0, 0],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(99, 255, 132)'],
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden h-full rounded-xl bg-white p-4">
      <h2 className="font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <Pie data={lineData} />
    </div>
  );
};

export default AccHandDistGraph;
