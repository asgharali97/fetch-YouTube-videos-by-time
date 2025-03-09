import { createContext, useContext ,useState} from "react";

const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
    const [videos, setVideos] = useState([]); // Array of video objects
   
    return (
      <VideoContext.Provider value={{ videos, setVideos }}>
        {children}
      </VideoContext.Provider>
    );
  };

export  const useVideoContext = () => useContext(VideoContext);
