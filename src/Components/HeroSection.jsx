import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "./Form";
const HeroSection = () => {
  // Button warrring sol:
  // const SearchButton = React.forwardRef((props,ref) => {
  //   <Button
  //   ref={ref}
  //   className="bg-[#DCD7C9] text-black hover:bg-[#fcfcfc] cursor-pointer"
  //   {...props}
  //   >
  //     Start Searching
  //   </Button>;
  // });
  return (
    <>
      <div className="w-full py-4 px-2 mt-16">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold text-white flex flex-col items-center">
            Search your favourite content creator videos{" "}
            <span className="my-2 mt-6">by particular time</span>
          </h1>
        </div>
        <div className="flex justify-center mt-8">
          <Form
            button={
              <Button
              className="bg-[#DCD7C9] text-black hover:bg-[#fcfcfc] cursor-pointer"
              >
                Start Searching
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
