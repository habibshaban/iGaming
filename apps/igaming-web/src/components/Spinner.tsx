const Spinner = () => {
  return (
    <div className="lds-spinner" role="status" aria-live="polite" aria-label="Loading">
      <span className="sr-only">Loading...</span>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
};

export default Spinner;
