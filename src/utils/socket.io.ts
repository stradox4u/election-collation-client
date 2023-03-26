import { onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';

const useSocketIo = () => {
  const socket = io(import.meta.env.VITE_WS_URL);
  socket.on('connect', () => {
    console.log('Websockets Connected');
    socket.emit('events', 'Hello from Vue!');
    console.log(socket)
  });

  onBeforeUnmount(() => {
    socket.disconnect();
  })

  return socket;
}

export default useSocketIo;