function showSalary(users, age) {
  return users.filter((elem) => elem.age <= age).map((elem)  =>  `${elem.name}, ${elem.balance}` ).join('\n')
}
