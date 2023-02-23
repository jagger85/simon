class Display extends HTMLInputElement{
    constructor(){
        super()
        this.style.backgroundColor = 'black';
        this.style.color = 'red';
        this.readOnly = true;
        this.style.userSelect = 'none'

        new FontFace('digital','url(../assets/Digital-7.ttf)');
        this.style.fontFamily = 'digital'
        this.style.fontSize = '3rem'
    }


    


}

customElements.define('custom-display',Display,{extends:'input'})
export const display = document.createElement('input',{is:'custom-display'})

