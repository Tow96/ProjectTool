import { animate, animation, style, transition, trigger } from '@angular/animations';

export const slideIn = (seconds: number) =>
  animation([
    style({ opacity: 0 }),
    animate(`${seconds}s cubic-bezier(0, 0.5, 1, 0.5)`, style({ opacity: 1 })),
  ]);

export const slideOut = (seconds: number) =>
  animation([
    style({ opacity: 1 }),
    animate(`${seconds}s cubic-bezier(0, 0.5, 1, 0.5)`, style({ opacity: 0 })),
  ]);

export const cardAnimation = trigger('card', [
  transition(':enter', slideIn(0.1)),
  transition(':leave', slideOut(0.1)),
]);

export const spinnerAnimation = trigger('spinner', [
  transition(':enter', slideIn(0.5)),
  transition(':leave', slideOut(0.1)),
]);
