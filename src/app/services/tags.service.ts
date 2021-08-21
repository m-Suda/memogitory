import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class TagsService {
    private readonly _path: string;
    private _data: string[];

    constructor(
        private _electron: ElectronService,
        private _storage: StorageService
    ) {
        this._path = this._electron.path.join(
            this._electron.app.getPath('userData'),
            `tags.json`
        );
        if (!this._storage.has(this._path)) {
            const defaultData: string[] = [];
            this._storage.create(this._path, JSON.stringify(defaultData));
            this._data = defaultData;
            return;
        }
        this._data = this._storage.get<string[]>(this._path);
    }

    public get data(): string[] {
        return this._data;
    }

    public add(newTags: string[]): void {
        const saveTag = [...this._data];
        newTags.forEach((tag) => {
            saveTag.push(tag);
        });
        this._storage.set(this._path, saveTag);
        this._data = saveTag;
    }
}
