var router = require('express').Router()
var contactModel = require('./model')
var accessToken = 'testToken'

router.post('/contacts',function(req,res){
    /** Assumption 
     * 1. Token will come in request body
     * TODO we can make token dynamic
     * Token is for user authentication
     */
    if(req.body.token === accessToken){  
        if(!req.body.email){
            res.status(400).send('Request Body should contain email')
        }
        else{
            var contactObject= {
                name : req.body.name,
                email: req.body.email,
                address: req.body.address
            }
            contactModel.contactModel.findOne({email: contactObject.email},function(err,contactInfo){
                if(err){
                    res.status(500).send('Error while getting  Contact info from db')
                    }
                 else if(!contactInfo){
                    contactModel.contactModel(contactObject).save((err,result)=>{
                        if(err){
                            res.status(500).send('Error while creating Contact book')
                        }
                        else{
                            res.status(200).send(result)
                        }
                    })
                 }
                 else{
                     res.status(400).send('An contact with this email already exists')
                 }   
            })
        }
    }
    else{
        res.status(403).send('You are not authenticated User')
    }
})



/**
 * Api call to get all contacts
 */
router.get('/contacts',function(req,res){
    /** Assumption 
     * 1. Token will come in query params
     * TODO we can make token dynamic
     * Token is for user authentication
     */
    var token =req.query.token
    if(token ===accessToken){
        contactModel.contactModel.find({},(function(err,contactList){
            if(err){
                res.status(500).send('Error while getting  Contact info from db')
                }
            else if(!contactList){
            res.status(404).send('No contact found in db')
            }
            else{
                res.status(200).send(contactList)
            } 
        }))
    }
    else{
        res.status(403).send('You are not authenticated User')
    }
})



/**
 * Api End Point to get  contact by id
 */
router.get('/contacts/:contactId',function(req,res){
     /** Assumption 
     * 1. Token will come in query params
     * TODO we can make token dynamic
     * Token is for user authentication
     */
    var token =req.query.token
    console.log('cdwnwcnd',token)
    if(token ===accessToken){
    var contactId = req.params.contactId
    contactModel.contactModel.find({_id:contactId},(err,contactObject)=>{
      if(err){
          res.status(500).send('Error while getting  Contact info from db')
          }
       else if(!contactObject){
         res.status(404).send('No contact found in db for given id')
       }
       else{
           res.status(200).send(contactObject)
       } 
    })
}else{
    res.status(403).send('You are not authenticated User')
}
})

/**
 * Api End Point to get  contact by name
 */
router.get('/contacts/name/:name',function(req,res){
       /** Assumption 
     * 1. Token will come in query params
     * TODO we can make token dynamic
     * Token is for user authentication
     */
    var token =req.query.token
    if(token ===accessToken){
    var name = req.params.name
    contactModel.contactModel.findOne({name:name},(err,contactObject)=>{
      if(err){
          res.status(500).send('Error while getting  Contact info from db')
          }
       else if(!contactObject){
         res.status(404).send('No contact found in db for given id')
       }
       else{
           res.status(200).send(contactObject)
       } 
    })
}
else{
    res.status(403).send('You are not authenticated User')
}
})

/**
 * Api End Point to get  contact by email
 */
router.get('/contacts/email/:email',function(req,res){
      /** Assumption 
     * 1. Token will come in query params
     * TODO we can make token dynamic
     * Token is for user authentication
     */
    var token =req.query.token
    if(token ===accessToken){
    var email = req.params.email
    contactModel.contactModel.findOne({email:email},(err,contactObject)=>{
      if(err){
          res.status(500).send('Error while getting  Contact info from db')
          }
       else if(!contactObject){
         res.status(404).send('No contact found in db for given id')
       }
       else{
           res.status(200).send(contactObject)
       } 
    })
}
else{
    res.status(403).send('You are not authenticated User')
}
})

/**
 * Api End Point to Delete contact by id
 */
router.delete('/contacts/:contactId',function(req,res){
        /** Assumption 
     * 1. Token will come in query params
     * TODO we can make token dynamic
     * Token is for user authentication
     */
    var token =req.query.token
    if(token ===accessToken){
    var contactId = req.params.contactId
    contactModel.contactModel.remove({_id:contactId},(err,result)=>{
      if(err){
          res.status(500).send('Error while getting  Contact info from db')
          }
       else{
           res.status(200).send('contact deleted successfully')
       } 
    })
}
else{
    res.status(403).send('You are not authenticated User')
}
})


/**
 * Api End Point to update contact by id
 */
router.put('/contacts/:contactId',function(req,res){
       /** Assumption 
     * 1. Token will come in query params
     * TODO we can make token dynamic
     * Token is for user authentication
     */
    var token =req.query.token
    if(token ===accessToken){
    var updatedBody= req.body
    var contactId = req.params.contactId
    contactModel.contactModel.update({_id:contactId},updatedBody,(err,updatedContact)=>{
      if(err){
          res.status(500).send('Error while getting  Contact info from db')
          }
       else{
           res.status(200).send('success')
       } 
    })
}
    else{
        res.status(403).send('You are not authenticated User')
    }
})


module.exports = router