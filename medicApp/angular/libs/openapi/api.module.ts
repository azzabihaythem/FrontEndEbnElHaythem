import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BasicErrorControllerService } from './api/basicErrorController.service';
import { ExcelControllerService } from './api/excelController.service';
import { HalExplorerService } from './api/halExplorer.service';
import { OperationHandlerService } from './api/operationHandler.service';
import { PatientControllerService } from './api/patientController.service';
import { ProfileControllerService } from './api/profileController.service';
import { SeanceControllerService } from './api/seanceController.service';
import { UserControllerService } from './api/userController.service';
import { WebMvcLinksHandlerService } from './api/webMvcLinksHandler.service';

declare module "@angular/core" {
    interface ModuleWithProviders<T = any> {
        ngModule: Type<T>;
        providers?: Provider[];
    }
}

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BasicErrorControllerService,
    ExcelControllerService,
    HalExplorerService,
    OperationHandlerService,
    PatientControllerService,
    ProfileControllerService,
    SeanceControllerService,
    UserControllerService,
    WebMvcLinksHandlerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
