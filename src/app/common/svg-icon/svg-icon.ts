import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: ''
})
export class SvgIcon {
  @Input() icon: string = '';

  get href(): string {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}