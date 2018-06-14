import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
  // inputs: ['hero'],
  // outputs: ['deleteRequest'],
  // outputs: ['clicks:myClick']
})
/**
 * Lifecycle hooks:
 *  OnChanges
 *    Detects changes to input properties of the directive
 *  OnInit
 *    1. To perform complex initializations shortly after construction.
 *    2. To set up the component after Angular sets the input properties.
 *  DoCheck
 *  AfterContentInit
 *  AfterContentChecked
 *  AfterViewInit
 *  AfterViewChecked
 *  OnDestroy
 *    Unsubscrib/Observables and DOM events, stop interval timers
 */
export class HeroDetailComponent implements OnInit, OnChanges {
  // Input: settable property, bound with property binding
  @Input() hero?: Hero;
  // Output: observable property, bound with event binding
  //   always returns EventEmitter
  // @Output('myClick') clicks = new EventEmitter<string>();
  @Output() deleteRequest = new EventEmitter<Hero>();
  isUnchanged = true;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private msgService: MessageService
  ) {}

  ngOnInit() {
    this.getHero();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const prop in changes) {
      const { currentValue: cur, previousValue: prev } = changes[prop];
      this.msgService.add(`${prop} changes:
        cur = ${JSON.stringify(cur)},
        prev = ${JSON.stringify(prev)}
      `);
    }
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
