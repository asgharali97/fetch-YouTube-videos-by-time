import { useVideoContext } from "@/Context/context";

const Video = () => {
  const { videos } = useVideoContext();
  console.log("videos data :: ", videos);
  return (
    <>
      <div className="w-full px-6 py-4 flex flex-wrap justify-center">
        {videos?.map((item) => {
          let thumbnails = item.snippet.thumbnails.high.url;
          let thumbnail = thumbnails.replace("/hqdefault","/hq720");
          console.log(thumbnail)
          return (
          <div key={item.id.videoId} className="mr-2 ml-2 my-4 w-96 h-72">
          <div className="flex flex-col h-full relative">
            <div className="img h-[300px]">
              <img className="rounded-md object-cover" src={thumbnail} alt="" />
            </div>
            <div className="content flex text-white">
              <div className="avtar mt-3 mr-3">
                <img className="rounded-full h-12 w-12" src="" alt="avtar" />
              </div>
              <div className="content-detail h-full w-full">
                <div className="mt-3">
                <h3 className="text-lg font-medium">{item.snippet.title}</h3>
                <div className="flex justify-between items-center text-gray-300">
                <h4 className="text-sm font-normal">{item.snippet.channelTitle}</h4>
                <h4>{item.snippet.publishedAt}</h4>
                </div>
                </div>
              </div>
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
