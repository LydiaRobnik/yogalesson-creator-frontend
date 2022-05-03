import Signupform from "./Signupform";
import React, {
  useContext,
  useState,
  Fragment,
  useRef,
  useEffect
} from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../Navbar/navbar.scss";
import Loginform from "./Loginform.jsx";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

export default function SignupModal({ SignupModalOpen, setSignupModalOpen }) {
  const { loggedIn } = useContext(AuthContext);
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={SignupModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setSignupModalOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-grey-500 sm:mx-0 sm:h-10 sm:w-10 ">
                    <XIcon
                      className="h-6 w-6 text-red-600 cursor-pointer"
                      aria-hidden="true"
                      onClick={() => setSignupModalOpen(false)}
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                    <Signupform
                      SignupModalOpen={SignupModalOpen}
                      setSignupModalOpen={setSignupModalOpen}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
