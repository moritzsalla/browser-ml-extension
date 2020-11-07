import * as React from "react";

const ColorPicker = () => {
  const [max, setMax] = React.useState("#FF0000");
  const [min, setMin] = React.useState("#00FF00");

  const [global, setGlobal] = React.useState({
    min: { r: 0, g: 0, b: 0 },
    max: { r: 0, g: 0, b: 0 },
  });

  function hexToRgb(hex: string) {
    // hexToRgb("#0033ff").g)
    // hexToRgb(max).g

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function updateGlobal() {
    setGlobal({
      min: { r: hexToRgb(min).r, g: hexToRgb(min).g, b: hexToRgb(min).b },
      max: { r: hexToRgb(max).r, g: hexToRgb(max).g, b: hexToRgb(max).b },
    });

    // set global to chrome storage here
  }

  return (
    <div className="mt-3">
      <h6>Colors</h6>
      <p>Set your preferred color range</p>
      <div>
        <input
          type="color"
          name="colorHigh"
          value={max}
          onChange={(event) => {
            setMax(event.target.value);
            updateGlobal();
          }}
          className="mr-2"
        />
        <label for="maxColor">Healthy</label>
      </div>

      <div>
        <input
          type="color"
          name="colorLow"
          value={min}
          onChange={(event) => {
            setMin(event.target.value);
            setGlobal();
          }}
          className="mr-2"
        />
        <label for="minColor">Unhealthy</label>
      </div>
    </div>
  );
};

export default ColorPicker;
