import { render, getByTestId, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "../src/index";
import React from "react";

describe("Testing page calling typizator-based server library", () => {
    const fetchMock: jest.Mock = global.fetch = jest.fn();
    let ç: HTMLElement;

    beforeEach(() => {
        const { container } = render(<App />);
        ç = container;
        fetchMock.mockClear();
    });

    test("Should select the first function by default", async () => {
        const mainSelect = getByTestId(ç, "functionSelect");
        expect(mainSelect).toHaveValue("miaou");
    });

    test("Should make a call when the call button is clicked", async () => {
        fetchMock.mockImplementation(() => Promise.resolve({ json: (async () => Promise.resolve({ data: `"miaou"` })) }));
        await fireEvent.click(getByTestId(ç, "callbutton"));
        expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/meow/), expect.anything());
        await waitFor(() => expect(getByTestId(ç, "result")).toHaveTextContent("miaou"));
    });

    test("Should make a right call when another function is selected", async () => {
        fetchMock.mockImplementation(() => Promise.resolve({ json: (async () => Promise.resolve({ data: `"Hello returned"` })) }));
        await fireEvent.change(getByTestId(ç, "functionSelect"), { target: { value: "helloWorld" } })
        await fireEvent.click(getByTestId(ç, "callbutton"));
        expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/hello-world/), expect.anything());
        await waitFor(() => expect(getByTestId(ç, "result")).toHaveTextContent("Hello returned"));
    });

    test("Should make a right call when another function with structured parameters is selected", async () => {
        fetchMock.mockImplementation(() => Promise.resolve({ json: (async () => Promise.resolve({ data: `{"id":1,"name":"c"}` })) }));
        await fireEvent.change(getByTestId(ç, "functionSelect"), { target: { value: "increment" } })
        await fireEvent.click(getByTestId(ç, "callbutton"));
        expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/increment/), expect.anything());
        await waitFor(() => expect(getByTestId(ç, "result")).toHaveTextContent(`id:1, name:c`));
    });

    test("Should display an error if a server function call fails", async () => {
        fetchMock.mockImplementation(() => Promise.resolve({ json: (async () => Promise.resolve({ data: `{Wrong json}` })) }));
        await fireEvent.change(getByTestId(ç, "functionSelect"), { target: { value: "increment" } })
        await fireEvent.click(getByTestId(ç, "callbutton"));
        expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/increment/), expect.anything());
        await waitFor(() => expect(getByTestId(ç, "result")).toHaveTextContent(``));
        await waitFor(() => expect(getByTestId(ç, "errDisplay")).toHaveTextContent(`Bad string`));
    });
});