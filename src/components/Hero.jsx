import { useEffect, useState } from "react";
import { cred } from "../assets/requests";
import { InfoIcon, PlayIcon } from "lucide-react";
import { HeroSkeleton } from "./Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRecoilState } from "recoil";
import { movieState, videoState } from "../assets/atom";

const Hero = ({ movies }) => {
  const [current, setCurrent] = useState();
  const [videoPopup, setVideoPopup] = useRecoilState(videoState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  useEffect(() => {
    const random = Math.floor(Math.random() * (movies?.length || 20));
    setCurrent(movies?.[random]);
  }, [movies]);
  if (!current) return <HeroSkeleton />;

  return (
    current && (
      <section id="hero">
        <div className="banner">
          <LazyLoadImage
            src={`${cred.thumbnail_url}${
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
            <button
              onClick={() => {
                setVideoPopup(true);
                setCurrentMovie(current);
              }}
              className="btn --dark"
              id="infoBtn"
            >
              <span>More Info</span>
              <i className="icon">
                <InfoIcon />
              </i>
            </button>
          </div>
        </div>
        <div className="_blur"></div>
      </section>
    )
  );
};

export default Hero;
