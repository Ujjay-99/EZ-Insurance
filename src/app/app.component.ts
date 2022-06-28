import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   *
   */
  constructor() {
    enableSidebar()
    
  }
  title = 'insurance-angular-app';
  
}
function enableSidebar(){
document.addEventListener('DOMContentLoaded', event => {


  const sidebarToggle = document.body.querySelector('#sidebarToggle');
  if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      //     document.body.classList.toggle('sb-sidenav-toggled');
      // }
      sidebarToggle.addEventListener('click', event => {
          event.preventDefault();
          document.body.classList.toggle('sb-sidenav-toggled');
          // localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
  }

});
}
