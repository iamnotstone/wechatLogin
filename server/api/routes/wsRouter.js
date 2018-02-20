'use strict'
var commonActions = require('../../../commonActions')
var debug = require('debug')('wsRouter')
var mongoose = require('mongoose'),
	documents = mongoose.model('documents')

exports.reducer = function(action, socket, io){
  debug('websocket action:', action)
  switch(action.type)
  {
    case commonActions.WS_APPLY_CREATE_DOCUMENT:
      
	    var aDocument = new documents()
	    aDocument.name = action.data.name
	    aDocument.entityNum = 0
      aDocument.entityIndex = 0
	    aDocument.save(function (err){
		    if(err) socket.emit('action', {
          type: commonActions.CREATE_DOCUMENT_FAILED
        })
		    else{
          socket.join(aDocument.documentId.toString())
          socket.emit('action', {
            type: commonActions.CREATE_DOCUMENT_SUCCESS,
            data: {
              name: aDocument.name,
              entityNum: aDocument.entityNum,
              documentId: aDocument.documentId,
              entities: []
            }
          })
		    }
	    })

      break

    case commonActions.WS_APPLY_INSERT_MODEL:
      documents.findOne({documentId: action.data.documentId}, function(err, aDoc){
        if(err || !aDoc)
          socket.emit('action',{
            type: commonActions.INSERT_MODEL_FAILED
          })
        else{
          aDoc.insertModel(action.data.modelId, action.data.parameters, function(model, err){
            if(err || !model)
              socket.emit('action',{
                type: commonActions.INSERT_MODEL_FAILED
              })
            else{
              io.to(action.data.documentId.toString())
                .emit('action',{
                type: commonActions.INSERT_MODEL_SUCCESS,
                data:{
                  documentId: action.data.documentId.toString(),
                  userId: action.data.userId,
                  model: model
                }
              })
            }
          })
        }
      })
      break

    case commonActions.WS_APPLY_ADD_DOCUMENT:
	    documents.findOne({'documentId': action.data.documentId},{'_id': 0, '__v':0}, function(err, myDocument){
		    if(err || !myDocument)
			    socket.emit('action',{
            type: commonActions.ADD_DOCUMENT_FAILED
          })
		    else{
          socket.join(myDocument.documentId.toString())
          socket.emit('action',{
            type: commonActions.ADD_DOCUMENT_SUCCESS,
            data:{
              doc: myDocument
            }
          })
		    }
	    })
      break

    case commonActions.WS_APPLY_MODIFY_PARAMETERS:
      debug('modifiedEntities:', action.data.modifiedEntities)
      documents.findOne({'documentId': action.data.documentId}, function(err, myDocument){
        if(err || !myDocument)
          socket.emit('action',{
            type: commonActions.MODIFY_PARAMETERS_FALIED
          })
        else{
          myDocument.modifyParameters(action.data.modifiedEntities)
          myDocument.save(function(err){
            if(err)
              socket.emit('action',{
                type: commonActions.MODIFY_PARAMETERS_FALIED
              })
            else
              io.to(action.data.documentId)
              .emit('action',{
                type: commonActions.MODIFY_PARAMETERS_SUCCESS,
                data: action.data
              })
          })
        }
      })
      break
  }
}
