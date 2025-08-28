import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'


export default function App() {
  const [customName, setCustomName] = useState("");
  const [unit, setUnit] = useState("us");
  const [story, setStory] = useState("");

  const storyText =
    "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

  const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
  const insertY = ["the soup kitchen", "Disneyland", "the White House"];
  const insertZ = ["spontaneously combusted", "melted into a puddle", "turned into a slug"];

  function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function generateStory() {
    let newStory = storyText;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory
      .replace(/:insertx:/g, xItem)
      .replace(":inserty:", yItem)
      .replace(":insertz:", zItem);

    if (customName.trim() !== "") {
      newStory = newStory.replace(/Bob/g, customName);
    }

    if (unit === "uk") {
      const weight = Math.round(300 / 14) + " stone";
      const temperature = Math.round((94 - 32) * (5 / 9)) + " centigrade";
      newStory = newStory.replace("300 pounds", weight);
      newStory = newStory.replace("94 fahrenheit", temperature);
    }

    setStory(newStory);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center"> Silly Story Generator</h1>

        <input
          type="text"
          placeholder="Enter custom name"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          className="border rounded-lg p-2 w-full mb-4"
        />

        <div className="flex justify-center gap-6 mb-4">
          <label>
            <input
              type="radio"
              name="unit"
              value="us"
              checked={unit === "us"}
              onChange={(e) => setUnit(e.target.value)}
            />{" "}
            US
          </label>
          <label>
            <input
              type="radio"
              name="unit"
              value="uk"
              checked={unit === "uk"}
              onChange={(e) => setUnit(e.target.value)}
            />{" "}
            UK
          </label>
        </div>

        <button
          onClick={generateStory}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 w-full"
        >
          Generate Story
        </button>

        {story && (
          <p className="mt-6 bg-gray-50 border p-4 rounded-lg text-lg">{story}</p>
        )}
      </div>
    </div>
  );
}