import React, { useEffect } from "react";

function MahjongPlay() {
  // define a mahjon tile class
  class MahjongTile {
    constructor(type, value) {
      this.type = type;
      this.value = value;
    }

    toString() {
      return `${this.type} ${this.value}`;
    }
  }

  const suits = ["Characters", "Bamboos", "Circles"];

  // define a mahjong game class
  class MahjongGame {
    constructor() {
      this.tileSet = this.generateTileSet();
    }
    generateTileSet() {
      const tileSet = [];
      const suits = ["Characters", "Bamboos", "Circles"];
      const honors = [
        "East Wind",
        "South Wind",
        "West Wind",
        "North Wind",
        "Red Dragon",
        "Green Dragon",
        "White Dragon -soap",
      ];
      const bonusTiles = [
        "Plum Flower",
        "Orchid Flower",
        "Chrysanthemum Flower",
        "Bamboo Flower",
      ];

      const jokerTiles = [
        "Red Joker",
        "Green Joker",
        "White Joker",
        "Black Joker",
        "Blue Joker",
      ];

      //   // Generate 4 sets of each suit, honor, and bonus tiles
      // Generate honor tiles
      honors.forEach((honor) => {
        tileSet.push(new MahjongTile("Honors", honor));
        tileSet.push(new MahjongTile("Honors", honor));
        tileSet.push(new MahjongTile("Honors", honor));
        tileSet.push(new MahjongTile("Honors", honor));
      });
      // Generate bonus tiles
      bonusTiles.forEach((bonus) => {
        tileSet.push(new MahjongTile("Bonus", bonus));
        tileSet.push(new MahjongTile("Bonus", bonus));
        tileSet.push(new MahjongTile("Bonus", bonus));
        tileSet.push(new MahjongTile("Bonus", bonus));
      });
      // Generate suit tiles
      suits.forEach((suit) => {
        for (let i = 1; i <= 9; i++) {
          tileSet.push(new MahjongTile(suit, i));
          tileSet.push(new MahjongTile(suit, i));
          tileSet.push(new MahjongTile(suit, i));
          tileSet.push(new MahjongTile(suit, i));
        }
      });

      jokerTiles.forEach((joker) => {
        tileSet.push(new MahjongTile("Joker", joker));
      });
      return tileSet;
    }

    shuffleTiles() {
      for (let i = this.tileSet.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.tileSet[i], this.tileSet[j]] = [this.tileSet[j], this.tileSet[i]];
      }
    }

    dealTiles() {
      this.shuffleTiles();
      const tiles = [];
      for (let i = 0; i < 14; i++) {
        tiles.push(this.tileSet.pop());
      }
      return tiles;
    }
  }

  useEffect(() => {
    const game = new MahjongGame();
    const tiles = game.dealTiles();
    tiles.forEach((tile) =>
      console.log(suits.includes(tile.type) ? tile.toString() : tile.value)
    );
  }, []);

  return <div>MahjongPlay</div>;
}

export default MahjongPlay;
