"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { log } from "console";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const onRent = useCallback(() => {
    // if (!currentUser) {
    //   return loginModal.onOpen();
    // }
    rentModal.onOpen();
  }, [rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden
        md:block
        text-sm 
        font-semibold 
        py-3 
        px-4 
        rounded-full 
        hover:bg-neutral-100 
        transition 
        cursor-pointe"
        >
          Lyte your home
        </div>
        <div
          onClick={toggleOpen}
          className="
         p-4
         md:py-1
         md:px-2
         border-[1px] 
         border-neutral-200 
         flex 
         flex-row 
         items-center 
         gap-3 
         rounded-full 
         cursor-pointer 
         hover:shadow-md 
         transition
         "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
        absolute 
        rounded-xl 
        shadow-md
        w-[40vw]
        md:w-3/4 
        bg-white 
        overflow-hidden 
        right-0 
        top-12 
        text-sm
      "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              {currentUser ? (
                <>
                  <MenuItem onClick={() => {}} label="My trips" />
                  <MenuItem label="My Favorites" onClick={() => {}} />
                  <MenuItem label="My reservations" onClick={() => {}} />
                  <MenuItem label="My properties" onClick={() => {}} />
                  <MenuItem label="My Home" onClick={() => {}} />
                  <hr />
                  <MenuItem
                    label="Logout"
                    onClick={() => {
                      signOut();
                    }}
                  />
                </>
              ) : (
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Login" />
                  <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
