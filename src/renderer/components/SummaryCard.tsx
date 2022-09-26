interface Props {
  title: string;
  display?: any;
}

const SummaryCard = ({ title = 'title', display = 'show' }: Props) => {
  return (
    <div className="p-4 max-w-3xl aspect-square bg-white rounded shadow flex flex-col items-center justify-center gap-4">
      <div className="text-4xl font-bold">{display}</div>
      <span className="uppercase text-gray-600 text-sm">{title}</span>
    </div>
  );
};

export default SummaryCard;
