import "./spike.css";

import React, { useCallback, useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import spikeball from "../Assets/spikeball.png";
import tshirt from "../Assets/tshirt.png";
import tshirt2 from "../Assets/tshirt1.png";

const getSize = () => {
  const width = window.innerWidth;

  if (width < 300) {
    return 0.9;
  } else if (width > 300 && width < 400) {
    return 1;
  } else if (width > 400 && width < 500) {
    return 1.1;
  } else if (width > 500 && width < 600) {
    return 1.2;
  } else if (width > 600 && width < 700) {
    return 1.3;
  } else if (width > 700 && width < 800) {
    return 1.4;
  } else if (width > 800 && width < 900) {
    return 1.5;
  } else if (width > 900 && width < 1000) {
    return 1.6;
  } else if (width > 1000 && width < 1100) {
    return 1.7;
  } else if (width > 1100 && width < 1200) {
    return 1.8;
  } else if (width > 1200 && width < 1300) {
    return 1.9;
  } else if (width > 1300 && width < 1400) {
    return 2;
  } else if (width > 1400 && width < 1500) {
    return 2.1;
  } else if (width > 1500 && width < 1600) {
    return 2.2;
  } else if (width > 1600 && width < 1700) {
    return 2.3;
  } else if (width > 1700 && width < 1800) {
    return 2.4;
  } else if (width > 1800 && width < 1900) {
    return 2.5;
  } else if (width > 1900 && width < 2000) {
    return 2.6;
  } else {
    return 2.7;
  }
};

const ViewSpikeStrat = (props: any) => {
  const [size, setSize] = useState(getSize());
  const [animationSize, setAnimationSize] = useState(1.2);
  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [animation, setAnimation] = useState<any[]>([]);
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
  const db = getFirestore(props.app);

  const updatePosition = useCallback(() => {
    const roundnet = document.getElementById("roundnet");
    const shirt1 = document.getElementById("shirt1")?.style;
    const shirt2 = document.getElementById("shirt2")?.style;
    const shirt3 = document.getElementById("shirt3")?.style;
    const shirt4 = document.getElementById("shirt4")?.style;
    const ball = document.getElementById("ball")?.style;

    if (roundnet && shirt1 && shirt2 && shirt3 && shirt4 && ball) {
      const r_rect = roundnet.getBoundingClientRect();
      const x = r_rect.x + r_rect.width / 2;

      const y = r_rect.y + r_rect.height / 2;

      const shirt_width_center = (50 * size) / 2;

      const shirt_height_center = (50 * size) / 2;

      shirt1.left = `${(
        x -
        r_rect.width / 2 -
        80 * size -
        shirt_width_center
      ).toString()}px`;
      shirt1.top = `${(y - shirt_height_center).toString()}px`;

      shirt2.left = `${(x - shirt_width_center).toString()}px`;
      shirt2.top = `${(
        y -
        r_rect.height / 2 -
        80 * size -
        shirt_height_center
      ).toString()}px`;

      shirt3.left = `${(
        x +
        r_rect.width / 2 +
        80 * size -
        shirt_width_center
      ).toString()}px`;
      shirt3.top = `${(y - shirt_height_center).toString()}px`;

      shirt4.left = `${(x - shirt_width_center).toString()}px`;
      shirt4.top = `${(
        y +
        r_rect.height / 2 +
        80 * size -
        shirt_height_center
      ).toString()}px`;

      ball.left = `${(x + 30).toString()}px`;
      ball.top = `${(y - r_rect.height / 2 - 80 * size).toString()}px`;
    }
  }, [size]);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  const getAnimation = async () => {
    const docRef = doc(db, "animations", props.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setAnimation(docSnap.data().data);
      setAnimationSize(docSnap.data().size);
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getAnimation();
  }, []);

  const resetShirt = () => {
    const shirt1 = document.getElementById("shirt1")?.style;
    const shirt2 = document.getElementById("shirt2")?.style;
    const shirt3 = document.getElementById("shirt3")?.style;
    const shirt4 = document.getElementById("shirt4")?.style;
    const ball = document.getElementById("ball")?.style;
    if (shirt1 && shirt2 && shirt3 && shirt4 && ball) {
      shirt1.transform = "translate(0px, 0px)";
      shirt2.transform = "translate(0px, 0px)";
      shirt3.transform = "translate(0px, 0px)";
      shirt4.transform = "translate(0px, 0px)";
      ball.transform = "translate(0px, 0px)";
    }
  };

  const viewAnimation = async () => {
    let i = 0;
    let i2 = 0;

    setIsViewing(true);
    resetShirt();
    requestAnimationFrame(function animate(timestamp) {
      const style = document.getElementById(animation[i].id)?.style;
      if (style) {
        const x = animation[i].data[i2].substring(
          animation[i].data[i2].indexOf("(") + 1,
          animation[i].data[i2].lastIndexOf("px,")
        );
        const y = animation[i].data[i2].substring(
          animation[i].data[i2].indexOf(" ") + 1,
          animation[i].data[i2].lastIndexOf("px)")
        );
        const xSize = parseInt(x) * (size / animationSize);
        const ySize = parseInt(y) * (size / animationSize);
        const transform = `translate(${xSize.toString()}px, ${ySize.toString()}px)`;
        style.transform = transform;
      }

      if (i2 < animation[i].data.length - 1) {
        i2++;
        requestAnimationFrame(animate);
      } else if (i + 1 < animation.length - 1) {
        i++;
        i2 = 0;
        requestAnimationFrame(animate);
      } else {
        return;
      }
    });
    setIsViewing(false);
  };

  return (
    <>
      <button
        className="homeButton"
        style={{ fontSize: 20 * size }}
        onClick={() => {
          window.location.href =
            process.env.REACT_APP_URL || "https://strat-spike.vercel.app";
        }}
      >
        Spike<span style={{ color: "yellow" }}>Strat</span>
      </button>
      <div className="buttonContainer">
        {!isViewing && (
          <div>
            <button
              style={{ fontSize: 17 * size }}
              className="sizeButton"
              onClick={() => {
                if (size > 0.8) {
                  setSize(size - 0.1);
                  updatePosition();
                  forceUpdate();
                }
              }}
            >
              -
            </button>
            <button
              style={{ fontSize: 17 * size, marginLeft: 3 }}
              className="sizeButton"
              onClick={() => {
                setSize(size + 0.1);
                updatePosition();
                forceUpdate();
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
      <div
        id="roundnet"
        style={{ width: 70 * size, height: 70 * size }}
        className="roundnet"
      />
      <div style={{ width: 90 * size, height: 90 * size }} className="nhz" />
      <div style={{ width: 190 * size, height: 190 * size }} className="nhz" />

      <img
        id="shirt1"
        src={tshirt}
        style={{ width: 50 * size, position: "absolute" }}
        draggable="false"
        alt="team1-tshirt"
      />

      <img
        id="shirt2"
        src={tshirt}
        style={{ width: 50 * size, position: "absolute" }}
        draggable="false"
        alt="team1-tshirt"
      />

      <img
        id="shirt3"
        src={tshirt2}
        style={{ width: 50 * size, position: "absolute" }}
        draggable="false"
        alt="team2-tshirt"
      />

      <img
        id="shirt4"
        src={tshirt2}
        style={{ width: 50 * size, position: "absolute" }}
        draggable="false"
        alt="team2-tshirt"
      />

      <img
        id="ball"
        src={spikeball}
        style={{ width: 15 * size, position: "absolute" }}
        draggable="false"
        alt="spikeball-ball"
      />
      <button
        style={{
          fontSize: 17 * size,
          position: "absolute",
          left: 5,
          bottom: 5,
        }}
        className="sizeButton"
        onClick={viewAnimation}
      >
        Start Animation
      </button>
      <button
        style={{
          fontSize: 17 * size,
          position: "absolute",
          right: 5,
          bottom: 5,
        }}
        className="sizeButton"
        onClick={resetShirt}
      >
        Reset
      </button>
    </>
  );
};

export default ViewSpikeStrat;
