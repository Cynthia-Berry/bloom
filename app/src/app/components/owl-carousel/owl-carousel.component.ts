import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-owl-carousel',
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.scss'],
})
export class OwlCarouselComponent implements OnInit {
  like: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  onLike(i: number) {
    console.log(i)
    this.like = !this.like
  }

}
