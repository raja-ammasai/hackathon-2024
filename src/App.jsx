import React, { useState } from 'react';
import FileLoader from './Components/FileLoader';
import DataTable from './Components/DataTable';
import './index.css';

export default function App() {
    const [tableData, setTableData] = useState([]);

    const handleSetFileData = (fileData, entityName) => {
        console.log("### handleSetFileData fn: !!! ->", fileData, entityName);
        if (fileData?.length) {
            const data = {};
            fileData?.forEach(item => {
                const { esgIndicators, primaryDetails, secondaryDetails } = item || {};
                data[esgIndicators] = { primaryDetails, secondaryDetails };
            })
            data["Company"] = { "primaryDetails": entityName }
            const parsedData = [];
            parsedData.push(...tableData);
            parsedData.push(data);
            console.log("### parsed data inside fn: !!!", {parsedData});
            setTableData(parsedData);
        }
    };

    return (
        <>
            <div className='hk-header'>
                <span> Hackathon 2024</span>
            </div>
            <section className='hk-section'>
                <FileLoader handleSetFileData={handleSetFileData} />
            </section>
            <section className='hk-table-wrapper'>
                <DataTable tableData={tableData} />
            </section>

        </>
    );
};
