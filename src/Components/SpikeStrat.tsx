import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './spike.css';
import tshirt from './tshirt.png'
import tshirt2 from './tshirt1.png'
import spikeball from './spikeball.png'
import { useReactMediaRecorder } from 'react-media-recorder';

const SpikeStrat = () => {
    const [size, setSize] = useState(50);
    // const [isRecording, setIsRecording] = useState(false);
    // const {
    //     status,
    //     startRecording,
    //     stopRecording,
    //     mediaBlobUrl,
    //   } = useReactMediaRecorder({ screen: true, audio: true });

    // const viewRecording = () => {
    //     window!.open(mediaBlobUrl || undefined, "_blank")!.focus();
    // };

    // const downloadRecording = () => {
    //     if (mediaBlobUrl) {
    //         const link = document.createElement("a");

    //         // Set link's href to point to the Blob URL
    //         link.href = mediaBlobUrl;
    //         link.download = "startSpike.mp4";
        
    //         // Append link to the body
    //         document.body.appendChild(link);
        
    //         // Dispatch click event on the link
    //         // This is necessary as link.click() does not work on the latest firefox
    //         link.dispatchEvent(
    //             new MouseEvent('click', { 
    //                 bubbles: true, 
    //                 cancelable: true, 
    //                 view: window 
    //             })
    //         );
        
    //         // Remove link from body
    //         document.body.removeChild(link);
    //     }
    //   };

    return (
        <>
            <div className="buttonContainer">
                {/* <div>
                    <button className="sizeButton" onClick={() => {
                        if (status && status === "recording") {
                            stopRecording();
                            setIsRecording(false);
                            console.log(status)
                            console.log(mediaBlobUrl)
                        } else {
                            startRecording();
                            setIsRecording(true);
                        }
                    }}>
                        {status && status === "recording" ? (
                            "Stop recording"
                        ) : (
                            "Record"
                        )}
                    </button>
                    {status && status === "stopped" && mediaBlobUrl && (
                        <button className="sizeButton" onClick={viewRecording}>
                            View
                        </button>
                    )}
                    {status && status === "stopped" && mediaBlobUrl && (
                        <button className="sizeButton" onClick={downloadRecording}>
                            Download
                        </button>
                    )}
                </div> */}
                <div>
                    <button className="sizeButton" onClick={() => setSize(size - 10)}>
                        -
                    </button>
                    <button className="sizeButton" onClick={() => setSize(size + 10)}>
                        +
                    </button>
                </div>
            </div>
            <div style={{width: size + 20, height: size + 20}} className="roundnet">
            </div>
            <Draggable>
                <img src={tshirt} style={{width: size}} draggable="false"/>
            </Draggable>
            <Draggable>
                    <img src={tshirt} style={{width: size}} draggable="false"/>
            </Draggable>
            <Draggable>
                    <img src={tshirt2} style={{width: size}} draggable="false"/>
            </Draggable>
            <Draggable>
                    <img src={tshirt2} style={{width: size}} draggable="false"/>
            </Draggable>
            <Draggable>
                    <img src={spikeball} style={{width: size > 55 ? size - 40 : 15}} draggable="false"/>
            </Draggable>
        </>
    )
}

export default SpikeStrat;