import { Component } from '@angular/core';
import { SidemenuComponent } from '../../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../services/meter.service';
import { Table, TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../shared/sharedModules';
import { FormsModule } from '@angular/forms';
import { identifierName } from '@angular/compiler';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    SidemenuComponent,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  providers: [ConfirmationService, MessageService, FormBuilder, Validators],
})
export default class CardsComponent {
  constructor(
    private meterService: MeterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}
  logged: boolean = true;
  cardTasks: any = [];
  techList: any = [];
  cardObj: any = {
    cardId: 0,
    techName: '',
    techId: 0,
    cardCreationDate: new Date(),
    cardEndDate: new Date(),
    meterType: 0,
  };
  releaseCardForm = this.fb.group({
    cardId: ['', Validators.required],
    techId: ['', Validators.required],
  });
  save() {
    console.log('form content : ', this.releaseCardForm);
  }
  ngOnInit(): void {
    this.cardTasks = [
      { name: 'ضبط الوقت و التاريخ اوتوماتيك', id: 1 },
      { name: 'ازالة تلاعبات و اخطاء', id: 2 },
      { name: 'فتح و غلق مفاتيح التوصيل', id: 3 },
      { name: 'ضبط الوقت و التاريخ يدويا', id: 4 },
      { name: 'تصفير عداد', id: 5 },
      { name: 'اختبار مفتاح التوصيل', id: 6 },
      { name: 'تغيير شرائح التعريفة', id: 7 },
      { name: 'ضبط حد الفصل و الانذار اتوماتيك', id: 8 },
      { name: 'اطلاق تيار', id: 9 },
      { name: 'تغيير رقم العداد ', id: 10 },
      { name: 'اصدار كارت المعمل ', id: 11 },
      { name: 'تغيير كود الشركة ', id: 12 },
    ];
    this.techList = [
      {
        name: 'ahmed saber',
        id: 1,
      },
      {
        name: 'mostafa tawfik',
        id: 2,
      },
      {
        name: 'mohamed nabwi',
        id: 3,
      },
    ];
  }
}
