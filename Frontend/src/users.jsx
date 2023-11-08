import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Users() {
  const [data, setData] = useState([]);
  const [expire, setExpire] = useState("");

  async function fetchLaporan() {
    const res = await fetch("http://localhost:5000/pengaduan");
    const userData = await res.json();
    if (res.status === 200) setData(userData);
  }
  async function deleteLaporan(id){
    const res = await fetch(`http://localhost:5000/pengaduan/${id}`, {
      method: "DELETE"
    })

    if (res.status === 200) await fetchLaporan()
  }

  useEffect(() => {
    fetchLaporan();
  }, []);

  return (
    <>
      <div id="userContainer" className="flex flex-col items-center">
        <h2>Daftar Laporan Masyarakat</h2>
        <button className="rounded bg-blue-400 px-3 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out" onClick={fetchLaporan}>Refresh</button>
        <div id="tableContainer" className="max-w-5xl flex-wrap w-full flex justify-evenly flex-row">
          {data.map((item, index) => (
            <div className="block mb-4 mt-4 max-w-[25em] max-h-[25em] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <img
                className="rounded-t-lg w-60 h-52"
                src={item.url}
                alt=""
              />

              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  Laporan {index + 1}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {item.isi_laporan}
                </p>

                <button
                  type="button"
                  onClick={() => deleteLaporan(item.id_pengaduan)}
                  className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-red-500/50 transition duration-150 ease-in-out shadow hover:shadow-red-600/50"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
