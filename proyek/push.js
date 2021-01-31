var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOnKHscbZOJ3GXhSufOuS9Efxi2tO2SfkH4RbmBX1S-23lEs4btR-rUEqPvCHVLhRsz5s2nDXnBvfYnr91CncI8",
   "privateKey": "Ji4ol_8BHGD9aU2oyyqvthDBxTi1XhqVPdt5ZyOscUg"
};
 
 
webPush.setVapidDetails(
   'mailto:somdolinci@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eMYNDofqGtw:APA91bEeCXvilfqQ0NV0wmt3drECV-EnbHfIQo_YBCebCDgCJCaf8XWorXxk5Tw-TPw4zcUTeD_qAbhDdjrjyJbP5bS6H4t6q4tLd-maPiJ4sbFUTSS_IdxxFrjz1MWgXB7LYlazgct7",
   "keys": {
       "p256dh": "BB7xeFW92BUkHV/Ypj9M7b44XKhedNCoWd+PJOb/mUGMCpuHqKaZ+gSkWEOiNQWDljdvYOyvfOilEi3X0iUbm2o=",
       "auth": "MXAjT9b3NA4Q/OPcBbpcGg=="
   }
};
var payload = 'hey lur? Warm greetings from us';
 
var options = {
   gcmAPIKey: '674679304952',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);