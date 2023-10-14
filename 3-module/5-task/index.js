function getMinMax(str) {
  // что из этого лучше?
  // let arr = str.split(' ').filter(elem => isFinite(elem)).map(elem => +elem)
  // return {
  //   min: Math.min(...arr),
  //   max: Math.max(...arr)
  // }

  return maxMin(
    str
      .split(" ")
      .filter((elem) => isFinite(elem))
      .map((elem) => +elem)
  );
}

function maxMin(arr) {
  let max = arr[0];
  let min = arr[0];

  for (elem of arr) {
    if (elem > max) {
      max = elem;
    }
    if (elem < min) {
      min = elem;
    }
  }
  return {
    min,
    max,
  };
}
