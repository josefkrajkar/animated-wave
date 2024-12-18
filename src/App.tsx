import Curve from "./Curve";

import './App.css'

function App() {
  return (
    <>
      <h1>Animated Glowing Bézier Wave</h1>
      <div className="wrapper">
        <Curve className="curve" index={"a"}/>
        <Curve className="curve" index={"b"}/>
        <Curve className="curve" index={"c"}/>
      </div>
    </>
  )
}

export default App
