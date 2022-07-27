import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-between p-5 mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-44 object-contain"
            src="https://links.papareact.com/yvf"
            alt="medium-logo"
          />
        </Link>

        <div className="hidden md:inline-flex items-center space-x-5">
          <div>About</div>
          <div>Contact</div>
          <div className="text-white bg-green-600 px-4 py-1 rounded-full">
            Follow
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className="border px-4 py-1 rounded-full border-green-600">
          Get Started
        </h3>
      </div>
    </header>
  );
};
