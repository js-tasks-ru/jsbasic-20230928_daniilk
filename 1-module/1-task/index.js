function factorial(n) {
  if (!typeof n === "number") {
    return NaN;
  }

  if (n === 0 || n === 1) {
    return 1;
  } else {
    result = 1;
    for (i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}

