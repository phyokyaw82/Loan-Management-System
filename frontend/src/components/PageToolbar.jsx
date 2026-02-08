import { Link } from "react-router-dom";

const PageToolbar = ({ title, buttonLabel, buttonLink }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
                {title}
            </h1>

            {buttonLabel && buttonLink && (
                <Link
                    to={buttonLink}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    {buttonLabel}
                </Link>
            )}
        </div>
    );
};

export default PageToolbar;
