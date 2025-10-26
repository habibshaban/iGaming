import EmptyState from "./EmptyState";

interface FilterItem {
  id: number | string;
  name: string;
}

interface FilterSectionProps<T extends FilterItem> {
  title: string;
  items: T[];
  selectedItems: Set<T["id"]>;
  onToggle: (id: T["id"]) => void;
}

function FilterSection<T extends FilterItem>({
  title,
  items,
  selectedItems,
  onToggle,
}: FilterSectionProps<T>) {
  return (
    <div className="game-filter__section">
      <h2 className="game-filter__title">{title}</h2>
      <div className="game-filter__items" role="group" aria-label={title}>
        {!items.length ? (
          <EmptyState message="No items found" />
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              aria-pressed={selectedItems.has(item.id)}
              className={`game-filter__item ${
                selectedItems.has(item.id) ? "game-filter__item--active" : ""
              }`}
              onClick={() => onToggle(item.id)}
            >
              {item.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

FilterSection.displayName = "FilterSection";

export default FilterSection;
