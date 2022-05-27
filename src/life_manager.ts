export class Grid {
	readonly width: number;
	readonly height: number;
	readonly cells: Array<Array<number>>;

	constructor(width: number, height: number){
		this.width = width;
		this.height = height;
		this.cells = this.createGrid(width, height);
	}

	createGrid(width: number, height: number) : Array<Array<number>> {
		const grid: Array<Array<number>> = [];
		for (let x = 0; x <width; x++){
			grid[x] = [];
			for (let y = 0; y < height; y++){
				grid[x][y] = 0;
			}
		}
		return grid;
	}

	getNeighbourCount(x: number, y: number): number{
		let sum = 0;
		for (let i = -1; i < 2; i++){
			for (let j = -1; j < 2; j++){
				if (i != 0 || j != 0){
					const xcoord = x + i;
					const ycoord = y + j;
					if (xcoord >= 0 && xcoord < this.width && ycoord >= 0 && ycoord < this.height){
						sum += this.cells[xcoord][ycoord];
					}
				}
			}
		}
	
		return sum;
	}

	setCell(x: number, y: number, value: number) {
		this.cells[x][y] = value;
	} 

	getCell(x: number, y: number) {
		return this.cells[x][y]
	}

	debugString(): string {
		let debugString = "";
		for (let y = 0; y < this.height; y++){
			debugString += `${y}: `;
			for (let x = 0; x < this.width; x++){
				debugString += this.cells[x][y] ? `${x}(A)` : `${x}(D)`;
				if (x === this.width-1){
					debugString += "\n";
				}
			}
		}

		return debugString;
	}
}

export function nextGeneration(grid: Grid): Grid {
	const newGrid = new Grid(grid.width, grid.height);

	for (let y = 0; y < grid.height; y++){
		for (let x = 0; x < grid.width; x++){
			const neighbours = grid.getNeighbourCount(x,y);
			const cell = grid.getCell(x,y);

			if (cell === 0){
				if (neighbours === 3){
					newGrid.setCell(x,y,1);
				}	
			}
			else {
				if (neighbours < 2 || neighbours > 3){
					newGrid.setCell(x,y, 0);
				}
				else {
					newGrid.setCell(x, y, 1);
				}
			}
		}
	}

	return newGrid;
}