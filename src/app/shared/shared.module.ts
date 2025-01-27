import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PikachuModule } from '@pixelmon/pikachu';
import { PixelmonThemeModule } from '@pixelmon/theme';
import { PixelmonGGEditorModule } from '@pixelmon/ggeditor';

import { TranslateModule } from '@ngx-translate/core';
import { GithubButtonModule } from 'ng-github-button';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ColorSketchModule } from 'ngx-color/sketch';
import { HighlightJsModule } from 'ngx-highlight-js';
import { SimplemdeModule } from 'ngx-simplemde';
import { NgxTinymceModule } from 'ngx-tinymce';
import { UEditorModule } from 'ngx-ueditor';

import { CodeBoxComponent } from './components/code-box/code-box.component';
import { ConfigButtonComponent } from './components/config-button/config-button.component';
import { ContentComponent } from './components/content/content.component';
import { DemoDrawerComponent } from './components/dialog/drawer.component';
import { DemoModalComponent } from './components/dialog/modal.component';
import { DocsComponent } from './components/docs/docs.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconComponent } from './components/icon/icon.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { RouteTransferDirective } from './components/route-transfer/route-transfer.directive';

const DIALOG_COMPONENTS = [DemoModalComponent, DemoDrawerComponent, IconComponent];

const COMPONENTS = [
  FooterComponent,
  MainMenuComponent,
  ContentComponent,
  ConfigButtonComponent,
  EditButtonComponent,
  DocsComponent,
  CodeBoxComponent,
  RouteTransferDirective,
  ...DIALOG_COMPONENTS,
];

const THIRDS = [
  HighlightJsModule,
  TranslateModule,
  GithubButtonModule,
  NgxTinymceModule,
  UEditorModule,
  SimplemdeModule,
  ColorSketchModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    PixelmonThemeModule.forChild(),
    PikachuModule,
    PixelmonGGEditorModule,
    ...THIRDS,
  ],
  declarations: COMPONENTS,
  entryComponents: DIALOG_COMPONENTS,
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    PixelmonThemeModule,
    PikachuModule,
    PixelmonGGEditorModule,
    ...THIRDS,
    ...COMPONENTS,
  ],
})
export class SharedModule {}
