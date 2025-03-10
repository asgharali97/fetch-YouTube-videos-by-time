import { useVideoContext } from "@/Context/context";

const Video = () => {
  const { videos } = useVideoContext();
  console.log("videos data :: ", videos);
  return (
    <>
      <div className="w-full px-6 py-4 grid grid-cols-3">

  {videos?.map((item) => {
          return (
            <div key={item.snippet.videoId} className="w-96 h-48 flex flex-col">
              <div className="img py-4">
                <img
                  src={item.snippet.thumbnails.high.url}
                  className="w-full object-cover rounded-lg"
                  alt="thumbnail"
                />
              </div>
              <div className="content w-full flex flex-row cursor-pointer">
                <div className="avtar mr-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://yt3.ggpht.com/6tLBV-DRVemxhmanuezR5HkHshX2g7Y46Rq8cysyO1V-nd2SaQ2Fi8cdgVM-n6v_8XZ5BEimxXI=s68-c-k-c0x00ffffff-no-rj"
                    alt=""
                  />
                </div>
                <div className="content-detail flex flex-col items-center ">
                  <h2 className="text-2xl font-bold ">{item.snippet.title}</h2>
                  <span className="text-xl font-normal ml-1">{item.snippet.channelTitle}</span>
                  <span className="text-lg font-normal">{item.snippet.publishedAt}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Video;
