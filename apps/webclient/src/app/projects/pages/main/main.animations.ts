import { animate, animation, style, transition, trigger } from '@angular/animations';

export const slideIn = animation([
  style({ opacity: 0 }),
  animate('0.1s cubic-bezier(0, 0.5, 1, 0.5)', style({ opacity: 1 })),
]);

export const slideOut = animation([
  style({ opacity: 1 }),
  animate('0.1s cubic-bezier(0, 0.5, 1, 0.5)', style({ opacity: 0 })),
]);

export const cardAnimation = trigger('card', [
  transition(':enter', slideIn),
  transition(':leave', slideOut),
]);
