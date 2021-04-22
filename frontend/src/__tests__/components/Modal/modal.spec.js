import Modal from '../../../components/Modal';
import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react";

describe("Modal component", () => {
    it("renders", () => {
        const { asFragment } = render(<Modal/>)

        expect(asFragment()).toMatchSnapshot();
    });

    it("Should change when writing on the input", () => {

        const myInitialState = true       
        React.useState = jest.fn().mockReturnValue([myInitialState, {}])

        render(<Modal/>)

        // const {change} = renderModalWrapper;

        // expect(change).not.toBeNull();

        // fireEvent.click(buttonClose);

        // fireEvent.change(change, { target: { value: "test" } })
        // expect(change.value).toBe("test")

        // const btnNode = await waitFor(() => queryByTestId('formButtonSave'))
        // fireEvent.click(btnNode);

        // const btnNode = queryByTestId("formButtonSave");

    });
});