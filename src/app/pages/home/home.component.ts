import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../services/accounts.service';
import { TagsService } from '../../services/tags.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    public formGroup = this._fb.group({
        private: this._fb.control(true),
        url: this._fb.control(null),
        title: this._fb.control(null),
        content: this._fb.control(null),
        tags: this._fb.control(null),
        viaURL: this._fb.control(null),
    });
    private subscription: Subscription;

    public dataSource: MatTableDataSource<string> = new MatTableDataSource([]);
    public newCreateTags: string[] = [];
    public addTags: string[] = [];

    constructor(
        private _fb: FormBuilder,
        private _accounts: AccountsService,
        private _tags: TagsService
    ) {}

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<string>(this._tags.data);
        this.dataSource.filterPredicate = (tag, filter) => tag.includes(filter);
        this.subscription = this.formGroup
            .get('tags')
            .valueChanges.subscribe((v) => {
                this.dataSource.filter = v;
            });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
            this.dataSource = new MatTableDataSource<string>([
                ...this.dataSource.data,
                tag,
            ]);
        }
        this.addTags = [...this.addTags, tag];
    }

    /**
     * タグを削除する。
     * @param removeTag
     */
    public removeTag(removeTag) {
        this.addTags = this.addTags.filter((tag) => tag !== removeTag);

        // 新規作成リストに含まれている場合は、それとタグ一覧メニューからも削除する。
        if (this.newCreateTags.includes(removeTag)) {
            const removedTagsFromNew = this.newCreateTags.filter(
                (tag) => tag !== removeTag
            );
            this.newCreateTags = [...removedTagsFromNew];
            this.dataSource = new MatTableDataSource<string>(
                this.dataSource.data.filter((tag) => tag !== removeTag)
            );
            // TODO: 新しいdataSourceを作成すると、filterPredicateもリセットされる。
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
        if (this.newCreateTags.length) {
            this._tags.add(this.newCreateTags);
        }

        // TODO: post後、全てのFormと選択されているタグ等を削除
    }
}
