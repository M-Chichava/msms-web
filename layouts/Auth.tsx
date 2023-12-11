import React from "react";

// components

import Navbar from "components/Navbars/AuthNavbar";
import FooterSmall from "components/Footers/FooterSmall";

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="relative w-full h-full min-h-screen flex flex-col justify-center" >
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
        </section>
      </main>
    </>
  );
}
