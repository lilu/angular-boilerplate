import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  isUnchanged = true;
  @Output() deleteRequest = new EventEmitter<Hero>();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.heroService.getHero(+id).subscribe(hero => (this.hero = hero));
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.hero &&
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  changed() {
    this.isUnchanged = false;
  }

  delete() {
    this.deleteRequest.emit(this.hero);
  }
}
