import './spike.css';

import { useState } from 'react';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import ReactModal from 'react-modal';
import { useAlert } from 'react-alert';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


const SaveModal = (props: any) => {
    const [animationName, setAnimationName] = useState<string>("");
    const [creatorUserName, setCreatorUserName] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [animationLink, setAnimationLink] = useState<string>("");
    const db = getFirestore(props.app);
    const alert = useAlert()

    const saveAnimation = async () => {
        if (creatorUserName === "" && animationName === "" && !isPrivate) {
            alert.error("You must add a username and an animation name.")
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "animations"),
            {
                private: isPrivate,
                animationName: animationName,
                creatorUsername: creatorUserName,
                upvote: 0,
                data: props.animation,
                size: props.size
            });
            setAnimationLink(`${process.env.REACT_APP_URL}/${docRef.id}`)
            alert.success("Your animation has been saved")
        } catch (error) {
            alert.error("Your animation hasn't been saved... :( Check your internet connection and try again and if it's still not working contact me !")
            console.log(error)
        }
    }
    

    return (
        <>
            <ReactModal
                isOpen={true}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="modalContainer">
                    {animationLink === "" ? (
                        <>
                            <h2 className="modalTitle">
                                Save your animation
                            </h2>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: "2%"}}>
                                <input type="radio" value="Public" name="public" checked={!isPrivate} onChange={() => setIsPrivate(false)}/>Public
                                <input type="radio" value="Private" name="private" checked={isPrivate} onChange={() => setIsPrivate(true)}/>Private
                            </div>
                            {!isPrivate && (
                                <div className="nameInput">
                                    <label>
                                        <div style={{textAlign: 'left'}}>Your username</div>
                                        <input className="textInput" type="text" name="username" placeholder="username" onChange={(e: any) => setCreatorUserName(e.target.value)}/>
                                    </label>
                                    <label>
                                    <div style={{textAlign: 'left'}}>Animation Name</div>
                                        <input className="textInput" type="text" name="username" placeholder="animation name" onChange={(e: any) => setAnimationName(e.target.value)}/>
                                    </label>
                                </div>
                            )}
                            <div className="modalInfoText">
                                Be careful by clicking save you won't be able to update your animation anymore.
                            </div>
                            <div className="sizeButtonContainer" style={{marginTop: "5%"}}>
                                <button className="modalButton" onClick={() => props.closeModal()}>close</button>
                                <button style={{marginLeft: "2%"}} className="modalButton" onClick={saveAnimation}>Save</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="modalInfoText">
                                You can copy your animation link via the copy button below. <br/><br/> You can also open you animation now : <a href={animationLink} target="_blank" rel="noreferrer">{animationLink}</a>
                            </div>
                            <div className="modalInfoText">
                                {isPrivate ? (
                                    "Be careful this is the only time you will be able to copy your animation link. Save it in a safe place."
                                ) : (
                                    "You can now see your animation in the animations page. Please be fair play and don't upvote for your own animations (accounts are coming soon and will prevent this)."
                                )}
                            </div>
                            <div className="sizeButtonContainer" style={{marginTop: "5%"}}>
                                <button className="modalButton" onClick={() => props.closeModal()}>Close</button>
                                <button style={{marginLeft: "2%"}} className="modalButton" onClick={() => {
                                    navigator.clipboard.writeText(animationLink)
                                    alert.success("Animation link successfully copied")
                                }}>
                                    Copy Animation link
                                </button>
                            </div> 
                        </>
                    )}
                </div>
            </ReactModal>
        </>
    )
}

export default SaveModal;