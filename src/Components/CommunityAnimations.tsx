import './spike.css';

import { useEffect, useState } from 'react';
import { collection, getFirestore, onSnapshot, query, where } from '@firebase/firestore';

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

const CommunityAnimations = (props: any) => {
    const [animations, setAnimations] = useState<any[]>([]);

    useEffect(() => {
        const db = getFirestore(props.app);
        const q = query(collection(db, "animations"), where("private", "==", false));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            console.log(querySnapshot)
            const anims:any = []
            querySnapshot.forEach((doc) => {
                anims.push({
                    data: doc.data(),
                    id: doc.id
                })
            });
            setAnimations(anims)
        });
        return unsubscribe
    }, [props.app])

    return (
        <>
            <button 
                className="homeButton" 
                style={{fontSize: 20 * getSize()}}
                onClick={() => {
                    window.location.href = process.env.REACT_APP_URL || "https://stratspike.herokuapp.com"
                }}
            >
                Spike<span style={{color: 'yellow'}}>Strat</span>
            </button>
            <div className="communityButtonsContainer">
                {animations.map((animation: any) => {
                    return (
                        <button key={animation.id} style={{fontSize: 20 * getSize(), marginBottom: "5%"}} className="homeButtons" onClick={() => {
                            window.location.href = `${process.env.REACT_APP_URL}/${animation.id}`
                        }}>
                            {animation.data.animationName} by {animation.data.creatorUsername}
                        </button>
                    )
                })}
            </div>
        </>
    )
}

export default CommunityAnimations;