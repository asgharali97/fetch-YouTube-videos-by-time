import { createContext, useContext } from "react";

export const VideoContext = createContext({
    title:"",
    thumbnail:"",
    avtar:"",
    channelName:"",
    publishedAgo:"",
    link:"",
});

export const VideoContextProvider = VideoContext.Provider

export default function useVideoContext () {
    return useContext(VideoContext)
}
