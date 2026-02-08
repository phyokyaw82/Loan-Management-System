import React from "react";
import { Link } from "react-router-dom";

const DataTable = ({ columns, data, actions }) => {
    const actionColumnWidth = "150px"; // adjust width as needed

    return (
        <table className="min-w-full bg-white border rounded-sm shadow-sm">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={col.key}
                            className="py-2 px-4 border text-left bg-gray-100"
                        >
                            {col.label}
                        </th>
                    ))}
                    {actions && actions.length > 0 && (
                        <th
                            className="py-2 px-4 border text-left bg-gray-100"
                            style={{ width: actionColumnWidth }}
                        >
                            Actions
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((row) => (
                        <tr key={row._id} className="hover:bg-gray-50">
                            {columns.map((col) => (
                                <td key={col.key} className="py-2 px-4 border">
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}

                            {actions && actions.length > 0 && (
                                <td
                                    className="py-2 px-4 border flex space-x-2"
                                    style={{ width: actionColumnWidth }}
                                >
                                    {actions.map((action, idx) => {
                                        if (action.type === "link")
                                            return (
                                                <Link
                                                    key={idx}
                                                    to={action.to(row)}
                                                    className={`px-3 py-1 rounded text-blue-500 hover:text-blue-700 transition ${action.className || ""
                                                        }`}
                                                >
                                                    {action.label}
                                                </Link>
                                            );
                                        if (action.type === "button")
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => action.onClick(row)}
                                                    className={`px-3 py-1 rounded text-gray-700 hover:text-gray-900 transition ${action.className || ""
                                                        }`}
                                                >
                                                    {action.label}
                                                </button>
                                            );
                                        return null;
                                    })}
                                </td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={columns.length + (actions?.length || 0)}
                            className="py-2 px-4 text-center text-gray-500"
                        >
                            No data found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default DataTable;
