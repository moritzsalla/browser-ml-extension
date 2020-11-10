import * as React from "react";

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const ColorPicker = () => {
  // local color state
  const [max, setMax] = React.useState("#0033ff");
  const [min, setMin] = React.useState("#0033ff");

  // global color state
  const [global, setGlobal] = React.useState({
    min: { r: 0, g: 0, b: 0 },
    max: { r: 0, g: 0, b: 0 },
  });

  // update with  curr value from state
  React.useEffect(() => {
    chrome.storage.local.get(["color"], function (result) {
      const { min, max } = result.color;

      const a = rgbToHex(max.r, max.g, max.b);
      const b = rgbToHex(min.r, min.g, min.b);
      setMax(a);
      setMin(b);
    });
  }, []);

  function updateGlobal() {
    setGlobal({
      min: { r: hexToRgb(min).r, g: hexToRgb(min).g, b: hexToRgb(min).b },
      max: { r: hexToRgb(max).r, g: hexToRgb(max).g, b: hexToRgb(max).b },
    });
    chrome.storage.local.set({ color: global });
    console.log({ max: global.max }, { min: global.min });
  }

  return (
    <div className="text-center">
      <p>Set your preferred color range</p>
      <div className="d-flex justify-content-around">
        <div>
          <input
            type="color"
            name="colorHigh"
            value={max}
            onChange={(event) => {
              setMax(event.target.value);
              updateGlobal();
            }}
          />
          <br />
          <label for="maxColor">Healthy</label>
        </div>

        <div>
          <input
            type="color"
            name="colorLow"
            value={min}
            onChange={(event) => {
              setMin(event.target.value);
              updateGlobal();
            }}
          />
          <br />
          <label for="minColor">Unhealthy</label>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
