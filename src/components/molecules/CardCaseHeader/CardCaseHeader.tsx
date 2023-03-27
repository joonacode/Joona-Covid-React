import CountUp from 'react-countup';

type Props = {
  children: React.ReactNode,
  title: string,
  total: number
  isCase?: boolean
}

function CardCaseHeader({
  children, title, total, isCase
}: Props) {
  return (
    <div
      className={`col-lg-6 ${isCase ? ' col-md-12' : ' col-md-6'} d-flex mb-4`}
    >
      <span className="icon-header mr-3">{children}</span>
      <div className="d-flex flex-column text-white">
        <p className="mb-0">{title}</p>
        <p className="mb-0 font-weight-bold font-20">
          <CountUp end={total} separator="." />
        </p>
      </div>
    </div>
  );
}

export default CardCaseHeader;
CardCaseHeader.defaultProps = {
  isCase: false
};
