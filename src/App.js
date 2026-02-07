import React, { useState, useRef, useEffect } from "react";
import "./index.css";

import valentineImg from "./assets/my_girl.jpeg";
import successVideo from "./assets/success_video.mp4";
import valentineSong from "./assets/valentine_song.mp3";
import potato from "./assets/potato.gif";

function Typewriter({ text, speed = 80 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <h1 className="valentine-title">{displayedText}</h1>;
}

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ top: "0px", left: "0px" });
  const [showMeme, setShowMeme] = useState(false);
  const [hearts, setHearts] = useState([]);

  const audioRef = useRef(null);
  const yesButtonSize = noCount * 20 + 16;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);

    const randomTop = Math.floor(Math.random() * 70 + 10) + "%";
    const randomLeft = Math.floor(Math.random() * 70 + 10) + "%";
    setNoButtonPos({ top: randomTop, left: randomLeft });

    if (noCount + 1 === 4) setShowMeme(true);
  };

  const createHeart = () => {
    const id = Date.now() + Math.random();

    const heart = {
      id,
      left: Math.random() * 100 + "vw",
      size: Math.random() * 20 + 16 + "px",
      duration: Math.random() * 3 + 3 + "s",
    };

    setHearts((prev) => [...prev, heart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 6000);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    audioRef.current?.play();

    const interval = setInterval(createHeart, 300);
    setTimeout(() => clearInterval(interval), 8000);
  };

  return (
    <div
      className="valentine-container"
      onClick={() => audioRef.current?.play()}
    >
      <audio ref={audioRef} src={valentineSong} loop preload="auto" />

      {yesPressed ? (
        <div className="center-content">
          <video
            src={successVideo}
            className="responsive-img"
            autoPlay
            loop
            muted
            playsInline
          />
          <h1 className="valentine-title">ife mi...that’s my girl! ❤️</h1>
        </div>
      ) : showMeme ? (
        <div
          className="meme-overlay"
          onClick={() => {
            setShowMeme(false);
            setNoCount(5);
          }}
        >
          <div className="meme-popup">
            <img src={potato} alt="Meme" style={{ width: "50%" }} />
            <p>Really? you think you have a choice in the matter?.</p>
          </div>
        </div>
      ) : (
        <div className="center-content">
          <img
            src={valentineImg}
            className="responsive-img"
            alt="Cute Valentine"
          />

          <Typewriter text="Oyin, will you be my Valentine? 💖" />

          <div className="button-container">
            <button
              className="yes-button"
              style={{ fontSize: `${yesButtonSize}px` }}
              onClick={handleYesClick}
            >
              Yes
            </button>

            {noCount < 5 && (
              <button
                className="no-button"
                style={{
                  position: noCount > 0 ? "absolute" : "static",
                  top: noButtonPos.top,
                  left: noButtonPos.left,
                }}
                onClick={handleNoClick}
              >
                No
              </button>
            )}
          </div>
        </div>
      )}

      {yesPressed && (
        <div className="heart-container">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="heart"
              style={{
                left: heart.left,
                fontSize: heart.size,
                animationDuration: heart.duration,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
