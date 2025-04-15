import React, {useState, useEffect} from "react";

function MahjongCardGenerator() {
    const [card, setCard] = useState([]);




    function generateAnyLikeNumbers() {
        const values = ["1", "F", "D"];
        const title = "ANY LIKE NUMBERS";
        const colors = ["red", "green", "black"];
        const groupBlock = [];
        groupBlock.push({ title: title });

        // set up blocks to push to the group
        const blocks = [];
        // six times per group do this
        for (let i = 0; i < 6; i++) {
            let maxValues = 14; // reset maxValues for each iteration
            const block = [];
            //   tracking d count for point value
            let dCount = 0;
            while (maxValues > 0) {
                // make a block to hold the values
                const valuesBlock = [];
                // get a random number of values per block
                let numOfValues = Math.floor(Math.random() * 4) + 1;
                if (numOfValues > maxValues) {
                    numOfValues = maxValues;
                }
                // get a random value from the values array
                let randomValue = values[Math.floor(Math.random() * values.length)];
                if (randomValue === "D") {
                    dCount += numOfValues;
                }
                // get a color for each block
                let color = colors[Math.floor(Math.random() * colors.length)];
                valuesBlock.push({ color: color });
                // start loop for the number of values and add the random value to the block
                for (let j = 0; j < numOfValues; j++) {
                    valuesBlock.push(randomValue);
                }
                maxValues -= numOfValues; // subtract numOfValues from maxValues
                // push the block to the group block
                block.push(valuesBlock);
            }
            let pointValue = dCount > 4 ? "c30" : "x25";
            blocks.push({ item: i, pointValue: pointValue, block: block });
        }

        // convert blocks to groupBlock format
        const result = groupBlock.concat(blocks);

        return result;
    }
    function generate2468() {
        const values = ["2", "4", "6", "8", "D", "F"];
        const title = "2468";
        const colors = ["red", "green", "black"];
        const groupBlock = [];
        groupBlock.push({ title: title });
        // set up blocks to push to the group
        const blocks = [];
        // six times per group do this
        for (let i = 0; i < 6; i++) {
            let maxValues = 14; // reset maxValues for each iteration
            const block = [];
            // tracking d count for point value
            let dCount = 0;
            while (maxValues > 0) {
                // make a block to hold the values
                const valuesBlock = [];
                // get a random number of values per block
                let numOfValues = Math.floor(Math.random() * 4) + 1;
                if (numOfValues > maxValues) {
                    numOfValues = maxValues;
                }
                // get a random value from the values array
                let randomValue = values[Math.floor(Math.random() * values.length)];
                if (randomValue === "D") {
                    dCount += numOfValues;
                }
                // get a color for each block
                let color = colors[Math.floor(Math.random() * colors.length)];
                valuesBlock.push({ color: color });
                // start loop for the number of values and add the random value to the block
                for (let j = 0; j < numOfValues; j++) {
                    valuesBlock.push(randomValue);
                }
                maxValues -= numOfValues; // subtract numOfValues from maxValues
                // push the block to the group block
                block.push(valuesBlock);
            }
            let pointValue = dCount > 4 ? "c30" : "x25";
            blocks.push({ item: i, pointValue: pointValue, block: block });
        }
        const result = groupBlock.concat(blocks);
        return result;
    }

    useEffect(() => {
        const likeNumbers = generateAnyLikeNumbers();
        const group2468 = generate2468();
        setCard([likeNumbers, group2468]);
        // console.log([likeNumbers, group2468]);
    }, []);

    return <div>MahjongCardGenerator
      <button onClick={() => console.log(card)}>get card</button>
  </div>;
}

export default MahjongCardGenerator;
