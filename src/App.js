import "./App.css";
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";

function App() {
  const [mahjongText, setMahjongText] = useState([]);
  const [splitText, setSplitText] = useState({});
  const titles = [
    "2468",
    "QUINTS",
    "WINDS-DRAGONS",
    "ANY LIKE NUMBERS",
    "CONSECUTIVE RUNS",
    "369",
    "MATH",
    "13579",
    "SINGLES AND PAIRS",
  ];

  const getPdfText = async () => {
    try {
      const response = await fetch("http://localhost:4000/");
      const data = await response.json();
      console.log(data);
      setMahjongText(data.pages[0].texts);
    } catch (error) {
      console.error("Error fetching PDF text:", error);
    }
  };

  const splitMahjongText = (mahjongText, titles) => {
    const groupedByTitle = {};
    let currentTitle = null;

    mahjongText.forEach((item) => {
      if (titles.includes(item.text)) {
        currentTitle = item.text;
        groupedByTitle[currentTitle] = [];
      } else if (currentTitle) {
        groupedByTitle[currentTitle].push(item);
      }
    });

    const result = {};
    Object.keys(groupedByTitle).forEach((title) => {
      const group = groupedByTitle[title];
      const separatedGroups = [];
      let currentGroup = [];

      group.forEach((item) => {
        if (/^[xc]\d+$/.test(item.text) && currentGroup.length > 0) {
          separatedGroups.push([...currentGroup, item]);
          currentGroup = [];
        } else {
          currentGroup.push(item);
        }
      });

      if (currentGroup.length > 0) {
        separatedGroups.push(currentGroup);
      }

      result[title] = separatedGroups;
    });

    return result;
  };

function mapToMahjongTilesUnicode(text) {
  const mahjongTiles = {
    1: "\u{1F001}",
    2: "\u{1F002}",
    3: "\u{1F003}",
    4: "\u{1F004}",
    5: "\u{1F005}",
    6: "\u{1F006}",
    7: "\u{1F007}",
    8: "\u{1F008}",
    9: "\u{1F009}",
  };

  return text
    .split("")
    .map((char) => {
      if (char.match(/[1-9]/)) {
        return mahjongTiles[char];
      } else if (char === "x") {
        return "\u{1F02B}"; // Use a specific Unicode character for 'x'
      } else {
        return char; // Return the original character if it's not a number or 'x'
      }
    })
    .join("");
}
  useEffect(() => {
    getPdfText();
  }, []);

  useEffect(() => {
    if (mahjongText.length > 0) {
      const result = splitMahjongText(mahjongText, titles);
      setSplitText(result);
    }
  }, [mahjongText]);

  useEffect(() => {
    console.log(mapToMahjongTilesUnicode("123456789FSWEND"))
})

  return (
    <div>
      {titles.map((title, index) => (
        <div key={index}>
          <h2>{title}</h2>
          {splitText[title] &&
            splitText[title].map((group, groupIndex) => (
              <div
                key={groupIndex}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {group.map((tile, tileIndex) => (
                  <span
                    key={tileIndex}
                    style={{
                      color: `rgb(${tile.color
                        .replace("[", "")
                        .replace("]", "")})`,
                      marginRight: "10px",
                    }}
                  >
                    {tile.text}
                  </span>
                ))}
                <hr />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default App;
