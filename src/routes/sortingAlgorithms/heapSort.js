import swap from "./swap";

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, 0, animations)
  return animations;
}

export function heapSort(array, extraIndex, animations) {
  let arrLength = array.length;
  for (let i = Math.floor(array.length/2) - 1; i >= 0; i--) {
    heapSortHelper(array, arrLength, i, extraIndex, animations);
  }
  for (let i = array.length - 1; i>0; i--) {
    animations.push([0+extraIndex, i+extraIndex, true]);
    swap(array, 0, i)
    animations.push([i+extraIndex, array[i], false]);
    animations.push([0+extraIndex, array[0], false]);
    animations.push([0+extraIndex, i+extraIndex, true]);
    arrLength--
    heapSortHelper(array, arrLength, 0, extraIndex, animations)
  }
}
function heapSortHelper(
  array,
  arrLength,
  parentIndex,
  extraIndex,
  animations,
) {
  const leftIndex = parentIndex * 2 +1;
  const rightIndex = parentIndex * 2 +2;
  let maxIndex = parentIndex;
  if (leftIndex < arrLength && array[leftIndex] > array[maxIndex]) {
    maxIndex = leftIndex
  }
  if (rightIndex < arrLength && array[rightIndex] > array[maxIndex]) {
    maxIndex = rightIndex
  }
  if (maxIndex !== parentIndex) {
    animations.push([parentIndex+extraIndex, maxIndex+extraIndex, true]);
    swap(array, parentIndex, maxIndex)
    animations.push([parentIndex+extraIndex, array[parentIndex], false]);
    animations.push([maxIndex+extraIndex, array[maxIndex], false]);
    animations.push([parentIndex+extraIndex, maxIndex+extraIndex, true]);
    heapSortHelper(array, arrLength, maxIndex, extraIndex, animations)
  }
}
