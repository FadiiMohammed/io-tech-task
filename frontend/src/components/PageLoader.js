import { useSelector } from 'react-redux';

const PageLoader = () => {
  const { isLoading } = useSelector((state) => state.loader);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      style={{
        background: 'linear-gradient(271.47deg, rgba(0, 0, 0, 0.15) 28%)',
      }}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default PageLoader;
