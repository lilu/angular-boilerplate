import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sizer',
  templateUrl: './sizer.component.html',
  styleUrls: ['./sizer.component.scss']
})
export class SizerComponent {
  @Input() size: number | string = 0;
  @Output() sizeChange = new EventEmitter<number>();

  currentClasses = {
    saveable: true,
    modified: true,
    special: false
  };

  currentStyles = {};

  setStyles() {
    this.currentStyles = {
      'font-size': `${this.size}px`
    };
  }

  dec() {
    this.resize(-1);
  }

  inc() {
    this.resize(+1);
  }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
    this.setStyles();
  }
}
