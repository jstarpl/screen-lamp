import "./styles.css";

import chroma from "chroma-js";
import { useState, useEffect } from "react";

const TEMPERATURE_LOCALSTORAGE = "temperature";
const BRIGHTNESS_LOCALSTORAGE = "brightness";
const HIDECONTROLS_LOCALSTORAGE = "hideControls";
const COLORSHIFT_LOCALSTORAGE = "colorShift";

export default function App() {
  const defaultTemperature =
    localStorage.getItem(TEMPERATURE_LOCALSTORAGE) ?? 0.5;
  const defaultBrightness = localStorage.getItem(BRIGHTNESS_LOCALSTORAGE) ?? 1;
  const defaultHideControls =
    localStorage.getItem(HIDECONTROLS_LOCALSTORAGE) === "true" ? true : false;
  const deaultColorShift = localStorage.getItem(COLORSHIFT_LOCALSTORAGE) === "false" ? false : true;
  const [temperature, setTemperature] = useState(defaultTemperature);
  const [brightness, setBrightness] = useState(defaultBrightness);
  const [hideControls, setHideControls] = useState(defaultHideControls);
  const [colorShift, setColorShift] = useState(deaultColorShift)

  useEffect(() => {
    localStorage.setItem(TEMPERATURE_LOCALSTORAGE, temperature);
    localStorage.setItem(BRIGHTNESS_LOCALSTORAGE, brightness);
    localStorage.setItem(HIDECONTROLS_LOCALSTORAGE, hideControls);
    localStorage.setItem(COLORSHIFT_LOCALSTORAGE, colorShift)
  }, [temperature, brightness, hideControls, colorShift]);

  const onKeyDown = (e) => {
    if (e.code === "Escape" || e.code === "KeyC") {
      setHideControls(!hideControls);
    }
  };

  const onDoubleClick = (e) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.fullscreenEnabled && !document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="App">
      <div
        className="Background"
        style={{
          backgroundColor: colorShift ? chroma.temperature(temperature * 15000) : '#fff',
          opacity: brightness
        }}
        onDoubleClick={onDoubleClick}
      ></div>
      {!hideControls && (
        <>
          <input
            className="ColorTemperature"
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            disabled={!colorShift}
          />
          <div className="ColorShift">
            <label>
              <input type="checkbox" checked={colorShift} onChange={(e) => setColorShift(e.target.checked)} />
              <span className="checkbox-display" />
              Change color temperature
            </label>
          </div>
          <input
            className="Brightness"
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
        </>
      )}
    </div>
  );
}
