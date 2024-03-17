import React, { useState } from 'react';
import FileLoader from './Components/FileLoader';
import DataTable from './Components/DataTable';
import './index.css';

export default function App() {
    const [tableData, setTableData] = useState([]);
    let [loading, setLoading] = useState(false);

    const handleSetLoading = (value) => {
        setLoading(value);
    };

    const handleLoaderClick = (event) => {
        event.preventDefault();
    };

    const handleSetFileData = (fileData, entityName) => {
        const response = fileData?.esgResponse?.benchmarkDetails || [];
        if (response?.length) {
            console.log({ response })
            const data = {};
            response?.forEach(item => {
                const { esgIndicators, primaryDetails, secondaryDetails } = item || {};
                data[esgIndicators] = { primaryDetails, secondaryDetails };
            })
            data["Company"] = { "primaryDetails": entityName }
            const parsedData = [];
            parsedData.push(...tableData);
            parsedData.push(data);
            setTableData(parsedData);
        }
    };

    return (
        <>
            {loading && <div className='hk-loader' onClick={handleLoaderClick}><div className="ring">Loading
                <span></span>
            </div></div>}
            <div className='hk-header'>
                <span> Hackathon 2024</span>
            </div>
            <section className='hk-section'>
                <FileLoader handleSetFileData={handleSetFileData} handleSetLoading={handleSetLoading} />
            </section>
            <section className='hk-table-wrapper'>
                <DataTable tableData={tableData} />
            </section>

        </>
    );
};
