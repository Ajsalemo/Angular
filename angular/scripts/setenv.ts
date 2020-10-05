/* 
    Taken from https://medium.com/javascript-in-plain-english/setup-dotenv-to-access-environment-variables-in-angular-9-f06c6ffb86c0
    to properly hide and inject environment varialbes in node
    since these are not able to accessed at build time normally
*/

const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();


// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
   
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   OPEN_WEATHER_API_KEY: "${process.env.OPEN_WEATHER_API_KEY}",
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: any) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
