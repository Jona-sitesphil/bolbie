import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "../../core/modal/modal.component";
import { CommonModule } from "@angular/common";
import { FeaturesService } from "../features.service";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, NgModel } from "@angular/forms";

interface Laptop {
  id: number;
  name: string;
  purchasedDate: string;
  serialNumber: string;
  description: string;
  location: string;
  assignedPersonnel: string;
  condition: string;
  inspectionFrequency: string;
  inspectedBy: string;
}

@Component({
  selector: "app-laptop",
  imports: [
    ModalComponent,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: "./laptop.component.html",
  styleUrl: "./laptop.component.css",
  standalone: true,
})
export class LaptopComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "purchasedDate",
    "serialNumber",
    "description",
    "location",
    "assignedPersonnel",
    "condition",
    "inspectionFrequency",
    "inspectedBy",
    "actions",
  ];
  laptops: Laptop[] = [
    {
      id: 1,
      name: "HP Inspiron 3501 Series",
      purchasedDate: "December 20, 2021",
      serialNumber: "7KJ2PH3",
      description: "New Laptop Dell (Mat Black)",
      location: "1NK Center",
      assignedPersonnel: "Sir Benjie",
      condition: "Working",
      inspectionFrequency: "Quarterly",
      inspectedBy: "Pogi si Kim Carl Buban",
    },
    {
      id: 2,
      name: "Acer Inspiron 3501 Series",
      purchasedDate: "December 20, 2021",
      serialNumber: "7KJ2PH3",
      description: "New Laptop Dell (Mat Black)",
      location: "1NK Center",
      assignedPersonnel: "Sir Benjie",
      condition: "Working",
      inspectionFrequency: "Quarterly",
      inspectedBy: "Bolbi Cedric Lunar",
    },
    {
      id: 3,
      name: "Lenovo Inspiron 3501 Series",
      purchasedDate: "December 20, 2021",
      serialNumber: "7KJ2PH3",
      description: "New Laptop Dell (Mat Black)",
      location: "1NK Center",
      assignedPersonnel: "Sir Benjie",
      condition: "Working",
      inspectionFrequency: "Quarterly",
      inspectedBy: "Bolbi Cedric Lunar",
    },
  ];
  isModalOpen = false;
  searchKeyword = "";
  pageNo = 1;
  pageSize = 10;

  constructor(private FeaturesService: FeaturesService) {}

  ngOnInit(): void {
    this.getLaptops();
  }

  // getLaptops(): void {
  //   this.FeaturesService.getAllLaptop(
  //     this.pageNo,
  //     this.pageSize,
  //     this.searchKeyword
  //   ).subscribe({
  //     next: (response) => {
  //       this.laptops = response;
  //     },
  //     error: (error) => console.error("Error fetching laptops:", error),
  //   });
  // }

  getLaptops(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();

    if (keyword) {
      // Filter the laptops based on the search keyword
      this.laptops = this.laptops.filter(
        (laptop) =>
          laptop.name.toLowerCase().includes(keyword) ||
          laptop.serialNumber.toLowerCase().includes(keyword) ||
          laptop.description.toLowerCase().includes(keyword) ||
          laptop.location.toLowerCase().includes(keyword) ||
          laptop.assignedPersonnel.toLowerCase().includes(keyword) ||
          laptop.condition.toLowerCase().includes(keyword) ||
          laptop.inspectionFrequency.toLowerCase().includes(keyword) ||
          laptop.inspectedBy.toLowerCase().includes(keyword)
      );
    } else {
      // If no search keyword, reset to mock data
      this.laptops = [
        {
          id: 1,
          name: "HP Inspiron 3501 Series",
          purchasedDate: "December 20, 2021",
          serialNumber: "7KJ2PH3",
          description: "New Laptop Dell (Mat Black)",
          location: "1NK Center",
          assignedPersonnel: "Sir Benjie",
          condition: "Working",
          inspectionFrequency: "Quarterly",
          inspectedBy: "Pogi si Kim Carl Buban",
        },
        {
          id: 2,
          name: "Acer Inspiron 3501 Series",
          purchasedDate: "December 20, 2021",
          serialNumber: "7KJ2PH3",
          description: "New Laptop Dell (Mat Black)",
          location: "1NK Center",
          assignedPersonnel: "Sir Benjie",
          condition: "Working",
          inspectionFrequency: "Quarterly",
          inspectedBy: "Bolbi Cedric Lunar",
        },
        {
          id: 3,
          name: "Lenovo Inspiron 3501 Series",
          purchasedDate: "December 20, 2021",
          serialNumber: "7KJ2PH3",
          description: "New Laptop Dell (Mat Black)",
          location: "1NK Center",
          assignedPersonnel: "Sir Benjie",
          condition: "Working",
          inspectionFrequency: "Quarterly",
          inspectedBy: "Bolbi Cedric Lunar",
        },
      ];
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.getLaptops();
  }

  onSearch(): void {
    this.pageNo = 1; // Reset to first page on search
    this.getLaptops();
  }

  clearSearch(): void {
    this.searchKeyword = "";
    this.getLaptops();
  }
}
