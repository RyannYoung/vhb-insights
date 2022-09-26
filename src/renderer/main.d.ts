interface Data {
  id: number;
  date: string | number;
  user: {
    alias: string;
    age: number;
  };
  test: Test;
  snapshots: any;
  misc?: {
    [key: string]: any;
  };
}

interface Snapshot {
  id: number; // id of the snapshot
  snapshotTime: string; // time when the snapshot was created
}

interface Test {
  name: string;
  timeStarted: string | number;
  timeEnded: string | number;
  settings?: {
    [key: string]: any;
  };
}

interface ReactionSnapshot extends Snapshot {
  waitTime: number; // time the user waited before reaction
  reactionTime: number; // time the user reacted
  attempt: number; // attempt number
  bounds: [min: number, max: number]; // bounds of the reaction time
}

interface ReactionTest extends Test {
  snapshots: ReactionSnapshot[];
}

interface AccumulatorSnapshot extends Snapshot {
  button: string; // button pressed
  score: number; // score
  timeSinceLastButton: number; // time since last button press
  remainingTime: number; // time remaining
  activations: {
    hand: 0 | 1; // hand that activated the button
    pos: [[x: number, y: number, z: number]]; // position of the hand over time (polling rate per/s)
    accuracy: number; // accuracy of the hand
    positions: [{ x: number; y: number; z: number }]; // position of the hand
    idealDistances: number[]; // ideal distances of the hand
    calculatedDistances: number[]; // calculated distances of the hand
  };
}

interface AccumulatorTest extends Test {
  summary: {
    pollingRate: number;
    totalScorE: number;
    avgTimeSinceLastButton: number;
    avgAccuracy: number;
    btnSequence: string | number;
  };
}

interface SequenceSnapshot extends Snapshot {
  sequenceLength: number; // length of the sequence
  sequence: [string]; // sequence of buttons pressed
  success: boolean; // whether the sequence was successful
  duration: number; // duration took to complete the sequence
  timeStarted: number; // time the sequence started
  timeFinished: number; // time the sequence finished
}
