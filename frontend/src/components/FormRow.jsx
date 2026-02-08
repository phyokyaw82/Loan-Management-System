// src/components/FormRow.jsx
import React from "react";

/**
 * FormRow
 * A reusable form row for labels + inputs/selects/textareas.
 *
 * Props:
 * - label: string (label text)
 * - children: React element (input, select, textarea)
 * - helperText: string (optional helper text below input)
 * - className: additional class for container (optional)
 */
const FormRow = ({ label, children, helperText, className = "" }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="mb-1 font-medium">{label}</label>}
            {children}
            {helperText && <small className="text-gray-500 mt-1">{helperText}</small>}
        </div>
    );
};

export default FormRow;
