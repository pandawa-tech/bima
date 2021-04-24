export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  insertionSort(array, 0, animations);
  return animations;
}

export function insertionSort(
  mainArray,
  extraIndex,
  animations,
) {
  for (let i = 1; i < mainArray.length; i++) {
    let current = mainArray[i];
    let j = i - 1;
    animations.push([i+extraIndex, j+extraIndex, true]);
    animations.push([i+extraIndex, j+extraIndex, true]);
    while (j >= 0 && mainArray[j] > current) {
      animations.push([j + 1+extraIndex, j + 1+extraIndex, true]);
      animations.push([j + 1+extraIndex, mainArray[j], false]);
      animations.push([j + 1+extraIndex, j + 1+extraIndex, true]);
      mainArray[j + 1] = mainArray[j];
      j--;
    }
    animations.push([j + 1+extraIndex, j + 1+extraIndex, true]);
    animations.push([j + 1+extraIndex, current, false]);
    animations.push([j + 1+extraIndex, j + 1+extraIndex, true]);
    mainArray[j+1] = current
  }
}
