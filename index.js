import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"})

// Store chat sessions in memory (in production, use a database)
const chatSessions = new Map()

function getOrCreateChatSession(sessionId) {
    if (!chatSessions.has(sessionId)) {
        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        })
        chatSessions.set(sessionId, chat)
    }
    return chatSessions.get(sessionId)
}

app.post("/api/chat", async(req, res) => {
    const { message: userMessage, sessionId } = req.body

    if (!userMessage) {
        return res.status(422).json({ reply: "Message is required."})
    }

    if (!sessionId) {
        return res.status(422).json({ reply: "Session ID is required."})
    }

    try {
        const chat = getOrCreateChatSession(sessionId)
        const result = await chat.sendMessage(userMessage)
        const response = await result.response
        const text = response.text()

        res.status(200).json({ reply: text })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ reply: "Something went wrong." })
    }
})

app.delete("/api/chat/:sessionId", (req, res) => {
    const { sessionId } = req.params
    chatSessions.delete(sessionId)
    res.status(200).json({ message: "Chat session cleared" })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

