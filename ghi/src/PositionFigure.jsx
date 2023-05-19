import TemperatureBarStack from "./TemperatureBarStack";

function PositionFigure({ position }) {
  return (
    <div>
      {position.name}
      <TemperatureBarStack />
    </div>
  );
}

export default PositionFigure;
