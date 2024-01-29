import React, { useMemo, useState } from "react";
import { connectTsApi } from "typizator-client";
import { simpleApiS } from "./shared/api-definition";
import { CdkLibraryExampleStack } from "./shared/cdk-exports.json";

const App = () => {
    const [frozen, setFrozen] = useState(false);
    const [callLabel, setCallLabel] = useState("Call");
    const testApi = useMemo(() =>
        connectTsApi(
            simpleApiS.metadata,
            CdkLibraryExampleStack.ExampleApiURL,
            () => { setFrozen(true); setCallLabel("Loading...") },
            () => { setFrozen(false); setCallLabel("Call") }
        ), []
    );

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
        <>
            <div><select data-testid="functionSelect" value={fn} onChange={e => setFn(e.target.value)}>
                <option value={"miaou"}>Miaou</option>
                <option value={"helloWorld"}>Hello world</option>
                <option value={"increment"}>Increment</option>
            </select></div>
            <div><button data-testid="callbutton" onClick={e => callApi()} disabled={frozen}>{callLabel}</button></div>
            <div data-testid="result">{result}</div>
            <div data-testid="errDisplay" style={{ color: "#f00" }}>{err}</div>
        </>
    );
}

export default App;