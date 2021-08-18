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
        private electron: ElectronService,
        private storage: StorageService
    ) {
        this._path = this.electron.path.join(
            this.electron.app.getPath('userData'),
            `accounts.json`
        );
        if (!this.storage.has(this._path)) {
            const defaultData: Accounts = {
                userName: '',
                accessToken: '',
            };
            this.storage.create(this._path, JSON.stringify(defaultData));
            this._data = defaultData;
            return;
        }
        this._data = this.storage.get<Accounts>(this._path);
    }

    public get data(): Accounts {
        return this._data;
    }
}
