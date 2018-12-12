var router = require('express').Router()
var contactModel = require('./model')


router.post('/contacts',function(req,res){
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
    
})



/**
 * Api call to get all contacts
 */
router.get('/contacts',function(req,res){
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
})



/**
 * Api End Point to get  contact by id
 */
router.get('/contacts/:contactId',function(req,res){
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
})

/**
 * Api End Point to get  contact by name
 */
router.get('/contacts/name/:name',function(req,res){
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
})

/**
 * Api End Point to get  contact by email
 */
router.get('/contacts/email/:email',function(req,res){
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
})

/**
 * Api End Point to Delete contact by id
 */
router.delete('/contacts/:contactId',function(req,res){
    var contactId = req.params.contactId
    contactModel.contactModel.remove({_id:contactId},(err,result)=>{
      if(err){
          res.status(500).send('Error while getting  Contact info from db')
          }
       else{
           res.status(200).send('contact deleted successfully')
       } 
    })
})


/**
 * Api End Point to update contact by id
 */
router.put('/contacts/:contactId',function(req,res){
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
})


module.exports = router