# Gemini Chatbot

A simple chatbot using Node.js, Express, and the Gemini AI API.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Alitindrawan24/Gemini-Chatbot.git
    cd gemini-chatbot
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the project root and add your Gemini API key:

    ```
    GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
    ```

4.  **Run the server:**

    ```bash
    npm start
    ```

    The server will start on port 3000 (or the port specified in your environment variable).

5.  **Open in browser:**

    Navigate to `http://localhost:3000` in your web browser to interact with the chatbot.

## Project Structure

-   `index.js`:  The main server file, handling API requests and communication with the Gemini AI.
-   `public/`: Contains the frontend files (HTML, CSS, and JavaScript).
    -   `index.html`:  The main HTML file for the chatbot interface.
    -   `style.css`:  Styles the chatbot interface.
    -   `script.js`: Handles user interaction and communication with the server.
-   `README.md`: This file, providing information about the project.

## How it works

1.  The user types a message in the input field and submits the form.
2.  `script.js` sends the message to the server (`/api/chat`) using a POST request.
3.  The server (`index.js`) receives the message, sends it to the Gemini AI model, and gets a response.
4.  The server sends the Gemini's reply back to the frontend.
5.  `script.js` displays the reply in the chatbox.

## Improvements

-   Add error handling for API requests.
-   Implement a loading indicator while waiting for the Gemini response.
-   Add user authentication and chat history management.
-   Improve the user interface with more styling and features.
-   Deploy the chatbot to a platform like Netlify or Vercel.