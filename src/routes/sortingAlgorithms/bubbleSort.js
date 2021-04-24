import swap from "./swap";

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(
  mainArray,
  animations,
) {
  for (let i = 1; i < mainArray.length; i++) {
    let sorted = true
    for (let j = 0; j < mainArray.length - i; j++) {
      animations.push([j, j+1, true]);
      animations.push([j, j+1, true]);
      if (mainArray[j] > mainArray[j+1]) {
        swap(mainArray, j, j + 1);
        sorted = sorted && false
      } else {
        sorted = sorted && true
      }
      animations.push([j, mainArray[j], false]);
      animations.push([j+1, j+1, true]);
      animations.push([j+1, mainArray[j+1], false]);
      animations.push([j+1, j+1, true]);
      if (j === mainArray.length - i - 1 && sorted) {
        break
      }
    } 
    if (sorted) break;
  }
}
