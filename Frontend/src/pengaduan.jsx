import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Cookies from 'js-cookie';
import AppBar from "./components/AppBar";

function Pengaduan() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nik, setNik] = useState(false);
  const [isiLaporan, setIsiLaporan] = useState(false);
  const [status, setStatus] = useState(false);
  const [gambar, setGambar] = useState()
  const [cookieLevel, setCookieLevel] = useState();
  const [errorMsg, setErrorMsg] = useState({});
  const navigate = useNavigate();

  
  async function addPengaduan() {
    const formdata = new FormData()
    formdata.append("nik", nik)
    formdata.append("image", gambar)
    formdata.append("isi_laporan", isiLaporan)
    formdata.append("status", status)

    const res = await fetch(`http://localhost:5000/pengaduan`, {
      method: "POST",
      body: formdata
    });
    const data = await res.json();
      setErrorMsg(data)
    if(res.status == 200) {
      fetchLaporan()
      closeModal()
      setErrorMsg({});
    }

  }
  
  function getCookie(){
    const cookie = Cookies.get()
    if(cookie.hasOwnProperty('cookiePetugas')) setCookieLevel("Petugas")
    else if(cookie.hasOwnProperty('cookieMasyarakat')) setCookieLevel("Masyarakat")
    else console.log('logout')
    console.log(Cookies.get())
  }

  async function fetchLaporan() {
    const res = await fetch("http://localhost:5000/pengaduan");
    const userData = await res.json();
    if (res.status === 200) setData(userData);
  }
  async function deleteLaporan(id) {
    const res = await fetch(`http://localhost:5000/pengaduan/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200)
      setTimeout(async () => {
    await fetchLaporan();
  }, 100);
  }
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    getCookie()
    fetchLaporan();
  }, []);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
    <AppBar level={cookieLevel} />
      <div id="userContainer" className="flex flex-col items-center">
        <h2>Daftar Laporan Masyarakat</h2>
        <div
          id="utilContainer"
          className="flex flex-row justify-around align w-full box-border"
        >
          <button
            className="rounded bg-blue-400 px-3 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out"
            onClick={() => openModal()}
          >
            Tambah Aduan
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <button onClick={closeModal} className="inline-block rounded w-20 bg-red-500 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-red-500/50 transition duration-150 ease-in-out shadow hover:shadow-red-600/50">cancel</button>
          <h2>Tambah Pengaduan</h2>
          <div className="flex flex-col">
            <label>Pilih Gambar : </label>
            <input type="file" onChange={(e) => setGambar(e.target.files[0])} />
            <label id="inputLabel" htmlFor="">
              NIK
            </label>
            <input
              className="loginInput"
              type="text"
              onChange={(e) => setNik(e.target.value)}
            ></input>
            <label id="inputLabel" htmlFor="">
              isi_laporan
            </label>
            <input
              className="loginInput"
              type="text"
              onChange={(e) => setIsiLaporan(e.target.value)}
            ></input>
            <label id="inputLabel" htmlFor="">
              status
            </label>
            <input
              className="loginInput"
              type="text"
              onChange={(e) => setStatus(e.target.value)}
            ></input>
            <p style={{color: "red", margin: 0}}>{errorMsg.msg}</p>
            <button
              type="button"
              onClick={() => addPengaduan()}
              className="inline-block rounded bg-green-500 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-green-500/50 transition duration-150 ease-in-out shadow hover:shadow-green-600/50"
            >
              Submit
            </button>
          </div>
        </Modal>
        <div
          id="tableContainer"
          className="max-w-5xl flex-wrap w-screen shadow flex justify-start flex-row "
        >
          {data.map((item, index) => (
            <div key={index} className="block ml-3 mb-4 mt-4 max-w-[25em] max-h-[25em] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <img className="rounded-t-lg w-60 h-52" src={item.url} alt="" />

              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  Laporan {index + 1}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  {item.isi_laporan}
                </p>

                <button
                  type="button"
                  className="inline-block mr-2 w-20 rounded bg-green-500 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-green-500/50 transition duration-150 ease-in-out shadow hover:shadow-green-600/50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteLaporan(item.id_pengaduan)}
                  className="inline-block rounded w-20 bg-red-500 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-red-500/50 transition duration-150 ease-in-out shadow hover:shadow-red-600/50"
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

export default Pengaduan;
