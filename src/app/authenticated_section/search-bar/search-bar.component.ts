import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() searchValueChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.searchValueChange.emit(inputElement.value);
  }
}
