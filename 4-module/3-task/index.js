function highlight(table) {
  let rows = table.tBodies[0].rows;
  console.log(rows);
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let atrrDataAvail = row.cells[3].getAttribute("data-available");
    let gender = row.cells[2].innerHTML;
    let age = Number(row.cells[1].innerHTML)

// Почему не работает проверка этим способом и даже если убирать пробелы? для male и female подходит любой 
      // atrrDataAvail === "true"
      // ? (row.className = "available ")
      // : atrrDataAvail === "false"
      // ? (row.className = "unavailable ")
      // : (row.hidden = true );

      atrrDataAvail === "true"
      ? (row.classList.add("available"))
      : atrrDataAvail === "false"
      ? (row.classList.add("unavailable"))
      : (row.hidden = true );

    gender === "m"
      ? (row.className += " male")
      : (row.className += " female");

      // gender === "m"
      // ? row.classList.add("male")
      // : row.classList.add("female");

      if (age < 18) row.style.textDecoration = 'line-through'

  }
}
