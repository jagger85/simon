const dataHandler = {

    speed : 1.2,
    steps : 4,
    userSteps:0,
    sequence : undefined,

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
    set addSpeed(s){
        speed -= 0.1;
        localStorage.setItem('speed',this.speed)
    },
    set addStep(s){
        step += 1;
        localStorage.setItem('step',this.step)
    },
    set addUserStep(s){
        userSteps +=1;        
        localStorage.setItem('user steps',this.userSteps)

    },
    set createNewSequence(s){
        this.sequence = [...Array(steps)].map(()=>Math.floor(Math.random()*4));
        localStorage.setItem(sequence);
    },
    init: function(){
        this.speed = 1.2;
        this.steps = 4;
        this.userSteps = 0;
        this.sequence = undefined;
        localStorage.setItem('speed',this.speed)
        localStorage.setItem('steps',this.steps)
        localStorage.setItem('userSteps',this.userSteps)
        localStorage.setItem('sequence',this.sequence)
    },

}
