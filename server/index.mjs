import express from "express";
import { Server } from "ws";

const app = express();
const port = 3000;

// WebSocketサーバーを作成
const wss = new Server({ noServer: true });

// 接続時のイベント
wss.on("connection", (ws) => {
	console.log("クライアントが接続しました");

	// クライアントからのメッセージを受け取ったときの処理
	ws.on("message", (message) => {
		console.log("クライアントからのメッセージ: ", message);
		ws.send("サーバーからの応答");
	});
});

// HTTPサーバーのアップグレードリクエストでWebSocket通信を開始
const server = app.listen(port, () => {
	console.log(`サーバーは http://localhost:${port} で起動中`);
});

server.on("upgrade", (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, (ws) => {
		wss.emit("connection", ws, request);
	});
});
