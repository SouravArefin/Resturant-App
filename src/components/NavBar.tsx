import React from "react";

import Link from "next/link";

import Image from "next/image";

import Menu from "./Menu";

const NavBar = () => {
  const user = false;
  return (
    <div className="h-12 text-teal-600 p-4 flex items-center justify-between border-b-2 border-b-green-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/Menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">Food House</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
       <Menu/>
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span> +8801858557886</span>
        </div>
        {/* <UserLinks/>
        <CartIcon /> */}
      </div>
    </div>
  );
};

export default NavBar;