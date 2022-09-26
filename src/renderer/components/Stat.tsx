interface Stats {
  heading?: string;
  value?: string | number;
  description?: string;
  text?: 'primary' | 'secondary';
  className?: string;
  figure?: JSX.Element;
}

interface Props extends Stats {
  stats?: Stats[];
}

const Stat = ({ description, heading, stats, value, className }: Props) => {
  return (
    <div className={`${className} stats shadow`}>
      {heading && (
        <StatItem description={description} heading={heading} value={value} />
      )}

      {stats &&
        stats.map((item, index) => (
          <StatItem
            key={index}
            description={item.description}
            heading={item.heading}
            value={item.value}
          />
        ))}
    </div>
  );
};

export const StatItem = ({ description, heading, value, figure }: Stats) => {
  return (
    <div className="stat h-full">
      <div className="stat-figure text-3xl">{figure}</div>
      <div className="stat-title">{heading}</div>
      <div className="stat-value">
        {value == 'NaN' || value == 'Infinity' || value == '-Infinity'
          ? 0
          : value}
      </div>
      <div className="stat-desc">{description}</div>
    </div>
  );
};

export default Stat;
