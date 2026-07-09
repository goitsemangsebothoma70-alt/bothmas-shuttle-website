// 1. Load the core web server module
const http = require('http');

// 2. Mock Database: A starting list of trips for Bothmas Shuttle
let tripDatabase = [
    {
        tripId: "001",
        driver: "Simon Sebothoma",
        vehicleReg: "LB OO LX GP",
        route: "Mandela Village to Pretoria CBD",
        departureTime: "2026-07-10T06:00:00",
        seatsBooked: 12,
        status: "Scheduled"
    },
    {
        tripId: "002",
        driver : "Pule Sebothoma",
        vehicleReg: "LB 00 LX GP",
        route: "Hammanskraal to Johannesburg",
        departureTime: "2026-07-10T07:15:00",
        seatsBooked: 15,
        status: "En Route"
    }
];

// 3. Create the server engine
const server = http.createServer((req, res) => {
    // Set headers to respond with clean data (JSON format)
    res.setHeader('Content-Type', 'application/json');
    
    if (req.url === '/trips' && req.method === 'GET') {
        // If someone requests the '/trips' page, send them the active trip database
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, trips: tripDatabase }));
    } else {
        // If they visit any other link, show an error page
        res.writeHead(404);
        res.end(JSON.stringify({ success: false, message: "Route not found" }));
    }
});

// 4. Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Bothmas Shuttle Tracker running smoothly on port ${PORT}`);
});
