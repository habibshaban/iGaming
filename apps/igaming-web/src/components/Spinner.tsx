const Spinner = () => {
  return (
    <div className="lds-spinner">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  );
};

export default Spinner;
