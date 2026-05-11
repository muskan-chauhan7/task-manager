# Smart Task Management System

A simple Python-based web application for task management with real-time updates and analytics.

## Features
- **Authentication**: User registration, login, and logout.
- **Task Management**: CRUD operations for tasks (Title, Description, Priority, Status).
- **Analytics**: Real-time task statistics using Pandas and NumPy.
- **Real-time Updates**: Live notifications and UI updates using WebSockets.
- **Responsive UI**: Clean and modern interface built with HTML/CSS.

## Technologies Used
- **Backend**: Python, Flask, Flask-SQLAlchemy, Flask-Login, Flask-SocketIO
- **Database**: PostgreSQL
- **Analytics**: Pandas, NumPy
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-manager
```

### 2. Set Up Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure PostgreSQL
- Create a database named `task_manager` in your PostgreSQL instance.
- Update the `.env` file with your database credentials:
```env
DATABASE_URL=postgresql://username:password@localhost/task_manager
SECRET_KEY=your_secret_key
```

### 5. Run the Application
```bash
python app.py
```
The application will be available at `http://127.0.0.1:5000`.

## Database Schema
The system uses two main tables:
1. **users**: Stores user credentials and profile information.
2. **tasks**: Stores task details linked to a specific user.

## Project Structure
- `app.py`: Main application entry point and API routes.
- `models.py`: SQLAlchemy database models.
- `analytics.py`: Data processing logic using Pandas and NumPy.
- `templates/`: HTML templates for the frontend.
- `static/`: CSS and JavaScript files.
