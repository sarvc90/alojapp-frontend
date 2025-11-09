import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-atom-button',
  template: `<button (click)="clicked.emit()" class="w-full py-2 rounded-md font-semibold" [disabled]="disabled">{{label}}</button>`
})
export class ButtonAtomComponent {
  @Input() label = 'Enviar';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();
}
