import React, { useState, useEffect } from "react";
import "./Equalizer.css";

const Equalizer = () => {
    const [barHeights, setBarHeights] = useState([10, 20, 30, 40, 50]);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setRandomHeights();
    //     }, 300);

    //     return () => clearInterval(intervalId);
    // }, []);

    // const setRandomHeights = () => {
    //     const newHeights = barHeights.map(
    //         () => Math.floor(Math.random() * 300) + 5
    //     );
    //     setBarHeights(newHeights);
    // };

    return (
        <div className="equalizer" >
            {barHeights.map((height, index) => (
                <div key={index} className="bar"></div>
            ))}
        </div>
    );
};

export default Equalizer;
