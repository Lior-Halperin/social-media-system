
function generateId(max: number, min: number): number {
    try {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); //}
    } catch (err: any) {
      throw err;
    }
  } 
export default {
    generateId
};


