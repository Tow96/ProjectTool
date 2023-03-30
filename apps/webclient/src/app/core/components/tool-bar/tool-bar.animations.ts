import { animate, animation, sequence, style, transition, trigger } from '@angular/animations';

export const fallIn = animation([
  style({ opacity: 0 }),
  animate('2s cubic-bezier(0, 0.5, 1, 0.5)', style({ opacity: 1 })),
]);

export const bounceIn = sequence([
  style({ transform: 'translateY(-10px)' }),
  animate('200ms linear', style({ transform: 'translateY(0)' })),
  animate('100ms cubic-bezier(0,0,0,.5)', style({ transform: 'translateY(-4px)' })),
  animate('80ms cubic-bezier(0,0,1,0)', style({ transform: 'translateY(0)' })),
]);

export const iconAnimation = trigger('icon', [transition(':enter', bounceIn)]);
