const spanOnline = document.getElementById('span-online');
const spanOffline = document.querySelector('#span-offline');

const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
  console.log('conectado');
  spanOnline.style.display = 'block';
  spanOffline.style.display = 'none';
});

socket.on('disconnect', () => {
  console.log('desconectado');
  spanOnline.style.display = 'none';
  spanOffline.style.display = 'block';
});

btnSend.addEventListener('click', () => {
  const message = txtMessage.value;

  socket.emit('send-message', message);
  console.log(`click: ${message}`);
});
