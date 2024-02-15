import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';


const audioEl = document.getElementById('audio')
const squat = document.getElementById('squat')
const containerEl = document.getElementById('container')
const canvasEl = document.getElementById('canvas')

audioEl.crossOrigin = 'anonymous'


function drawCallback( instance, info ) {
  const canvas    = instance.canvas,
        centerX   = canvas.width / 2,
        ctx       = instance.canvasCtx;

  const energy = instance.getEnergy()

  const gradient = ctx.createLinearGradient(centerX, canvas.height * 1.2, centerX, 0)

  gradient.addColorStop(energy / 2, "red");
  gradient.addColorStop(0.33, "transparent");
  gradient.addColorStop(1, "transparent");

  ctx.fillStyle = gradient
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(squat, 0, 0, canvas.width, canvas.height)
}

const audioMotion = new AudioMotionAnalyzer(
  containerEl, {
    canvas: canvasEl,
    source: audioEl,
    onCanvasDraw: drawCallback,
    showScaleX: false,
    mode: 10,
    overlay: true,
    gradient: 'steelblue',
    showBgColor: false,
    loRes: true,
    smoothing: 0.95,
    reflexFit: true,
    fftSize: 1024,
    mirror: 0,
    radius: 0
  }
)



audioMotion.registerGradient( 'myGradient', {
  colorStops: [   
      'black',
      { color: 'white', 
      pos: .6,
     },
      'black'
  ]
});

audioMotion.gradient = 'myGradient'

const onClick = (e) => {
  console.log('click', audioEl.paused, audioEl.currentTime)

  if (audioEl.paused && !audioEl.ended) {
    audioEl.play();
} else {
    audioEl.pause();
}
}

document.addEventListener('click', onClick, false)