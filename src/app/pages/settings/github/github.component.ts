import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
  public formGroup = this.fb.group({
    accountName: this.fb.control(null),
    accessToken: this.fb.control(null),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // TODO: StorageからAccountsを取得して
  }

  public save() {
    console.log(this.formGroup.getRawValue());
  }
}
