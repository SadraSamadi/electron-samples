import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: 'div[appBgImage]'
})
export class BgImageDirective implements OnInit {

  @Input()
  public set appBgImage(url: string) {
    this.div.style.backgroundImage = url && `url(${url})`;
  }

  @Input()
  public set width(width: string) {
    this.div.style.width = width;
  }

  @Input()
  public set height(height: string) {
    this.div.style.height = height;
  }

  private div: HTMLDivElement;

  public constructor(ref: ElementRef) {
    this.div = ref.nativeElement;
  }

  public ngOnInit(): void {
    this.div.classList.add('bg-cover', 'bg-center', 'bg-no-repeat');
  }

}
