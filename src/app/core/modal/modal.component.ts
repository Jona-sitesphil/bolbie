import { Component, EventEmitter, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FeaturesService } from "../../features/features.service";

@Component({
  selector: "app-modal",
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, MatIconModule, FormsModule],
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
  standalone: true,
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  editLaptopForm: FormGroup;
  isModalOpen: boolean = true;
  isAddEmployeeOpen: boolean = false; // For Add Employee modal
  newEmployee: string = "";

  employees: string[] = [
    "Cedric Lunar",
    " Kim Carl Buban",
    "Jhomark Alber",
    "Justmyr Rodriguez",
    "Raymart Castillo",
    "John Kenneth Fajiculay",
    "Cheli Ann",
    "Beverly Dadis"
    
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featuresService: FeaturesService
  ) {
    this.editLaptopForm = this.fb.group({
      device: ["", Validators.required],
      serial: ["", Validators.required],
      description: ["", [Validators.maxLength(50)]],
      purchaseDate: ["", Validators.required],
      location: ["", Validators.required],
      assigned: [""],
      condition: ["", Validators.required],
      previousOwner: [""],
      inspection: ["", Validators.required],
    });
  }

  // Close main modal
  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  onAssignedChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === "add") {
      this.openAddEmployeeModal();
    }
  }

  openAddEmployeeModal() {
    this.isAddEmployeeOpen = true;
  }

  closeAddEmployeeModal() {
    this.isAddEmployeeOpen = false;
    this.newEmployee = "";
  }

  addEmployee() {
    if (this.newEmployee.trim()) {
      this.employees.push(this.newEmployee.trim());
      this.closeAddEmployeeModal();
    }
  }

  onSubmit() {
    if (this.editLaptopForm.valid) {
      const laptopData = this.editLaptopForm.value;
      console.log("Submitting:", laptopData);

      this.featuresService.addLaptop(laptopData).subscribe({
        next: (response) => {
          console.log("Laptop added successfully:", response);
          this.closeModal();
        },
        error: (error) => {
          console.error("Error adding laptop:", error);
        },
      });
    }
  }
}
