const express = require('express')
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express()
const programmes_alimentaires = require('./programme_alimentaire.json')
const programmes_entrainements = require('./programme_entrainement.json')
const profils_sportif =require('./profil_sportif.json')
const data_v2 = require('./profil_sportif.json')
const { check, validationResult } = require('express-validator');
const totoro =require('totoro-node')


// Middleware
app.use(express.json())
app.use(cors());
app.use(bodyparser.json());
const routes = require("./router/router");

//app.use("/api", routes);
 
const controller = require("./controller/controller");

//router.get("/home", controller.home);

// signup routes


// login routes



// bodyparser
app.use(bodyparser.json());
app.use("/api", routes);




// chargement de file users 


app.use('/',totoro.rain({
    // defition de version 
    v1:{
        // pramater optimale par defaut 
        active: true,
        deprecated: false,

        endpoints: [
            {
              route: "/programmes_alimentaires",
              method: "GET",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              { //chkToken = verifyToken(req.token); //the code in comments is for verifiy token 
               // if (chkToken.status == true) {
              
                return res.status(200).json(programmes_alimentaires)

                //}else{ res.send({status: false,msg: "token invalid",});}
              }

              
            },
            {
              route: "/programmes_alimentaires/:id",
              method: "GET",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
                
              
                const id = parseInt(req.params.id)
                const programme_alimentaire = programmes_alimentaires.find(programme_alimentaire => programme_alimentaire.id === id)
                return res.status(200).json(programme_alimentaire)
              }
        



            },{

              route: "/programmes_alimentaires/:id",
              method: "PUT",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
                const id = parseInt(req.params.id)
                let programme_alimentaire = programmes_alimentaires.find(programme_alimentaire => programme_alimentaire.id === id)
                if(programmes_alimentaires.find(programme_alimentaire => programme_alimentaire.id === id)){
                programme_alimentaire.type_régime=req.body.type_régime,
                programme_alimentaire.période=req.body.période,
                programme_alimentaire.menu1=req.body.menu1,
                programme_alimentaire.menu2=req.body.menu2,
                programme_alimentaire.menu3=req.body.menu3,
                programme_alimentaire.menu3=req.body.menu3}
               return res.status(200).json(programme_alimentaire)
                
              
              
              }
            

            },
          {
            route: "/programmes_alimentaires/:id",
            method: "DELETE",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
              let programme_alimentaire = programmes_alimentaires.find(programme_alimentaire => programme_alimentaire.id === id)
              programmes_alimentaires.splice(programmes_alimentaires.indexOf(programme_alimentaire),1)
             return res.status(200).json(programmes_alimentaires)
            }

          },{



            route: "/programmes_alimentaires",
            method: "POST",
            active: true, 
            deprecated: false, 
            implementation:([
              check('type_régime').isIn(['abdos', 'acide base', 'anti-cellulite', 'antoine', 'atkins', 'belle plante', 'circadien', 'citron', 'CSIRO', 'jeûne', 'dissocié', 'dukan', 'fibres', 'forking', 'groupe sanguin', 'hollywood', 'hormonal', 'hyperprotéine', 'hypocalorique', 'index glycémique', 'jacques fricker', 'jacques fricker', 'karl lagerfeld', 'kousmine', 'macrobiotique', 'mayo', 'mc keith', 'méditerranéen', 'miami', 'multicolore', 'okinawa', 'paléolithique', 'paul-loup sulitzer', 'pommes de terre', 'portfolio', 'pritikin', 'protidique', 'sans sel', 'savoir maigrir', 'scarsdale', 'seignalet', 'shapiro', 'shelton', 'sonia Dubois', 'soupe', 'starter', 'the Zone', 'végétarien', 'véronique Genest']),
              check('menu1').isLength({ min: 50 }),
              check('menu2').isLength({ min: 50 }),
              check('menu3').isLength({ min: 50 }),
              check('menu4').isLength({ min: 50 }),
              check('période').isIn(['15 jours','1 mois','2 mois','3 mois']),
            ], (apiVersion,req, res) => {
              const errors = validationResult(req)
              if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
               
              }
            
              else {
                programmes_alimentaires.push(req.body)
                return res.status(200).json(programmes_alimentaires)
                
              }
            
              
             
            })},













            {
              route: "/programmes_entrainements",
              method: "GET",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
                
              
                res.status(200).json(programmes_entrainements)
              }

              
            },
            {
              route: "/programmes_entrainements/:id",
              method: "GET",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
                
              
                const id = parseInt(req.params.id)
    const programme_entrainement = programmes_entrainements.find(programme_entrainement => programme_entrainement.id === id)
    return res.status(200).json(programme_entrainement)
              }
        



            },{

              route: "/programmes_entrainements/:id",
              method: "PUT",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
                const id = parseInt(req.params.id)
                let programme_entrainement = programmes_entrainements.find(programme_entrainement => programme_entrainement.id === id)
                 
                if(programmes_entrainements.find(programme_entrainement => programme_entrainement.id === id))
                {
                programme_entrainement.type_entrainement=req.body.type_entrainement,
            
                programme_entrainement.exercices_populaires=req.body.exercices_populaires
                }
               
               return res.status(200).json(programmes_entrainements)
                
              
              
              }
            

            },
          {
            route: "/programmes_entrainements/:id",
            method: "DELETE",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
    let programme_entrainement = programmes_entrainements.find(programme_entrainement => programme_entrainement.id === id)
   
    programmes_entrainements.splice(programmes_entrainements.indexOf(programme_entrainement),1)
    return res.status(200).json(programmes_entrainements)
            }

          },{



            route: "/programmes_entrainements",
            method: "POST",
            active: true, 
            deprecated: false, 
            implementation:( [
              check('type_entrainement').isIn(['cardio', 'circuit', 'par intervalles', 'crossfit', 'fonctionnel', 'relaxation']),
              check('exercices_populaires').isLength({ min: 50 }),
          
            ], (apiVersion,req, res) => {
              const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
  
    else {
        programmes_entrainements.push(req.body)
        return res.status(200).json(programmes_entrainements)
     
    }
            
              
             
            })}


          ]

             

    },
    

    v2:{
      active: true,
      deprecated: false,

      endpoints: [
          {
              route: "/profils_sportif",
              method: "GET",
              active: true, 
              deprecated: false, 
              implementation: function(apiVersion, req, res)
              {
               return res.status(200).json(profils_sportif)
                
             }   
          },
          
          
          {
            route: "/profils_sportif/:id",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
              const profil_sportif = profils_sportif.find(profil_sportif => profil_sportif.id === id)
              return res.status(200).json(profil_sportif)
            },
          
          },

          {
            route: "/profils_sportif/:id",
            method: "DELETE",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
              let profil_sportif = profils_sportif.find(profil_sportif => profil_sportif.id === id)
              profils_sportif.splice(profils_sportif.indexOf(profil_sportif),1)
             return res.status(200).json(profils_sportif)
            },
          
          },

          
          {
            route: "/programmes_alimentaires",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              return res.status(200).json(programmes_alimentaires)
            }

            
          },
          {
            route: "/programmes_alimentaires/:id",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
              const programme_alimentaire = programmes_alimentaires.find(programme_alimentaire => programme_alimentaire.id === id)
              return res.status(200).json(programme_alimentaire)
            }
      



          },{

            route: "/programmes_alimentaires/:id",
            method: "PUT",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              const id = parseInt(req.params.id)
              let programme_alimentaire = programmes_alimentaires.find(programme_alimentaire => programme_alimentaire.id === id)
              if(programmes_alimentaires.find(programme_alimentaire => programme_alimentaire.id === id)){
              programme_alimentaire.type_régime=req.body.type_régime,
              programme_alimentaire.période=req.body.période,
              programme_alimentaire.menu1=req.body.menu1,
              programme_alimentaire.menu2=req.body.menu2,
              programme_alimentaire.menu3=req.body.menu3,
              programme_alimentaire.menu3=req.body.menu3}
             return res.status(200).json(programme_alimentaire)
              
            
            
            }
          

          },
        {
          route: "/programmes_alimentaires/:id",
          method: "DELETE",
          active: true, 
          deprecated: false, 
          implementation: function(apiVersion, req, res)
          {
            
          
            const id = parseInt(req.params.id)
            let programme_alimentaire = programmes_alimentaires.find(programme_alimentaire => programme_alimentaire.id === id)
            programmes_alimentaires.splice(programmes_alimentaires.indexOf(programme_alimentaire),1)
           return res.status(200).json(programmes_alimentaires)
          }

        },{



          route: "/programmes_alimentaires",
          method: "POST",
          active: true, 
          deprecated: false, 
          implementation:([
            check('type_régime').isIn(['abdos', 'acide base', 'anti-cellulite', 'antoine', 'atkins', 'belle plante', 'circadien', 'citron', 'CSIRO', 'jeûne', 'dissocié', 'dukan', 'fibres', 'forking', 'groupe sanguin', 'hollywood', 'hormonal', 'hyperprotéine', 'hypocalorique', 'index glycémique', 'jacques fricker', 'jacques fricker', 'karl lagerfeld', 'kousmine', 'macrobiotique', 'mayo', 'mc keith', 'méditerranéen', 'miami', 'multicolore', 'okinawa', 'paléolithique', 'paul-loup sulitzer', 'pommes de terre', 'portfolio', 'pritikin', 'protidique', 'sans sel', 'savoir maigrir', 'scarsdale', 'seignalet', 'shapiro', 'shelton', 'sonia Dubois', 'soupe', 'starter', 'the Zone', 'végétarien', 'véronique Genest']),
            check('menu1').isLength({ min: 50 }),
            check('menu2').isLength({ min: 50 }),
            check('menu3').isLength({ min: 50 }),
            check('menu4').isLength({ min: 50 }),
            check('période').isIn(['15 jours','1 mois','2 mois','3 mois']),
          ], (apiVersion,req, res) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() })
             
            }
          
            else {
              programmes_alimentaires.push(req.body)
              return res.status(200).json(programmes_alimentaires)
              
            }
          
            
           
          })},













          {
            route: "/programmes_entrainements",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              res.status(200).json(programmes_entrainements)
            }

            
          },
          {
            route: "/programmes_entrainements/:id",
            method: "GET",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              
            
              const id = parseInt(req.params.id)
  const programme_entrainement = programmes_entrainements.find(programme_entrainement => programme_entrainement.id === id)
  return res.status(200).json(programme_entrainement)
            }
      



          },{

            route: "/programmes_entrainements/:id",
            method: "PUT",
            active: true, 
            deprecated: false, 
            implementation: function(apiVersion, req, res)
            {
              const id = parseInt(req.params.id)
              let programme_entrainement = programmes_entrainements.find(programme_entrainement => programme_entrainement.id === id)
               
              if(programmes_entrainements.find(programme_entrainement => programme_entrainement.id === id))
              {
              programme_entrainement.type_entrainement=req.body.type_entrainement,
          
              programme_entrainement.exercices_populaires=req.body.exercices_populaires
              }
             
             return res.status(200).json(programmes_entrainements)
              
            
            
            }
          

          },
        {
          route: "/programmes_entrainements/:id",
          method: "DELETE",
          active: true, 
          deprecated: false, 
          implementation: function(apiVersion, req, res)
          {
            
          
            const id = parseInt(req.params.id)
  let programme_entrainement = programmes_entrainements.find(programme_entrainement => programme_entrainement.id === id)
 
  programmes_entrainements.splice(programmes_entrainements.indexOf(programme_entrainement),1)
  return res.status(200).json(programmes_entrainements)
          }

        },{



          route: "/programmes_entrainements",
          method: "POST",
          active: true, 
          deprecated: false, 
          implementation:( [
            check('type_entrainement').isIn(['cardio', 'circuit', 'par intervalles', 'crossfit', 'fonctionnel', 'relaxation']),
            check('exercices_populaires').isLength({ min: 50 }),
        
          ], (apiVersion,req, res) => {
            const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  else {
      programmes_entrainements.push(req.body)
      return res.status(200).json(programmes_entrainements)
   
  }
          
            
           
          })}


        ]

           


    }



}))




app.use((req, res, next)=> {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});


app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.json({error:{
    message:error.message
  }
})
});






const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));


//module.exports = app;
