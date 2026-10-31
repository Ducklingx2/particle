import { useRef, useState } from 'react'

export default function ElasticDiagram() {
  const svgRef=useRef<SVGSVGElement>(null)
  const [pull,setPull]=useState(0)
  const [loop,setLoop]=useState(false)
  const [dragging,setDragging]=useState(false)
  const origin={x:220,y:110}
  const [point,setPoint]=useState({x:220,y:110})
  const start=useRef({x:0,y:0})
  const update=(e:React.PointerEvent<SVGSVGElement>)=>{
    const rect=svgRef.current!.getBoundingClientRect()
    const x=(e.clientX-rect.left)/rect.width*440
    const y=(e.clientY-rect.top)/rect.height*220
    const dx=x-origin.x,dy=y-origin.y
    const amount=Math.min(1,Math.hypot(dx,dy)/125)
    setPoint({x,y});setPull(amount);setLoop(amount>.82)
  }
  const release=()=>{
    setDragging(false)
    setPoint(origin);setPull(0);setLoop(false)
  }
  const midX=(origin.x+point.x)/2,midY=(origin.y+point.y)/2
  const bend=loop ? 48 : pull*24
  return <div className="diagram-stage">
    <svg ref={svgRef} viewBox="0 0 440 220" className="elastic-svg"
      onPointerMove={e=>dragging&&update(e)} onPointerUp={release} onPointerCancel={release}>
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M40 110 H400" className="diagram-line faint"/>
      <path d={loop ? `M40 110 C120 110 130 36 220 36 C310 36 320 184 400 110` : `M40 110 Q${midX} ${midY-bend} 400 110`} className="diagram-line gluon" />
      <path d="M40 110 H400" className="diagram-line ghost"/>
      <circle cx="40" cy="110" r="4" className="vertex"/>
      <circle cx="400" cy="110" r="4" className="vertex"/>
      <circle cx={point.x} cy={point.y} r="7" className="drag-node" filter="url(#glow)"
        onPointerDown={e=>{e.stopPropagation();setDragging(true);(e.target as SVGElement).setPointerCapture(e.pointerId)}} />
      <text x="40" y="140" className="diagram-label">q</text>
      <text x="400" y="140" className="diagram-label" textAnchor="end">q̄</text>
      <text x="220" y="204" className="diagram-label" textAnchor="middle">{loop ? 'TOPOLOGY SHIFT // ARTISTIC MODE' : 'DRAG THE INTERACTION'}</text>
    </svg>
    <div className="diagram-hint">{loop ? 'THRESHOLD CROSSED · RELEASE TO RESET' : 'GRAB THE CYAN VERTEX AND PULL'}</div>
  </div>
}