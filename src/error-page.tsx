import React from 'react';
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error: any = useRouteError();
    return (
        <div id="error-page">
            <h1>Oops...</h1>
            <div>Error on your page</div>
            <p>
                <i data-testid="errorMessage">{error.statusText ?? error.message}</i>
            </p>
        </div>
    )
}
