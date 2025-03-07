import { useEffect, useState } from "react";
import styles from './MoviePage.module.css'

function MoviePage() {
    const [filmData, setFilmData] = useState(null);
    const [staffData, setStaffData] = useState(null);
    const [countries, setCountries] = useState([]);
    const [genres, setGenres] = useState([]);


    useEffect(() => {
        fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', {
            method: 'GET',
            headers: {
                //пж не воруйте ключик ребята
                'X-API-KEY': '0f2af655-1ac7-4006-9be3-66d838923cc3',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setFilmData(res);
                
                let temp = res.countries.map(country => country.country + ' ');
                setCountries(temp);

                temp = res.genres.map(genre => genre.genre.toUpperCase() + ' ');
                setGenres(temp);

                console.log(res);
            })
            .catch(err => console.log(err))

        fetch('https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=301', {
            method: 'GET',
            headers: {
                //пж не воруйте ключик ребята
                'X-API-KEY': '0f2af655-1ac7-4006-9be3-66d838923cc3',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                let temp = res.filter(staff => 
                    staff.professionKey ==='DIRECTOR'
                );

                temp = temp.map(obj => obj.nameRu);
                setStaffData(temp);
                console.log(res);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            { filmData !== null ? (
                <div id={ styles.movie }>
                    <img src={ filmData.posterUrl } alt={ filmData.nameRu } id={ styles.poster }></img>
                    
                    <div>
                        <h1 className={ styles.title }>{ filmData.nameRu }</h1>
                        <h6 className={ styles.subtitle }>{ filmData.nameOriginal }</h6>
                        <p className={ styles.description }>{ filmData.shortDescription }</p>

                        <a href="#!" className={ styles.watchBtn }>Смотреть</a>

                        <h2>О фильме</h2>

                        <ul className={ styles.params }>
                            <li><span>Год производства</span>{ filmData.year }</li>
                            <li><span>Страна</span><p>{ countries }</p></li>
                            <li><span>Жанр</span><p>{ genres }</p></li>
                            <li><span>Слоган</span> { filmData.slogan } </li>
                            <li><span>Режиссёр</span><p>{ staffData }</p></li>
                            <li><span>Время</span>{ filmData.filmLength }</li>
                            
                        </ul>
                    </div>

                    <div>
                        <span className={ styles.mainRating }>{ filmData.ratingKinopoisk }</span>
                        <span className={ styles.voteCount }>{ filmData.ratingKinopoiskVoteCount } оценки</span>
                        <a href="#!" className={ styles.reviewsCount }>{ filmData.reviewsCount } рецензии</a>
                    </div>
                </div>
            ) : 
            (<p>Загрузка</p>) }
        </>
    );
};

export default MoviePage;