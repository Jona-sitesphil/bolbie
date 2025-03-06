import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "../../core/modal/modal.component";
import { CommonModule } from "@angular/common";
import { FeaturesService } from "../features.service";

@Component({
  selector: "app-laptop",
  imports: [ModalComponent, CommonModule],
  templateUrl: "./laptop.component.html",
  styleUrl: "./laptop.component.css",
  standalone: true,
})
export class LaptopComponent implements OnInit {
  laptops: any[] = [];
  isModalOpen = false;
  searchKeyword = "";
  pageNo = 1;
  pageSize = 10;

  constructor(private FeaturesService: FeaturesService) {}

  ngOnInit(): void {
    this.getLaptops();
  }

  getLaptops(): void {
    this.FeaturesService.getAllLaptop(
      this.pageNo,
      this.pageSize,
      this.searchKeyword
    ).subscribe({
      next: (response) => {
        this.laptops = response;
      },
      error: (error) => console.error("Error fetching laptops:", error),
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.getLaptops(); 
  }

  onSearch(): void {
    this.getLaptops(); 
  }
}
