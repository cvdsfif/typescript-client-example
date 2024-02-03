import React, { useState } from 'react';
import { ConnectedPageProps } from './../lib/connected-page-props';

export const Simple = (props: ConnectedPageProps) => {
    const testApi = props.api;

    const [result, setResult] = useState("////");
    const [fn, setFn] = useState("miaou");
    const [err, setErr] = useState("");

    const asyncCall = async (fnName: string) => {
        try {
            switch (fnName) {
                case "miaou": setResult(await testApi.meow()); break;
                case "helloWorld": setResult(await testApi.helloWorld("anybody", 100n)); break;
                case "increment":
                    const received = await testApi.increment({ id: 1n, name: "?" });
                    setResult(`id:${received.id}, name:${received.name}`);
                    break;
            }
            setErr("");
        } catch (e: any) {
            setErr(e.message);
            setResult("");
        }
    }

    const callApi = () => {
        asyncCall(fn);
    }

    return (
        <div>
            <div><select data-testid="functionSelect" value={fn} onChange={e => setFn(e.target.value)}>
                <option value={"miaou"}>Miaou</option>
                <option value={"helloWorld"}>Hello world</option>
                <option value={"increment"}>Increment</option>
            </select></div>
            <div><button data-testid="callbutton" onClick={e => callApi()}>Call</button></div>
            <div data-testid="result">{result}</div>
            <div data-testid="errDisplay" style={{ color: "#f00" }}>{err}</div>
        </div>
    );
}