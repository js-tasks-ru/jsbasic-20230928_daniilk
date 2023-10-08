function sumSalary(salaries) {
  let summ = 0;
  for( key in salaries) {
    if(isFinite(salaries[key])) {
      summ += salaries[key]
    }
  }
  return summ
}
