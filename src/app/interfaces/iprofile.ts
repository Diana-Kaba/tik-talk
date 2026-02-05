import { FormControl, FormGroup } from '@angular/forms';

export interface IProfileFormControls {
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  site: FormControl<string>;
  address: FormGroup<{
    street: FormControl<string>;
    suite: FormControl<string>;
    city: FormControl<string>;
    zipcode: FormControl<string>;
  }>;
}
