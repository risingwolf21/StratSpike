import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './spike.css';
import tshirt from '../Assets/tshirt.png'
import tshirt2 from '../Assets/tshirt1.png'
import spikeball from '../Assets/spikeball.png'
import { useReactMediaRecorder } from 'react-media-recorder';

const SpikeStrat = () => {
    const [size, setSize] = useState(50);
    const [shirt1Pos, setShirt1Pos] = useState<any>([]);
    const [shirt2Pos, setShirt2Pos] = useState<any>([]);
    const [shirt3Pos, setShirt3Pos] = useState<any>([]);
    const [shirt4Pos, setShirt4Pos] = useState<any>([]);

    // const [roundnetY, setRoundnetY] = useState<number>();

    useEffect(() => {
        const roundnet = document.getElementById("roundnet");
        const shirt = document.getElementById("shirt1");
        const shirt1 = document.getElementById("shirt1")?.style;
        const shirt2 = document.getElementById("shirt2")?.style;
        const shirt3 = document.getElementById("shirt3")?.style;
        const shirt4 = document.getElementById("shirt4")?.style;
        const ball = document.getElementById("ball")?.style;

        if (roundnet && shirt1 && shirt2 && shirt3 && shirt4 && ball && shirt) {
            const r_rect = roundnet.getBoundingClientRect();
            const x = r_rect.x + (r_rect.width / 2); 

            const y = r_rect.y + (r_rect.height / 2);

            const s_rect = shirt.getBoundingClientRect();
            const shirt_width_center = s_rect.width / 2; 

            const shirt_height_center = s_rect.height / 2;

            // setShirt1Pos([
            //     {
            //         x: (x - r_rect.width / 2 - 30).toString(),
            //         y: y.toString()
            //     }
            // ])
            // console.log(shirt1Pos)

            // setShirt2Pos([
            //     {
            //         x: (x - r_rect.width / 2 - 30).toString(),
            //         y: y.toString()
            //     }
            // ])
            shirt1.left = `${(x - r_rect.width / 2 - 70 - shirt_width_center).toString()}px`;
            shirt1.top = `${(y - shirt_height_center).toString()}px`;

            shirt2.left = `${(x - shirt_width_center).toString()}px`;
            shirt2.top = `${(y - r_rect.height / 2 - 70 - shirt_height_center).toString()}px`;

            shirt3.left = `${(x + r_rect.width / 2 + 70 - shirt_width_center).toString()}px`;
            shirt3.top = `${(y - shirt_height_center).toString()}px`;

            shirt4.left = `${(x - shirt_height_center).toString()}px`;
            shirt4.top = `${(y + r_rect.height / 2 + 70 - shirt_width_center).toString()}px`;

            ball.left = `${(x + 30).toString()}px`;
            ball.top = `${(y - r_rect.height / 2 - 70).toString()}px`;
        }
    }, [shirt1Pos])


    return (
        <>
            <div className="buttonContainer">
                <div>
                    <button className="sizeButton" onClick={() => setSize(size - 10)}>
                        -
                    </button>
                    <button className="sizeButton" onClick={() => setSize(size + 10)}>
                        +
                    </button>
                </div>
            </div>
            <div id="roundnet" style={{width: size + 20, height: size + 20}} className="roundnet">
            </div>
            <Draggable>
                <img id="shirt1" src={tshirt} style={{width: size, position: "absolute"}} draggable="false" alt="team1-tshirt"/>
            </Draggable>
            <Draggable>
                    <img id="shirt2" src={tshirt} style={{width: size, position: "absolute"}} draggable="false" alt="team1-tshirt"/>
            </Draggable>
            <Draggable>
                    <img id="shirt3" src={tshirt2} style={{width: size, position: "absolute"}} draggable="false" alt="team2-tshirt"/>
            </Draggable>
            <Draggable>
                    <img id="shirt4" src={tshirt2} style={{width: size, position: "absolute"}} draggable="false" alt="team2-tshirt"/>
            </Draggable>
            <Draggable>
                    <img id="ball" src={spikeball} style={{width: size > 55 ? size - 40 : 15, position: "absolute"}} draggable="false" alt="spikeball-ball"/>
            </Draggable>
        </>
    )
}

export default SpikeStrat;