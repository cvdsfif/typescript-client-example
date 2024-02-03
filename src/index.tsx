import React, { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./error-page";
import { Simple } from "./routes/simple";
import { Query } from "./routes/query";
import { connectTsApi } from "typizator-client";
import { CdkLibraryExampleStack } from "./shared/cdk-exports.json";
import { simpleApiS } from "./shared/api-definition";

export const App = () => {
    const freezer = {
        freeze: () => { },
        unfreeze: () => { },
    }

    const testApi = useMemo(() =>
        connectTsApi(
            simpleApiS.metadata,
            CdkLibraryExampleStack.ExampleApiURL,
            () => { freezer.freeze() },
            () => { freezer.unfreeze() }
        ), []
    )

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Simple api={testApi} freezer={freezer} />,
            errorElement: <ErrorPage />
        },
        {
            path: "/simple",
            element: <Simple api={testApi} freezer={freezer} />
        },
        {
            path: "/query",
            element: <Query api={testApi} freezer={freezer} />
        }
    ])

    return (
        <>
            <nav>
                <table border={1}>
                    <tbody>
                        <tr>
                            <td><a href="/simple">Simple query</a></td>
                            <td><a href="/query" data-testid="queryLink">Query</a></td>
                        </tr>
                    </tbody>
                </table>
                <div>&nbsp;</div>
            </nav>
            <RouterProvider router={router} />
        </>
    );
}

