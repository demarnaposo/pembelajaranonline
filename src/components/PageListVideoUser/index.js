import React from 'react';
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { useHistory, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
// import { FooterContainer } from './containers/footer';

const ListVideoUser = () => {
  const history = useHistory();
  const [dataListVideo, setDataListVideo] = useState([]);
  const [handleShowVideo, setHandleShowVideo] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");
  const [namaLinkVideo, setNamaLinkVideo] = useState("");
  const [search, setSearch] = useState("");
  console.log(search);

  

  useEffect(() => {
    const token = localStorage.getItem("dataloginPeserta");

    if (!token) {
      history.replace("/");
      return;
    }

    const dataSend =  {
      cari: search,
      token,
    };

    fetch(`${process.env.REACT_APP_API}/listKontenPeserta`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "gagal") {
          {
            localStorage.removeItem("dataloginPeserta");
            history.replace("/");
            return;
          }
        }
        setDataListVideo(hasil.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [search]);

  const handleClose = () => {
    setHandleShowVideo(false);
  };

  const handleOpenVideo = (data) => {
    setHandleShowVideo(true);
    setLinkVideo(data.link_video);
    setNamaLinkVideo(data.judul);
  };

  useEffect(() => {
    const login = localStorage.getItem("dataloginPeserta");
    if (!login) {
      history.push("/");
      return;
    }
    getData();
  }, []);

  const getData = () => {
    const token = localStorage.getItem("dataloginPeserta");
    const senData = {
      token,
    };
    fetch(`${process.env.REACT_APP_API}/listKontenPeserta`, {
      method: "POST",
      body: JSON.stringify(senData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log("data", hasil);
        if (hasil.status === "berhasil") {
          setDataListVideo(hasil.data);
        } else {
          history.push("/");
          localStorage.removeItem("dataloginPeserta");
          return;
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const logOut = () => {
    localStorage.removeItem("dataloginPeserta");
    history.push("/");
  };
  return (
    
    <>
    <div className="index">
      <Navbar></Navbar>
    </div>
      {/* modal play */}
      <Modal
        show={handleShowVideo}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{namaLinkVideo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="h-auto">
            {
              <>
                <ReactPlayer
                  pip={true}
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 1,
                        origin: window.location.origin,
                      },
                    },
                  }}
                  width="100"
                  height="300px"
                  controls={true}
                  url={`${linkVideo}`}
                />
              </>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="jumbotron">
        <h1 className="display-4">Selamat Datang</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <button
          onClick={() => logOut()}
          className="btn btn-danger btn-lg ml-3"
          role="button"
        >
          Log Out
        </button>

        <Link to="/quiz" className="btn btn-primary btn-lg m-2">
          Quiz
        </Link>
        <form className="form-inline">
          <input
            style={{ marginLeft: "auto" }}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
          ></input>
        </form>
      </div>

      <div className="row justify-content-center">
        {dataListVideo
          ? dataListVideo.map((data, index) => {
              console.log(data);
              return (
                <div
                  key={index}
                  className="card m-3 col-md-4 col-lg-3"
                  style={{ width: "18rem", height: "auto", border: "none" }}
                >
                  <img
                    onClick={() => handleOpenVideo(data)}
                    src={data.link_thumbnail}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.judul}</h5>
                    <p className="card-text">{data.keterangan}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};
export default ListVideoUser;
