import { useEffect, useState } from "react";
import { cred } from "../assets/requests";
import { InfoIcon, PlayIcon } from "lucide-react";

const Hero = ({ movies }) => {
  const [current, setCurrent] = useState();
  useEffect(() => {
    const random = Math.floor(Math.random() * movies?.length);
    setCurrent(movies?.[random]);
  }, []);
  return (
    <section id="hero">
      <div className="banner">
        <img
          src={`${cred.image_url}${
            current?.backdrop_path || current?.poster_path
          }`}
          alt="cover image"
          className="_hero-cover"
        />
      </div>
      <div className="content">
        <h1 className="title">{current?.title}</h1>
        <p className="desc">{current?.overview} </p>
        <div className="btns">
          <button className="btn  --light" id="playBtn">
            <i className="icon">
              <PlayIcon />
            </i>
            <span>Play</span>
          </button>
          <button className="btn --dark" id="infoBtn">
            <span>More Info</span>
            <i className="icon">
              <InfoIcon />
            </i>
          </button>
        </div>
      </div>
      <div className="_blur"></div>
    </section>
  );
};

export default Hero;
