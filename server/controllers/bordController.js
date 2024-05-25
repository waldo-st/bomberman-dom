import config from "../config/config";

export default class BoardManager {
  constructor() {
    this.board = [
      ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
      ['B', 'V', 'V', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'V', 'V', 'B'],
      ['B', 'V', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'V', 'B'],
      ['B', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'B'],
      ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
      ['B', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'B'],
      ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
      ['B', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'B'],
      ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
      ['B', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'B'],
      ['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
      ['B', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'B'],
      ['B', 'V', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'W', 'B', 'V', 'B'],
      ['B', 'V', 'V', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'V', 'V', 'B'],
      ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
    ];

    for (let i = 0; i < config.lengthGrid; i++) {
      for (let j = 0; j < config.lengthGrid; j++) {
        if (this.board[i][j] === 'W' && Math.random() < 0.4) {
          const randomPowerUp = config.POWER_UP_TYPES[Math.floor(Math.random() * config.POWER_UP_TYPES.length)];
          this.board[i][j] += randomPowerUp;
        }
      }
    }
  }

  isValidMove(position) {
    const cell = this.getCell(position);
    const valid = config.power_timer.includes(cell) || cell === 'V';
    return { valid, cellType: cell };;
  }

  setCell(position, value) {
    this.board[position.y - 1][position.x - 1] = value;
  }

  getCell(position) {
    return this.board[position.y - 1][position.x - 1];
  }

  removeWall(position) {
    const cell = this.getCell(position, true);
    if (cell === "W") {
      this.setCell(position, 'V', true);
    } else {
      const powerUp = cell[1];
      this.setCell(position, powerUp, true);
    }
  }

  makeCellEmpty(position) {
    this.board[position.y - 1][position.x - 1] = 'V';
  }
}
