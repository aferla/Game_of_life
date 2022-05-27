import { Grid, nextGeneration } from "../life_manager"

describe('Grid', () => {

  let grid = new Grid(5,5);

  beforeEach(() => {
    grid = new Grid(5, 5);
  });
    
  it(`getNeighbourCount should return neighbour count`, () => {
      grid.setCell(2,2, 1);

      for (let x = -1; x < 2; x++){
        for (let y = -1; y < 2; y++){
          if (x !== 2 && y !== 2){
            grid.setCell(2+x, 2+y, 1)
          }
        }
      }

      expect(grid.getNeighbourCount(2,2)).toBe(8);
  })
});

describe ('nextGeneration', () => {
  it(`should calcualte the next generation correctly`, () => {
    const grid = new Grid(5,5);
    grid.setCell(1,2, 1);
    grid.setCell(2,2, 1);
    grid.setCell(3,2, 1);

    const expectedGrid = new Grid(5,5);
    expectedGrid.setCell(2,2, 1);
    expectedGrid.setCell(2,1, 1);
    expectedGrid.setCell(2,3, 1);
  
    const nextGen = nextGeneration(grid);

    expect(nextGen).toEqual(expectedGrid);
    expect(nextGeneration(nextGen)).toEqual(grid);
  });
});