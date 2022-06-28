import { Directive,  EventEmitter,  Output } from '@angular/core';
import { } from 'rxjs';

@Directive({
  selector: '[OnCreate]'
})
export class OnCreateDirective {

  @Output() OnCreate:EventEmitter<any> = new EventEmitter();
  ngAfterContentInit() {
    this.OnCreate.emit(null);

}
}
