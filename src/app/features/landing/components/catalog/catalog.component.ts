import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, distinctUntilChanged, filter, map, startWith, take, takeUntil } from 'rxjs';

import { CartService } from '../../../../core/services/cart.service';
import { ProductService } from '../../../../core/services/product.service';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Product } from '../../../../shared/models/product.model';
import {
  ProductPreviewDialogComponent,
  ProductPreviewDialogResult
} from '../product-preview-dialog/product-preview-dialog.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CardComponent, MatPaginatorModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroy$ = new Subject<void>();

  private dialogRef: MatDialogRef<ProductPreviewDialogComponent, ProductPreviewDialogResult> | null = null;
  private activeReference: string | null = null;

  public products: Product[] = [];
  public totalProducts = 0;
  public pageIndex = 0;
  public pageSize = 8;
  public readonly pageSizeOptions = [8, 12, 16, 24];

  public ngOnInit(): void {
    this.loadProductsPage(1, this.pageSize);
    this.watchReferenceFromRoute();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.closeDialogSilently();
  }

  public onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProductsPage(this.pageIndex + 1, this.pageSize);
  }

  public openProductPreview(product: Product): void {
    this.router.navigate(['catalogo', product.reference], { relativeTo: this.route });
  }

  public addProduct(product: Product): void {
    this.cartService.addProduct(product);
  }

  public trackByProductId(_: number, product: Product): number {
    return this.getProductId(product);
  }

  private loadProductsPage(page: number, pageSize: number): void {
    this.productService
      .getProducts({ page, pageSize })
      .pipe(take(1))
      .subscribe((response) => {
        this.products = response.items;
        this.totalProducts = response.total;
        this.pageIndex = Math.max(response.page - 1, 0);
        this.pageSize = response.pageSize;
      });
  }

  private watchReferenceFromRoute(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.route.firstChild?.snapshot.paramMap.get('reference') ?? null),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((reference) => {
        this.handleReferenceParam(reference);
      });
  }

  private handleReferenceParam(reference: string | null): void {
    if (!reference) {
      this.activeReference = null;
      this.closeDialogSilently();
      return;
    }

    if (this.activeReference === reference && this.dialogRef) {
      return;
    }

    this.productService
      .getProductByReference(reference)
      .pipe(take(1))
      .subscribe((product) => {
        if (!product) {
          this.router.navigate(['./'], { relativeTo: this.route, fragment: 'catalogo' });
          return;
        }

        this.openDialog(product);
      });
  }

  private openDialog(product: Product): void {
    this.closeDialogSilently();
    this.activeReference = product.reference;
    this.dialogRef = this.dialog.open(ProductPreviewDialogComponent, {
      data: product,
      width: 'min(1120px, 97vw)',
      autoFocus: false,
      restoreFocus: true
    });

    this.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        const shouldKeepRoute = this.route.firstChild?.snapshot.paramMap.get('reference') !== product.reference;

        this.activeReference = null;
        this.dialogRef = null;

        if (result?.addToCart) {
          this.addProduct(product);
        }

        if (!shouldKeepRoute) {
          this.router.navigate(['./'], { relativeTo: this.route, fragment: 'catalogo' });
        }
      });
  }

  private closeDialogSilently(): void {
    if (!this.dialogRef) {
      return;
    }

    this.dialogRef.close();
    this.dialogRef = null;
  }

  private getProductId(product: Product): number {
    return product.id;
  }
}
