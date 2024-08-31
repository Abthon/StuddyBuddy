
# StuddyBuddy

Welcome to StuddyBuddy! 🎉 This project is inspired by Discord and implements a group chat functionality like discord and more using React for the frontend and Django with Django Channels for the backend.

## ✨ Features

- Real-time chat using Django Channels
- 🔐 JWT Authentication with Http Only cookies
- 📘 Well-documented REST API with drf-spectacular and Swagger-Ui (still in progress)
- 🔍 Filtering and Live Searching
- 🏠 Room Membership
- ⚙️ Beautiful Settings Page
- 🌈 Inspired by Discord for a Familiar User Experience
- 📬 End-to-End Messaging, Emoji Support (coming very soon, Endesu fekad)

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td><img src="https://github.com/Abthon/StuddyBuddy/blob/main/Screenshots/First.jpg" alt="First" width="200"/></td>
      <td><img src="https://github.com/Abthon/StuddyBuddy/blob/main/Screenshots/Second.jpg" alt="Second" width="200"/></td>
      <td><img src="https://github.com/Abthon/StuddyBuddy/blob/main/Screenshots/Third.jpg" alt="Third" width="200"/></td>
       <td><img src="https://github.com/Abthon/StuddyBuddy/blob/main/Screenshots/Fifth.jpg" alt="Fifth" width="200"/></td>
    </tr>
    <tr>
      <td><img src="https://github.com/Abthon/StuddyBuddy/blob/main/Screenshots/Sixth.jpg" alt="Sixth" width="200"/></td>
      <td><img src="https://github.com/Abthon/StuddyBuddy/blob/main/Screenshots/Seventh.jpg" alt="Seventh" width="200"/></td>
      <td><img src="https://github.com/Abthon/StuddyBuddy/blob/main/Screenshots/Eighth.jpg" alt="Eighth" width="200"/></td>
    </tr>
  </table>
</div>

## Tech Stack

- Frontend: React
- Backend: Django


## Setup

### Backend Setup (Django with Django Channels)

1. Clone the repository:

   ```bash
   git clone https://github.com/Abthon/StuddyBuddy.git
   ```

2. Create and activate a virtual environment (recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   - CD in to the backend directory and then type
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

5. Run the Django development server:

   ```
   uvicorn backend.asgi:application --log-level debug --reload
   ```

### Frontend Setup (React)

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm run dev
   ```

4. Access the application in your browser at `http://127.0.0.1:5173/`.

## Contribution

Contributions are welcome! If you find any issues or have ideas for improvement, feel free to open an issue or submit a pull request.

Happy coding! 🚀
