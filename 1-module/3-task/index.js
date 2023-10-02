function ucFirst(str) {
  if (!str || (str.indexOf(" ") > 0) || str[0] === " ") {
    return "";
  } else {
    return str[0].toUpperCase() + str.slice(1);
  }
}
