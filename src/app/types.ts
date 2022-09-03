import {FormControl, FormGroup} from "@angular/forms";

export type Stage1Type = {
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
}
export type Stage2Type = {
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  address: FormControl<string | null>;
  dateTime: FormControl<Date | null>;
}
export type Stage3Type = {
  isPersonalDataProcessingAllowed: FormControl<boolean | null>;
  isSubscribed?: FormControl<boolean | null>
}
export type AllStagesType = keyof Stage1Type | keyof Stage2Type | keyof Stage3Type;

export type MultipageForm = {
  stage1: FormGroup<Stage1Type>;
  stage2: FormGroup<Stage2Type>;
  stage3: FormGroup<Stage3Type>;
}

export type MultipageFormStages = keyof MultipageForm;

export const multipageFormTabsStages: { [key: string]: MultipageFormStages } = {
  stage1: 'stage1',
  stage2: 'stage2',
  stage3: 'stage3'
}

export type Request = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateTime: Date;
  isPersonalDataProcessingAllowed: boolean;
  isSubscribed?: boolean;
}

export type Response = {
  id: string;
  status: string;
}
