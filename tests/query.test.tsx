import React from 'react';
import "@testing-library/jest-dom";
import { fireEvent, getByTestId, queryByTestId, render, waitFor } from "@testing-library/react";
import { Query } from "../src/routes/query";
import { connectTsApi } from 'typizator-client';
import { simpleApiS } from '../src/shared/api-definition';
import { CdkLibraryExampleStack } from "./../src/shared/cdk-exports.json";

describe("Testing the database query page", () => {
    const fetchMock: jest.Mock = global.fetch = jest.fn()
    let ç: HTMLElement

    const freezer = {
        freeze: () => { },
        unfreeze: () => { },
    }
    const testApi = connectTsApi(
        simpleApiS.metadata,
        CdkLibraryExampleStack.ExampleApiURL,
        () => { freezer.freeze() },
        () => { freezer.unfreeze() }
    )

    beforeEach(() => {
        const { container } = render(<Query api={testApi} freezer={freezer} />)
        ç = container
        fetchMock.mockClear()
    })

    test("Should show query results when the appropriate button is clicked", async () => {
        fetchMock.mockImplementation(() => Promise.resolve({
            json: (async () => Promise.resolve({ data: `{\\"fields\\":[{\\"name\\":\\"one\\"}],\\"records\\":[[1]]}` }))
        }));
        await fireEvent.change(getByTestId(ç, "queryText"), { target: { value: "SELECT 1 AS one" } })
        await fireEvent.click(getByTestId(ç, "queryButton"))
        await waitFor(() => expect(getByTestId(ç, "cell-0")).toHaveTextContent("1"))
        expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/query/), expect.anything())

    })

    test("Query button should toggle states while querying", async () => {
        // Any query response would be Ok
        fetchMock.mockImplementation(() => Promise.resolve({
            json: (async () => Promise.resolve({ errorMessage: "Miss take" }))
        }));
        await fireEvent.click(getByTestId(ç, "queryButton"))
        await waitFor(() => expect(getByTestId(ç, "queryButton")).toHaveTextContent(`Loading...`))
        await waitFor(() => expect(getByTestId(ç, "queryButton")).toHaveTextContent(`Query`))
    })

    test("Should show the errors when they are happening", async () => {
        fetchMock.mockImplementation(() => Promise.resolve({
            json: (async () => Promise.resolve({ errorMessage: "Miss take" }))
        }));
        await fireEvent.click(getByTestId(ç, "queryButton"))
        await waitFor(() => expect(getByTestId(ç, "queryError")).toHaveTextContent(`Server error: Miss take`))
    })

    test("Should not show anything if an empty result is returned", async () => {
        fetchMock.mockImplementation(() => Promise.resolve({
            json: (async () => Promise.resolve({ data: `{\\"fields\\":[],\\"records\\":[]}` }))
        }));
        await fireEvent.click(getByTestId(ç, "queryButton"))
        await waitFor(() => expect(queryByTestId(ç, "cell-0")).not.toBeInTheDocument())
    })
})