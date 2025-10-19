import { cred } from "../assets/requests";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRef } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

const Carousel = ({ collection, name }) => {
  const carouselRef = useRef(null);
  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: Math.max(window.innerWidth / -0.8, -630),
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: Math.min(window.innerWidth / 0.8, 630),
      behavior: "smooth",
    });
  };
  let _key = 0;

  if (collection == "personal") {
    const carousel = (
      <div className="carousel">
        <h2 className="category">{name}</h2>
        <ul className="_container" ref={carouselRef}>
          {/* {collection?.map((current) => {
            return (
              <li className="item" key={current?.id || _key}>
                <LazyLoadImage
                  src={`${cred.thumbnail_url}${
                    current?.backdrop_path || current?.poster_path
                  }`}
                  className="_card-cover"
                />
              </li>
            );
          })} */}
          <li className="item">
            <LazyLoadImage />
          </li>
        </ul>
        <i className="control _prev" onClick={scrollLeft}>
          <ArrowLeftIcon className="icon" />
        </i>
        <i className="control _next" onClick={scrollRight}>
          <ArrowRightIcon className="icon" />
        </i>
      </div>
    );

    return carousel;
  }

  return (
    <div className="carousel">
      <h2 className="category">{name}</h2>
      <ul className="_container" ref={carouselRef}>
        {collection?.map((current) => {
          return (
            <li className="item" key={current?.id || _key++}>
              <LazyLoadImage
                src={`${cred.thumbnail_url}${
                  current?.backdrop_path || current?.poster_path
                }`}
                className="_card-cover"
              />
            </li>
          );
        })}
      </ul>
      <i className="control _prev" onClick={scrollLeft}>
        <ArrowLeftIcon className="icon" />
      </i>
      <i className="control _next" onClick={scrollRight}>
        <ArrowRightIcon className="icon" />
      </i>
    </div>
  );
};

export default Carousel;
