import React from 'react';

const FALLBACK_ROW_KEYS = ['id', 'pk', '_id', 'uuid', 'slug'];

const resolveRowKey = (row, index) => {
  if (row && typeof row === 'object') {
    for (const key of FALLBACK_ROW_KEYS) {
      if (row[key]) {
        return String(row[key]);
      }
    }
  }
  return `row-${index}`;
};

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return '—';
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : '—';
  }
  if (typeof value === 'object') {
    return Object.keys(value).length > 0 ? JSON.stringify(value) : '—';
  }
  return value;
};

const ResourceTable = ({
  title,
  subtitle,
  columns,
  data,
  loading,
  error,
  emptyMessage,
  rowKeyGetter,
}) => {
  const getRowKey = rowKeyGetter || resolveRowKey;

  return (
    <section className="mb-5">
      <div className="card resource-card shadow-sm border-0">
        <div className="card-header resource-card__header">
          <div>
            <h1 className="h4 mb-1 text-white">{title}</h1>
            {subtitle && <p className="resource-card__subtitle mb-0">{subtitle}</p>}
          </div>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              {error}
            </div>
          )}
          {loading && (
            <div className="d-flex align-items-center text-secondary">
              <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              <span>Loading...</span>
            </div>
          )}
          {!loading && !error && data.length === 0 && (
            <div className="alert alert-info mb-0" role="alert">
              {emptyMessage}
            </div>
          )}
          {!loading && !error && data.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    {columns.map((column) => (
                      <th
                        scope="col"
                        key={column.key}
                        className={column.headerClassName || ''}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => {
                    const rowKey = getRowKey(row, rowIndex);
                    return (
                      <tr key={rowKey}>
                        {columns.map((column) => {
                          const content = column.render
                            ? column.render(row, rowIndex)
                            : formatValue(column.key ? row[column.key] : undefined);
                          if (column.isRowHeader) {
                            return (
                              <th
                                scope="row"
                                key={column.key}
                                className={column.className || 'fw-semibold'}
                              >
                                {content}
                              </th>
                            );
                          }
                          return (
                            <td key={column.key} className={column.className || ''}>
                              {content}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourceTable;
