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
import { Line } from 'react-chartjs-2';
import {
  chartjsBackgroundColors,
  chartjsBorderColors,
} from 'renderer/utils/Utils';

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
  snapshots: ReactionSnapshot[][];
  title: string;
  description: string;
}

const ReactionTimeGraph = ({ snapshots, description, title }: Props) => {
  const lineData: ChartData<
    'line',
    (number | ScatterDataPoint | null)[],
    unknown
  > = {
    labels: [1, 2, 3, 4, 5],
    datasets: snapshots.map((item, index) => ({
      label: `Dataset ${index + 1}`,
      data: item.map((item) => item.reactionTime),
      fill: false,
      backgroundColor: chartjsBackgroundColors[index],
      borderColor: chartjsBorderColors[index],
      tension: 0.1,
    })),
  };

  const lineOptions: _DeepPartialObject<ChartOptions<'line'>> = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Reaction Time (ms)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Attempt #',
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white p-4">
      <h2 className="font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <Line data={lineData} options={lineOptions} />
    </div>
  );
};

export default ReactionTimeGraph;
