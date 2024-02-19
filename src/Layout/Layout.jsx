import React from "react";
import Container from "../Component/Container";
import Container2 from "../Component/Container2";

const Layout = () => {
  return (
    <>
      <div className="grid gap-12 pb-5">
        {/* heading */}
        <h1 className="text-center uppercase font-bold font-serif text-2xl lg:text-3xl pt-2 ">
          Money Tracking app
        </h1>

        {/* container grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-5 px-6 lg:px-12">
          <Container />
          <Container2 />
        </div>
      </div>
    </>
  );
};

export default Layout;
