import React, { useState } from 'react';
import { ConnectedPageProps } from './../lib/connected-page-props';

export const Query = (props: ConnectedPageProps) => {
    const [queryText, setQueryText] = useState("");
    const [frozen, setFrozen] = useState(false);
    const [queryLabel, setQueryLabel] = useState("Query");
    const [errorMessage, setErrorMessage] = useState("");
    const [header, setHeader] = useState([] as string[]);
    const [rows, setRows] = useState([] as string[][]);

    props.freezer.freeze = () => { setFrozen(true); setQueryLabel("Loading...") }
    props.freezer.unfreeze = () => { setFrozen(false); setQueryLabel("Query") }
    const testApi = props.api;

    const query = async (request: string) => {
        try {
            const ret = await testApi.query(request);
            const queryResult = JSON.parse(JSON.parse(`"${ret}"`));
            setHeader(queryResult.fields.map((f: any) => f.name));
            setRows(queryResult.records);
            setErrorMessage("");
        } catch (e: any) {
            setErrorMessage(e.message);
            setHeader([]);
        }
    }

    const QueryTable = () => {
        if (header.length > 0)
            return (
                <>
                    <div>&nbsp;</div>
                    <table border={1}>
                        <thead>
                            <tr data-testid="header-row">{header.map((h, idx) => (<th key={`head-${idx}`}>{h}</th>))}</tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => <tr key={`row-${idx}`}>
                                {row.map((field, idxf) => <td key={`f-${idxf}`} data-testid={`cell-${idxf}`}>{field}</td>)}
                            </tr>)}
                        </tbody>
                    </table>
                </>
            )
        return <></>
    }

    return (
        <>
            <div>
                <textarea
                    value={queryText}
                    onChange={e => setQueryText(e.target.value)}
                    disabled={frozen}
                    data-testid="queryText"
                    cols={60} rows={5} />
            </div>
            <div>
                <button
                    onClick={e => query(queryText)}
                    disabled={frozen}
                    data-testid="queryButton">{queryLabel}</button>
            </div>
            <div>
                <div style={{ color: "#f00" }} data-testid="queryError">{errorMessage}</div>
                <QueryTable />
            </div>
        </>
    )
}