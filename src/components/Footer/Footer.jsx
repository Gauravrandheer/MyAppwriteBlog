import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative mt-[271px] flex justify-between items-center bg-blue-500 h-20 border border-black rounded-sm ">
      <div className="">
        <h2 className="text-black font-semibold text-2xl p-2 font-serif"> Gaurav's blog</h2>
      </div>
      <div>
        <p className="text-black font-bold text-xl p-4">
          @ CopyRight Gaurav 2024{" "}
        </p>
      </div>
    </section>
  );
}

export default Footer;
