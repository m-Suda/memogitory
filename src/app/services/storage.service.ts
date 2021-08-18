import { Injectable } from '@angular/core';
import * as jetpack from 'fs-jetpack';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private jetpack: typeof jetpack;

    constructor() {
        this.jetpack = window.require('fs-jetpack');
    }

    public get<T>(path: string): T | undefined {
        return this.jetpack.read(path, 'json');
    }

    public set(path: string, data): void {
        this.jetpack.write(path, data);
    }

    public has(path: string): boolean {
        return this.jetpack.read(path, 'json') != null;
    }

    public create(path: string, jsonString: string): void {
        this.jetpack.append(path, jsonString);
    }
}
