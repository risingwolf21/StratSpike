import React, { useCallback, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import './spike.css';
import tshirt from '../Assets/tshirt.png'
import tshirt2 from '../Assets/tshirt1.png'
import spikeball from '../Assets/spikeball.png'

const SpikeStrat = () => {
    const [size, setSize] = useState(1);
    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

    const updatePosition = useCallback(() => {
        const roundnet = document.getElementById("roundnet");
        const shirt1 = document.getElementById("shirt1")?.style;
        const shirt2 = document.getElementById("shirt2")?.style;
        const shirt3 = document.getElementById("shirt3")?.style;
        const shirt4 = document.getElementById("shirt4")?.style;
        const ball = document.getElementById("ball")?.style;

        if (roundnet && shirt1 && shirt2 && shirt3 && shirt4 && ball) {
            const r_rect = roundnet.getBoundingClientRect();
            const x = r_rect.x + (r_rect.width / 2); 

            const y = r_rect.y + (r_rect.height / 2);

            const shirt_width_center = (50 * size) / 2;

            const shirt_height_center = (50 * size) / 2;

            shirt1.left = `${(x - r_rect.width / 2 - 80 * size - shirt_width_center).toString()}px`;
            shirt1.top = `${(y - shirt_height_center).toString()}px`;

            shirt2.left = `${(x - shirt_width_center).toString()}px`;
            shirt2.top = `${(y - r_rect.height / 2 - 80 * size - shirt_height_center).toString()}px`;

            shirt3.left = `${(x + r_rect.width / 2 + 80 * size - shirt_width_center).toString()}px`;
            shirt3.top = `${(y - shirt_height_center).toString()}px`;

            shirt4.left = `${(x - shirt_width_center).toString()}px`;
            shirt4.top = `${(y + r_rect.height / 2 + 80 * size - shirt_height_center).toString()}px`;

            ball.left = `${(x + 30).toString()}px`;
            ball.top = `${(y - r_rect.height / 2 - 80 * size).toString()}px`;
        }
        
    }, [size])

    useEffect(() => {
        updatePosition()
    }, [updatePosition])


    return (
        <>
            <div className="buttonContainer">
                <div>
                    <button className="sizeButton" onClick={() => {
                        setSize(size - 0.1)
                        updatePosition()
                        forceUpdate()
                    }}>
                        -
                    </button>
                    <button className="sizeButton" onClick={() => {
                        setSize(size + 0.1)
                        updatePosition()
                        forceUpdate()
                    }}>
                        +
                    </button>
                </div>
            </div>
            <div id="roundnet" style={{width: 70 * size, height: 70 * size}} className="roundnet"/>
            <div style={{width: 90 * size, height: 90 * size}} className="nhz"/>
            <div style={{width: 190 * size, height: 190 * size}} className="nhz"/>
            <Draggable>
                <img id="shirt1" src={tshirt} style={{width: 50 * size, position: "absolute"}} draggable="false" alt="team1-tshirt"/>
            </Draggable>
            <Draggable>
                    <img id="shirt2" src={tshirt} style={{width: 50 * size, position: "absolute"}} draggable="false" alt="team1-tshirt"/>
            </Draggable>
            <Draggable>
                    <img id="shirt3" src={tshirt2} style={{width: 50 * size, position: "absolute"}} draggable="false" alt="team2-tshirt"/>
            </Draggable>
            <Draggable>
                    <img id="shirt4" src={tshirt2} style={{width: 50 * size, position: "absolute"}} draggable="false" alt="team2-tshirt"/>
            </Draggable>
            <Draggable>
                    <img id="ball" src={spikeball} style={{width: 15 * size, position: "absolute"}} draggable="false" alt="spikeball-ball"/>
            </Draggable>
        </>
    )
}

export default SpikeStrat;