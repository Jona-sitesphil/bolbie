import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FeaturesService } from "../../features/features.service";

@Component({
  selector: "app-modal",
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
  standalone: true,
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  editLaptopForm: FormGroup;
  isModalOpen: boolean = true;
  isLaptopOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featuresService: FeaturesService
  ) {
    this.editLaptopForm = this.fb.group({
      device: ["", Validators.required],
      purchaseDate: ["", Validators.required],
      deviceAge: ["", [Validators.required, Validators.min(0)]],
      serial: ["", Validators.required],
      description: ["", [Validators.maxLength(50)]],
      location: [""],
      assigned: [""],
      condition: [""],
      inspection: [""],
      inspected: [""],
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  toggleLaptop() {
    this.isLaptopOpen = !this.isLaptopOpen;
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
