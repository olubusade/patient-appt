import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service'

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  doctors: any[] = [];
  newAppointment = {
    patient_name: '',
    doctor_id: null,  // Changed to doctor_id to store the ID of the selected doctor
    appointment_date: '',
    reason: ''
  };
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  selectedAppointmentId: number | null = null;
  appointmentDate: any;  // Date selected by the user
 
  constructor(private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors();
  }
  // Fetch list of doctors
  loadDoctors(): void {
    this.appointmentService.getDoctors().subscribe(
      (data: any) => {
       
        this.doctors = data;

      },
      () => {
        this.showMessage('Failed to load doctors. Please try again.', 'error');
      }
    );
  }
  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (data: any) => {
        this.appointments = data;
      },
      () => {
        this.showMessage('Failed to load appointments. Please try again.', 'error');
      }
    );
  }

  addAppointment(): void {
    
    if (this.isFormValid()) {
    
      this.appointmentService.createAppointment(this.newAppointment).subscribe(
        () => {
          this.showMessage('Appointment added successfully!', 'success');
          this.loadAppointments();
          this.resetForm();
        },
        () => {
          this.showMessage('Failed to add appointment. Please try again.', 'error');
        }
      );
    } else {
      this.showMessage('Please fill in all required fields correctly.', 'error');
    }
  }

  confirmDelete(id: number): void {
    this.selectedAppointmentId = id;
  }

  deleteAppointment(): void {
    if (this.selectedAppointmentId !== null) {
      this.appointmentService.deleteAppointment(this.selectedAppointmentId).subscribe(
        () => {
          this.showMessage('Appointment deleted successfully!', 'success');
          this.loadAppointments();
        },
        () => {
          this.showMessage('Failed to delete appointment. Please try again.', 'error');
        }
      );
      this.selectedAppointmentId = null;
    }
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => (this.message = ''), 5000); // Clear message after 5 seconds
  }

  isFormValid(): boolean {
    const { patient_name, doctor_id, appointment_date, reason } = this.newAppointment;

    // Name validation: at least 3 characters, no numbers
    const nameRegex = /^[a-zA-Z\s]{3,}$/;

    if (!nameRegex.test(patient_name)) {
      this.showMessage('Patient name must be at least 3 characters long and contain only letters and spaces.', 'error');
      return false;
    }
    if (!doctor_id) {
      this.showMessage('Please select a doctor.', 'error');
      return false;
    }

    // Date validation: not empty, future date
    const today = new Date();
    const selectedDate = new Date(appointment_date);

    if (appointment_date.trim() === '' || selectedDate < today) {
      this.showMessage('Appointment date must be a valid future date.', 'error');
      return false;
    }

    // Reason validation: not empty
    if (reason.trim() === '') {
      this.showMessage('Reason for appointment is required.', 'error');
      return false;
    }

    return true;
  }

  resetForm(): void {
    this.newAppointment = {
      patient_name: '',
      doctor_id: null,  // Reset to null when form is cleared
      appointment_date: '',
      reason: ''
    };
  }
  validateNameInput(field: 'patient_name'): void {
    const nameRegex = /^[a-zA-Z\s]*$/; // Allows only letters and spaces
    const value = this.newAppointment[field];
  
    if (!nameRegex.test(value)) {
      this.newAppointment[field] = value.slice(0, -1); // Remove invalid character
      this.showMessage('Invalid character','error')
    }
  }
  
}
