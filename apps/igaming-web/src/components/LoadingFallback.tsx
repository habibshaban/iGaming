import Spinner from "./Spinner";

interface LoadingFallbackProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingFallback = ({ message = "Loading...", fullScreen = false }: LoadingFallbackProps) => {
  return (
    <div 
      className={`loading-fallback ${fullScreen ? "loading-fallback--full-screen" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loading-fallback__content">
        <Spinner />
        <p className="loading-fallback__message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
