const express = require('express')
const app = express()
const db = require('./db')
app.use(express.json())
const path = require('path')
const roomsRoutes = require('./routes/roomsRoute')
const userRoute = require('./routes/userRoute')
const bookingsRoute = require('./routes/bookingRoute')
const farmerRoute = require('./routes/farmerRoute')
app.use('/api/rooms', roomsRoutes)
app.use('/api/users', userRoute)
app.use('/api/bookings', bookingsRoute)
app.use('/api/farmers',farmerRoute)


// The backend is inspired from udemy course by shreyrooms. 
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))

    })
}

const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Node JS Server Started`))
