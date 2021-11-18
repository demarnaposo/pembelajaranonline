import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Skor = () => {
  const history = useHistory();

  const [skor, setSkor] = useState([]);

  useEffect(() => {

    const login = localStorage.getItem("dataloginPeserta");
    if(!login){
      history.push('/')
      return
    }
    
    getNilai();

  }, []);

  const handleCobaLagi = () => {
    const token = localStorage.getItem("dataloginPeserta");
    const dataSend = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/selesaiUjian`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "aplication/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "berhasil") {
          history.push("/quiz");
          return;
        } else {
          history.push("/");
          return
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getNilai = () => {
    const token = localStorage.getItem("dataloginPeserta");

    const dataSend = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/hitungSkor`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "gagal") {
          history.push("/");
          return;
        }
        setSkor(hasil);
      });
  };
  return (
    <>
      <div className="card" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <div className="card-content" style={{ padding: 94 }}>
          <div className="content text-center text-black">
            <h3>Nilai : </h3>
            <h1>{skor.skor ? skor.skor * 10 : [] * 10}</h1>
            <button
              onClick={() => handleCobaLagi()}
              className="btn btn-info mt-2"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Skor;
