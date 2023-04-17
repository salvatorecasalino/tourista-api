const logoPath = '/public/html/logo.png';

const swaggerOptions = {
    definition: {
      openapi: "3.0.3",    
      info: {
        title: "Tourista API",
        version: "1.0.1",
        'x-logo': {
            url: logoPath, // Sostituire con il percorso corretto del file di immagine del logo
        },
        description:
          "Tourista è una società che opera nel settore del turismo, volta a riorganizzare il mondo dei tour digitali.",
        license:{
          name: "MIT",
          url: "https://opensource.org/licenses/MIT"
        },
        contact: {
          name: "Tourista",
          url: "https://www.tourista.world",
          email: "info@tourista.world",
        },
      },
      components:{
        securitySchemes:{
          bearerAuth:{
            type: "http",
            scheme: "bearer",
            bearerFormat:"JWT"
          }
        }
      },
      security:[{
        bearerAuth:[]
      }],
    },
    apis: ['routes/*.js'],
  };
  
  module.exports = swaggerOptions;