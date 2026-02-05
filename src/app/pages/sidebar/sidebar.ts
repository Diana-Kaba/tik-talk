import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../common/sidebar-component/sidebar-component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

}
