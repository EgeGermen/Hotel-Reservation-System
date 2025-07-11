import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-galeri-modal',
  templateUrl: './galeri-modal.component.html',
  styleUrls: ['./galeri-modal.component.scss']
})
export class GaleriModalComponent implements OnInit {
  @Input() resimler: string[] = [];
  @Input() baslangicIndex: number = 0;
  @Output() close = new EventEmitter<void>();
  currentIndex = 0;

  ngOnInit() {
    this.currentIndex = this.baslangicIndex;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.resimler.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.resimler.length) % this.resimler.length;
  }

  kapat() {
    this.close.emit();
  }

  @HostListener('document:keydown.arrowright', ['$event'])
  onRightArrow(event: KeyboardEvent) {
    this.next();
  }

  @HostListener('document:keydown.arrowleft', ['$event'])
  onLeftArrow(event: KeyboardEvent) {
    this.prev();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    this.kapat();
  }
} 