const socket = io(); //io.connect("http://localhost") for older version

// let inputMsg = () => {
//   console.log("clicked");
//   let msg = document.querySelector("#myInput");
//   socket.emit("questionToServer", { data: msg.value });
// };

let inputMsg = event => {
  console.log("keypress");
  const text = event.target.value;
  if (event.keyCode === 13 && text) {
    socket.emit("questionToServer", { data: text });
    event.target.value = "";
    console.log("keycode works");
  }
};

socket.on("news", function(data) {
  console.log(`Socket id: ${socket.id}`, "\n", data);
  socket.emit("my other event", { my: "bata" });
});

socket.on("answerToEveryone", data => {
  let li = document.createElement("li");
  let ul = document.querySelector("#myUl");

  li.classList.add("list-group-item");
  ul.appendChild(li).innerHTML = data.chat2;
  let countLiInUl = document.querySelectorAll("#myUl li").length;

  if (countLiInUl >= 9) ul.removeChild(ul.firstChild);
  // let output = (document.querySelector("#myOutput").innerHTML = data.chat2);
});
socket.on("answerToClient", dataMsg => {
  console.log(dataMsg.chat);
});
