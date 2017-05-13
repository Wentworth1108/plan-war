const APIError = require('../rest').APIError;

var Records = require('../models/Records').Records;


var records = [];
Records.find({},{username:true, score:true}).sort({'score':-1}).limit(10).exec(function(err, res){
    if (err) {
        console.log("Error:" + err);
    }
    else {
        console.log("Res:" + res);
        records = res;
    }
})

module.exports = {
    'GET /api/records': async (ctx, next) => {
        ctx.rest({
            records: records
        });
    },

    'POST /api/records': async (ctx, next) => {
        var
            r = ctx.request.body,
            record;
        if (!r.username || !r.username.trim()) {
            throw new APIError('invalid_input', 'Missing username');
        }
        if (!r.score) {
            throw new APIError('invalid_input', 'Missing score');
        }
        record = new Records({
            username : r.username.trim(),
            score : r.score
        });
        record.save(function (err, data) {
            if (err){
                console.log(err);
            } else {
                console.log('Saved : ', data );
            }
        });

        ctx.rest(record);
    },

    'DELETE /api/records/:id': async (ctx, next) => {
        var i, index = -1;
        for (i=0; i<records.length; i++) {
            if (records[i]._id === ctx.params.id) {
            records[i].remove(function (err, data) {
            if (err){
                console.log(err);
            } else {
                console.log('Removed : ', data );
            }
        })
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new APIError('notfound', 'Record not found by id: ' + ctx.params.id);
        }
        ctx.rest(records.splice(index, 1)[0]);
    }
}
