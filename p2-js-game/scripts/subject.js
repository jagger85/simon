function createObservable() {
    return{
       suscribers : [],
    

    subscribe(fn){
        this.subscribers.push(fn)
    },

    unsuscribe(fn){
        this.suscribers = this.suscribers.filter((item) => item !== fn);
    },

    broadcast(data) {
        for (let i = 0; i< this.suscribers.length; i++){
            this.suscribers[i](data);
        }
    }
    }
}
const observer = createObservable();

const fn = (data) =>{
    console.log('callback was executed with data',data)
}

observer.suscriber(fn);

observer.broadcast('hello');