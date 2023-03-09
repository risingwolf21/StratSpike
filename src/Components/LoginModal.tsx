import './spike.css';

import { useState } from 'react';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import ReactModal from 'react-modal';
import { useAlert } from 'react-alert';

const customStyles = {
    content: {
    //   width: '95%',
    //   height: '100%'
    //   marginRight: '-50%',
    //   transform: 'translate(-50%, -50%)',
    },
  };


const LoginModal = (props: any) => {
    const [animationName, setAnimationName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [animationLink, setAnimationLink] = useState<string>("");
    const db = getFirestore(props.app);
    const alert = useAlert()

    const saveAnimation = async () => {
        if (email === "" && password === "" && !isPrivate) {
            alert.error("You must add an email and a password")
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "animations"),
            {
                private: isPrivate,
                animationName: animationName,
                creatorUsername: email,
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
                // style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="modalContainer">
                    <h2 className="modalTitle">
                        Login or Register
                    </h2>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="nameInput">
                        <label>
                            <div style={{textAlign: 'left'}}>Your email</div>
                            <input className="textInput" type="email" name="email" placeholder="email" onChange={(e: any) => setEmail(e.target.value)}/>
                        </label>
                        <label>
                        <div style={{textAlign: 'left'}}>Your password</div>
                            <input className="textInput" type="password" name="password" placeholder="password" onChange={(e: any) => setPassword(e.target.value)}/>
                        </label>
                    </div>
                    <div className="nameInput">
                        <label>
                            <div style={{textAlign: 'left'}}>Your email</div>
                            <input className="textInput" type="email" name="email" placeholder="email" onChange={(e: any) => setEmail(e.target.value)}/>
                        </label>
                        <label>
                        <div style={{textAlign: 'left'}}>Your password</div>
                            <input className="textInput" type="password" name="password" placeholder="password" onChange={(e: any) => setPassword(e.target.value)}/>
                        </label>
                    </div>

                    </div>
                    
                    <div className="sizeButtonContainer" style={{marginTop: "5%"}}>
                        <button className="modalButton" onClick={() => props.closeModal()}>close</button>
                        <button style={{marginLeft: "2%"}} className="modalButton" onClick={saveAnimation}>Login</button>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}

export default LoginModal;