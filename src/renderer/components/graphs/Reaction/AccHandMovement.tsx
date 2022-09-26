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
import { chartjsBackgroundColors } from 'renderer/utils/Utils';

// import the plugin core

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

const AccHandMovement = ({ description, data, title }: Props) => {
  const [snapshots, setSnapshots] = useState<AccumulatorSnapshot[][]>([]);

  useEffect(() => {
    setSnapshots(() => data.map((item) => item.snapshots));
  }, [data]);

  useEffect(() => {
    console.log(
      data
        ?.map((item) =>
          item.snapshots.map(
            (item: AccumulatorSnapshot) =>
              item.activations.calculatedDistances[0] -
              item.activations.calculatedDistances[
                item.activations.calculatedDistances.length - 1
              ]
          )
        )
        .map((item) => item.flat().reduce((a, b) => a + b, 0))
        .reduce((a, b) => a + b, 0)
    );
  }, [snapshots]);

  const lineData: ChartData<
    'line',
    (number | ScatterDataPoint | null)[],
    unknown
  > = {
    labels:
      snapshots.length > 0
        ? Array.from(
            {
              length: Math.max(
                ...snapshots[0]
                  ?.map((item) => item?.activations?.calculatedDistances.length)
                  .flat()
              ),
            },
            (_, k) => k + 0.5
          )
        : [0.5, 1.5, 2.5, 3.5, 4.5],
    datasets:
      snapshots.length > 0
        ? snapshots[0]
            .map((item) => item?.activations?.calculatedDistances)
            .map((item, index) => {
              return {
                label: `Snapshot ${index + 1}`,
                data: item,
                tension: 0.5,
                fill: false,
                backgroundColor: chartjsBackgroundColors[index],
                borderColor: chartjsBackgroundColors[index],
              };
            })
        : [],
  };

  // snapshots[0]
  //   ?.map((item) => item?.activations?.idealDistances)
  //   .map((item) =>
  //     item.map((item, index) => {
  //       return {
  //         x: item,
  //         y: data[0].test.summary.pollingRate * index,
  //       };
  //     })
  //   )
  //   .flat(),

  const lineOptions: _DeepPartialObject<ChartOptions<'line'>> = {
    line: {
      datasets: {
        tension: 0.4,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Distance from button (m)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time (s)',
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden rounded-xl h-full bg-white p-4">
      <h2 className="font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <Line data={lineData} options={lineOptions} />
    </div>
  );
};

export default AccHandMovement;
