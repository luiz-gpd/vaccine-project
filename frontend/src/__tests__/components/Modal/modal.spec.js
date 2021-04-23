import Modal from '../../../components/Modal'
import React from 'react'
import { render } from "@testing-library/react"

describe("Modal component", () => {
    it("renders", () => {
        const { asFragment } = render(<Modal/>)

        expect(asFragment()).toMatchSnapshot();
    });
});