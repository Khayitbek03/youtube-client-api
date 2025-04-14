import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPublishedDateColor]',
  standalone: true,
})
export class PublishedDateColorDirective {
  @Input('appPublishedDateColor') publishedDate!: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const now = new Date();
    const published = new Date(this.publishedDate);
    const diffInMs = now.getTime() - published.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    let color = '';

    if (diffInDays > 180) {
      color = 'red';
    } else if (diffInDays > 30) {
      color = 'yellow';
    } else if (diffInDays >= 7) {
      color = 'green';
    } else {
      color = 'blue';
    }

    this.renderer.setStyle(
      this.el.nativeElement,
      'borderBottom',
      `4px solid ${color}`
    );
  }
}
