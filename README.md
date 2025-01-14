# Patient Appointment Scheduling System

This is a web-based **Patient Appointment Scheduling System** designed for healthcare facilities to efficiently manage patient appointments. It uses **Angular** for the frontend, **Node.js** for the backend, and **MySQL** for database management. The system allows healthcare professionals (e.g., doctors, front desk staff) to view, schedule, update, and delete patient appointments.

## Features

- **User Roles & Authentication**: Supports role-based access control (RBAC) for different users, including front desk staff, nurses, doctors, and admin.
- **Appointment Management**: Allows users to create, update, delete, and view appointments.
- **Responsive Design**: Mobile-friendly, ensuring smooth user experience on any device.
- **Form Validation**: Includes form validation to ensure valid inputs for appointment scheduling.
- **Bootstrap Alerts**: Success and error notifications are displayed using Bootstrap alerts.
- **Confirmation Modals**: Confirmation modals are used for deletion actions to prevent accidental deletions.
- **Database Management**: MySQL database for storing patient appointments with necessary relationships.

## Technologies Used

- **Frontend**: Angular, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token) for user authentication
- **APIs**: RESTful API endpoints for handling appointment data

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v12 or higher)
- **MySQL** (v5.7 or higher)
- **Angular CLI**
- **npm** (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/olubusade/patient-appt.git
```

### 2. Install Backend Dependencies

Navigate to the backend folder and install the required dependencies.

```bash
cd backend
npm install
```

### 3. Set up MySQL Database

Create a database for the application and configure it in the `config.js` file in the backend.

```sql
CREATE DATABASE appointment_system;
```

Create the necessary tables:

```sql
-- For users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- For appointments
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    appointment_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configure Environment Variables

Create a `.env` file in the root of the backend folder with the following configuration:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=emr-appt
```

### 5. Install Frontend Dependencies

Navigate to the frontend folder and install the required dependencies.

```bash
cd frontend
npm install
```

### 6. Run the Application

- **Start the Backend**: 

In the backend directory, run the following command to start the Node.js server:

```bash
npm start
```

- **Start the Frontend**: 

In the frontend directory, run the following command to start the Angular development server:

```bash
ng serve
```

The frontend will be available at `http://localhost:4200` and the backend API will be available at `http://localhost:3000`.

## API Endpoints

- **POST** `/api/appointments`: Create a new appointment
- **GET** `/api/appointments`: Get all appointments
- **GET** `/api/appointments/doctors`: Get all doctors
- **GET** `/api/appointments/:id`: Get appointment by ID
- **PUT** `/api/appointments/:id`: Update appointment by ID
- **DELETE** `/api/appointments/:id`: Delete appointment by ID

## Frontend Features

- **Appointment Form**: Allows patients and healthcare professionals to schedule an appointment.
- **Appointment Table**: Displays all appointments in a table format, allowing users to manage them.
- **Non-hardcoding Doctor record**: Displays all doctors record, allowing users to select one during appointment.

## Form Validation

All forms in the system are validated to ensure that fields like patient name, doctor name, and appointment date are entered correctly. Date fields use the `datetime-local` input type for users to select both date and time.

## Bootstrap Alerts

- **Success**: A green success message is displayed after a successful operation.
- **Error**: A red error message is displayed if there is an issue with an operation.

## Contribution

Contributions are welcome! If you'd like to improve the project, feel free to fork the repository, make changes, and submit a pull request.

### Steps to Contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add feature'`)
5. Push to the branch (`git push origin feature-name`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Bootstrap for styling and responsive design
- Angular for building the frontend
- Node.js and Express for the backend server
- MySQL for database management
---