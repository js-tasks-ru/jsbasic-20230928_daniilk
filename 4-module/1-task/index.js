// пишу несколько вариантов,чтобы лучше запомнить.
// есть разница в быстродействии между ними?

function makeFriendsList(friends) {
  let uList = document.createElement("UL");
  // for (let friend of friends) {
  //   let li = document.createElement('LI')
  //   li.innerHTML = ` ${friend.firstName} ${friend.lastName}`
  //   uList.append(li)
  // }

  uList.insertAdjacentHTML(
    "beforeend",
    friends
      .map((friend) => `<li>${friend.firstName} ${friend.lastName} </li>`)
      .join("")
  );

  return uList;
}
