type Props = {
  size?: 'sm' | 'md' | 'lg'
}

function Spinner({ size }: Props) {
  return (
    <div className="text-center">
      <div
        className={`spinner-border spinner-border-${size || 'sm'}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
Spinner.defaultProps = {
  size: 'sm'
};
