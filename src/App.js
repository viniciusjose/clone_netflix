import React, { useEffect, useState } from "react";
import Tmdb from "./api/Tmdb";
import './App.css';
import Header from "./components/Header/index";
import FeaturedMovie from "./components/FeaturedMovie/index";
import MovieRow from "./components/MovieRow/index";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {

      //Requisitando todos os filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Requisitando Filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      {movieList.length <= 0 &&
        <div className="loading">
          <img src={process.env.PUBLIC_URL+'/loading.gif'} alt="Logo do Netflix" />
        </div>  
      }
     <Header black={blackHeader}/>
     {featuredData &&
        <FeaturedMovie item={featuredData}/>
     }
     
      <section className="lists">
        {movieList.map((item, key) => (
          <div>
           <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>

      <footer>
        <p>Desenvolvido por <a href="https://www.linkedin.com/in/vinicius-jos%C3%A9-silva-408510156/" target="_blank">Vinícius José Silva</a></p>
        <p>Todos os direitos Reservados para <a href="https://www.netflix.com/br/" target="_blank">Netflix</a></p>
        <p>Dados utilizados do site <a href="https://www.themoviedb.org/?language=pt-BR" target="_blank">The Movie DB</a></p>
        <p>2021</p>
      </footer>  
    </div>
  );
};
