import { memo } from "react";

interface ColumnSelectorProps {
  selectedColumn: number;
  onSelectColumn: (column: number) => void;
}

const ColumnSelector = memo(({ selectedColumn, onSelectColumn }: ColumnSelectorProps) => {
  const columns = [2, 3, 4];

  const getProgressWidth = () => {
    const selectedIndex = columns.indexOf(selectedColumn);
    if (selectedIndex === 0) return "0%";
    return `calc(${(selectedIndex / (columns.length - 1)) * 100}% - 4px)`;
  };

  return (
    <div className="column-selector" role="group" aria-labelledby="column-selector-label">
      <p id="column-selector-label" className="column-selector__label">
        Columns
      </p>
      <div className="column-selector__items">
        <div
          className="column-selector__line"
          style={{ width: getProgressWidth() }}
          aria-hidden="true"
        />
        {columns.map((column) => (
          <div key={column} className="column-selector__item-wrapper">
            <button
              type="button"
              className={`column-selector__item ${
                selectedColumn === column ? "column-selector__item--active" : ""
              }`}
              onClick={() => onSelectColumn(column)}
              aria-label={`${column} columns`}
              aria-pressed={selectedColumn === column}
            >
              {column}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

ColumnSelector.displayName = "ColumnSelector";

export default ColumnSelector;
