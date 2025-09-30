import { useState } from "react";
import { BiCheckCircle, BiLoader } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import BaultLogo from "./assets/logo.png";
import axios from "axios";
import { server } from "./server";

const App = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleWaitlist = async() => {
    if (email !== "" && /\S+@\S+\.\S+/.test(email)) {
      setIsLoading(true);
      
      await axios.post(`${server}/user/waitlist`, { email }).then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setSuccessModal(true);
        } else {
          toast.error(response.data.message || "Something went wrong");
          setIsLoading(false);
        }
      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || error.message || "Something went wrong");
        setIsLoading(false);
      });
      
    } else {
      toast.error("Please enter a valid email");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center text-3xl font-bold">
      <div className="w-full max-w-xl p-8 my-8 mx-auto flex flex-col items-center justify-center text-center z-50">
        {successModal ? (
          <div>
            <BiCheckCircle size={300} className="mb-6 mx-auto" />
            <div className="text-2xl font-normal">
              Thank you for joining our waitlist!
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-full m-auto mb-10">
              <img
                src={BaultLogo}
                alt="Background"
                className="w-40 h-40 object-cover mx-auto"
                style={{ animation: "spin 8s linear infinite" }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/80"></div>
            </div>

            <h1 className="text-2xl md:text-4xl capitalize font-bold text-center">
              Automated trading starts now. One platform, countless strategies.
            </h1>
            {/* <h1 className='text-xl capitalize font-normal mt-2 italic text-center'>be first to unlock it.</h1> */}

            <div className="text-lg font-normal my-7 text-center text-gray-400">
              Be first to unlock it. Join our waiting list!
            </div>

            <div className="relative w-full text-base">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Your email address"
                className="border border-gray-300 font-normal text-white bg-[#16182d] rounded-md px-4 py-3 w-full pr-24" // add right padding so text doesn't overlap button
              />
              <button
                type="button"
                onClick={handleWaitlist}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-white text-black rounded px-4 py-2 hover:bg-gray-200 transition flex gap-2" // position button absolutely within relative parent
              >
                {isLoading ? (
                  <>
                    <BiLoader className="animate-spin" size={20} />{" "}
                    <i className="text-sm">Processing...</i>
                  </>
                ) : (
                  "Get Notified"
                )}
              </button>
            </div>
          </div>
        )}
            <div className="text-base font-normal my-7 px-3 py-1 border border-gray-300 rounded-md text-center text-gray-300 flex gap-2 justify-center items-center cursor-pointer"> <img src={BaultLogo} className="w-[20px] h-[20px]" /> Bault</div>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            wordBreak: "break-all",
          },
        }}
        containerClassName="!fixed !top-20 left-20 w-full z-[9999] text-sm font-normal"
      />
    </div>
  );
};

export default App;
