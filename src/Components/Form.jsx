import { useState } from "react";
import { useVideoContext } from "@/Context/context";
import useYTApi from "./YTApi";
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
// import moment from "moment";

const Form = ({ button }) => {
  const { submit } = useYTApi();
  const { open, setOpen, error } = useVideoContext();
  const [date, setDate] = useState("");
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();


  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} className="bg-[#DCD7C9]">
        <DialogTrigger asChild>{button}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-col items-center gap-2">
            <DialogTitle className="font-bold">Start Searching</DialogTitle>
            <DialogDescription className="text-center text-md font-medium">
              Search your favourite content creator videos by particular time
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
