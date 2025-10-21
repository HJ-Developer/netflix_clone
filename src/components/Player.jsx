import Modal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { movieState, videoState } from "../assets/atom";
import Box from "@mui/material/Box";
import {
  PauseIcon,
  PlayIcon,
  PlusIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cred } from "../assets/requests";
import ReactPlayer from "react-player";

const Player = () => {
  const [videoPopup, setVideoPopup] = useRecoilState(videoState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    originTitle: "",
    originalLang: "",
    votesRate: "",
    votesTotal: "",
    releaseDate: "",
    description: "",
    genres: [],
  });

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

      if (data?.videos) {
        const i = data.videos.results.findIndex((e) => e.type === "Trailer");
        setTrailer(data.videos?.results[i]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    };
    const setDetails = async () => {
      setMovieDetails({
        title: currentMovie?.title,
        originTitle: currentMovie?.original_title,
        originalLang: currentMovie?.original_language,
        votesRate: Math.round(currentMovie?.vote_average * 10),
        votesTotal: currentMovie?.vote_count,
        releaseDate: currentMovie?.release_date,
        description: currentMovie?.overview,
        genres: genres,
      });
    };
    fetchMovie();
    setDetails();
  }, [currentMovie]);

  return (
    <div>
      <Modal
        open={videoPopup}
        onClose={handleClose}
        style={{ overflowY: "scroll" }}
      >
        <>
          <i
            id="closeModal"
            className="icon _light -closeBtn --circ"
            onClick={handleClose}
          >
            {<XIcon />}
          </i>
          <Box className="_modal">
            <div className="_playerContainer">
              {trailer ? (
                <ReactPlayer
                  className="_player"
                  src={`https://www.youtube.com/watch?v=${trailer}`}
                  playing={playing}
                  // controls
                  width={"100%"}
                  height={"100%"}
                  muted={muted}
                  // playIcon={}
                />
              ) : (
                <div
                  className="_player"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--opaqueBackground)",
                  }}
                >
                  <h2>404 - Trailer not found</h2>
                </div>
              )}
            </div>
            <section className="_mediaInfo">
              <div className="_playerControls">
                <section>
                  <i
                    className="icon _dark --rect"
                    onClick={() => setPlaying(!playing)}
                    title="Play/Pause"
                  >
                    {playing ? <PauseIcon /> : <PlayIcon />}
                  </i>
                  <i className="icon _light --circ" title="Add to my favorites">
                    <PlusIcon />
                  </i>
                  <i className="icon _light --circ" title="Like">
                    <ThumbsUpIcon />
                  </i>
                  <i className="icon _light --circ" title="Dislike">
                    <ThumbsDownIcon />
                  </i>
                </section>
                <section>
                  <i
                    className="icon _light --circ"
                    onClick={() => setMuted(!muted)}
                    title="Muted/Unmuted"
                  >
                    {muted ? <VolumeXIcon /> : <Volume2Icon />}
                  </i>
                </section>
              </div>
              <aside>
                <h2>
                  <span className="rate">{`${movieDetails.votesRate}% Liked`}</span>
                  {movieDetails.releaseDate}
                </h2>
                <p className="desc">{movieDetails.description}</p>
                <div className="other">
                  <h3>
                    <span>Genres: </span>
                    {movieDetails.genres
                      .map((g) => {
                        return g.name;
                      })
                      .join(", ")}
                  </h3>
                  <h3>
                    <span>Original language: </span>
                    {`'${movieDetails.originalLang}'`}
                  </h3>
                  <h3>
                    <span>Total votes: </span>
                    {movieDetails.votesTotal}
                  </h3>
                </div>
              </aside>
            </section>
          </Box>
        </>
      </Modal>
    </div>
  );
};

export default Player;
