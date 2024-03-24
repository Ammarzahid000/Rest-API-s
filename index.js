const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
const PORT = 8080

const users = [
    { username: 'ammar', password: 'password' },
    { username: 'waleed', password: 'password' }
]
const accounts = [
    { accountType: 'checking', balance: 5000, username: 'johndoe' },
    { accountType: 'savings', balance: 15000, username: 'johndoe' },
    { accountType: 'checking', balance: 3000, username: 'marydoe' },
]

app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const user = users.find((user) => user.username == username && user.password == password)
    if (user) {
        const token = jwt.sign({ username: user.username }, 'SECRETKEY')
        res.json({ success: true, token: token })
    } else {
        res.json({ success: false, message: 'Not authenticated' })
    }

})

app.get('/accounts' ,(req , res) =>{
    res.json(accounts)
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})