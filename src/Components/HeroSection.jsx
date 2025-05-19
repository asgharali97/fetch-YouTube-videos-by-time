import { forwardRef } from "react";
import { Form } from "./Form";
import NavBar from './NavBar'
import { Button } from "./ui/button";

const SearchButton = forwardRef(function SearchButton({ className, children, ...props }, ref) {
  return (
    <Button
      ref={ref}
      className={`bg-[#DCD7C9] text-black hover:bg-[#fcfcfc] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
});

const HeroSection = () => {
  return (
    <>
      <NavBar />
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
              <SearchButton>
                Start Searching
              </SearchButton>
            }
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;