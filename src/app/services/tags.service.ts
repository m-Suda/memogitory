import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class TagsService {
    private readonly path: string;
    private _data: string[];

    constructor(
        private electron: ElectronService,
        private storage: StorageService
    ) {
        this.path = this.electron.path.join(
            this.electron.app.getPath('userData'),
            `tags.json`
        );
        if (!this.storage.has(this.path)) {
            const defaultData: string[] = [];
            this.storage.create(this.path, JSON.stringify(defaultData));
            this._data = defaultData;
            return;
        }
        this._data = this.storage.get<string[]>(this.path);
    }

    public get data(): string[] {
        return this._data;
    }

    public add(newTags: string[]): void {
        const saveTag = [...this._data];
        newTags.forEach((tag) => {
            saveTag.push(tag);
        });
        this.storage.set(this.path, saveTag);
        this._data = saveTag;
    }
}
