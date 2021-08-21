import { Component } from '@angular/core';
import { APP_CONFIG } from '../environments/environment';
import { ElectronService } from './services/electron.service';
import { AccountsService } from './services/accounts.service';
import { TagsService } from './services/tags.service';
import { HubmemoDirService } from './services/hubmemo-dir.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(
        private electronService: ElectronService,
        // この段階で全ての設定ファイルを読み込んでおく。
        private accountsService: AccountsService,
        private tagsService: TagsService,
        private hubmemoDirService: HubmemoDirService
    ) {
        console.log('APP_CONFIG', APP_CONFIG);

        if (electronService.isElectron) {
            console.log(process.env);
            console.log('Run in electron');
            console.log(
                'Electron ipcRenderer',
                this.electronService.ipcRenderer
            );
            console.log(
                'NodeJS childProcess',
                this.electronService.childProcess
            );
        } else {
            console.log('Run in browser');
        }
    }
}
