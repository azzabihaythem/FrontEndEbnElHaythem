# FrontEndEbnElHaythem
# FrontEndEbnElHaythem


#generate angular api from back swagegr
https://github.com/swagger-api/swagger-codegen
cd C:\work\swagger-codegen\modules\swagger-codegen-cli\target
java -jar swagger-codegen-cli.jar generate    -i https://api.angular.schule/swagger.json    -l typescript-angular    -o /var/tmp/angular_api_client
java -jar swagger-codegen-cli.jar generate    -i backEndSwagegr.json    -l typescript-angular    -o C:\work