import { createContext, useContext ,useState} from "react";

const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [avtar, setAvtar] = useState();
    return (
      <VideoContext.Provider value={{ videos, setVideos, avtar, setAvtar }}>
        {children}
      </VideoContext.Provider> 
    );
  };

export  const useVideoContext = () => useContext(VideoContext);
