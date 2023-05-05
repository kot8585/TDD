import { render, screen, waitFor } from "@testing-library/react";
import { withAllContexts, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import ChannelInfo from "../ChannelInfo";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");

    const { asFragment } = renderChannelInfo();
    await screen.findByRole("img");
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with URL", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");

    renderChannelInfo();

    expect(screen.queryByRole("img")).toBeNull();
  });

  function renderChannelInfo() {
    return render(
      withAllContexts(
        withRouter(
          <Route path="/" element={<ChannelInfo id="id" name="channel" />} />
        ),
        fakeYoutube
      )
    );
  }
});
