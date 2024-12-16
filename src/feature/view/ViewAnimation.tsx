import {useParams} from "react-router-dom";
import {AppBar, Box, Fab, IconButton, Toolbar, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Home, PlayArrow, Save} from "@mui/icons-material";
import {Animation} from "../record/RecordAnimation"
import { svgPathProperties } from "svg-path-properties";
import net from "../../Assets/roundnet.svg";
import ball from "../../Assets/spikeball.png";
import shirt from "../../Assets/tshirt.png";
import shirt2 from "../../Assets/tshirt1.png";


export const ViewAnimation = () => {
    const {id} = useParams();
    const [animation, setAnimation] = useState<Animation | undefined>(undefined);

    const [playerAPos, setPlayerAPos] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [playerBPos, setPlayerBPos] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [playerCPos, setPlayerCPos] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [playerDPos, setPlayerDPos] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const [ballPos, setBallPos] = useState<{ x: number, y: number }>({x: 0, y: 0})

    useEffect(() => {
        let saved = localStorage.getItem("animations") ?? "[]";
        let parsed = JSON.parse(saved) as Animation[];
        let animation = parsed.find(x => x.id === id);
        setAnimation(animation)
    }, [id]);

    if(!animation)
        return <div></div>

    const startReplay = () => {
        const playAnimation = async () => {
            for (const path of animation.data ?? []) {
                await replayPath(path.path, path.duration*10, path.player);
            }
        }
        playAnimation();
    }

    const replayPath = (path: string, duration: number, object: string) => {
        return new Promise<void>((resolve) => {
            const pathProperties = new svgPathProperties(path);
            const pathLength = pathProperties.getTotalLength();

            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;

                const progress = elapsed / duration;
                const currentPoint = pathProperties.getPointAtLength(progress * pathLength);

                switch (object) {
                    case "playerA":
                        setPlayerAPos({x: currentPoint.x, y: currentPoint.y});
                        break;
                    case "playerB":
                        setPlayerBPos({x: currentPoint.x, y: currentPoint.y});
                        break;
                    case "playerC":
                        setPlayerCPos({x: currentPoint.x, y: currentPoint.y});
                        break;
                    case "playerD":
                        setPlayerDPos({x: currentPoint.x, y: currentPoint.y});
                        break;
                    case "ball":
                        setBallPos({x: currentPoint.x, y: currentPoint.y});
                        break;
                    default:
                        break;
                }

                if (progress >= 1) {
                    resolve();
                    return;
                }

                requestAnimationFrame(animate);
            };

            animate();
        });
    };

    return <Box sx={{width: "100%"}}>
        <AppBar position={"sticky"}>
            <Toolbar>
                <IconButton>
                    <Home/>
                </IconButton>
                <Typography variant="h6" sx={{flexGrow: 1}}>Strat Spike</Typography>
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
                left: `calc(50% - ${(Math.min(animation.height, animation.width) * 0.5) / 2}px)`,
                top: `calc(50% - ${(Math.min(animation.height, animation.width) * 0.5) / 2}px)`,
                width: `${(Math.min(animation.height, animation.width) * 0.5)}px`,
                height: `${(Math.min(animation.height, animation.width) * 0.5)}px`,
                display: "flex",
                justifyContent: "center"
            }}>
                <img
                    alt={"roundnet"}
                    src={net}
                    style={{
                        padding: 20,
                        width: `${(Math.min(animation.height, animation.width) * 0.15)}px`,
                        height: `${(Math.min(animation.height, animation.width) * 0.15)}px`,
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
            <img
                id="ball"
                src={ball}
                style={{
                    width: 40,
                    position: "absolute",
                    left: ballPos.x +"px",
                    top: ballPos.y + "px"
                }}
                draggable="false"
                alt="playerA-tshirt"
            />
            <img
                id="playerA"
                src={shirt}
                style={{
                    width: 60,
                    position: "absolute",
                    left: playerAPos.x +"px",
                    top: playerAPos.y + "px"
                }}
                draggable="false"
                alt="playerA-tshirt"
            />
            <img
                id="playerB"
                src={shirt}
                style={{
                    width: 60,
                    position: "absolute",
                    left: playerBPos.x +"px",
                    top: playerBPos.y + "px"
                }}
                draggable="false"
                alt="playerB-tshirt"
            />
            <img
                id="playerC"
                src={shirt2}
                style={{
                    width: 60,
                    position: "absolute",
                    left: playerCPos.x +"px",
                    top: playerCPos.y + "px"
                }}
                draggable="false"
                alt="playerC-tshirt"
            />
            <img
                id="playerD"
                src={shirt2}
                style={{
                    width: 60,
                    position: "absolute",
                    left: playerDPos.x +"px",
                    top: playerDPos.y + "px"
                }}
                draggable="false"
                alt="playerD-tshirt"
            />
        </Box>
        <Fab sx={{position: "absolute", right: "16px", bottom: "16px"}} variant={"extended"}
             onClick={startReplay}>
            <PlayArrow sx={{mr: 1}}/>
            Start
        </Fab>
    </Box>
}