import React, {useContext, useEffect, useRef, useState} from "react";
import API from '../api_interface/api_interface';
import axios from "axios";
export default function Scores() {
    let buttonOver = {
        x:0,
        y:0
    };
    useEffect(() => {
        getScore();
    }, []);
    const canvasRef3 = useRef(null);
    const [score, setScore] = useState('');
    const baseURL = `http://blue.cs.sonoma.edu:8054/api/v1/`;
    const getScore = () => {
        axios.get(`${baseURL}scores`)
            .then((response) => {
                const bigString = response.data;
                setScore(bigString);
            })
            .catch(error => console.error(`Error ${error}`));
    }



    useEffect(()=> {
        const render = () => {
            const canvas = canvasRef3.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,900,600);
            ctx.font = "20px serif"
            ctx.fillText('hi',100,100);
            if(score.length > 2) {
                ctx.fillText(score,100,100);
            }
            requestAnimationFrame(render);
        }
        render();

    },[]);



    /*let api = new API();
    const fetchData = () => {

        api.getScores()
            .then((response)=>{
                setScore(response.data)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    fetchData();*/





    return (
        <canvas
            id="main_canvas"
            onMouseMove={(event)=> {
                buttonOver.x = event.clientX;
                buttonOver.y = event.clientY;
            }}
            ref={canvasRef3}
            height={"600px"}
            width={"900px"}/>

    );
}