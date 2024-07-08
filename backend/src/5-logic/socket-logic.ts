import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import SocialCustomerModel from "../4-models/social-customer-model";
import SocketEvents from "../4-models/socketEvents";

let socketServer: SocketServer;

function init(httpServer: HttpServer): void {
  try {
    // Create socket server:
    socketServer = new SocketServer(httpServer, { cors: { origin: "*" } });

    // Listen to client connection:
    socketServer.sockets.on("connection", (socket: Socket) => {
      console.log(`client has been connected...`);
    });
  } catch (err: any) {
    throw err;
  }
}

function reportAddNewData<T>(dataModel: T, socketEvent: SocketEvents): void {
  try {
    // Emit the event from the server to the the rest of th users.
    socketServer.sockets.emit(socketEvent, dataModel);
  } catch (err: any) {
    throw err;
  }
}

export default { init, reportAddNewData };
