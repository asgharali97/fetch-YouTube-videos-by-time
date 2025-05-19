import { useVideoContext } from "@/Context/context";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import useYTApi from "./YTApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "./ui/button";
import { useState } from "react";

function YTDurationToSeconds(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function YTDurationToReadable(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  if (hours > 0) {
    // Format: H:MM:SS
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  } else {
    // Format: M:SS
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }
}

const converViewsToReadable = (views) => {
  if (views < 1_000) {
    return views.toString();
  } else if (views < 1_000_000) {
    return `${(views / 1_000).toFixed(1)}K`;
  } else {
    return `${(views / 1_000_000).toFixed(1)}M`;
  }
};


const Video = () => {
  const { videos, avtar } = useVideoContext();

  const { next } = useYTApi();
  const [tab, setTab] = useState("videos");

  const videosItems = videos.videos || [];
  const videoDetials = videos.videosDetails || [];

  const paired = videosItems.map((item, index) => ({
    ...item,
    details: videoDetials[index],
  }));

  console.log(paired)
  const shorts = paired.filter(
  (item) =>
    item.details &&
    item.details.contentDetails &&
    item.details.contentDetails.duration &&
    YTDurationToSeconds(item.details.contentDetails.duration) <= 120
);
  console.log(shorts)
  const longVideos = paired.filter(
    (item) =>
    item.details &&
    item.details.contentDetails &&
    item.details.contentDetails.duration &&
    YTDurationToSeconds(item.details.contentDetails.duration) > 120
);

  const displayList = tab === "videos" ? longVideos : shorts


  return (
    <>
      <NavBar isVideo={true} />
      <InfiniteScroll
        dataLength={displayList.length}
        next={next}
        hasMore={true}
      >
        <div className="w-full min-h-[100vh] px-6 py-4 flex flex-wrap justify-center">
          <div className="w-full my-4 flex justify-center">

          <Button className="bg-[#DCD7C9] text-black hover:bg-[#e3e3e3] cursor-pointer mx-4"
           onClick={() => setTab('videos')}
          >
            Videos
          </Button>
          <Button className="bg-[#DCD7C9] text-black hover:bg-[#e3e3e3] cursor-pointer mx-4"
           onClick={() =>  setTab('short')}
          >
            Shorts
          </Button>
           </div>
          {displayList?.map((item) => {
            let thumbnails = item.snippet.thumbnails.high.url;
            let thumbnail = thumbnails.replace("/hqdefault", "/hq720");
            let date = item.snippet.publishedAt.split("T")[0];
            let duration = YTDurationToReadable(item.details.contentDetails.duration);
            let views = converViewsToReadable(item.details.statistics.viewCount);
            return (
              <Link
                to={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                target="_blank"
                key={item.id.videoId}
              >
                <div className="mr-2 ml-2 my-4 w-96 min-h-72 cursor-pointer">
                  <div className="flex flex-col h-full relative">
                    <div className="img relative">
                      <img
                        className="rounded-md"
                        src={thumbnail}
                        alt="thumbnail"
                      />
                      <div className="absolute bottom-2 right-2 bg-[#0009] py-[2px] px-2 rounded-[4px] flex text-[13px] font-medium text-white justify-center">{
                          duration
                          }</div>
                    </div>
                    <div className="content flex text-white">
                      <div className="avtar mt-3 mr-3">
                        <img
                          className="rounded-full h-10 w-12"
                          src={avtar}
                          alt="avtar"
                        />
                      </div>
                      <div className="content-detail h-full w-full">
                        <div className="mt-3">
                          <h3 className="text-lg font-medium">
                            {item.snippet.title}
                          </h3>
                          <h4 className="text-sm font-normal">
                              {item.snippet.channelTitle}
                          </h4>
                          <div className="flex justify-between items-center text-gray-300">
                            <h4>{views}</h4>
                            <h4>{date}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Video;
