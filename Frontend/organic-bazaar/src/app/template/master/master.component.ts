import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent implements OnInit {

  
  ngOnInit(): void {
    const scripts = [
      'assets/js/jquery-3.3.1.min.js',
      'assets/js/bootstrap.min.js',
      'assets/js/jquery.nice-select.min.js',
      'assets/js/jquery-ui.min.js',
      'assets/js/jquery.slicknav.js',
      'assets/js/mixitup.min.js',
      'assets/js/owl.carousel.min.js',
      'assets/js/main.js',
    ];

    this.loadScriptsInParallel(scripts)
      .then(() => console.log('All scripts loaded successfully.'))
      .catch(() => console.error('Error loading some scripts.'));
  }

  loadScriptsInParallel(scripts: string[]): Promise<void[]> {
    const promises = scripts.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          console.log(`Loaded: ${src}`);
          resolve();
        };
        script.onerror = () => {
          console.error(`Error loading script: ${src}`);
          reject();
        };
        document.body.appendChild(script);
      });
    });
    return Promise.all(promises);
  }

}
