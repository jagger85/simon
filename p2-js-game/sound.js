const context = new AudioContext()

export function play(box,duration){
    const o = context.createOscillator()
    o.type = 'triangle'
    var  g = context.createGain()
    o.connect(g)
    g.connect(context.destination)
    g.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + (duration ?? 1)
      )

    switch(box){
        case 'box1':
            o.frequency.value =261.6;
            break

        case 'box2':
            o.frequency.value = 311.1;
            break

        case 'box3':
            o.frequency.value = 370;
            break

        case 'box4':
            o.frequency.value = 440;
            break
    }

    o.start()  

}