import { useVideoContext } from "@/Context/context";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Video = () => {
  const { videos, avtar } = useVideoContext();
  console.log("videos data :: ", videos);
  return (
    <>
    <NavBar isVideo={true}/>
      <div className="w-full min-h-[100vh] px-6 py-4 flex flex-wrap justify-center">
        {videos?.map((item) => {
          let thumbnails = item.snippet.thumbnails.high.url;
          let thumbnail = thumbnails.replace("/hqdefault","/hq720");
          let date = item.snippet.publishedAt.split("T")[0];
          return (
          <Link
          to={`https://www.youtube.com/watch?v=${item.id.videoId}`}
          target="_blank"
          >
          <div key={item.id.videoId} className="mr-2 ml-2 my-4 w-96 min-h-72 cursor-pointer">
          <div className="flex flex-col h-full relative">
            <div className="img">
              <img className="rounded-md object-cover" src={thumbnail} alt="" />
            </div>
            <div className="content flex text-white">
              <div className="avtar mt-3 mr-3">
                <img className="rounded-full h-10 w-12" src={avtar} alt="avtar" />
              </div>
              <div className="content-detail h-full w-full">
                <div className="mt-3">
                <h3 className="text-lg font-medium">{item.snippet.title}</h3>
                <div className="flex justify-between items-center text-gray-300">
                <h4 className="text-sm font-normal">{item.snippet.channelTitle}</h4>
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
    </>
  );
};

export default Video;
