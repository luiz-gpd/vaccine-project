import React from 'react'
import Home from "../../../pages/Home"
import { render } from "@testing-library/react"

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Home Page", () => {

    it("renders", () => {
        const { asFragment } = render(<Home/>);

        expect(asFragment()).toMatchSnapshot();
    });
});