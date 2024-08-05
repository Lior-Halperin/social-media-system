
function SortInAscendingOrder<T>(header: keyof T, data: T[]){
    const sorted = [...data].sort((firstItem, secondItem) => {
        const value1 = firstItem[header];
        const value2 = secondItem[header];
        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return value1 - value2;
        } else {
          console.error('Sort: Attempted to sort non-numeric values');
          return 0;
        }
      });
    return sorted;
}

export default {
    SortInAscendingOrder
}