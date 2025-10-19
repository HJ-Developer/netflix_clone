import { lazy, Suspense, useEffect, useState } from "react";
import requests, { options } from "../assets/requests";

import { CarouselSkeleton, HeroSkeleton } from "../components/Skeleton";
import { useNavigate } from "react-router-dom";
const Hero = lazy(() => import("../components/Hero"));
const Carousel = lazy(() => import("../components/Carousel"));

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [
    {
      trending,
      netflixOriginals,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    },
    setCollections,
  ] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          fetchTrending,
          fetchNetflixOriginals,
          fetchTopRated,
          fetchActionMovies,
          fetchComedyMovies,
          fetchHorrorMovies,
          fetchRomanceMovies,
          fetchDocumentaries,
        ] = await Promise.all([
          fetch(requests.fetchTrending, options).then((res) => res.json()),
          fetch(requests.fetchNetflixOriginals, options).then((res) =>
            res.json()
          ),
          fetch(requests.fetchTopRated, options).then((res) => res.json()),
          fetch(requests.fetchActionMovies, options).then((res) => res.json()),
          fetch(requests.fetchComedyMovies, options).then((res) => res.json()),
          fetch(requests.fetchHorrorMovies, options).then((res) => res.json()),
          fetch(requests.fetchRomanceMovies, options).then((res) => res.json()),
          fetch(requests.fetchDocumentaries, options).then((res) => res.json()),
        ]);
        setCollections({
          trending: fetchTrending.results,
          netflixOriginals: fetchNetflixOriginals.results,
          topRated: fetchTopRated.results,
          actionMovies: fetchActionMovies.results,
          comedyMovies: fetchComedyMovies.results,
          horrorMovies: fetchHorrorMovies.results,
          romanceMovies: fetchRomanceMovies.results,
          documentaries: fetchDocumentaries.results,
        });
      } catch (error) {
        console.error("Error fetching data: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <HeroSkeleton />
        <CarouselSkeleton count={10} />
        <CarouselSkeleton count={10} />
        <CarouselSkeleton count={10} />
        <CarouselSkeleton count={10} />
      </>
    );
  }
  const categories = [
    { name: "Trending", cat: trending },
    { name: "Netflix Originals", cat: netflixOriginals },
    { name: "Top Rated", cat: topRated },
    { name: "Documentaries", cat: documentaries },
  ];

  // const mylist = localStorage.getItem("mylist");
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero movies={topRated} />
      </Suspense>
      <section id="carouselContainer">
        <Suspense fallback={<CarouselSkeleton />}>
          {categories.map((category) => {
            let key = 0;
            key = key++;
            return (
              <Carousel
                collection={category.cat}
                name={category.name}
                key={category?.name || key}
              />
            );
          })}
        </Suspense>
      </section>
    </>
  );
};

export default Home;
