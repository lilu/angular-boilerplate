import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent
  implements OnInit, AfterViewChecked, AfterViewInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;
  oldSelectedHero?: Hero;
  power = '';

  @ViewChild(HeroDetailComponent) detailComponent?: HeroDetailComponent;

  constructor(
    private heroService: HeroService,
    private msgService: MessageService
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  ngAfterViewInit() {
    this.msgService.add('Child view init');
  }

  ngAfterViewChecked() {
    /**
     * Unidirectional data flow rule prevents updating the parent view's in the same cycle
     * So wait one turn
     */
    setTimeout(() => {
      this.detailComponent && (this.power = this.detailComponent.power);
    }, 0);
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  add(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService
      .addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  select(hero: Hero) {
    this.oldSelectedHero = this.selectedHero;
    this.selectedHero = hero;
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  trackByHeroes(index: number, hero: Hero): number {
    return hero.id;
  }
}
