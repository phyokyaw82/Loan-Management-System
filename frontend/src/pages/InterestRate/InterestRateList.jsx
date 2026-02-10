import { useEffect, useState } from "react";
import { getInterestRateById, getInterestRates, deleteInterestRate } from "../../api/interestRateApi";
import PageToolbar from "../../components/PageToolbar";
import DataTable from "../../components/DataTable";

const InterestRateList = () => {
    const [interestRates, setInterestRates] = useState([]);

    const fetchInterestRates = async () => {
        const data = await getInterestRates();
        setInterestRates(data);
    };

    const handleDelete = async (interestRate) => {
        if (window.confirm(`Are you sure you want to delete ${interestRate.rate}?`)) {
            await deleteInterestRate(interestRate._id);
            fetchInterestRates();
        }
    };

    useEffect(() => {
        fetchInterestRates();
    }, []);

    // Define columns
    const columns = [
        { key: "rate", label: "Interest Rate" },
    ];

    // Define actions
    const actions = [
        {
            type: "link",
            label: "Edit",
            to: (b) => `/interestRates/edit/${b._id}`,
            className: "text-blue-500",
        },
        {
            type: "button",
            label: "Delete",
            onClick: handleDelete,
            className: "text-red-500",
        },
    ];

    return (
        <>
            <PageToolbar
                title="Interest Rates"
                buttonLabel="Add Interest Rate"
                buttonLink="/interestRates/new"
            />

            <DataTable columns={columns} data={interestRates} actions={actions} />
        </>
    );
};

export default InterestRateList;
