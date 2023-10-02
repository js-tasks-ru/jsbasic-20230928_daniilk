function checkSpam(str) {
  str = str.toLowerCase();
  if (str.indexOf("1xbet") >= 0 || str.indexOf("xxx") >= 0) {
    return true;
  } else {
    return false;
  }
}
