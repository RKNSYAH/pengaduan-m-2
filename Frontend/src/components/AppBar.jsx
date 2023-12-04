import React, { useState } from "react";

function AppBar(level) {
  const [navigations, setNavigations] = useState([
    {
      nama: "Petugas",
      link: "/petugas",
    },
    {
      nama: "Masyarakat",
      link: "/masyarakat",
    },
    {
      nama: "Tanggapan",
      link: "/tanggapan",
    },
  ]);
  return (
    <>
      <header className="flex flex-col w-full box-border bg-cyan-50 border border-b-violet-50 left-auto right-0 top-0">
        <div className="p-1 w-full ml-auto mr-auto block">
          <div className="flex flex-row items-center min-h-[40px]">
            <a className="ml-16 mr-7">Pengaduan Masyarakat</a>
            {navigations.map((item, index) => (
              <button className="mr-5 inline-block rounded px-3 pb-1 pt-2 text-s font-normal leading-normal transition duration-150 ease-in-out shadow hover:shadow-cyan-300/50">
                {item.nama}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
export default AppBar;
