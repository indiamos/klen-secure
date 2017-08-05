const authMaster = require('auth-master');
const userAuthenticator = new authMaster(db.Users, {user: function(id){ validationHere }, siteController: function(){...}, admin: function(){}});
// userAuthenticator.isAuthorized(userId);

 //this is how you have to require it in 
// app.use(userAuthenticator.checkAuthorizations) //thus only receives req res next
//dependent on PASSPORT because then you check for req.user 

// function volleyball(req, res, next){

// }
// the goal:  to create a library that works without Express or Sequelize, 
//takes in a model to authenticate, a series of authorization functions
// and performs security functions 
//store authorization models in private object inside an iffy function 
//each new instance MUST be established with an id
//set up to default to sequelize but can be overridden

//somehow pass the functions into the private object 

//model authenticator : what model do you want to authenticate and how do you access it


function authMaster(){
    (function(){
        var thisIsPrivate = {}; 
        return class {
            constructor(modelAuthenticator, authObject){
                this.modelAuthenticator = modelAuthenticator;
                this.authFunctions = authObject || {
                    isUser: function(id){
                        return this.
                    }, 
                    isAdmin: function(id){

                    }
                };
            }
            async checkAuthorizations(userId, typeOfAuth){
                let user = await this.modelAuthenticator.findById(userId);
                if(authFunctions.hasOwnProperty(typeOfAuth)){

                }
                for(let k in this.authFunctions){

                }
                this.authFunction(user);
            }
        }
    })();
    
}

//  checkOneAuth(userId, whichAuth){  //can't be a piece of middleware  -- this should be refactored to be our attempt log
            //  if (secretLocation[this.id].authFunction.hasOwnProperty(whichAuth)){
            //      return whichAuth(userId); 
            //  }
            // }
/*attempt clearance log notes:  

so, the path is this: you run thru the check Authorizations middleware, which attaches a clearances property (an array)
to the req.user (PASSPORT DEPENDENT)

later on, a route runs a function where it checks to see if req.user.clearances INCLUDES a given clearance
IF the answer is no, that userId gets added to a log of users who incorrectly attempt to pass a given clearance 
log model :

FailedClearanceLog = {
    Mod: [1,57,1004,6,327], level 2 ?
    Admin: [899,4,1988,66],  level 5 ?
    SiteController: [12, 10087] level 10 ?
}

Options: require that "clearance levels" conform to a given set of numbers and only are translated into meaningful strings inside the function 
1-10 are options, which is probably more clearance levels than anyone needs, which should be fine  

Remaining Questions:  
where does the clearance log live? 
can it live in the private object?  
how do we get the clearance level IN to the function, if it's middleware 

*/