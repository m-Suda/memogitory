import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ElectronService } from './electron.service';

export type Accounts = {
    userName: string;
    accessToken: string;
};

@Injectable({
    providedIn: 'root',
})
export class AccountsService {
    private readonly _path;
    private _data: Accounts | null = null;

    constructor(
        private _electron: ElectronService,
        private _storage: StorageService
    ) {
        this._path = this._electron.path.join(
            this._electron.app.getPath('userData'),
            `accounts.json`
        );
        if (!this._storage.has(this._path)) {
            const defaultData: Accounts = {
                userName: '',
                accessToken: '',
            };
            this._storage.create(this._path, JSON.stringify(defaultData));
            this._data = defaultData;
            return;
        }
        this._data = this._storage.get<Accounts>(this._path);
    }

    public get data(): Accounts {
        return this._data;
    }

    public add(data: Accounts): void {
        this._storage.set(this._path, data);
        this._data = data;
    }
}
