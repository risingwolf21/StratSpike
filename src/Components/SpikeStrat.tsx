import './spike.css';

import React, { useCallback, useEffect, useState } from 'react';

import Draggable from 'react-draggable';
import spikeball from '../Assets/spikeball.png'
import tshirt from '../Assets/tshirt.png'
import tshirt2 from '../Assets/tshirt1.png'
import SaveModal from './SaveModal';

const getSize = () => {
    const width = window.innerWidth

    if (width < 300) {
        return 0.9
    } else if (width > 300 && width < 400) {
        return 1
    } else if (width > 400 && width < 500) {
        return 1.1
    } else if (width > 500 && width < 600) {
        return 1.2
    } else if (width > 600 && width < 700) {
        return 1.3
    } else if (width > 700 && width < 800) {
        return 1.4
    } else if (width > 800 && width < 900) {
        return 1.5
    } else if (width > 900 && width < 1000) {
        return 1.6
    } else if (width > 1000 && width < 1100) {
        return 1.7
    } else if (width > 1100 && width < 1200) {
        return 1.8
    } else if (width > 1200 && width < 1300) {
        return 1.9
    } else if (width > 1300 && width < 1400) {
        return 2
    } else if (width > 1400 && width < 1500) {
        return 2.1
    } else if (width > 1500 && width < 1600) {
        return 2.2
    } else if (width > 1600 && width < 1700) {
        return 2.3
    } else if (width > 1700 && width < 1800) {
        return 2.4
    } else if (width > 1800 && width < 1900) {
        return 2.5
    } else if (width > 1900 && width < 2000) {
        return 2.6
    } else {
        return 2.7
    }

}

const SpikeStrat = (props: any) => {
    const [size, setSize] = useState(getSize());
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isViewing, setIsViewing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [step, setStep] = useState<number>(0);
    const [animation, setAnimation] = useState<any[]>([]);
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

    const handleDrag = (id: string) => {
        if (isRecording) {
            const transform = document.getElementById(id)?.style.transform;

            if (animation.length === step) {
                setAnimation([...animation, {
                    id,
                    data: [
                        transform
                    ]
                }])
            } else {
                animation[step].data.push(transform)
            }
        }
    }

    const handleStop = () => {
        if (isRecording) {
            setStep(step + 1);
        }
    }

    const resetShirt = () => {
        const shirt1 = document.getElementById("shirt1")?.style;
        const shirt2 = document.getElementById("shirt2")?.style;
        const shirt3 = document.getElementById("shirt3")?.style;
        const shirt4 = document.getElementById("shirt4")?.style;
        const ball = document.getElementById("ball")?.style;
        if (shirt1 && shirt2 && shirt3 && shirt4 && ball) {
            shirt1.transform = "translate(0px, 0px)"
            shirt2.transform = "translate(0px, 0px)"
            shirt3.transform = "translate(0px, 0px)"
            shirt4.transform = "translate(0px, 0px)"
            ball.transform = "translate(0px, 0px)"
        }
    }

    const viewAnimation = async () => {
        let i = 0;
        let i2 = 0;

        setIsViewing(true);
        resetShirt();
        requestAnimationFrame(function animate(timestamp) {
    
            const style = document.getElementById(animation[i].id)?.style;
            if (style) {
                style.transform = animation[i].data[i2]
            }
            
            if (i2 < animation[i].data.length) {
                i2++;
                requestAnimationFrame(animate);
            } else if (i + 1 < animation.length) {
                i++;
                i2 = 0;
                requestAnimationFrame(animate);
            } else {
                return;
            }
        });
        setIsViewing(false)
    }

    return (
        <>
            <button 
                className="homeButton" 
                style={{fontSize: 20 * size}}
                onClick={() => {
                    window.location.href = process.env.REACT_APP_URL || "https://stratspike.herokuapp.com"
                }}
            >
                Spike<span style={{color: 'yellow'}}>Strat</span>
            </button>
            <div className="buttonContainer">
                {!isRecording && !isViewing && animation.length === 0 && (
                    <div>
                        <button style={{fontSize: 17 * size}} className="sizeButton" onClick={() => {
                            if (size > 0.8) {
                                setSize(size - 0.1)
                                updatePosition()
                                forceUpdate()
                            }
                        }}>
                            -
                        </button>
                        <button style={{fontSize: 17 * size, marginLeft: 3}} className="sizeButton" onClick={() => {
                            setSize(size + 0.1)
                            updatePosition()
                            forceUpdate()
                        }}>
                            +
                        </button>
                    </div>
                )}
            </div>
            <div id="roundnet" style={{width: 70 * size, height: 70 * size}} className="roundnet"/>
            <div style={{width: 90 * size, height: 90 * size}} className="nhz"/>
            <div style={{width: 190 * size, height: 190 * size}} className="nhz"/>
            <Draggable
                onDrag={() => handleDrag("shirt1")}
                onStop={handleStop}
            >
                <img id="shirt1" src={tshirt} style={{width: 50 * size, position: "absolute"}} draggable="false" alt="team1-tshirt"/>
            </Draggable>
            <Draggable
                onDrag={() => handleDrag("shirt2")}
                onStop={handleStop}
            >
                    <img id="shirt2" src={tshirt} style={{width: 50 * size, position: "absolute"}} draggable="false" alt="team1-tshirt"/>
            </Draggable>
            <Draggable
                onDrag={() => handleDrag("shirt3")}
                onStop={handleStop}
            >
                    <img id="shirt3" src={tshirt2} style={{width: 50 * size, position: "absolute"}} draggable="false" alt="team2-tshirt"/>
            </Draggable>
            <Draggable
                onDrag={() => handleDrag("shirt4")}
                onStop={handleStop}
            >
                    <img id="shirt4" src={tshirt2} style={{width: 50 * size, position: "absolute"}} draggable="false" alt="team2-tshirt"/>
            </Draggable>
            <Draggable
                onDrag={() => handleDrag("ball")}
                onStop={handleStop}
            >
                    <img id="ball" src={spikeball} style={{width: 15 * size, position: "absolute"}} draggable="false" alt="spikeball-ball"/>
            </Draggable>
            <button style={{fontSize: 17 * size, position: 'absolute', left: 5, bottom: 5}} className="sizeButton" onClick={() => {
                       if (isRecording) {
                        setIsRecording(false)
                       } else {
                           setIsRecording(true)
                       }
                    }}>
                        {isRecording ? "Stop Recording" : "Record"}
            </button>
            {!isViewing && !isRecording && (
                <button style={{fontSize: 17 * size, position: 'absolute', right: 5, top: 5}} className="sizeButton" onClick={() => {
                    setAnimation([]);
                    setStep(0);
                    resetShirt();
                }}
                >
                            Reset
                </button>
            )}
            <div className="animationButtonsContainer">
                {!isRecording && animation.length > 0 && (
                    <button style={{fontSize: 17 * size}} className="sizeButton" onClick={viewAnimation}
                    >
                                View
                    </button>
                )}

                {!isRecording && animation.length > 0 && (
                    <button style={{fontSize: 17 * size, marginLeft: 3}} className="sizeButton" onClick={() => setIsSaving(true)}
                    >
                                Save
                    </button>
                )}
            </div>
            {isSaving && (
                <SaveModal 
                    animation={animation}
                    app={props.app}
                    closeModal={() => {
                        setIsSaving(false)
                    }}
                    size={size}
                />
            )}
        </>
    )
}

export default SpikeStrat;