export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  let partition = [0.25, 0.5, 0.75]
  partition = partition.map(item=>Math.floor(mainArray.length*item))
  while (i <= middleIdx && j <= endIdx) {
    if (!partition.includes(middleIdx)) {
      animations.push([i, j, true]);
      animations.push([i, j, true]);
    }
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, k, true]);
      animations.push([k, auxiliaryArray[i], false]);
      animations.push([k, k, true]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, k, true]);
      animations.push([k, auxiliaryArray[j], false]);
      animations.push([k, k, true]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([k, auxiliaryArray[i], false]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([k, auxiliaryArray[j], false]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
