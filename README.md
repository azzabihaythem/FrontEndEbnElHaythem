# FrontEndEbnElHaythem

#generate angular api from back swagegr

https://www.youtube.com/watch?v=wtIVxvJFT2k&t=18s

https://github.com/swagger-api/swagger-codegen

cd C:\work\swagger-codegen\modules\swagger-codegen-cli\target

java -jar swagger-codegen-cli.jar generate    -i https://api.angular.schule/swagger.json    -l typescript-angular    -o /var/tmp/angular_api_client

java -jar swagger-codegen-cli.jar generate    -i backEndSwagegr.json    -l typescript-angular    -o C:\work


---> to fix some error in generated code

replace import { Observable } from 'rxjs/Observable'; by replace import { Observable } from 'rxjs;

and link by any

and add
 declare module "@angular/core" {
    interface ModuleWithProviders<T = any> {
        ngModule: Type<T>;
        providers?: Provider[];
    }
}
in api.module.ts

#install node

download and install nvm

nvm list

nvm install 14.20
