import { ThreeCircles } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

function LoadingSpinner() {
  const { loading = null } = useSelector((states) => states);

  if (loading == null) return null;
  const classNameValue = loading ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/20' : '';
  return (
    <div className={classNameValue}>
      <ThreeCircles
        visible={loading}
        height="100"
        width="100"
        color="red"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default LoadingSpinner;