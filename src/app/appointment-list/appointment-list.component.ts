import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  
  newAppointmentTitle: string = ""
  newAppointmentDate: Date = new Date()
  // appointment = {id: 1, title: "Hey", date: new Date('2023-07-02')}
  appointments: Appointment[] = []

  // Angular Life Cycle Hook, executes at certain moment of a component lifecycle
  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments")
    // Deserealization of JSON Snapshot to JS Object
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []
  }

  addAppointment() {
    // alert(this.newAppointmentTitle + " " + this.newAppointmentDate)
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        id: Date.now(), 
        title: this.newAppointmentTitle, 
        date: this.newAppointmentDate
      }
      // Push the new appoinment to the collection
      this.appointments.push(newAppointment)
      // Reset using Two-Way Data Binding
      this.newAppointmentTitle = ""
      this.newAppointmentDate = new Date()
      // Serialization of JS Object to JSON and store
      localStorage.setItem("appointments", JSON.stringify(this.appointments))
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1)
    // Serialization of JS Object to JSON and store
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
  }
}
