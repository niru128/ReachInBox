import React from "react";

export default function EmailTable({ columns, data, loading }) {
  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!data.length) {
    return <p className="text-gray-500">No emails found</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="text-left px-4 py-3 font-medium text-gray-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b last:border-none">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
