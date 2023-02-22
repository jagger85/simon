export const dataHandler = {

    speed : 1.2,
    steps : 4,
    userSteps:0,
    sequence : undefined,
    record : undefined,
    actualLevel: 0,

    get getSpeed(){
        return this.speed;
    },
    get getSteps(){
        return this.steps;
    },
    get getUserSteps(){
        return this.userSteps;
    },
    get getSequence(){
        return this.sequence;
    },
    get getRecord(){
        return this.record;
    },
    get getActualLevel(){
        return this.actualLevel;
    },
    init: function(){
        this.speed = 1.2;
        this.steps = 4;
        this.userSteps = 0;
        this.sequence = undefined;
        this.actualLevel = 0;
        this.update();
    },
    reset: function(){
        this.init();
        this.setRecord('record',0);
        this.update()
    },
    levelUp: function(){
        this.addStep()
        this.resetUserSteps()
        this.addSpeed()
        this.actualLevel +=1
        this.update();
    },
    addUserStep: function(){
        this.userSteps++
        this.update();
    },
    addSpeed: function(){
        this.speed-= 0.1
        this.update();
    },
    addStep: function(){
        this.steps += 1;
        this.update();
    },
    resetUserSteps: function(){
        this.userSteps = 0;
        this.update();
    },
    setRecord: function(level){
        this.record = level;
        this.update();
    },
    createNewSequence: function(){
        this.sequence = [...Array(this.steps)].map(()=>Math.floor(Math.random()*4));
        this.update();
    },
    update: function(){
        localStorage.setItem('speed',this.speed)
        localStorage.setItem('steps',this.steps)
        localStorage.setItem('userSteps',this.userSteps)
        localStorage.setItem('sequence',this.sequence)
        localStorage.setItem('actualLevel',this.actualLevel)
        localStorage.setItem('record',this.record)
    }
}
