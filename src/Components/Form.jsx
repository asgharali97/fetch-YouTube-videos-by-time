import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useVideoContext } from "../Context/context";

const Form = ({ button }) => {
  const { setVideos, setAvtar } = useVideoContext();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const convertUsernameIntoId = async (username, apiKey) => {
    // Remove "@" if present
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
        setAvtar(avtarUrl);
        return channelId.channelId;
      } else {
        setError(true);
        console.log("Channel not found");
      }
    } catch (error) {
      console.error("Error fetching channel ID:", error);
    }
  };

  const convertDate = (data) => {
    const date = new Date(data);
    const isoDate = date.toISOString().replace(/\.\d+Z$/, "Z");
    return isoDate;
  };

  const submit = async (data) => {
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    try {
      const convertedUserName = await convertUsernameIntoId(
        data.username,
        API_KEY
      );
      if(!convertedUserName){
        throw new Error(setError(true));
      }
      const convertedDate = convertDate(data.date);
      const fetchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${convertedUserName}&type=video&published${data.option}=${convertedDate}&maxResults=24&key=${API_KEY}`;
      const response = await fetch(fetchUrl);
      const result = await response.json();
      setVideos(result.items);
      navigate("/videos");
    } catch (error) {
      console.error("API Error:", error);
      setError(true)
    }
    if(!error){
      setOpen(false)
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} className="bg-[#DCD7C9]">
        <DialogTrigger asChild>{button}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-col items-center gap-2">
            <DialogTitle className="font-bold">Start Searching</DialogTitle>
            <DialogDescription className="text-center text-md font-medium">
              Search by your favourite content creator videos by particular time
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid gap-4 py-4">
              <div className="">
                <Label
                  htmlFor="username"
                  className={`inline-block mb-4 ${
                    (error || errors.username) && "text-[#b70a12]"
                  }`}
                >
                  Enter the username of channel
                </Label>
                <Input
                  id="username"
                  type="text"
                  className=" bg-white"
                  placeholder="@username"
                  {...register("username", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^@[\w]+$/.test(value) ||
                        "Please start username with @",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-[#b70a12] px-1 py-2">
                    {errors.username.message}
                  </p>
                )}
                {error && (
                  <p className="text-[#b70a12] px-1 py-2">
                    Channel Not found please enter valid username
                  </p>
                )}
              </div>
              <div className="">
                <Label
                  htmlFor="date"
                  className={`inline-block mb-4 ${
                    errors.date && "text-[#b70a12]"
                  }`}
                >
                  Enter the Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="bg-white"
                  placeholder="2023-2-4"
                  {...register("date", {
                    required: "Please enter date that time you want search",
                    onChange: (e) => setDate(e.target.value),
                  })}
                />
                {errors.date && (
                  <p className="text-[#b70a12] px-1 py-2">
                    {errors.date.message}
                  </p>
                )}
              </div>
              <div>
                <Controller
                  name="option"
                  rules={{
                    required: "Please select any option to search",
                  }}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      className="w-full"
                    >
                      <SelectTrigger className="w-full bg-white mt-2">
                        <SelectValue
                          placeholder={`Do you want search before ${date} or after`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Before">Before</SelectItem>
                        <SelectItem value="After">After</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {/* {errors.option && <p className="text-[#b70a12x] px-1 py-2">{errors.option.message}</p>} */}
              </div>
            </div>
            <div className="flex justify-center">
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-[#3F4F44] text-white hover:bg-[#2C3930] cursor-pointer"
                >
                  Search
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { Form };
