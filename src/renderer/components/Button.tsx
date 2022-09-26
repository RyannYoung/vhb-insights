interface Props {
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
  className?: string;
  variant?: 'sml' | 'normal';
}

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} ${
        props.variant === 'sml' && 'btn-sm'
      } btn flex gap-2`}
    >
      {props.icon && <span className="text-xl">{props.icon}</span>}
      <span>{props.title}</span>
    </button>
  );
};

export default Button;
