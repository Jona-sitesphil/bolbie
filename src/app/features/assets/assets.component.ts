import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface Laptop {
  id: number;
  name: string;
  purchaseDate: string;
  serial: string;
  description: string;
  location: string;
  assigned: string;
  condition: string;
  inspection: string;
  inspectedBy: string;
}

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent {
  isEditMode = false;
  editIndex: number | null = null;

  laptops: Laptop[] = [
    {
      id: 1,
      name: 'Dell Inspiron 3501 Series',
      purchaseDate: '2021-12-20',
      serial: '7KJ2PH3',
      description: 'New Laptop Dell (Mat Black)',
      location: '1NK Center',
      assigned: 'Sir Benjie',
      condition: 'Working',
      inspection: 'Quarterly',
      inspectedBy: 'Cedric Lunar'
    }
  ];

    laptopForm = new FormGroup({
    device: new FormControl(''),
    purchaseDate: new FormControl(''),
    deviceAge: new FormControl(''),
    serial: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    assigned: new FormControl(''),
    condition: new FormControl(''),
    inspection: new FormControl(''),
    inspected: new FormControl('')
  });

  openModal(isEdit: boolean = false, index: number | null = null) {
    this.isEditMode = isEdit;
    this.editIndex = index;

    if (isEdit && index !== null) {
      const laptop = this.laptops[index];
      this.laptopForm.setValue({
        device: laptop.name,
        purchaseDate: laptop.purchaseDate,
        deviceAge: '',  // You might want to calculate this dynamically
        serial: laptop.serial,
        description: laptop.description,
        location: laptop.location,
        assigned: laptop.assigned,
        condition: laptop.condition,
        inspection: laptop.inspection,
        inspected: laptop.inspectedBy
      });
    } else {
      this.laptopForm.reset();  // Clear form if adding new laptop
    }

    const modal = document.getElementById('popup-wrapper');
    if (modal) modal.style.display = 'block';
  }

  closeModal() {
    const modal = document.getElementById('popup-wrapper');
    if (modal) modal.style.display = 'none';
    this.isEditMode = false;
    this.editIndex = null;
  }

  saveLaptop() {
    const formValues = this.laptopForm.value;

    if (this.isEditMode && this.editIndex !== null) {
      
      this.laptops[this.editIndex] = {
        id: this.laptops[this.editIndex].id,
        name: formValues.device || '',
        purchaseDate: formValues.purchaseDate || '',
        serial: formValues.serial || '',
        description: formValues.description || '',
        location: formValues.location || '',
        assigned: formValues.assigned || '',
        condition: formValues.condition || '',
        inspection: formValues.inspection || '',
        inspectedBy: formValues.inspected || ''
      };
    } else {

      const newLaptop: Laptop = {
        id: this.laptops.length + 1,
        name: formValues.device || '',
        purchaseDate: formValues.purchaseDate || '',
        serial: formValues.serial || '',
        description: formValues.description || '',
        location: formValues.location || '',
        assigned: formValues.assigned || '',
        condition: formValues.condition || '',
        inspection: formValues.inspection || '',
        inspectedBy: formValues.inspected || ''
      };
      this.laptops.push(newLaptop);
    }

    console.log('Laptops:', this.laptops);
    this.closeModal();
  }

  deleteLaptop(index: number) {
    this.laptops.splice(index, 1);
    console.log('Laptop deleted:', this.laptops);
  }
}
