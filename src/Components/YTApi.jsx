import { useVideoContext } from "@/Context/context";
import { useNavigate } from "react-router-dom";

const useYTApi = () => {
  const navigate = useNavigate();
  let {
    setAvtar,
    setVideos,
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
    setProgress
  } = useVideoContext();
  const convertUsernameIntoId = async (username, apiKey) => {
    const query = username.replace(/^@/, "");
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query
    )}&type=channel&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data.items[0].snippet.thumbnails.high.url);
      if (data.items && data.items.length > 0) {
        const channelId = data.items[0].id;
        const avtarUrl = data.items[0].snippet.thumbnails.high.url;
        console.log(avtarUrl);
        setAvtar(avtarUrl);
        setLastChannelId(channelId.channelId);
        setProgress(2);
        return channelId.channelId;
      } else {
        console.log("Channel not found");
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching channel ID:", error);
    }
  };
  const convertDate = (data) => {
    const newdate = new Date(data);
    const isoDate = newdate.toISOString().replace(/\.\d+Z$/, "Z");
    setLastDate(isoDate);
    setProgress(30);
    return isoDate;
  };

  const submit = async (data) => {
    setLastOption(data.option);
    setProgress(4);
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    try {
      const convertedUserName = await convertUsernameIntoId(
        data.username,
        API_KEY
      );
      if (!convertedUserName) {
        throw new Error(setError(true));
      }
      const convertedDate = convertDate(data.date);
      setProgress(15)
      const fetchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${convertedUserName}&type=video&published${data.option}=${convertedDate}&maxResults=42&key=${API_KEY}`;
      const response = await fetch(fetchUrl);
      setProgress(60);
      const result = await response.json();
      const videoIds = result.items.map((item) => item.id.videoId).join(',');
      const videoDetailUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`;
      
      const videoDetailResponse = await fetch(videoDetailUrl);
      const videoResult = await videoDetailResponse.json();
      setProgress(80)
      console.log(videoResult);

      if (!result.items.length) {
        throw new Error(setError(true));
      }

      if (result.nextPageToken) {
        setNextPageToken(result.nextPageToken);
      }

      setProgress(90);
      setVideos(() => ({
        videos: result.items,
        videosDetails: videoResult.items
      }));

      setProgress(100)
      console.log(result);
      navigate("/videos");
    } catch (error) {
      console.error("API Error:", error);
      setError(true);
    }
    if (!error) {
      setOpen(false);
    }
  };
  const next = async () => {
    console.log('enter in next')
    console.log(nextPageToken)
    setProgress(20)
    if (!nextPageToken) {
      throw new Error("No next page token available.");
    }
    console.log('next called')

    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    try {
      const fetchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${lastChannelId}&type=video&published${lastOption}=${lastDate}&maxResults=42&pageToken=${nextPageToken}&key=${API_KEY}`;
      const response = await fetch(fetchUrl);
      const result = await response.json();
      setProgress(40);
      
      const videoIds = result.items.map((item) => item.id.videoId).join(',');
      const videoDetailUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`;
    
      const videoDetailResponse = await fetch(videoDetailUrl);
      const videoResult = await videoDetailResponse.json();
      setProgress(60)
      if (!result.items.length) {
        throw new Error(setError(true));
      }
      setProgress(90);
      setNextPageToken(result.nextPageToken);
      setVideos((prevVideos) => ({
        videos: [...prevVideos.videos, ...result.items],
        videosDetails: [...prevVideos.videosDetails, ...videoResult.items]
      }));
      setProgress(100);
      console.log("Next page token:", nextPageToken);
      console.log(result);
    } catch (error) {
      console.log("fetching Next page data error", error);
      setError(true);
    }
  };

  return { submit, next};
};

// function YTDurationToSeconds(duration) {
//   var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

//   match = match.slice(1).map(function(x) {
//     if (x != null) {
//         return x.replace(/\D/, '');
//     }
//   });

//   var hours = (parseInt(match[0]) || 0);
//   var minutes = (parseInt(match[1]) || 0);
//   var seconds = (parseInt(match[2]) || 0);

//   return hours * 3600 + minutes * 60 + seconds;
// }

export default useYTApi;

