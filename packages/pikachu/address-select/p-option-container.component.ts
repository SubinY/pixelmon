import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddressSelectService } from './address-select.service';
import { AddrOption } from './interface';
import { AddrLevelFilterPipe } from './p-option.pipe';

@Component({
  selector: '[p-option-container]',
  exportAs: 'pOptionContainer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl: './p-option-container.component.html',
  host: {
    '[attr.unselectable]': '"unselectable"',
    '[style.user-select]': '"none"',
    '[style.padding]': '"10px"',
    '(mousedown)': '$event.preventDefault()',
  },
  styles: [
    `
      .item {
        display: inline-block;
        width: 120px;
        padding: 5px 10px;
      }
    `,
  ],
})
export class AddrOptionContainerComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject();
  @ViewChild('dropdownUl', { static: true }) dropdownUl: ElementRef<HTMLUListElement>;
  @Input() notFoundContent: string;
  @Input() menuItemSelectedIcon: TemplateRef<void>;
  @Output() readonly scrollToBottom = new EventEmitter<void>();

  @Input()
  set level(v: number) {
    this.addrSelectService.levelLabels = new AddrLevelFilterPipe().transform(v);
    this.addrSelectService.maxLevel = v;
  }

  clickOption(option: AddrOption): void {
    this.addrSelectService.clickOption(option);
  }

  toggleTabs(tab, index: number) {
    if (tab.checked) return;
    this.addrSelectService.toggleTab(index);
  }

  trackLabel(_index: number, option: AddrOption): string | TemplateRef<void> {
    return option.label;
  }

  // tslint:disable-next-line:no-any
  trackValue(_index: number, option: AddrOption): any {
    return option.value;
  }

  constructor(public addrSelectService: AddressSelectService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.addrSelectService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
