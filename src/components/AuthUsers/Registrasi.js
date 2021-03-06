import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const RegistrasiUser = () => {
  const history = useHistory();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmPassword, setkonfirmPassword] = useState("");

  useEffect(() => {
    const login = localStorage.getItem("loginPeserta");
    if (login) {
      //   history.push("/list-video-admin");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = {
      nama,
      email,
      password,
      password_confirmation: konfirmPassword,
    };
    if (
      nama === "" ||
      email === "" ||
      password === "" ||
      konfirmPassword === ""
    ) {
      swal("Failed", "Registrasi Gagal", "error");
    } else {
      fetch(`${process.env.REACT_APP_API}/registrasiPeserta`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((hasil) => {
          console.log(hasil);
          //   if(hasil.status === 'berhasil'){
          //   localStorage.setItem("dataloginAdmin", hasil.token);
          // //   history.push("/list-video-admin");
          //   }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <>
      <div className="container image-bg">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Registrasi Peserta</h3>
              <div className="d-flex justify-content-end social-icon">
                <span>
                  <i className="fab fa-facebook-square"> </i>
                </span>
                <span>
                  <i className="fab fa-google-plus-square"> </i>
                </span>
                <span>
                  <i className="fab fa-twitter-square"> </i>
                </span>
              </div>
            </div>

            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="nama"
                  />
                </div>

                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                </div>

                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>

                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    value={konfirmPassword}
                    onChange={(e) => setkonfirmPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="konfirmasi password"
                  />
                  {password !== konfirmPassword && (password.length > 0 ||
                  konfirmPassword.length > 0)?
                    <span style={{ color: "red", fontSize: 15 }}>
                      Password dan Konfirmasi Password harus sama!
                    </span>
                   :""}
                </div>

                <div className="form-group">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn float-right login_btn"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegistrasiUser;
