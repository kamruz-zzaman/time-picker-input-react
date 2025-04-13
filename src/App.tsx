"use client"

import { useState } from "react"
import TimePicker from "./components/time-picker"

// import TimePicker from "time-picker-input-react"

const App = () => {
  // For controlled component
  const [time, setTime] = useState("09:30")

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-lg font-medium mb-2">Controlled TimePicker</h2>
        <TimePicker
          value={time}
          onChange={(newTime) => {
            console.log("Time changed:", newTime)
            setTime(newTime)
          }}
        />
        <p className="mt-2">Selected time: {time}</p>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Uncontrolled TimePicker</h2>
        <TimePicker defaultValue="14:45" onChange={(newTime) => console.log("Uncontrolled time changed:", newTime)} />
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Custom Styling</h2>
        <TimePicker defaultValue="18:15" className="w-48 border-2 border-purple-300 rounded-lg" />
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Disabled TimePicker</h2>
        <TimePicker defaultValue="22:00" disabled />
      </div>
    </div>
  );
};

export default App;
