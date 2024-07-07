import { useEffect } from "react";
import { io } from "socket.io-client";
import SocketEvents from "src/Models/SocketEvents";

function useSocketIo(url: string, socketEvent: SocketEvents, callback: (data:any) => void): any {

  useEffect(() => {
    const socket = io(url);
     socket.on(socketEvent, (dataFromServer) => {
     callback(dataFromServer);
    });
    return () => {
      socket.disconnect();
    };
  }, [url,socketEvent,callback]);
}

export default useSocketIo;
