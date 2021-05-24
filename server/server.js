const server = require('express')(),
	http = require('http').Server(server),
	io = require('socket.io')(http, {
		cors: {
			//Client url = http://localhost:8080
			origin: "http://localhost:8080",
			methods: ["GET", "POST"],
			transports: ['websocket', 'polling'],
			credentials: true
		},
		allowEIO3: true
	});

let users = [];

io.on('connection', (socket) => {

	// join room
	socket.on('join:room', (data) => {
		socket.join(data.room)
		socket.room = data.room
		socket.name = data.name
		// save users
		users.push({
			room: data.room,
			name: data.name,
		})
		rooms[data.room]++;
		io.to(socket.room).emit('join:room', users.filter((user) => user.room == data.room))
	})

	// disconnect
	socket.on('disconnect', () => {
		const index = users.findIndex((user) => user.name == socket.name)
		if (index !== -1) {
			users.splice(index, 1)
			io.to(socket.room).emit('join:room', users.filter((user) => user.room == socket.room))
		}
	})

	// message send
	socket.on('message:send', message => {
		if (message) {
			io.to(socket.room).emit('message:read', { 
				name: socket.name, 
				message: message
			})
		}
	})
})





http.listen(5000, () => console.log('Running on http://localhost:5000'))