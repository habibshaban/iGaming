interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "No items found" }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <p className="empty-state__message">{message}</p>
    </div>
  );
};

export default EmptyState;
