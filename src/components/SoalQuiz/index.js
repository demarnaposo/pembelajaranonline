import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

const SoalQuiz = () => {
  const history = useHistory();
  const [dataSoal, setDataSoal] = useState([]);
  const [cek, setCek] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const login = localStorage.getItem("dataloginPeserta");
    if(!login){
      history.push('/')
      return
    }
    getListSoal();
  }, []);

  const getListSoal = () => {
    const token = localStorage.getItem("dataloginPeserta");
    const sendData = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/listSoal`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        // console.log(hasil);
        if (hasil.status === "berhasil") {
          setDataSoal(hasil);
        } else {
          localStorage.removeItem("dataloginPeserta");
          history.replace("/");
          return;
        }
      })
      .catch((err) => {
        alert(err);
        // if(err) window.location.reload()
      });
  };

  const handleSubmit = (e, index, res) => {
    setStatus("");
    const token = localStorage.getItem("dataloginPeserta");
    let newData = cek;
    const dataSend = {
      token,
      id_soal: res.id_soal,
      jawaban: e.target.value,
      id_skor: dataSoal.id_skor,
    };

    const sendDataSoal = {
      token
    }

    fetch(`${process.env.REACT_APP_API}/jawab`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        newData[index] = true;
        setCek(newData);
        setStatus("hasil");
        if (hasil.status === "gagal") {
          history.replace("/");
          localStorage.removeItem("dataloginPeserta");
          return;
        }
        fetch(`${process.env.REACT_APP_API}/listSoal`,{
          method: 'POST',
          body: JSON.stringify(sendDataSoal),
          headers:{
            "Content-Type" : "application/json"
          },
        })
        .then(res => res.json())
        .then(hasil => {
          if(hasil.status === 'gagal'){
            history.replace('/')
            return
          }
          if(hasil.data[0].jumlah_jawaban === 10){
            history.replace('/skor');
            return
          }
        })
        .catch(err => {
          alert(err)
        })
      })
      .catch(err => {
        alert(err)
      })
  };
  console.log(dataSoal?.data);
  return (
    <>
      <div className="soal-lomba" style={{ paddingTop: 100 }}>
        <h1 className="text-center pb-5">Soal Quiz</h1>
        <div className="container soalcard">
          <form>
            {dataSoal?.data?.map((res, index) => {
              return (
                <div key={index} className="soal-1">
                  {/* {console.log(res)} */}
                  <div>
                    <p className="m-0">{`${index + 1} ${res.pertanyaan}`}</p>
                    <div className="soal-1 d-flex flex-column">
                      {index + 1 > res.jumlah_jawaban ? (
                        <>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi1}
                                onClick={(e) => handleSubmit(e, index, res)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s1-${index + 1}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="m1-3">
                              <label htmlFor={`s1-${index + 1}`}>
                                A. {res.opsi1}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi2}
                                onClick={(e) => handleSubmit(e, index, res)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s1-${index + 2}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="m1-3">
                              <label htmlFor={`s1-${index + 2}`}>
                                B. {res.opsi2}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi3}
                                onClick={(e) => handleSubmit(e, index, res)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s1-${index + 3}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="m1-3">
                              <label htmlFor={`s1-${index + 3}`}>
                                C. {res.opsi3}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi4}
                                onClick={(e) => handleSubmit(e, index, res)}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s1-${index + 4}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="m1-3">
                              <label htmlFor={`s1-${index + 4}`}>
                                D. {res.opsi4}
                              </label>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi1}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s1-${index + 1}`}
                                disabled
                              />
                            </div>
                            <div className="m1-3">
                              <label htmlFor={`s1-${index + 1}`}>
                                A. {res.opsi1}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi2}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s1-${index + 2}`}
                                disabled
                              />
                            </div>
                            <div className="m1-3">
                              <label htmlFor={`s1-${index + 2}`}>
                                B. {res.opsi2}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi3}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s1-${index + 3}`}
                                disabled
                              />
                            </div>
                            <div className="m1-3">
                              <label htmlFor={`s1-${index + 3}`}>
                                C. {res.opsi3}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi4}
                                type="radio"
                                name={`soal-${index + 1}`}
                                id={`s1-${index + 4}`}
                                disabled
                              />
                            </div>
                            <div className="m1-3">
                              <label htmlFor={`s1-${index + 4}`}>
                                D. {res.opsi4}
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </div>
    </>
  );
};
export default SoalQuiz;
