import { useEffect, useRef } from 'react'

type Particle = { x:number; y:number; vx:number; vy:number; size:number; alpha:number; hue:number }

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let width = 0, height = 0, frame = 0
    let particles: Particle[] = []
    const pointer = { x: -1000, y: -1000 }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth; height = window.innerHeight
      canvas.width = width * dpr; canvas.height = height * dpr
      canvas.style.width = width + 'px'; canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(150, Math.floor(width * height / 9500))
      particles = Array.from({length:count}, () => ({
        x:Math.random()*width, y:Math.random()*height,
        vx:(Math.random()-.5)*.32, vy:(Math.random()-.5)*.32,
        size:Math.random()*1.25+.35, alpha:Math.random()*.48+.12,
        hue:Math.random()>.78 ? 190 : 0,
      }))
    }
    const move = (e:PointerEvent) => { pointer.x=e.clientX; pointer.y=e.clientY }
    const leave = () => { pointer.x=-1000; pointer.y=-1000 }
    const draw = () => {
      ctx.clearRect(0,0,width,height)
      particles.forEach((p,i) => {
        const dx=pointer.x-p.x, dy=pointer.y-p.y, dist=Math.hypot(dx,dy)
        if(dist<155 && dist>0){ p.vx-=dx/dist*.012; p.vy-=dy/dist*.012 }
        p.vx+=(Math.random()-.5)*.008; p.vy+=(Math.random()-.5)*.008
        p.vx*=.995; p.vy*=.995
        const speed=Math.hypot(p.vx,p.vy)
        if(speed>1.1){p.vx*=.92;p.vy*=.92}
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0)p.x=width;if(p.x>width)p.x=0
        if(p.y<0)p.y=height;if(p.y>height)p.y=0
        ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
        ctx.fillStyle=p.hue ? `rgba(112,205,224,${p.alpha})` : `rgba(226,231,235,${p.alpha})`
        ctx.fill()
        for(let j=i+1;j<particles.length;j++){
          const q=particles[j], d=Math.hypot(p.x-q.x,p.y-q.y)
          if(d<88){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(164,190,202,${(1-d/88)*.105})`;ctx.lineWidth=.55;ctx.stroke()}
        }
      })
      frame=requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize',resize);window.addEventListener('pointermove',move);window.addEventListener('pointerleave',leave)
    return () => {cancelAnimationFrame(frame);window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);window.removeEventListener('pointerleave',leave)}
  },[])
  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}