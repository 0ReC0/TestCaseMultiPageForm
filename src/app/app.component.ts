import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AllStagesType,
  MultipageForm,
  MultipageFormStages,
  multipageFormTabsStages, Request,
  Stage1Type,
  Stage2Type,
  Stage3Type
} from "./types";
import {YaEvent, YaGeocoderService} from "angular8-yandex-maps";
import {ModalService} from "./modal/modal.service";
import {Subscription} from "rxjs";
import {FormService} from "./form.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  form: FormGroup<MultipageForm> = new FormGroup<MultipageForm>({
    stage1: new FormGroup<Stage1Type>({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
    }),
    stage2: new FormGroup<Stage2Type>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)
      ]),
      address: new FormControl(null, Validators.required),
      dateTime: new FormControl(null, Validators.required),
    }),
    stage3: new FormGroup<Stage3Type>({
      isPersonalDataProcessingAllowed: new FormControl(null, Validators.requiredTrue),
      isSubscribed: new FormControl(null),
    })
  });
  currentTabsStage = multipageFormTabsStages['stage1'];
  currentTabsStageIndex = 0;
  multipageFormTabsStages = multipageFormTabsStages;
  geocoderSub: Subscription | undefined;
  sendReqSub: Subscription | undefined;

  getStageFormGroup(stage: MultipageFormStages) {
    return this.form.get(stage) as FormGroup;
  }

  getFormControl(stage: MultipageFormStages, field: AllStagesType) {
    return this.getStageFormGroup(stage).get(field) as FormControl
  }

  constructor(
    private yaGeocoderService: YaGeocoderService,
    private modalService: ModalService,
    public formService: FormService
  ) {
  }

  switchToPrevStage() {
    if (this.currentTabsStage !== this.multipageFormTabsStages['stage1']) {
      this.currentTabsStageIndex--;
      this.currentTabsStage = this.multipageFormTabsStages[`stage${this.currentTabsStageIndex + 1}`]
    }
  }

  switchToNextStage() {
    if (this.getStageFormGroup(this.currentTabsStage).invalid) {
      this.getStageFormGroup(this.currentTabsStage).markAllAsTouched()
    } else {
      this.currentTabsStageIndex++;
      this.currentTabsStage = this.multipageFormTabsStages[`stage${this.currentTabsStageIndex + 1}`]
    }
  }

  get isModalOpen() {
    return this.modalService.isOpen;
  }

  openModal() {
    this.modalService.open();
  }

  closeModal() {
    this.modalService.close();
  }

  onMapClick({event}: YaEvent<ymaps.Map>): void {
    const coords = event.get('coords');
    const geocodeResult = this.yaGeocoderService.geocode(coords);

    geocodeResult.subscribe((result: any) => {
      const geoObject = result.geoObjects.get(0);
      const address = geoObject.getAddressLine();
      this.getFormControl('stage2', 'address').setValue(address);
      this.closeModal()
    });
  }

  sendRequest() {
    if (this.form.valid) {
      const data: Request = {
        ...this.form.get('stage1')!.value,
        ...this.form.get('stage2')!.value,
        ...this.form.get('stage3')!.value,
      } as Request;

      this.sendReqSub = this.formService.sendRequest(data)
        .subscribe((response) => {
          if (response.status === 'success') {
            const updatedObj = {
              ...data,
              id: response.id
            }
            console.log(updatedObj)
            alert('Посмотрите в консоль')
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.geocoderSub?.unsubscribe();
    this.sendReqSub?.unsubscribe();
  }
}
