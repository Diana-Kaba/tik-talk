import { FormControl } from '@angular/forms';

export interface IProfileFormControls {
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  city: FormControl<string>;
  street: FormControl<string>;
}
