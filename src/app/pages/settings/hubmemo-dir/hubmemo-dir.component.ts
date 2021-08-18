import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-hubmemo-dir',
    templateUrl: './hubmemo-dir.component.html',
    styleUrls: ['./hubmemo-dir.component.scss'],
})
export class HubmemoDirComponent implements OnInit {
    public formGroup = this.fb.group({
        hubmemoDirPath: this.fb.control(null),
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // TODO: StorageからAccountsを取得して
    }

    public save() {
        console.log(this.formGroup.getRawValue());
    }
}
