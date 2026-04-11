import { Injectable } from '@angular/core';

import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products = this.createProducts();

  public getProducts(): Product[] {
    return this.products;
  }

  private createProducts(): Product[] {
    return [
      {
        id: 1,
        title: 'Caneca Rustica de Ceramica',
        price: 89.9,
        tag: 'Artesanal',
        image: 'https://picsum.photos/seed/mug-rustica/640/640',
        description: 'Modelada a mao com acabamento fosco e toque natural.'
      },
      {
        id: 2,
        title: 'Bowl Terracota Atemporal',
        price: 75.9,
        tag: 'Ceramica Unica',
        image: 'https://picsum.photos/seed/bowl-terracota/640/640',
        description: 'Pequenas variacoes de textura que tornam cada peca unica.'
      },
      {
        id: 3,
        title: 'Manta de Algodao Organico',
        price: 160,
        tag: 'La Sustentavel',
        image: 'https://picsum.photos/seed/manta-organica/640/640',
        description: 'Tecido leve e confortavel para compor ambientes acolhedores.'
      },
      {
        id: 4,
        title: 'Tabua de Servir de Madeira',
        price: 120,
        tag: 'Artesanal',
        image: 'https://picsum.photos/seed/tabua-madeira/640/640',
        description: 'Madeira reaproveitada e acabamento com oleo mineral.'
      },
      {
        id: 5,
        title: 'Conjunto de Pratos Claros',
        price: 145,
        tag: 'Ceramica Unica',
        image: 'https://picsum.photos/seed/pratos-claros/640/640',
        description: 'Ideal para mesa posta com visual leve e elegante.'
      },
      {
        id: 6,
        title: 'Vaso Terracota Alto',
        price: 98.5,
        tag: 'Artesanal',
        image: 'https://picsum.photos/seed/vaso-terracota/640/640',
        description: 'Formato vertical para folhagens e composicoes naturais.'
      },
      {
        id: 7,
        title: 'Jogo Americano em Fibras',
        price: 69,
        tag: 'La Sustentavel',
        image: 'https://picsum.photos/seed/jogo-americano/640/640',
        description: 'Feito com fibras naturais para uso diario.'
      },
      {
        id: 8,
        title: 'Porta Mantimentos Ceramica',
        price: 133.9,
        tag: 'Ceramica Unica',
        image: 'https://picsum.photos/seed/porta-mantimentos/640/640',
        description: 'Organizacao funcional com estilo artesanal.'
      }
    ];
  }
}
