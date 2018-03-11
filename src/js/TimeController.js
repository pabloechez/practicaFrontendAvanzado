let moment = require('moment');

export class TimeController {

    constructor(language) {
        this.language=language;
    }


    getDate(date){
        moment.locale(this.language);
        let diff = moment.duration(moment().diff(moment(date)));
        let days = parseInt(diff.asDays());
        let hours = parseInt(diff.asHours());
        let minutes = parseInt(diff.asMinutes());
        let seconds =  parseInt(diff.asSeconds());

        if(minutes<=1){
            return 'hace: '+seconds+' seg';
        }
        if(hours<1){
            return 'hace: '+minutes+' min';
        }

        if(days<1){
            return 'hace: '+hours+' h';
        }

        if(days<=7){
            return moment(date).format('dddd');
        }

        return moment(date).format('MM-DD-YYYY HH:mm:ss');
    }
}
