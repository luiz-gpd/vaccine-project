import Table from "../../../components/Table";
import React from 'react'
import AppContext, { initialState } from "../../../AppContext";
import { render } from "@testing-library/react";

const TableWrapper = ({ state = initialState, dispatch }) => (
  <AppContext.Provider value={[state, dispatch]}>
    <Table />
  </AppContext.Provider>
);

describe("Table Component", () => {
  it("renders", () => {
    const { asFragment } = render(<TableWrapper />);

    expect(asFragment()).toMatchSnapshot();
  });
  it("renders with context when search input is empty, and dates are different", () => {
    const dispatch = jest.fn();

    const myInitialState =
      [{
        name: "Luiz",
        age: "19",
        consultationDate: "2021-04-30T03:00:00.000Z",
        consultationTime: "08:30",
        attended: false,
        consultInfo: ""
      },
      {
        name: "Gustavo",
        age: "20",
        consultationDate: "2021-04-29T03:00:00.000Z",
        consultationTime: "09:30",
        attended: false,
        consultInfo: ""
      },
      ]

    React.useState = jest.fn().mockReturnValue([myInitialState, {}])

    const { queryByText } = render(
      <TableWrapper
        state={{
          ...initialState,
          search: ""
        }}
        usersPerPage="2"
        pageNumber="1"
        dispatch={dispatch}
      />
    );

    expect(queryByText("Nome")).toBeTruthy();
    expect(queryByText("Idade")).toBeTruthy();
    expect(queryByText("Horário da Vacina")).toBeTruthy();
    expect(queryByText("Atendimento")).toBeTruthy();

  });
  it("renders with context when search input is full, and dates are the same",() => {
      const dispatch = jest.fn();

      const myInitialState =
        [{
          name: "Luiz",
          age: "19",
          consultationDate: "2021-04-30T03:00:00.000Z",
          consultationTime: "08:30",
          attended: false,
          consultInfo: ""
        },
        {
          name: "Gustavo",
          age: "20",
          consultationDate: "2021-04-30T03:00:00.000Z",
          consultationTime: "09:30",
          attended: true,
          consultInfo: ""
        },
        ]

      React.useState = jest.fn().mockReturnValue([myInitialState, {}])

      render(
        <TableWrapper
          state={{
            ...initialState,
            search: "u"
          }}
          usersPerPage="10"
          pageNumber="1"
          dispatch={dispatch}
        />
      );
    });
});