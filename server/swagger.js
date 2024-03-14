const fs = require("fs");
const path = require("path");
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const currentDirectory = __dirname + "/controllers";

let doc = {
  info: {
    version: "1.0.0",
    title: "MetaMart API",
    description: "MetaMart API Information",
    servers: ["http://localhost:5001"],
  },
  host: "localhost:5001",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};


async function generateFileData(file) {
  const basepath = file.replace(".js", "");
  // console.log("bbbbbbbbbbbbbbbbb",basepath);
  const controller = require(path.join(currentDirectory, file));

  let fileData = `const express = require("express");
const app = express();
`;

 fileData = '\n' + fs.readFileSync(path.join(currentDirectory, file), 'utf8');
 // add the doc tag for the controller file
 doc.tags.push({ name: basepath, description: "All endpoints for " + basepath });
 
 
 
 if (controller.middleware) {
   fileData += `app.use(${controller.middleware})\n`;
  }
  console.log("ccccccccccccccccccc",controller.middleware);

  const methods = ["get", "post", "put", "delete", "patch"];

  for (const method of methods) {
    if (controller[method]) {
      for (const route of controller[method]) {
        // Generate the Swagger comment with the tag
       // tag for the controller file and for each route based on the file name and route path
        fileData += `\n
        /**
          * @swagger
          * ${route.path}:
          *  ${method}:
          *   tags:
          *  - ${basepath}
          \n
          */
          \n`;
          
        

        if (route.middleware) {
          // add #swagger.tags = ['Users'] to router.method which is arrow function without return statement, add return statement and add #swagger.tags = ['Users'] to router.method which is arrow function with return statement
          const methodString = route.method.toString();
          // after => add #swagger.tags = ['Users'] with enclosing {} and method body
          const methodBody = methodString.replace("=>", "=> {\n // #swagger.tags = ['" + basepath + "']\n ");
          
          
    


          // add ending } to method body
          const methodBodyWithEnding = methodBody + "\n}";
          // fileData += `app.${method}('/${basepath}${route.path}',${route.middleware},${methodBodyWithEnding})\n`;
          

          // check if middleware is an function with name of verifyJWT then add security section in swagger where authorization parameter is added in header for all routes, also if the route.method function is checking for authorization then swagger will add the authorization parameter in header for that route
          if(route.middleware.name == 'verifyToken' || route.middleware.name == 'validateApiKey'|| route.middleware.name == 'validateOrder' || route.middleware.name == 'validateRegisteration' || route.middleware.name == 'validateVariantsMiddleware' ) {
            doc.security[0].Bearer.push(route.middleware.name);
          }
          fileData += `app.${method}('${route.path}',${methodBodyWithEnding})\n`;
           console.log("route.path.....",route.path);
          



        } else {
          // add #swagger.tags = ['Users'] to router.method which is arrow function without return statement, add return statement and add #swagger.tags = ['Users'] to router.method which is arrow function with return statement
          const methodString = route.method.toString();
         // after => add #swagger.tags = ['Users'] with enclosing {} and method body
          const methodBody = methodString.replace("=>", "=> {\n // #swagger.tags = ['" + basepath + "']\n ");



          

          // add ending } to method body
          const methodBodyWithEnding = methodBody + "\n}";
          fileData += `app.${method}('${route.path}',${methodBodyWithEnding})\n`; 
           console.log("route.path.....",route.path);
        }
      }
    }
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(`./swagger/${file}`, fileData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`./swagger/${file}`);
        console.log(`./swagger/${file}`);
      }
    });
  });
}

(async () => {
  const files = fs
    .readdirSync(currentDirectory)
    .filter((file) => file.endsWith(".js") );
    const endpointsFiles = await Promise.all(files.map(generateFileData));
    
    console.log("Generating swagger file.....😁\n");
    console.log(endpointsFiles);
  
  swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
      for (const file of endpointsFiles) {
        // fs.unlinkSync(file, (err) => {
        //   if (err) {
        //     console.log(err);
        //   }
        // });
      }

      console.log("Swagger file generated successfully.😊\n");
      console.log(
        "You can find the swagger file in the root directory with name swagger_output.json\n"
      );
      console.log("Starting the server.....😎");
    })
    .catch((err) => {
      console.log(err);
    });
})();
