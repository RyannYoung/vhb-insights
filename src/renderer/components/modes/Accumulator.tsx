import { useEffect } from 'react';
import AccHandDistGraph from '../graphs/Reaction/AccHandDistributionGraph';
import AccHandMovement from '../graphs/Reaction/AccHandMovement';
import AccTSLBScatGraph from '../graphs/Reaction/AccTSLBScatGraph';

import { StatItem } from '../Stat';
import Warning from '../Warning';

interface Props {
  data: Data[];
}

const Accumulator = ({ data }: Props) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4 w-full">
        <div className="bg-base-100 rounded-xl shadow h-full col-span-1">
          <StatItem
            description="For all datasets, in secs"
            className="w-full h-full"
            heading="Average Score"
            value={(
              data
                .map((item) => item.test.summary.totalScore)
                .reduce((a, b) => a + b, 0) / data.length
            ).toFixed(2)}
          />
        </div>

        <div className="bg-base-100 rounded-xl shadow h-full row-span-3">
          <AccHandDistGraph
            data={data}
            title="Hand Distribution"
            description="The hand distribution for the snapshots"
          />
        </div>

        <div className="bg-base-100 rounded-xl shadow h-full col-span-2 row-span-3">
          <AccTSLBScatGraph
            data={data}
            title="Time between button presses (TSLB)"
            description="Evaluates the distance between the user's hand and the button"
          />
        </div>

        <div className="bg-base-100 rounded-xl shadow h-full col-span-1">
          <StatItem
            description="For all snapshots, in meters"
            className="w-full h-full"
            heading="Activation Hand Distance Travelled"
            value={data
              ?.map((item) =>
                item?.snapshots?.map(
                  (item: AccumulatorSnapshot) =>
                    item.activations?.calculatedDistances[0] -
                    item.activations.calculatedDistances[
                      item.activations.calculatedDistances.length - 1
                    ]
                )
              )
              .map((item) => item.flat().reduce((a, b) => a + b, 0))
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}
          />
        </div>
        <div className="bg-base-100 rounded-xl shadow h-full col-span-1">
          <StatItem
            description="The sequence of which the buttons were activated"
            className="w-full h-full"
            heading="Activation Sequence"
            value={data[0]?.test?.summary?.btnSequence?.map(
              (item) => parseInt(item.slice(-2)) + ', '
            )}
          />
        </div>
      </div>

      <div className="m-4">
        <AccHandMovement
          data={data}
          title="Hand Movement"
          description="Evaluates the distance between the user's hand and the button"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 m-4"></div>
    </>
  );
};

export default Accumulator;
