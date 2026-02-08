import React from "react";
import { Link } from "react-router-dom";

const DataTable = ({ columns, data, actions }) => {
    const actionColumnWidth = "150px"; // adjust width as needed

    return (
        <table className="min-w-full bg-white border">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key} className="py-2 px-4 border text-left">
                            {col.label}
                        </th>
                    ))}
                    {actions && actions.length > 0 && (
                        <th
                            className="py-2 px-4 border text-left"
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
                        <tr key={row._id}>
                            {columns.map((col) => (
                                <td key={col.key} className="py-2 px-4 border">
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}

                            {actions && actions.length > 0 && (
                                <td
                                    className="py-2 px-4 border"
                                    style={{ width: actionColumnWidth }}
                                >
                                    {actions.map((action, idx) => {
                                        if (action.type === "link")
                                            return (
                                                <Link
                                                    key={idx}
                                                    to={action.to(row)}
                                                    className={`mr-2 ${action.className || "text-blue-500"}`}
                                                >
                                                    {action.label}
                                                </Link>
                                            );
                                        if (action.type === "button")
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => action.onClick(row)}
                                                    className={`${action.className || "text-red-500"} mr-2`}
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
