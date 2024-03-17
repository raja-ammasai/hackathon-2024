
import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import "./DataTable.css";

function DataTable(props) {
    const { tableData } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(tableData);
    }, [tableData]);


    const renderCellContent = ({ cell: { value } }) => {
        const { primaryDetails, secondaryDetails } = value || {};
        let PrimeDetails = () => { return  primaryDetails == "Y" ? <div className="green-tick">&#10004;</div> : primaryDetails == "N" ? <div className="red-dot">&#128308;</div> : <div className="">{primaryDetails}</div> }
        let SecondaryDetails = () => { return  secondaryDetails == "Y"  ? <div className="green-tick">&#10004;</div> : secondaryDetails == "N" ? <div className="red-dot">&#128308;</div> : <div className="">{secondaryDetails}</div> }
        return (<><PrimeDetails /><SecondaryDetails /></>)
    };

    const columns = useMemo(
        () => [
            {
                Header: "Company",
                accessor: "Company",
                Cell: ({ cell: { value } }) => (<><div className="">{value.primaryDetails}</div><div className="">{value.secondaryDetails}</div></>)
            },
            {
                Header: "ESC Score",
                columns: [
                    {
                        Header: "MSCI Sustainalytics",
                        accessor: "MSCISustainalytics",
                        Cell: renderCellContent
                    },
                ],
            },
            {
                Header: "Environmental",
                columns: [
                    {
                        Header: "Net Zero Target",
                        accessor: "NetZeroTarget",
                        Cell: renderCellContent
                    },
                    {
                        Header: "Interim Emissions Reduction Target",
                        accessor: "InterimEmissionsReductionTarget",
                        Cell: renderCellContent
                    },
                    {
                        Header: "Renewable Electricity Target",
                        accessor: "RenewableElectricityTarget",
                        Cell: renderCellContent
                    },
                    {
                        Header: "Circularity Strategy & Targets",
                        accessor: "CircularityStratergy",
                        Cell: renderCellContent
                    },
                ],
            },
            {
                Header: "Social",
                columns: [
                    {
                        Header: "Diversity, Equity, and Inclusion Target",
                        accessor: "DE&ITarget",
                        Cell: renderCellContent
                    }
                ],
            },
            {
                Header: "Governance",
                columns: [
                    {
                        Header: "Employee Health & Safety Audits",
                        accessor: "HealthAndSafetyTarget",
                        Cell: renderCellContent
                    },
                    {
                        Header: "Supply Chain Audits",
                        accessor: "SuppluAuditTarget",
                        Cell: renderCellContent
                    }
                ],
            },
            {
                Header: "Reporting",
                columns: [
                    {
                        Header: "SBTi",
                        accessor: "SBTi",
                        Cell: renderCellContent
                    },
                    {
                        Header: "CDP",
                        accessor: "CDP",
                        Cell: renderCellContent
                    },
                    {
                        Header: "GRI",
                        accessor: "GRI",
                        Cell: renderCellContent
                    },
                    {
                        Header: "SASB",
                        accessor: "SASB",
                        Cell: renderCellContent
                    },
                    {
                        Header: "TCFD",
                        accessor: "TCFD",
                        Cell: renderCellContent
                    },
                    {
                        Header: "Assurance",
                        accessor: "Assurance",
                        Cell: renderCellContent
                    }
                ],
            },
        ],
        []
    );

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({
        columns,
        data
    });


    const getColumnClassName = (column) => {
        const obj = column.parent || (column.headers && column.headers[0]) || column;
        const { Header, parent = {} } = obj;
        const header = parent.Header || Header;
        return header.replace(" ", "");
    };

      console.log("### DATA TABLE COMPONENT !!! -> ",{tableData})
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups?.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup?.headers?.map((column) => {
                            const color = getColumnClassName(column);
                            return (
                                <th {...column.getHeaderProps()} className={"column-header-" + color}>{column.render("Header")}</th>
                            )
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows?.map((row, i) => {
                    prepareRow(row);
                    return (<>
                        <tr {...row.getRowProps()} className="column-row">
                            {row?.cells?.map(cell => {
                                return <td {...cell.getCellProps()} className="column-cell">{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    </>
                    );
                })}
            </tbody>
        </table>
    );
}
export default DataTable;