'use strict';

 /* es-lint-disable no-console */
 const fs = require('fs').promises;
 const path = require('path');

 const moveFile = async() => {
   const args = process.argv.slice(2);
   const [source, destination] = args;

   const sourceAbsolutePath = path.resolve(source);
   const destinationAbsolutePath = path.resolve(destination);

   try {
     await fs.access(sourceAbsolutePath);

     const isDirectory = destination.endsWith('/');

     const finalDestination = isDirectory
       ? path.join(destinationAbsolutePath, path.basename(sourceAbsolutePath))
       : destinationAbsolutePath;

     const destinationDirectory = path.dirname(finalDestination);

     try {
       await fs.access(destinationDirectory);
     } catch (err) {
       throw new Error(err);
     }

     fs.rename(sourceAbsolutePath, finalDestination);
   } catch (err) {
     throw new Error(err);
   }
 };

 moveFile();
