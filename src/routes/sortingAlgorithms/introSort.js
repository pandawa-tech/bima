import { heapSort } from "./heapSort";
import { insertionSort } from "./insertionSort";
import { partition } from "./quickSort";

export function getIntroSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  introSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function introSortHelper(items, left, right, animations) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, animations);
    let leftArr = items.slice(0,index)
    let rightArr = items.slice(index)
    let extraIndex = 0;
    if (left < index - 1) {
      if (leftArr.length <= 10) {
        insertionSort(leftArr, extraIndex, animations)
      } else {
        heapSort(leftArr, extraIndex, animations)
      }
    }
    if (index < right) {
      if (rightArr.length <= 10) {
        insertionSort(rightArr, extraIndex+=index, animations)
      } else {
        heapSort(rightArr, extraIndex+=index, animations)
      }
    }
  }
  return items;
}