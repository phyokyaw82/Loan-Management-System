import { useEffect, useState } from "react";

/**
 * Extract original filename by removing all system prefixes
 * Example:
 * 1770549265925-119596985-myfile.pdf → myfile.pdf
 */
export const getOriginalFileName = (documentUrl = "") => {
    const fileName = documentUrl.split(/[\\/]/).pop();
    if (!fileName) return "";

    // remove all leading "number-" prefixes
    return fileName.replace(/^(\d+-)+/, "");
};


const FileUpload = ({ onFileSelect, existingFileUrl }) => {
    const [file, setFile] = useState(null);
    const [showInput, setShowInput] = useState(true);
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        if (existingFileUrl) {
            setDisplayName(getOriginalFileName(existingFileUrl));
            setShowInput(false);
        } else {
            setDisplayName("");
            setShowInput(true);
        }
    }, [existingFileUrl]);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setFile(selected);
        setDisplayName(selected.name);
        setShowInput(false);
        onFileSelect(selected);
    };

    const handleRemove = () => {
        setFile(null);
        setDisplayName("");
        setShowInput(true);
        onFileSelect(null);
    };

    return (
        <div className="flex flex-col space-y-2">
            {showInput ? (
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />
            ) : (
                <div className="flex items-center gap-3">
                    <span className="text-gray-700">
                        {displayName}
                    </span>

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="text-red-500"
                    >
                        Remove
                    </button>

                    {!file && existingFileUrl && (
                        <a
                            href={`http://localhost:5000/${existingFileUrl.replace(/\\/g, "/")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            View
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
