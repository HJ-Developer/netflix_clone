import Modal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { movieState, videoState } from "../assets/atom";
import Box from "@mui/material/Box";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cred } from "../assets/requests";
import ReactPlayer from "react-player";

const Player = () => {
  const [videoPopup, setVideoPopup] = useRecoilState(videoState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState([]);
  const [muted, setMuted] = useState(true);

  const handleClose = () => {
    setVideoPopup(false);
  };

  useEffect(() => {
    if (!currentMovie) return;

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          currentMovie?.media_type === "tv" ? "tv" : "movie"
        }/${currentMovie?.id}?api_key=${
          cred.API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      console.log(data?.videos);

      if (data?.videos) {
        const i = data.videos.results.findIndex(
          (e) => e.type === "Official Trailer" || "Trailer"
        );
        setTrailer(data.videos?.results[i]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }

      // console.log(data);
    };
    fetchMovie();
  }, []);

  console.log(`https://www.youtube.com/watch?v=${trailer}`);

  return (
    <div>
      <Modal open={videoPopup} onClose={handleClose}>
        <Box className="_modal">
          {/* Modal {currentMovie.title} */}
          <i className="icon _light -closeBtn --circ" onClick={handleClose}>
            {<XIcon />}
          </i>
          <div className="_playerContainer">
            <ReactPlayer
              className="_player"
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              playing
              controls
              muted={muted}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Player;
