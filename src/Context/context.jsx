import { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [avtar, setAvtar] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [lastChannelId, setLastChannelId] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [lastOption, setLastOption] = useState('');
  const [nextPageToken, setNextPageToken] = useState("");
  const [progress, setProgress] = useState(0);
  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        avtar,
        setAvtar,
        open,
        setOpen,
        error,
        setError,
        lastChannelId,
        setLastChannelId,
        lastDate,
        setLastDate,
        lastOption,
        setLastOption,
        nextPageToken,
        setNextPageToken,
        progress,
        setProgress,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);

