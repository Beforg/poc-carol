import { Component } from '@angular/core';

interface CareItem {
  title: string;
  text: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  public readonly careItems = this.createCareItems();

  private createCareItems(): CareItem[] {
    return [
      {
        title: 'Processo manual',
        text: 'Cada peca e moldada com atencao ao detalhe e acabamento duravel.'
      },
      {
        title: 'Materias naturais',
        text: 'Argila, linho, algodao e madeira de origem responsavel.'
      },
      {
        title: 'Apoio local',
        text: 'Parcerias com artesaos e pequenos atelies independentes.'
      }
    ];
  }
}
