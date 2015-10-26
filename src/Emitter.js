import Rx from 'rx'

var hasOwnProp = {}.hasOwnProperty;



function createName (name) {
    return '$' + name;
}

class Emitter {
    constructor() {
        this.subjects = {};
    }

    emit (name, data) {
        var fnName = createName(name);
        this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
        this.subjects[fnName].onNext(data);
    }
    on (name) {
        var fnName = createName(name);
        this.subjects[fnName] || (this.subjects[fnName] = new Rx.Subject());
        return this.subjects[fnName];
    }
    dispose () {
        var subjects = this.subjects;
        for (var prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose();
            }
        }

        this.subjects = {};
    }
}

export default Emitter
