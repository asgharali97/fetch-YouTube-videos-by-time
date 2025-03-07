import React from "react";
import NavBar from "./Components/NavBar";
import HeroSection from "./Components/HeroSection";
import { Outlet } from "react-router-dom";

function App() {
  // const comment =https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=Wld2pSTFh_M&t=19s&key=AIzaSyChNQsTOfdYxgtoRQBFMDETaPmWi5gLEzM

  // const playlist = https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCNQ6FEtztATuaVhZKCY28Yw&maxResults=25&key=AIzaSyChNQsTOfdYxgtoRQBFMDETaPmWi5gLEzM

  // const searchVideos = https://youtube.googleapis.com/youtube/v3/search?part=part%3Dsnippet%2Creplies&channelId=UCYoUuK_uXILQmvip-6jDZ-A&channelType=any&eventType=completed&forDeveloper=true&forMine=true&key=
  // https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCYoUuK_uXILQmvip-6jDZ-A&type=video&key=YOUR_API_KEY
  // async function fetchYoutubeVideos() {
  //   return await fetch(
  //     `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCYoUuK_uXILQmvip-6jDZ-A&type=video&publishedBefore=2023-1-11T09:00:00Z&key=AIzaSyChNQsTOfdYxgtoRQBFMDETaPmWi5gLEzM`

  //   )
  //     .then((response) => console.log(response.json()))
  //     .catch((error) => console.error(error));
  // }
  // fetchYoutubeVideos();

  return (
    <>
      <div className="w-full min-w-7xl min-h-screen bg-[#333A35]">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
