import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, useLocation } from "react-router-dom";
import { withRouter } from "../../tests/utils";
import SearchHeader from "../SearchHeader";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";

describe("SearchHeader", () => {
  const keyword = "testKeyword";

  it("renders correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<SearchHeader />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders with keyword correctly", async () => {
    render(
      withRouter(
        <Route path="/:keyword" element={<SearchHeader />} />,
        `/${keyword}`
      )
    );
    await waitFor(() => {
      expect(screen.findByDisplayValue(keyword)).toBeInTheDocument();
    });
  });

  it("navigates to video page with keyword", async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().pathname)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path="/" element={<SearchHeader />} />
          <Route
            path={`/videos/${keyword}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    const input = await screen.getByPlaceholderText("Search...");
    const submitButton = await screen.findByRole("button");
    await userEvent.type(input, keyword);
    userEvent.click(submitButton);

    expect(
      await screen.findByText(JSON.stringify(`/videos/${keyword}`))
    ).toBeInTheDocument();
  });
});
