import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HubmemoDirService } from '../../../services/hubmemo-dir.service';

@Component({
    selector: 'app-hubmemo-dir',
    templateUrl: './hubmemo-dir.component.html',
    styleUrls: ['./hubmemo-dir.component.scss'],
})
export class HubmemoDirComponent implements OnInit {
    public hubmemoDirPathForm = new FormControl(null);

    constructor(private _hubmemoDir: HubmemoDirService) {}

    ngOnInit(): void {
        const { path } = this._hubmemoDir.data;
        this.hubmemoDirPathForm.setValue(path);
    }

    public save() {
        this._hubmemoDir.add({
            path: this.hubmemoDirPathForm.value,
        });
    }
}
