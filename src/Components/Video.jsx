import {useVideoContext} from "@/Context/context";

const Video = () => {
  const {videos} = useVideoContext();
  console.log("videos data :: ", videos)
  return (
    <>
      <div className="w-full px-2 py-4">
        <h2>Hello this video component</h2>
      </div>
    </>
  );
};

export default Video;
