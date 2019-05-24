const socket = io(); //io.connect("http://localhost") for older version

let inputMsg = event => {
  const text = event.target.value;
  if (event.keyCode === 13 && text) {
    socket.emit("submitMessage", { text }); //ES6 standard about objects key-value being same name we can write "text" instead of "text": "text"
    event.target.value = "";
  }
};

socket.on("sendGlobalMessage", data => {
  let li = document.createElement("li");
  let ul = document.querySelector("#myUl");
  let countLiInUl = ul.childElementCount;

  if (countLiInUl >= 9) ul.firstChild.remove();
  ul.firstChild.remove();

  li.classList.add("list-group-item", "text-center");
  newLi = ul.appendChild(li);
  ul.lastChild.innerHTML = data.text;

  console.log(`Count Li elements in Ul = ${countLiInUl}`);
});
