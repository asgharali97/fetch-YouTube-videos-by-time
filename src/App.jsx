import React from "react";
import { Outlet } from "react-router-dom";
import { VideoContextProvider } from "./Context/context";
function App() {
  // const comment =https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=Wld2pSTFh_M&t=19s&key=AIzaSyChNQsTOfdYxgtoRQBFMDETaPmWi5gLEzM

  // const playlist = https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCNQ6FEtztATuaVhZKCY28Yw&maxResults=25&key=AIzaSyChNQsTOfdYxgtoRQBFMDETaPmWi5gLEzM

  // const searchVideos = https://youtube.googleapis.com/youtube/v3/search?part=part%3Dsnippet%2Creplies&channelId=UCYoUuK_uXILQmvip-6jDZ-A&channelType=any&eventType=completed&forDeveloper=true&forMine=true&key=
  // https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCYoUuK_uXILQmvip-6jDZ-A&type=video&key=YOUR_API_KEY
  // async function fetchYoutubeVideos() {
  //   return await fetch(
  //     `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=0BjlBnfHcHM&maxResults=110&key=AIzaSyChNQsTOfdYxgtoRQBFMDETaPmWi5gLEzM`

  //   )
  //     .then((response) => console.log(response.json()))
  //     .catch((error) => console.error(error));
  // }
  // fetchYoutubeVideos();
    // async function getAllComments(apiKey, videoId, maxResultsPerPage = 90) {
    //   const allComments = [];
    //   let nextPageToken = null;
    
    //   while (true) {
    //     const url = "https://www.googleapis.com/youtube/v3/commentThreads";
    //     const params = new URLSearchParams({
    //       part: "snippet",
    //       videoId: videoId,
    //       key: apiKey,
    //       maxResults: maxResultsPerPage,
    //     });
    
    //     if (nextPageToken) {
    //       params.append("pageToken", nextPageToken);
    //     }
    
    //     try {
    //       const response = await fetch(`${url}?${params.toString()}`);
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    
    //       const data = await response.json();
    
    //       for (const item of data.items || []) {
    //         allComments.push(item.snippet.topLevelComment.snippet);
    //       }
    
    //       nextPageToken = data.nextPageToken;
    //       if (!nextPageToken) break;
    //     } catch (error) {
    //       console.error("An error occurred:", error);
    //       throw error;
    //     }
    //   }
    
    //   // Trigger download
    //   downloadJSON(allComments, `comments-${videoId}.json`);
    //   return allComments;
    // }
    
    // // Function to download JSON
    // function downloadJSON(data, filename) {
    //   const json = JSON.stringify(data, null, 2); // Pretty print
    //   const blob = new Blob([json], { type: "application/json" });
    //   const url = URL.createObjectURL(blob);
    
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = filename;
    
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   URL.revokeObjectURL(url);
    // }
    
    // // Example usage
    // const apiKey = "AIzaSyChNQsTOfdYxgtoRQBFMDETaPmWi5gLEzM";
    // const videoId = "0BjlBnfHcHM";
    
    // getAllComments(apiKey, videoId).then((comments) => console.log(comments));
    

  return (
    <>
      <div className="w-full min-w-7xl min-h-screen bg-[#121212]">
        <VideoContextProvider>
        <Outlet />
        </VideoContextProvider>
      </div>
    </>
  );
}

export default App;
