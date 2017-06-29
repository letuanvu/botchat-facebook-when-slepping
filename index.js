const login = require("facebook-chat-api");
const $ = require("jquery");

var answeredThreads = [];

login({email: "YOUR_EMAIL", password: "YOUR_PASS"}, function callback (err, api) {
    if(err) return console.error(err);


    api.listen(function callback(err, message) {
        var d = new Date();
        var h = d.getHours();

        if((h >= 21 || h <= 6)){
            api.getUserInfo(message.senderID, function(err, ret) {
                if(err) return console.error(err);

                for(var prop in ret) {
                    if(ret.hasOwnProperty(prop) && ret[prop].name) {
                        switch (answeredThreads[message.threadID]){
                            case undefined:
                                api.sendMessage( "BOT: Xin chào " + ret[prop].name + " cũng muộn rồi, có gì để trời sáng đã nhé!", prop, function(){
                                    if(!!answeredThreads[message.threadID]){
                                        answeredThreads[message.threadID]++;
                                    }else{
                                        answeredThreads[message.threadID] = 2;
                                    }
                                });
                                break;

                            case 1:
                                api.sendMessage( "BOT: Xin chào " + ret[prop].name + " cũng muộn rồi, có gì để trời sáng đã nhé!", prop, function(){
                                    answeredThreads[message.threadID]++;
                                });
                                break;
                            case 2:
                                api.sendMessage( "BOT: Chúc " + ret[prop].name + " ngủ ngon nhé!", prop, function(){
                                    answeredThreads[message.threadID]++;
                                });
                                break;
                            case 3:
                                api.sendMessage( "BOT: zZ!", prop, function(){
                                    answeredThreads[message.threadID]++;
                                });
                                break;
                            default: break;
                        }
                    }
                }

            });
        }else{
            answeredThreads = [];
        }
    });
});
