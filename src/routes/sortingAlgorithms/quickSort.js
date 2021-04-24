import swap from "./swap";

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSort(array, animations);
  return animations;
}

function quickSort(
  mainArray,
  animations,
) {
  quickSortHelper(mainArray, 0, mainArray.length - 1, animations);
}

export function partition(items, left, right, animations) {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      animations.push([i, j, true]);
      swap(items, i, j);
      animations.push([i, items[i], false]);
      animations.push([j, items[j], false]);
      animations.push([i, j, true]);
      i++;
      j--;
    }
  }
  return i;
}

function quickSortHelper(items, left, right, animations) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, animations); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSortHelper(items, left, index - 1, animations);
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSortHelper(items, index, right, animations);
    }
  }
  return items;
}
