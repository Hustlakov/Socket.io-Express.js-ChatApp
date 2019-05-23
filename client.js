const socket = io(); //io.connect("http://localhost") for older version

let inputMsg = () => {
  console.log("clicked");
  let msg = document.querySelector("#myInput");
  socket.emit("questionToServer", { data: msg.value });
};

socket.on("news", function(data) {
  console.log(`Socket id: ${socket.id}`, "\n", data);
  socket.emit("my other event", { my: "bata" });
});

socket.on("answerToClient", dataMsg => {
  console.log(dataMsg.chat);
});
