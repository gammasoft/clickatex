var request = require('request');

function Client(credentials) {
    this._credentials = credentials;
}

Client.prototype.send = function(params, callback) {
    if(!params.text) {
        return callback(new Error('No message supplied'));
    }

    var messageTrimmed = false;
    if(params.text.length > 160) {
        messageTrimmed = true;
        params.text = params.text.substr(0, 160);
    }

    request({
        url: 'https://api.clickatell.com/http/sendmsg',
        qs: {
            user: this._credentials.user,
            password: this._credentials.password,
            api_id: this._credentials.apiId,
            to: params.to,
            text: params.text
        }
    }, function(err, response, responseBody) {
        if(err) {
            return callback(err);
        }

        if(response.statusCode !== 200) {
            return callback(new Error([
                'Received status',
                response.statusCode,
                'from Clickatell.',
                'Response body was: ',
                responseBody
            ].join(' ')));
        }

        callback(null, {
            id: responseBody.replace('ID: ', ''),
            textTrimmed: messageTrimmed
        });
    });
};

module.exports.Client = Client;
