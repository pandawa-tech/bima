export default function swap(array, idx1, idx2) {
    let temp = 0;
    temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  }