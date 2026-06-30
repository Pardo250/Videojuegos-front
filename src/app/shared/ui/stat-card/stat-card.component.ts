import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import gsap from 'gsap';

type Accent = 'violet' | 'cyan' | 'green' | 'magenta';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
})
export class StatCardComponent implements AfterViewInit {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly suffix = input<string>('');
  readonly icon = input<string>('M12 2 2 7l10 5 10-5-10-5Zm0 9-10-5v6l10 5 10-5V6l-10 5Z');
  readonly accent = input<Accent>('violet');

  private readonly valueEl = viewChild.required<ElementRef<HTMLSpanElement>>('valueEl');

  protected readonly accentClasses: Record<Accent, string> = {
    violet: 'text-neon-violet shadow-glow-violet',
    cyan: 'text-neon-cyan shadow-glow-cyan',
    green: 'text-neon-green shadow-glow-green',
    magenta: 'text-neon-magenta',
  };

  ngAfterViewInit(): void {
    const target = { count: 0 };
    gsap.to(target, {
      count: this.value(),
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        this.valueEl().nativeElement.textContent = Math.round(target.count).toString();
      },
    });
  }
}
