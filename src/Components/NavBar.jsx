import { Button } from "./ui/button";
import { Form } from "./Form";
import LoadingBar from "react-top-loading-bar";
import { useVideoContext } from "@/Context/context";
const NavBar = ({ isVideo }) => {
  const { progress, setProgress } = useVideoContext();
  return (
    <>
    <LoadingBar
          color='#DCD7C9'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
    />
      <div className="w-full bg-[#3e3e3e] text-white flex items-center justify-between py-2 px-4">
        <div className="logo text-2xl font-bold">SYTVBT</div>
        {isVideo && (
          <div>
            <Form
              button={
                <Button className="bg-[#DCD7C9] text-black hover:bg-[#e3e3e3] cursor-pointer">
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
