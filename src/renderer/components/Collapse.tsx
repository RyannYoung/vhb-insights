interface Props {
  className?: string;
  title?: string;
  content?: string[] | JSX.Element[];
}

const Collapse = ({
  className,
  content = ['tabindex="0" attribute is necessary to make the div focusable'],
  title = 'Focus me to see content',
}: Props) => {
  return (
    <div
      tabIndex={0}
      className={`${className} collapse collapse-arrow border border-base-300 max-w-sm bg-base-100 rounded-box`}
    >
      <div className="collapse-title font-medium">{title}</div>
      <div className="collapse-content">
        {!content && <p>No files uploaded!</p>}
        {content.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Collapse;
