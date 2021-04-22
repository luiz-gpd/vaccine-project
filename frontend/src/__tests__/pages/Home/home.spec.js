import React from 'react';
import Home from "../../../pages/Home";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

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

    it("Should submit when clicking on the button", () => {
        
        const { getByRole } = render(
            <BrowserRouter>
              <Home/>
            </BrowserRouter>,
          );

        // fireEvent.click(getByRole('button'));
        // expect(mockHistoryPush).toHaveBeenCalledWith('/user');
    });
});