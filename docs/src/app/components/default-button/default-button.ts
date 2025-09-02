import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-button',
  imports: [],
  templateUrl: './default-button.html',
  styleUrl: './default-button.css'
})
export class DefaultButton {

  @Input() text: string = 'Botão'; // Default text
  @Input() color: string = '#7f5af0'; // Default color
  @Input() paddingX: string = '8'; // Default px (padding x)
  @Input() paddingY: string = '4'; // Default py (padding y)

  get buttonClasses(): string {
  const paddingXClass = this.getPaddingClass('x', this.paddingX);
  const paddingYClass = this.getPaddingClass('y', this.paddingY);
  
  return `text-xs sm:text-base text-white button-hover font-medium border-black border-b-5 border-r-5 ${paddingXClass} ${paddingYClass} mb-2 lg:text-xl `;
}

private getPaddingClass(direction: 'x' | 'y', value: string): string {
  const classMap: { [key: string]: string } = {
    'x-1': 'px-1', 'x-2': 'px-2', 'x-3': 'px-3', 'x-4': 'px-4', 
    'x-5': 'px-5', 'x-6': 'px-6', 'x-8': 'px-8', 'x-9': 'px-9', 'x-10': 'px-10',
    'y-1': 'py-1', 'y-2': 'py-2', 'y-3': 'py-3', 'y-4': 'py-4',
    'y-5': 'py-5', 'y-6': 'py-6', 'y-8': 'py-8', 'y-9': 'py-9', 'y-10': 'py-10'
  };
  
  return classMap[`${direction}-${value}`] || `p${direction}-4`; // fallback
}
}
