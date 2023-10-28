/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.data = rows
    this.elem = document.createElement('table')
    this.state()
    }
      
  state() {
    this.elem.insertAdjacentHTML('afterbegin', `<thead>
    <tr>
      <th>Имя</th>
      <th>Возраст</th>
      <th>Зарплата</th>
      <th>Город</th>
      <th></th>
    </tr>
  </thead>`)

   let childBody =  this.data.map(({name,age,salary,city}) => ` 
   <tr>
      <td>${name}</td>
      <td>${age}</td>
      <td>${salary}</td>
      <td>${city}</td>
      <td><button>X</button></td>
    </tr>
    `).join('')

    this.elem.insertAdjacentHTML('beforeend', `
     <tbody>
      ${childBody}
    </tbody>
    `)

  let list =  this.elem.querySelectorAll('button')

   Array.from(list).map((elem) => elem.addEventListener('click',this.onClick))

   
  }

  onClick(e) {
    if ((e.target.closest("tr"))) {
      e.target.closest("tr").remove()
    }
  }
  

}

