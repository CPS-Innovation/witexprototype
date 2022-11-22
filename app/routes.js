const express = require('express')
const router = new express.Router()

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
  req.version = req.originalUrl.split('/')[1] // this is added by DC project
  req.feature = req.originalUrl.split('/')[1]
  req.sprint = req.originalUrl.split('/')[2]
  res.locals.version = req.version // this is added by DC project
  res.locals.feature = req.feature
  res.locals.sprint = req.sprint
 // var arse = req.params[0];
  next()
})


// Versions routing stuff - so indivdual routes are in the sub version
router.use(/\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/version-${req.params[0]}/routes`)(req, res, next);
})

console.log('main routes loaded');
router.get('/', (req, res) => {
  res.render('index')
})

/// Employers ID setup

// Start Dummy Data
const dummy_employer_1 = {
  id: "XJBMNV",
  name: "Assurance Aerospace Engineering"
}

const dummy_employer_2 = {
  id: "PPJTRA",
  name: "; DROP TABLE \"COMPANIES\";-- LTD"
}


router.use(function (req, res, next) {
  if (!req.session.employers) {
    console.log("Adding employers to session");
    req.session.employers = [dummy_employer_1, dummy_employer_2];
  }
  next();
})


router.param('employer', function (req, res, next, employer) {
  var employers = req.session.employers.filter(e => e.id == employer);
  if (employers.length == 1) {
    res.locals.employer = employers[0];
  }
  next();
});


///// End of employers ID stuff

// routing the app 
// /// This is just a test version.
// router.get('/version-1/manage-apprenticeships/branch1' , function (req, res) {
//   // Get the answer from the query string (eg. ?over18=false)
//   var over18 = req.query.over18

//   if (over18 === 'false') {
//     // Redirect to the relevant page
//     res.redirect(`/${req.version}/manage-apprenticeships/branch2`)
//   } else {
//     // If over18 is any other value (or is missing) render the page requested
//     res.render(`${req.version}/manage-apprenticeships/branch1`)
//   }
// })

// Redirects for Vanessas end to end
// Employer started
 router.get('/directEmployer', function (req, res) {
   res.redirect(`/version-12/newregister/employerStarted/v3/`)
 })


// Provider started, employer finishes
 router.get('/directProvider', function (req, res) {
  res.redirect("/version-12/newregister/employerStarted/v3/email")
 })


// v11 Homepage back to Vanessas version
 router.get('/version-11/home', function (req, res) {
  res.redirect("https://das-registration-prototype.herokuapp.com/interimHomepage")
 })

// v11 Recruit back to Vanessas version
 router.get('/version-11/recruit', function (req, res) {
  res.redirect("https://das-recruit-prototype.herokuapp.com/raa-v2/0-1-9/recruitment/dashboard-multiple?user=employer&journey=existing&NumberOfEntities=0")
 })





//  ------------------  CPS NAV ----------------------
// CPS > Nav > Home
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/CPSHomeNav', function (req, res) {
  res.redirect(`/${req.version}/redaction`)
 })

  router.get('/*/*/CPSHomeNav', function (req, res) {
  res.redirect(`/${req.version}/redaction`)
 })


  // CPS > Nav > Review
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/CPSreviewNav', function (req, res) {
  res.redirect(`/${req.version}/scrolljourneymodal/casefile`)
 })

  router.get('/*/*/CPSreviewNav', function (req, res) {
  res.redirect(`/${req.version}/scrolljourneymodal/casefile`)
 })

    // CPS > Nav > Redaction
// bit hacky but works - needs two routes for top level and lower down the chain
 router.get('/*/CPSRedactNav', function (req, res) {
  res.redirect(`/${req.version}/redaction/tagRedact`)
 })

  router.get('/*/*/CPSRedactNav', function (req, res) {
  res.redirect(`/${req.version}/redaction/tagRedact`)
 })


 router.get('/*/CPSLogDashboard', function (req, res) {
  res.redirect(`/${req.version}/samelog`)
 })

  router.get('/*/*/CPSLogDashboard', function (req, res) {
  res.redirect(`/${req.version}/samelog`)
 })

 router.get('/*/CPSLogLog', function (req, res) {
  res.redirect(`/${req.version}/samelog/addlog`)
 })

  router.get('/*/*/CPSLogLog', function (req, res) {
  res.redirect(`/${req.version}/samelog/addlog`)
 })

   router.get('/*/logReportCPS', function (req, res) {
  res.redirect(`/${req.version}/samelog/CPSLogReport`)
 })

  router.get('/*/*/logReportCPS', function (req, res) {
  res.redirect(`/${req.version}/samelog/CPSLogReport`)
 })

   router.get('/*/helpDAHome', function (req, res) {
  res.redirect(`/${req.version}/helpda`)
 })

  router.get('/*/*/helpDAHome', function (req, res) {
  res.redirect(`/${req.version}/helpda`)
 })


   router.get('/*/helpDAReport', function (req, res) {
  res.redirect(`/${req.version}/helpda/reporting`)
 })

  router.get('/*/*/helpDAReport', function (req, res) {
  res.redirect(`/${req.version}/helpda/reporting`)
 })

     router.get('/*/helpDAInvest', function (req, res) {
  res.redirect(`/${req.version}/helpda/investigation`)
 })

  router.get('/*/*/helpDAInvest', function (req, res) {
  res.redirect(`/${req.version}/helpda/investigation`)
 })

       router.get('/*/helpDATrial', function (req, res) {
  res.redirect(`/${req.version}/helpda/trial`)
 })

  router.get('/*/*/helpDATrial', function (req, res) {
  res.redirect(`/${req.version}/helpda/trial`)
 })



/// registration > used service before?
router.get('/*/manage-apprenticeships/signin' , function (req, res) {
  var usedService = req.query.usedService  
  if (usedService === 'false') {
    res.redirect(`/${req.version}/manage-apprenticeships/whatyoullneed`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})

/// registration > used service before? Feb version
/// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/usedServiceBefore
router.get('/*/manage-apprenticeships/signinFEB' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/newregister/employerStarted/feb/need`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})



/// registration > used service before? Feb version
/// http://127.0.0.1:3000/version-8/newregister/employerStarted/feb/usedServiceBefore
router.get('/*/manage-apprenticeships/signinAPR' , function (req, res) {
  var usedService = req.query.usedService
  if (usedService === 'false') {
    res.redirect(`/${req.version}/newregister/employerStarted/april/need`)
  } else {
    res.render(`${req.version}/manage-apprenticeships/signin`)
  }
})


// This should remove a trailing slash from the end of the URL that occassionaly breaks the urls and redirects
router.use(function(req, res, next) {
      if (req.path.length > 1 && /\/$/.test(req.path)) {
        var query = req.url.slice(req.path.length)
        res.redirect(301, req.path.slice(0, -1) + query)
      } else {
        next()
      }
    });


// Nav home
//router.get('/version-1/arse', function (req, res) {
 // res.render(`/${req.version}/home/index`);
 //})



router.get('/*/start/witnessTypeOne' , function (req, res) {
  var confirmTraining = req.query.witnessType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              // req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`witnessTypeProChoose`)
            
           break;

           case  (confirmTraining == 'No'):
           // req.session.data['MG11SheMcNotRedacted'] = true;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`whoClaiming`)
            
        default:
            console.log("bork bork bork bork");
                     // req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`whoClaiming`)
            break;
        }
})

router.get('/*/start/witnessTypeTwo' , function (req, res) {
  var confirmTraining = req.query.witnessType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              // req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`tbc`)
            
           break;

           case  (confirmTraining == 'No'):
           // req.session.data['MG11SheMcNotRedacted'] = true;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`whoClaiming`)
            
        default:
            console.log("bork bork bork bork");
                     // req.session.data['MG11SheMcRedacted'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`whoClaiming`)
            break;
        }
})



router.get('/*/start/claimPayRoute' , function (req, res) {
  var confirmTraining = req.query.employmentType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['employmentTypeShow'] = true;
              req.session.data['lossPayShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['employmentTypeShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`lossOfPay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            break;
        }
})   

router.get('/*/start/lossPayRoute' , function (req, res) {
  var confirmTraining = req.query.lossPay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['lossPayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`overnightStay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['lossPayShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            break;
        }
})



router.get('/*/start/overNightStayRoute' , function (req, res) {
  var confirmTraining = req.query.overnightStay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['overNightStayShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`travel`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['overNightStayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`travel`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['overNightStayShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`travel`)
            break;
        }
})

router.get('/*/start/travelRoute' , function (req, res) {
  var confirmTraining = req.query.travelclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`travel`)
            break;
        }
})


router.get('/*/start/childcareRoute' , function (req, res) {
  var confirmTraining = req.query.childcare
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['childcareShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['childcareShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`petSitting`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/foodRoute2' , function (req, res) {
  var confirmTraining = req.query.foodclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['foodShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../foodanddrink`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['foodShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`travel`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`travel`)
            break;
        }
})

router.get('/*/start/travelRoute2' , function (req, res) {
  var confirmTraining = req.query.travelclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../travel`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`overnightStay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`overnightStay`)
            break;
        }
})

router.get('/*/start/overNightStayRoute2' , function (req, res) {
  var confirmTraining = req.query.overnightStay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['overNightStayShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../overnightstay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['overNightStayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`lossOfPay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['overNightStayShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`lossOfPay`)
            break;
        }
})

router.get('/*/overnightstay/paidAlready' , function (req, res) {
  var confirmTraining = req.query.overnightPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`meal`)
            
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`accomodation`)
            
        default:
            console.log("bork bork bork bork");

              res.redirect(`meal`)
            break;
        }
})

router.get('/*/overnightstay/paidAlready2' , function (req, res) {
  var confirmTraining = req.query.overnightPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`nights`)
            
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`accomodation`)
            
        default:
            console.log("bork bork bork bork");

              res.redirect(`meal`)
            break;
        }
})

router.get('/*/overnightstay/didUserPay' , function (req, res) {
  var confirmTraining = req.query.overnightUserPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
          req.session.data['userPaidOvernight'] = 'yes';
              res.redirect(`nights`)
            
           break;

           case  (confirmTraining == 'No'):
            req.session.data['userPaidOvernight'] = 'no';
            res.redirect(`nights`)
            
        default:
            console.log("bork bork bork bork");
            req.session.data['userPaidOvernight'] = 'yes';
              res.redirect(`nights`)
            break;
        }
})

router.get('/*/overnightstay/didUserPay2' , function (req, res) {
  var confirmTraining = req.query.overnightUserPaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
         req.session.data['userPaidOvernight'] = 'no';
              res.redirect(`nights`)
            
           break;

           case  (confirmTraining == 'No'):
            req.session.data['userPaidOvernight'] = 'no';
            res.redirect(`meal`)
            
        default:
            console.log("bork bork bork bork");
            req.session.data['userPaidOvernight'] = 'yes';
              res.redirect(`nights`)
            break;
        }
})

router.get('/*/overnightstay/whereHotelRoute' , function (req, res) {

    var confirmTraining = req.session.data['userPaidOvernight']
       switch (true) {
          case  (confirmTraining == 'yes'):
              res.redirect(`whereHotel`)
            
           break;

           case  (confirmTraining == 'no'):
            res.redirect(`../start/lossOfPay`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`3`)
            break;
        }
})


router.get('/*/start/employedornotroute' , function (req, res) {

    var confirmTraining = req.query.workornot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`employedornot`)
            
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`childcare`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`3`)
            break;
        }
})

router.get('/*/start/selfemployedornotroute' , function (req, res) {

    var confirmTraining = req.query.employedornot
       switch (true) {
          case  (confirmTraining == 'Employed'):
              res.redirect(`../lossOfPay`)
            
           break;

           case  (confirmTraining == 'Self employed'):
            res.redirect(`../selfEmployed`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`3`)
            break;
        }
})

router.get('/*/start/lossPayRoute2' , function (req, res) {
  var confirmTraining = req.query.lossPay
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              req.session.data['employmentTypeShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../unpaidDay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['lossPayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`yourWork`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['lossPayShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            break;
        }
})

router.get('/*/lossOfPay/unpaiddayoffroute' , function (req, res) {
  var confirmTraining = req.query.unpaiddayoff
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['lossPayShow'] = true;
              req.session.data['employmentTypeShow'] = false;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../unpaidDay`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['lossPayShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['lossPayShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            break;
        }
})

router.get('/*/start/claimPayRoute2' , function (req, res) {
  var confirmTraining = req.query.employmentType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['employmentTypeShow'] = true;
              res.redirect(`childcare`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['employmentTypeShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare`)
            break;
        }
})

router.get('/*/selfEmployed/claimPayRoute3' , function (req, res) {
  var confirmTraining = req.query.employmentType
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['employmentTypeShow'] = true;
              res.redirect(`lostIncome`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['employmentTypeShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`hired`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/selfEmployed/lostIncome/losemore85route' , function (req, res) {
  var confirmTraining = req.query.losemore85
       switch (true) {
          case  (confirmTraining == 'Yes'):
            
              res.redirect(`../../start/childcare`)
            
           break;

           case  (confirmTraining == 'No'):
         
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`takeHomePay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/selfEmployed/hired/doworkforyouroute' , function (req, res) {
  var confirmTraining = req.query.doWork4You
       switch (true) {
          case  (confirmTraining == 'Yes'):
            
              res.redirect(`days`)
            
           break;

           case  (confirmTraining == 'No'):
         
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../../start/childcare`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/selfEmployed/hired/losemorePaidroute' , function (req, res) {
  var confirmTraining = req.query.losemorePaid
       switch (true) {
          case  (confirmTraining == 'Yes'):
            
              res.redirect(`proof`)
            
           break;

           case  (confirmTraining == 'No'):
         
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`takeHomePay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['employmentTypeShow'] = 'arse';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`3`)
            break;
        }
})

router.get('/*/start/childcareRoute2' , function (req, res) {
  var confirmTraining = req.query.childcare
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['childcareShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../childcare`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['childcareShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`petSitting`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})


router.get('/*/ofstedRoute' , function (req, res) {
  var confirmTraining = req.query.ofsted
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['childcareShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`childcare/ofsted`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['childcareShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`childcare/notOfsted`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/petsittingRoute2' , function (req, res) {
  var confirmTraining = req.query.petsitting
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../pet`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`otherExpenses`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`petSitting`)
            break;
        }
})

router.get('/*/start/otherRoute2' , function (req, res) {
  var confirmTraining = req.query.otherexpenses
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['otherShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../otherExpenses`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../receipts`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`./receipts`)
            break;
        }
})


router.get('/*/payyou/paymetypeRoute2' , function (req, res) {
  var confirmTraining = req.query.paymetype
       switch (true) {
          case  (confirmTraining == 'UK bank or building society'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`ukbank`)
           break;

           case  (confirmTraining == 'Bank outside UK'):
          // req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`2`)

          case  (confirmTraining == 'Cheque'):
            res.redirect(`3`)
            
        default:
            console.log("bork bork bork bork");
             //   req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`./receipts`)
            break;
        }
})

router.get('/*/unpaidDay/takeHomeRoute2' , function (req, res) {
  var confirmTraining = req.query.takehome
       switch (true) {
          case  (confirmTraining == 'Yes'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`confirmUnpaid`)
           break;

           case  (confirmTraining == 'No'):
          // req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`takeHomePay`)

          case  (confirmTraining == 'Dont know'):
            res.redirect(`takeHomePay`)
            
        default:
            console.log("bork bork bork bork");
             //   req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`./receipts`)
            break;
        }
})

router.get('/*/unpaidDay/payProof2' , function (req, res) {
  var confirmTraining = req.query.uploadProof
       switch (true) {
          case  (confirmTraining == 'Give employer details'):
             // req.session.data['Show'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`employerDetails`)
           break;

           case  (confirmTraining == 'Upload proof'):
          // req.session.data['other'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/childcare`)

            
        default:
            console.log("bork bork bork bork");
             //   req.session.data['childcareShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../start/childcare`)
            break;
        }
})

router.get('/*/start/travelRoute3' , function (req, res) {
  var confirmTraining = req.query.travelclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../travel`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../payyou`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../payyou`)
            break;
        }
})

router.get('/*/start/travelRoute4' , function (req, res) {
  var confirmTraining = req.query.travelclaim
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['travelShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../travel`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['travelShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`../start/overnightStay`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['travelShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../overnightStay`)
            break;
        }
})

router.get('/*/travel/higherMileRoute' , function (req, res) {
  var confirmTraining = req.query.higherMile
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`whyHigher`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`otherWitnesses`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/travel/otherWitnessRoute' , function (req, res) {
  var confirmTraining = req.query.otherWitnesses
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`howManyWitness`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`miles`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/parkingRoute' , function (req, res) {
  var confirmTraining = req.query.parkOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
            req.session.data['needReceiptPark'] = true;
              res.redirect(`howMuchPark`)
           break;

           case  (confirmTraining == 'No'):
           req.session.data['needReceiptPark'] = false;
            res.redirect(`otherDriving`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})



router.get('/*/travel/parkingRoute2' , function (req, res) {
  var confirmTraining = req.query.parkOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
            req.session.data['needReceiptPark'] = true;
              res.redirect(`howMuchParkReceipts`)
           break;

           case  (confirmTraining == 'No'):
           req.session.data['needReceiptPark'] = false;
            res.redirect(`otherDriving`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/parkingRoute2b' , function (req, res) {
  var confirmTraining = req.query.parkOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`howMuchParkReceipts`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`otherDriving`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/parkingRoute3' , function (req, res) {
  var confirmTraining = req.query.parkinghaveReceipts
       switch (true) {
          case  (confirmTraining == 'yes'):
             req.session.data['haveSomeRecipts'] = true;
              res.redirect(`otherDriving`)
           break;

           case  (confirmTraining == 'No, I have some of my receipt(s)'):
            req.session.data['haveSomeRecipts'] = true;
            res.redirect(`otherDriving`)
             break;

           case  (confirmTraining == 'No, I dont have any of my receipts'):
            res.redirect(`otherDriving`)
             break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/travel/otherDrivingRoute' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`multiTravelRouterCar`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/otherDrivingRoute2' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
            req.session.data['needReceiptDrive'] = true;
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
           req.session.data['needReceiptDrive'] = false;
            res.redirect(`multiTravelRouterCar2`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/otherDrivingRoute3' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`../receipts/`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

router.get('/*/travel/otherDrivingRoute4' , function (req, res) {
  var confirmTraining = req.query.drivingCostsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No'):
            res.redirect(`../start/overnightStay/`)
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/travel/parkingRoute' , function (req, res) {
  var confirmTraining = req.query.parkinghaveReceipts
       switch (true) {
          case  (confirmTraining == 'Yes'):
           req.session.data['haveSomeRecipts'] = true;
              res.redirect(`otherDrivingCost`)
           break;

           case  (confirmTraining == 'No, I have some of my receipt(s)'):
            req.session.data['haveSomeRecipts'] = true;
             res.redirect(`otherDrivingCost`)
            break;

            case  (confirmTraining == 'No, I dont have any of my receipts'):
             res.redirect(`otherDrivingCost`)
            break;


        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/receipts/receiptsEndDecide' , function (req, res) {
  var confirmTraining = req.query.receiptsOrNot
       switch (true) {
          case  (confirmTraining == 'Yes'):
            req.session.data['needReceiptDrive'] = true;
              res.redirect(`add`)
           break;

           case  (confirmTraining == 'No, I have some of my receipt(s)'):
           req.session.data['haveSomeRecipts'] = true;
            res.redirect(`reasonWhy`)
            break;

         case  (confirmTraining == 'No, I dont have any of my receipt(s)'):
              req.session.data['haveSomeRecipts'] = false;
              res.redirect(`reasonWhy`)
           break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})


router.get('/*/receipts/receiptMissingRoute' , function (req, res) {
  
       switch (true) {
        case  (req.session.data['haveSomeRecipts'] == true):
         res.redirect(`add`)
          break;

       case  (req.session.data['haveSomeRecipts'] == false):
         res.redirect(`../payyou`)
          break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
})

// NOT SURE HOW ELSE TO DO THIS, SETS UP ALL THE OTHER req.session stuff before going into task list for first time

router.get('/*/start/petSittingRoute' , function (req, res) {
  var confirmTraining = req.query.petsitting
       switch (true) {
          case  (confirmTraining == 'Yes'):
              req.session.data['petSittingShow'] = true;
                      req.session.data['trainCostShow'] = false;
                      req.session.data['tubeCostShow'] = false;
                      req.session.data['foodAndDrinkShow'] = false;
                        req.session.data['petConfirmedShow'] = false;
              res.redirect(`../tasklist`)
            
           break;

           case  (confirmTraining == 'No'):
           req.session.data['petSittingShow'] = false;
                  req.session.data['trainCostShow'] = false;
                  req.session.data['tubeCostShow'] = false;
                  req.session.data['foodAndDrinkShow'] = false;
                   req.session.data['petConfirmedShow'] = false;
            res.redirect(`../tasklist`)
            
        default:
            console.log("bork bork bork bork");
                req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`../tasklist`)
            break;
        }
})

router.get('/*/start/setupTaskListRoute' , function (req, res) {

            req.session.data['overNightStayShow'] = true;
          req.session.data['lossPayShow'] = true;
          req.session.data['employmentTypeShow'] = true;
            req.session.data['petSittingShow'] = true;
            req.session.data['childcareShow'] = true;
            req.session.data['travelShow'] = true;
  
              req.session.data['trainCostShow'] = false;
              req.session.data['tubeCostShow'] = false;
              req.session.data['foodAndDrinkShow'] = false;
              req.session.data['petConfirmedShow'] = false;
              req.session.data['receiptDoneShow'] = false;
              res.redirect(`../tasklist`)
   
})



// travel in the tasklist route v3
router.get('/*/travel/transportChoiceRoute' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {
          case  (confirmTraining == 'Train'):
              // req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            
           break;

           case  (confirmTraining == 'Tube/subway/tram'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`tubeCost`)
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            break;
        }
})


// travel in the tasklist route v3
router.get('/*/travel/transportChoiceRoute2' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {
          case  (confirmTraining == 'Public transport'):
              // req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            
           break;

           case  (confirmTraining == 'Car'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`car`)

        case  (confirmTraining == 'Motorbike/scooter'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`motorbike`)

        case  (confirmTraining == 'Bicycle'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`bicycle`)

        case  (confirmTraining == 'Taxi'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`taxi`)
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            break;
        }
})

// travel in the tasklist route v3
router.get('/*/travel/transportChoiceRoute3' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {
          case  (confirmTraining == 'Train'):
              // req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            
           break;

           case  (confirmTraining == 'Car'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`car`)

        case  (confirmTraining == 'Motorbike/scooter'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`motorbike`)

        case  (confirmTraining == 'Bicycle'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`bicycle`)

        case  (confirmTraining == 'Taxi'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`taxi`)
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCost`)
            break;
        }
})


// travel in the tasklist route v3
router.get('/*/travel/transportChoiceRoute4' , function (req, res) {
  var confirmTraining = req.query.transportChoice
       switch (true) {
          case  (confirmTraining == 'Train'):
              // req.session.data['petSittingShow'] = true;
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCostReceipts`)
            
           break;

           case  (confirmTraining == 'Car'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`car`)

        case  (confirmTraining == 'Motorbike/scooter'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`motorbike`)

        case  (confirmTraining == 'Bicycle'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`bicycle`)

        case  (confirmTraining == 'Taxi'):
           // req.session.data['petSittingShow'] = false;
           // req.session.data['MG11SheMcRedacted'] = true;
            res.redirect(`taxi`)
            
        default:
            console.log("bork bork bork bork");
                // req.session.data['petSittingShow'] = 'goneWrong';
              // req.session.data['MG11SheMcNotRedacted'] = false;
              res.redirect(`trainCostReceipts`)
            break;
        }
})


// travel in the tasklist route v3 - setting to show pub transport after
router.get('/*/travel/multiTravelRouterPubTrain' , function (req, res) {
      var confirmTraining = req.query.haveReceipts
       switch (true) {
          case  (confirmTraining == 'yes'):
            req.session.data['haveSomeRecipts'] = true;
              res.redirect(`car`)
           break;

           case  (confirmTraining == 'No, I have some of my receipt(s)'):
           req.session.data['haveSomeRecipts'] = true;
            res.redirect(`car`)
            break;

         case  (confirmTraining == 'No, I dont have any of my receipts'):
              res.redirect(`car`)
           break;
            
        default:
            console.log("bork bork bork bork");
              res.redirect(`../bork`)
            break;
        }
        

})

// travel in the tasklist route v3 - setting to show pub transport after
router.get('/*/travel/multiTravelRouterPubTrans' , function (req, res) {
         req.session.data['showReceipt'] = true;
              res.redirect(`car`)
})

router.get('/*/travel/multiTravelRouterCar' , function (req, res) {
         req.session.data['showPubTrans'] = false;
         req.session.data['showCar'] = false;
              res.redirect(`multiTravelRouter`)
})

router.get('/*/travel/multiTravelRouterCar2' , function (req, res) {
         req.session.data['showPubTrans'] = false;
         req.session.data['showCar'] = false;
              res.redirect(`multiTravelRouter`)
})


// route the multi travel things
router.get('/*/travel/multiTravelRouter' , function (req, res) {
       switch (true) {
        case  (req.session.data['showPubTrans'] == true):
         res.redirect(`../bork`)
          break;
        case  (req.session.data['needReceiptPark'] == true  || req.session.data['needReceiptDrive'] == true ||  req.session.data['showReceipt'] == true || req.session.data['haveSomeRecipts'] == true):
         res.redirect(`../receipts/add`)
          break;
        case  (req.session.data['needReceiptPark'] == false && req.session.data['needReceiptDrive'] == false):
         res.redirect(`../payyou`)
          break;
            
        default:
            res.redirect(`../payyou`)
        break;
        }
})

// v7 router to make the receipts question show at the end
router.get('/*/travel/receiptRouter' , function (req, res) {
       switch (true) {
        case  (req.session.data['showPubTrans'] == true):
         res.redirect(`../bork`)
          break;
        case  (req.session.data['needReceiptPark'] == true  || req.session.data['needReceiptDrive'] == true ||  req.session.data['showReceipt'] == true || req.session.data['haveSomeRecipts'] == true):
         res.redirect(`../receipts/`)
          break;
        case  (req.session.data['needReceiptPark'] == false && req.session.data['needReceiptDrive'] == false):
         res.redirect(`../payyou`)
          break;
            
        default:
            res.redirect(`../receipts`)
        break;
        }
})




router.get('/*/travel/tubeCostRoute' , function (req, res) {

            req.session.data['trainCostShow'] = true;
            req.session.data['tubeCostShow'] = true;
              res.redirect(`../tasklist`)
})

router.get('/*/foodanddrink/foodAndDrinkRoute' , function (req, res) {

            req.session.data['foodAndDrinkShow'] = true;
              res.redirect(`../tasklist`)
})

router.get('/*/pet/petCostRoute' , function (req, res) {

            req.session.data['petConfirmedShow'] = true;
              res.redirect(`../tasklist`)
})

router.get('/*/receipts/receiptsDone' , function (req, res) {

            req.session.data['receiptDoneShow'] = true;
              res.redirect(`../tasklist`)
})


// route the food
router.get('/*/foodChooseRouter' , function (req, res) {
       switch (true) {
        case  (req.session.data['showFood'] == 1):
         res.redirect(`../foodanddrink`)
          break;

        case  (req.session.data['showFood'] == 2):
         res.redirect(`../foodanddrink/foodRadio`)
          break;

        case  (req.session.data['showFood'] == 3):
         res.redirect(`../foodanddrink/foodTime`)
          break;

            
        default:
            res.redirect(`../foodanddrink`)
        break;
        }
})




module.exports = router