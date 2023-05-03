import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, useLocation } from "react-router-dom";
import { withRouter } from "../../tests/utils";
import SearchHeader from "../SearchHeader";
import { act } from "react-dom/test-utils";

describe("SearchHeader", () => {
  const keyword = "testKeyword";

  //이거 안돼...
  it(
    "렌더링할때 param에 keyword가 있으면 input의 value에 세팅한다.",
    act(() => {
      render(
        withRouter(
          <>
            <Route path={`/${keyword}`} element={<SearchHeader />} />
          </>
        )
      );

      expect(screen.findByText(keyword)).toBeInTheDocument();
    })
  );

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
