import {AppBar, Box, Fab, IconButton, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FiberManualRecord, Home, Save} from "@mui/icons-material";
import net from "../../Assets/roundnet.svg";
import shirt from "../../Assets/tshirt.png";
import shirt2 from "../../Assets/tshirt1.png";
import ball from "../../Assets/spikeball.png";
import Draggable, {DraggableData} from "react-draggable";

const DraggableSprite = ({containerWidth, containerHeight, children}) => {
    const [position, setPosition] = useState({x: 0.1, y: 0.1}); // Initial normalized position
    const [dragging, setDragging] = useState(false);
    const [path, setPath] = useState(""); // Relative path string
    const [points, setPoints] = useState<{ rx: number, ry: number }[]>([]); // Array of relative points

    const handleMouseDown = (e) => {
        setDragging(true);
        const startX = e.clientX / containerWidth;
        const startY = e.clientY / containerHeight;
        setPoints([{rx: startX, ry: startY}]);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;

        const currentX = e.clientX / containerWidth;
        const currentY = e.clientY / containerHeight;
        setPosition({x: currentX, y: currentY});

        setPoints((prevPoints) => [...prevPoints, {rx: currentX, ry: currentY}]);
    };

    const handleMouseUp = () => {
        setDragging(false);

        // Convert relative points to SVG path string
        const pathString = points
            .map((point, index) =>
                index === 0 ? `M ${point.rx} ${point.ry}` : `L ${point.rx} ${point.ry}`
            )
            .join(" ");
        setPath(pathString);

        console.log("Relative Path:", pathString); // Example: M 0.1 0.1 L 0.5 0.5 L 0.8 0.8
    };

    return (
        <div
            style={{
                position: "absolute",
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`,
                width: "50px",
                height: "50px",
                backgroundColor: "red",
                cursor: "grab",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {children}
        </div>
    );
};

export type Animation = {
    id: string,
    width: number, height: number, data: { step: number, duration: number, player: string, path: string }[]
}

export const RecordAnimation = () => {

    const [size, setSize] = useState<{ width: number; height: number }>({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [step, setStep] = useState(0);
    const [draggableData, setDraggableData] = useState<{
        player: string,
        start: number,
        data: { rx: number, ry: number }[]
    } | null>(null);
    const [animation, setAnimation] = useState<Animation | null>(null);

    const triggerRecording = () => {
        if (!isRecording) {
            startRecording()
        } else {
            stopRecording()
        }
    }

    const stopRecording = () => {
        setDraggableData(null);
        setIsRecording(false);
        console.log(animation)
    }

    const startRecording = () => {
        setAnimation({
            id: Date.now().toString(),
            width: size.width, height: size.height, data: []
        });
        setDraggableData(null);
        setIsRecording(true);
    }

    useEffect(() => {
        const listener = () => {
            setSize({width: window.innerWidth, height: window.innerHeight});
        };

        window.addEventListener("resize", listener)

        return () => {
            window.removeEventListener("resize", listener)
        }
    }, []);

    const handleDrag = (id: string, e: any, data: DraggableData) => {
        if (!isRecording)
            return;
        console.log(e)

        setDraggableData({
            player: id,
            start: Date.now(),
            data: [...draggableData?.data ?? [], {rx: e.screenX, ry: e.screenY}]
        });
    };

    const handleStop = () => {
        if (!isRecording || !draggableData || !animation)
            return;
        const pathString = draggableData.data
            .map(({rx, ry}, index) =>
                index === 0 ? `M ${rx} ${ry}` : `L ${rx} ${ry}`
            )
            .join(" ");
        setDraggableData(null);
        setAnimation({...animation,
            data: [...animation.data, {
                step,
                duration: Date.now() - draggableData.start,
                player: draggableData.player,
                path: pathString
            }]
        });
        setStep(step + 1);
    };

    return <Box sx={{width: "100%"}}>
        <AppBar position={"sticky"}>
            <Toolbar>
                <IconButton>
                    <Home/>
                </IconButton>
                <Typography variant="h6" sx={{flexGrow: 1}}>Strat Spike</Typography>
                {animation && !isRecording && <IconButton onClick={() => {
                    let animationsSaved = localStorage.getItem("animations") ?? "[]";
                    let animationsParsed = JSON.parse(animationsSaved) as Animation[];
                    console.log(JSON.stringify(animation))
                    localStorage.setItem("animations", JSON.stringify([...animationsParsed, animation]));
                }}>
                    <Save/>
                </IconButton>}
            </Toolbar>
        </AppBar>
        <Box sx={{
            width: "100%",
            height: "calc(100vh - 64px)",
            background: "green",
            alignItems: "center",
            display: "flex"
        }}>
            <div style={{
                borderRadius: "50%",
                border: "4px dashed black",
                position: "absolute",
                left: `calc(50% - ${(Math.min(size.height, size.width) * 0.5) / 2}px)`,
                top: `calc(50% - ${(Math.min(size.height, size.width) * 0.5) / 2}px)`,
                width: `${(Math.min(size.height, size.width) * 0.5)}px`,
                height: `${(Math.min(size.height, size.width) * 0.5)}px`,
                display: "flex",
                justifyContent: "center"
            }}>
                <img
                    alt={"roundnet"}
                    src={net}
                    style={{
                        padding: 20,
                        width: `${(Math.min(size.height, size.width) * 0.15)}px`,
                        height: `${(Math.min(size.height, size.width) * 0.15)}px`,
                        borderRadius: "50%",
                        border: "4px dashed black",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        msTransform: "translate(-50%, -50%)",
                        transform: "translate(-50%, -50%)"
                    }}/>
            </div>
            <Draggable onDrag={(e, data) => handleDrag("ball", e, data)} onStop={handleStop}>
                <img
                    id="ball"
                    src={ball}
                    style={{
                        width: 40,
                        position: "absolute",
                        top: `calc(${(Math.min(size.height, size.width) * 0.5) / 2}px - 70px)`,
                        left: `calc(50% - 90px)`
                    }}
                    draggable="false"
                    alt="playerA-tshirt"
                />
            </Draggable>
            <Draggable onDrag={(e, data) => handleDrag("playerA", e, data)} onStop={handleStop}>
                <img
                    id="playerA"
                    src={shirt}
                    style={{
                        width: 60,
                        position: "absolute",
                        top: `calc(${(Math.min(size.height, size.width) * 0.5) / 2}px - 90px)`,
                        left: `calc(50% - 30px)`
                    }}
                    draggable="false"
                    alt="playerA-tshirt"
                />
            </Draggable>
            <Draggable onDrag={(e, data) => handleDrag("playerB", e, data)} onStop={handleStop}>
                <img
                    id="playerB"
                    src={shirt}
                    style={{
                        width: 60,
                        position: "absolute",
                        top: `calc(50% - 30px)`,
                        left: `calc(50% + ${(Math.min(size.height, size.width) * 0.5) / 2}px + 30px)`
                    }}
                    draggable="false"
                    alt="playerB-tshirt"
                />
            </Draggable>
            <Draggable onDrag={(e, data) => handleDrag("playerC", e, data)} onStop={handleStop}>
                <img
                    id="playerC"
                    src={shirt2}
                    style={{
                        width: 60,
                        position: "absolute",
                        top: `calc(50% - 30px)`,
                        left: `calc(50% - ${(Math.min(size.height, size.width) * 0.5) / 2}px - 90px)`
                    }}
                    draggable="false"
                    alt="playerC-tshirt"
                />
            </Draggable>
            <Draggable onDrag={(e, data) => handleDrag("playerD", e, data)} onStop={handleStop}>
                <img
                    id="playerD"
                    src={shirt2}
                    style={{
                        width: 60,
                        position: "absolute",
                        top: `calc(50% + ${(Math.min(size.height, size.width) * 0.5) / 2}px + 30px)`,
                        left: `calc(50% - 30px)`
                    }}
                    draggable="false"
                    alt="playerD-tshirt"
                />
            </Draggable>
        </Box>
        <Fab sx={{position: "absolute", right: "16px", bottom: "16px"}} variant={"extended"}
             onClick={triggerRecording}>
            <FiberManualRecord sx={{mr: 1, color: isRecording ? "red" : "black"}}/>
            {isRecording ? "Stop recording" : "Start recording"}
        </Fab>
    </Box>
}