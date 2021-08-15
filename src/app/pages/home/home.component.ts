import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public formGroup = this.fb.group({
    private: this.fb.control(true),
    url: this.fb.control(null),
    title: this.fb.control(null),
    content: this.fb.control(null),
    tags: this.fb.control(null),
    viaURL: this.fb.control(null),
  });
  private subscription: Subscription;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public allTags = [
    'javascript',
    'typescript',
    'java',
    'kotlin',
    'python',
    'php',
  ];
  public dataSource: MatTableDataSource<string> = new MatTableDataSource([]);
  public newCreateTags: string[] = [];
  public addTags: string[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<string>(this.allTags);
    this.dataSource.filterPredicate = ((tag, filter) => tag.includes(filter));
    this.subscription = this.formGroup.get('tags').valueChanges.subscribe(v => {
      this.dataSource.filter = v;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * タグ一覧メニューを開く。
   */
  public openMenu() {
    this.trigger.openMenu();
  }

  /**
   * タグが一覧メニューから選択された。
   * @param tag
   */
  public selectTag(tag: string) {
    this.formGroup.get('tags').setValue(tag);
  }

  /**
   * タグを追加する。
   */
  public addTag() {
    const { value: tag } = this.formGroup.get('tags');
    this.formGroup.get('tags').setValue(null);
    if (this.addTags.includes(tag)) {
      return;
    }
    // 新規作成されたタグは新規作成リストに追加する。
    if (!this.dataSource.data.includes(tag)) {
      this.newCreateTags.push(tag);
      this.dataSource = new MatTableDataSource<string>(
        [...this.dataSource.data, tag]
      );
    }
    this.addTags = [...this.addTags, tag];
  }

  /**
   * タグを削除する。
   * @param removeTag
   */
  public removeTag(removeTag) {
    this.addTags = this.addTags.filter(tag => tag !== removeTag);

    // 新規作成リストに含まれている場合は、それとタグ一覧メニューからも削除する。
    if (this.newCreateTags.includes(removeTag)) {
      const removedTagsFromNew = this.newCreateTags.filter(tag => tag !== removeTag);
      this.newCreateTags = [...removedTagsFromNew];
      this.dataSource = new MatTableDataSource<string>(
        this.dataSource.data.filter(tag => tag !== removeTag)
      );
    }
  }

  /**
   * Postする。
   */
  public post() {
    const formValues = this.formGroup.getRawValue();
    const saveMemo = { ...formValues, tags: this.addTags };
    console.log(saveMemo);
    console.log(this.newCreateTags);
  }
}
