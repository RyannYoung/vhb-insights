import { useEffect, useState } from 'react';
import { GiRun, GiSnail } from 'react-icons/gi';
import ReactionTimeGraph from '../graphs/Reaction/ReactionTimeGraph';
import Stat, { StatItem } from '../Stat';
import { FaHands } from 'react-icons/fa';

interface Props {
  data: Data[];
}

const Reaction = ({ data }: Props) => {
  const [snapshots, setSnapshots] = useState<ReactionSnapshot[][]>([]);

  useEffect(() => {
    setSnapshots(() => data.map((item) => item.snapshots));
  }, [data]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4 w-full">
        <div className="bg-base-100 rounded-xl shadow h-full col-span-1">
          <StatItem
            description="For all datasets, in secs"
            className="w-full h-full"
            heading="Average Reaction Time"
            value={(
              snapshots
                .flat()
                .map((item) => item.reactionTime)
                .reduce((a, b) => a + b, 0) / snapshots.flat().length
            ).toFixed(2)}
          />
        </div>
        <div className="bg-base-100 rounded-xl shadow h-full col-span-1">
          <StatItem
            description="For all datasets, in secs"
            className="w-full h-full"
            heading="Fastest Reaction Time"
            figure={<GiRun />}
            value={Math.min(
              ...snapshots.flat().map((item) => item.reactionTime)
            ).toFixed(2)}
          />
        </div>

        {/* <Stat
            className="w-full h-full"
            stats={[
              {
                heading: 'Average Reaction Time',
                value: (
                  snapshots
                    .flat()
                    .map((item) => item.reactionTime)
                    .reduce((a, b) => a + b, 0) / snapshots.flat().length
                ).toFixed(2),
                description: 'For all datasets, in secs',
              },
              {
                heading: 'Fastest Reaction Time',
                value: Math.min(
                  ...snapshots.flat().map((item) => item.reactionTime)
                ).toFixed(2),
                description: 'For all datasets, in secs',
              },
              {
                heading: 'Slowest Reaction Time',
                value: Math.max(
                  ...snapshots.flat().map((item) => item.reactionTime)
                ).toFixed(2),
                description: 'For all datasets, in secs',
              },
            ]}
          /> */}
        {/* </div> */}

        <div className="bg-base-100 rounded-xl shadow h-full col-span-2 row-span-3">
          <ReactionTimeGraph
            snapshots={snapshots}
            title="Reaction Speed"
            description="Evaluates the reaction speed of the user"
          />
          {/* <GraphCard title="Reaction Speed" data={data} source="reactionTime" /> */}
        </div>

        <div className="bg-base-100 rounded-xl shadow h-full">
          <StatItem
            description="For all datasets, in secs"
            className="w-full h-full"
            heading="Average Wait Time"
            value={(
              snapshots.flat().reduce((a, b) => a + b.waitTime, 0) /
              snapshots.flat().length
            ).toFixed(2)}
          />
        </div>

        <div className="bg-base-100 rounded-xl shadow h-full col-span-1">
          <StatItem
            description="For all datasets, in secs"
            className="w-full h-full"
            heading="Slowest Reaction Time"
            figure={<GiSnail />}
            value={Math.max(
              ...snapshots.flat().map((item) => item.reactionTime)
            ).toFixed(2)}
          />
        </div>

        <div className="bg-base-100 rounded-xl shadow h-full">
          <StatItem
            description="For all datasets, in secs"
            className="w-full h-full"
            figure={<FaHands />}
            heading="Activation Distribution"
            value="0(L) / 0(R)"
          />
        </div>
        <div className="bg-base-100 rounded-xl shadow h-full">
          <StatItem
            description="New feature to be added"
            className="w-full h-full"
            heading="To be added"
            value="TBA"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 m-4">
        {/* {data.length > 0 && (
          <>
            <GraphCard
              title="Reaction Speed"
              data={data}
              source="reactionTime"
            />
            <GraphCard title="Target Time" data={data} source="targetTime" />
            <GraphCard title="Total Time" data={data} source="totalTime" />
            <GraphCard title="Time" data={data} source="time" />
          </>
        )} */}
      </div>
    </>
  );
};

export default Reaction;
