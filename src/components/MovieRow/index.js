import React, {useState } from "react";
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(-450);
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x = 0;
        }
        setScrollX(x);
    }
    const handleRightArrow = () => {

        let x = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = items.results.length * 200;
        if((window.innerWidth - listWidth) > x ) {
            x = (window.innerWidth - listWidth) - 60;
        }
        setScrollX(x);
    }
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 200
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key} className="movieRow--item">
                             <img src={'https://image.tmdb.org/t/p/w300'+item.poster_path} alt={item.original_title}></img>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}