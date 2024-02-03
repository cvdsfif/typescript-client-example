import React from 'react'
import { getByTestId, render, waitFor } from "@testing-library/react"
import { ErrorPage } from "../src/error-page"
import "@testing-library/jest-dom"
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { App } from '../src'
import { Throwing } from './test-stuff/throwing-page'

describe("Testing the Not Found page", () => {
    test("Should show an empty error message if error not present", async () => {
        const router = createMemoryRouter(
            [{ path: "/", element: <App />, errorElement: <ErrorPage /> }],
            { initialEntries: ["/error"], initialIndex: 0 }
        );
        const { container } = render(<RouterProvider router={router} />)
        const ç = container
        const errorMessage = getByTestId(ç, "errorMessage");
        await waitFor(() => expect(errorMessage.textContent?.trim()).toMatch(/Not Found/))
    })
})

describe("Testing the Not Found page", () => {
    test("Should show an empty error message if error not present", async () => {
        const router = createMemoryRouter(
            [{ path: "/", element: <Throwing />, errorElement: <ErrorPage /> }],
            { initialEntries: ["/"], initialIndex: 0 }
        );
        const { container } = render(<RouterProvider router={router} />)
        const ç = container
        const errorMessage = getByTestId(ç, "errorMessage");
        await waitFor(() => expect(errorMessage.textContent?.trim()).toMatch(/Breaking page/))
    })
})