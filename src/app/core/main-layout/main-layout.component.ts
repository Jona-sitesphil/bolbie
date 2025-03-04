import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
// import { AssetsComponent } from "../../features/assets/assets.component";


@Component({
  selector: 'app-main-layout',
  imports: [FooterComponent, RouterOutlet, HeaderComponent,],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {}
