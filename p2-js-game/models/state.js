class State{
    constructor(){
        this.state = 'off'
    }
    off(){
        this.state = 'off'
    }
    on(){
        this.state = 'on'
    }
    showingSequence(){
        this.state = 'showing'
    }
    readingUserInput(){
        this.state = 'reading'
    }
    get state(){
        return this.state
    }
}

export default new State();