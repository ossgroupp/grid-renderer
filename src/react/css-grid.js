import React from 'react';
import PropTypes from 'prop-types';

const CSSGrid = ({
  cellComponent,
  cells,
  children,
  totalColSpan = 4,
  style,
  ...props
}) => {
  const CellComponent = cellComponent;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${totalColSpan}, 1fr)`,
        ...style,
      }}
      className="osspim-grid osspim-grid--css-grid"
      {...props}
    >
      {children
        ? children({ cells, totalColSpan })
        : cells.map((cell, i) => (
            <div
              key={`cell-${i}`}
              className="osspim-grid__cell"
              style={{
                gridColumn: `span ${cell.layout.colspan}`,
                gridRow: `span ${cell.layout.rowspan}`,
              }}
            >
              <CellComponent cell={cell} totalColSpan={totalColSpan} />
            </div>
          ))}
    </div>
  );
};

CSSGrid.propTypes = {
  cellComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func,
  totalColSpan: PropTypes.number,
};

export default CSSGrid;
