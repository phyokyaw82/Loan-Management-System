import React from "react";

const FormRow = ({ label, children, helperText, className = "" }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && (
                <label className="mb-1 text-sm font-normal text-gray-700">
                    {label}
                </label>
            )}
            {children}
            {helperText && <small className="text-gray-500 mt-1">{helperText}</small>}
        </div>
    );
};

export default FormRow;
