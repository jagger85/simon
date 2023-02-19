class myBox extends HTMLDivElement{
    constructor(){
        super()
        this.style.cssText = 'border:1px solid black; width:100px;height:100px;'
    }
   
    activate(seconds){
        this.style.border = '10px solid black'
        setTimeout(()=>{
        this.style.border = '1px solid black'
        },seconds*1000)
    }
   
}
customElements.define('custom-box',myBox,{extends:'div'})

export const box1 = document.createElement('div',{is:'custom-box'})
export const box2 = document.createElement('div',{is:'custom-box'})
export const box3 = document.createElement('div',{is:'custom-box'})
export const box4 = document.createElement('div',{is:'custom-box'})

box1.style.backgroundColor = 'red'
box2.style.backgroundColor = 'blue'
box3.style.backgroundColor = 'yellow'
box4.style.backgroundColor = 'green'

export const start = document.createElement('button')
export const reset = document.createElement('button')
reset.innerText = 'RESET'
start.innerText = 'START'


