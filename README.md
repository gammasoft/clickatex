# Clickatex
Unofficial Clickatell API for delivering SMS messages from node.js applications

### Intallation

```bash
npm install --save clickatex
```

### Usage

```javascript
var sms = new Client({
    apiId: '12341234',
    user: 'yourUserName',
    password: 'yourPass'
});

sms.send({
    to: '556112341234',    // Country code + area code + phone number
    text: 'YOUR MESSAGE'   // Messages larger then 160 characters will be automatically trimmed
}, function(err, ticket) {
    if(err) {
        throw err;
    }

    console.log(JSON.stringify(ticket, null, 4));

    /*
        {
            "id": "99bfc53c7fcf98e1b402f699e5c5381a",
            "messageTrimmed": true
        }
    */
});
```
