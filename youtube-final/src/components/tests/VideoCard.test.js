import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, useLocation } from "react-router-dom";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";
import { fakeVideo as video } from "../../tests/videos";
import { withRouter } from "../../tests/utils";

describe("VideoCard", () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it("renders video item", () => {
    render(
      withRouter(<Route path="/" element={<VideoCard video={video} />} />)
    );

    const image = screen.getByRole("img");
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it("navigates to detailed video page with video state when clicked", async () => {
    //1. 실제 어떤 컴포넌트로 가는지는 테스트하지 않고 올바른 경로로 가는지 테스트.
    // - 단위테스트이기 때문
    // - VideoCard 컴포넌트에서도 url만 이동하고 어떤 컴포넌트로 가는지는 나와있지 않기 때문
    //2. 이동한 경로의 컴포넌트에게 video state를 잘 전해줬는지 테스트

    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    const card = await screen.findByRole("listitem");
    userEvent.click(card);

    expect(
      await screen.findByText(JSON.stringify({ video }))
    ).toBeInTheDocument();
  });
});
