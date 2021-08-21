import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { StorageService } from './storage.service';
import { Accounts } from './accounts.service';

export type HubmemoDir = {
    path: string;
};

@Injectable({
    providedIn: 'root',
})
export class HubmemoDirService {
    private readonly _path;
    private _data: HubmemoDir | null = null;

    constructor(
        private _electron: ElectronService,
        private _storage: StorageService
    ) {
        this._path = this._electron.path.join(
            this._electron.app.getPath('userData'),
            `hubmemo-dir.json`
        );
        if (!this._storage.has(this._path)) {
            const defaultData: HubmemoDir = {
                path: '',
            };
            this._storage.create(this._path, JSON.stringify(defaultData));
            this._data = defaultData;
            return;
        }
        this._data = this._storage.get<HubmemoDir>(this._path);
    }

    public get data(): HubmemoDir {
        return this._data;
    }

    public add(data: HubmemoDir): void {
        this._storage.set(this._path, data);
        this._data = data;
    }
}
