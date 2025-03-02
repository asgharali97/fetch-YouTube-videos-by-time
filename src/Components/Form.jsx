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
import {useForm} from 'react-hook-form';
const Form = ({ button }) => {
  const [date, setDate] = useState("")
  const { handleSubmit, register, watch, setValue, control, getValues } = useForm();
  const [option, setOption] = useState("");
  const submit = (data) => {
    console.log(data);
    console.log("Selected option:", option);
  };
  return (
    <Dialog className="bg-[#DCD7C9]">
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
            <Label htmlFor="username" className="inline-block mb-4">
              Enter the username of channel
            </Label>
            <Input
              id="username"
              type="text"
              className=" bg-white"
              placeholder="@username"
              {...register("username", {
                required: true,
              })}
            />
          </div>
          <div className="">
            <Label htmlFor="date" className="inline-block mb-4">
              Enter the Date
            </Label>
            <Input
              id="date"
              type="date"
              className="bg-white"
              placeholder="2023-2-4"
              {...register("date", {
                required: true,
                onChange: (e) => setDate(e.target.value),
              })}
            />
          </div>
          <div>
            <Select onValueChange={(value) => setOption(value)} className="w-full">
              <SelectTrigger className="w-full bg-white mt-2">
                <SelectValue placeholder={`Do you want search before ${date} or after`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before">Before</SelectItem>
                <SelectItem value="after">After</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center">
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#3F4F44] text-white hover:bg-[#2C3930] cursor-pointer"
            >
              Save changes
            </Button>
          </DialogFooter>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { Form };
