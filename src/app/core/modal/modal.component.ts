import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FeaturesService } from "../../features/features.service";

@Component({
  selector: "app-modal",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
  standalone: true,
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  editLaptopForm: FormGroup;
  isModalOpen: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featuresService: FeaturesService // ✅ Inject the service
  ) {
    this.editLaptopForm = this.fb.group({
      device: ["", Validators.required],
      purchaseDate: ["", Validators.required],
      deviceAge: ["", [Validators.required, Validators.min(0)]],
      serial: ["", Validators.required],
      description: ["", [Validators.maxLength(50)]],
      // location: [""],
      assigned: [""],
      condition: [""],
      inspection: [""],
      inspected: [""],
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit(); // 🔸 Emit the event when modal is closed
  }

  // 🌟 Handle form submission
  onSubmit() {
    if (this.editLaptopForm.valid) {
      const laptopData = this.editLaptopForm.value;
      console.log("Submitting:", laptopData); // 🔸 Debug log

      // 🌟 Call the addLaptop service method
      this.featuresService.addLaptop(laptopData).subscribe({
        next: (response) => {
          console.log("Laptop added successfully:", response);
          this.closeModal(); // Close modal on success
        },
        error: (error) => {
          console.error("Error adding laptop:", error);
        },
      });
    }
  }
}
