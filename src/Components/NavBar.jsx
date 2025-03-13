import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "./Form";
const NavBar = ({ isVideo }) => {
  return (
    <>
      <div className="w-full bg-[#DCD7C9] text-black flex items-center justify-between py-2 px-4">
        <div className="logo text-2xl font-bold">SYTVBT</div>
        {isVideo && (
          <div>
            <Form
              button={
                <Button className="bg-[#333A35] text-white hover:bg-[#2b322d] cursor-pointer">
                  Search
                </Button>

              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
