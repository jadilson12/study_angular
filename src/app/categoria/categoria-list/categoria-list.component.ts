import { AjudaAppService } from './../../shared/ajuda-app.service';
import { CategoriaRearchComponent } from './../categoria-rearch/categoria-rearch.component';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

import { CategoriaService } from '../categoria.service';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';
import { DialogService } from '../../shared/dialog.service';
import { AlertService } from '../../shared/alert.service';
import { Title } from '@angular/platform-browser';
import { CategoriaModel } from '../categoria.model';
import { ConfimarDeleteComponent } from '../../shared/confimar-delete/confimar-delete.component';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriaListComponent implements OnInit {
  displayedColumns = ['nome', 'descricao', 'acoes'];
  dataSource: CategoriaModel[];
  categoria: CategoriaModel;

  constructor(
    private readonly _categoriaService: CategoriaService,
    private readonly _dialogService: DialogService,
    private readonly _alertService: AlertService,
    private readonly _title: Title,
    private readonly _ajuda: AjudaAppService,
  ) {}

  ngOnInit() {
    this._title.setTitle('Lista de Categorias');
    this.getCategorias();
    this._dialogService.getDelete().subscribe(ok => (ok ? this.delete(this.categoria) : ''));
  }

  onHelp() {
    const passos = [
      {
        element: '#title-category',
        popover: {
          className: 'first-step-popover-class',
          title: 'Title on Popover',
          description: 'Body of the popover',
          position: 'buttom',
        },
      },
      {
        element: '#nova-categoria',
        popover: {
          title: 'Nova categoria',
          animate: true,
          description: 'Body of the popover',
          position: 'left',
        },
      },
    ];
    this._ajuda.steps(passos);
  }
  getCategorias() {
    this._categoriaService.getCategorias().subscribe(data => (this.dataSource = data));
  }

  openDialogDelete(categoria: CategoriaModel) {
    this.categoria = categoria;
    this._dialogService.openDialog(ConfimarDeleteComponent, { categoria, tipo: 'Categoria' });
  }

  delete(categoria: CategoriaModel) {
    this._categoriaService.deleteCategoria(categoria.id).subscribe(_ => {
      this.getCategorias();
      this._alertService.sucess();
    });
  }

  openDialog(categoria: CategoriaModel = null): void {
    this._dialogService.openDialog(CategoriaRearchComponent, categoria);
  }

  onNoClick() {
    this._dialogService.closeDialog();
  }
}
