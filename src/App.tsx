import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import ParticleField from './ParticleField'
import ElasticDiagram from './ElasticDiagram'

const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∆∇∑'

function Scramble({text}:{text:string}) {
  const [value,setValue]=useState(text)
  useEffect(()=>{
    let interval:number
    const run=()=>{
      let iteration=0
      window.clearInterval(interval)
      interval=window.setInterval(()=>{
        setValue(text.split('').map((c,i)=>c===' '? ' ' : i<iteration ? c : letters[Math.floor(Math.random()*letters.length)]).join(''))
        iteration+=.45
        if(iteration>=text.length){window.clearInterval(interval);setValue(text)}
      },34)
    }
    const timer=window.setTimeout(run,550)
    return()=>{window.clearTimeout(timer);window.clearInterval(interval)}
  },[text])
  return <>{value}</>
}

export default function App(){
  useEffect(()=>{
    gsap.fromTo('.hero-kicker,.hero-title,.hero-copy,.hero-actions,.gallery-intro,.artwork-card',
      {y:24,opacity:0},{y:0,opacity:1,duration:1,stagger:.09,ease:'power3.out',delay:.15})
  },[])
  return <main>
    <ParticleField/>
    <div className="noise"/>
    <nav className="topbar">
      <a className="wordmark" href="#"><span className="brand-mark">P</span> PARTICLE<span className="wordmark-dot">.</span></a>
      <div className="nav-center"><span className="status-dot"/> AN INTERACTIVE EXHIBITION</div>
      <a className="nav-index" href="#gallery">EXPLORE INDEX <span>↘</span></a>
    </nav>

    <section className="hero">
      <div className="hero-meta"><span>FIELD NOTES / 001</span><span>THE STANDARD MODEL, REIMAGINED</span></div>
      <div className="hero-content">
        <div className="hero-kicker"><span className="tiny-cross">✳</span> A STUDY OF THE VERY, VERY SMALL</div>
        <h1 className="hero-title">THE<br/><em>BEAUTIFULLY</em><br/>STRANGE<span className="title-period">.</span></h1>
        <p className="hero-copy">An interactive collection of particle physics, unexpected behaviour, and diagrams that refuse to sit still.</p>
        <div className="hero-actions">
          <a className="primary-link" href="#gallery">ENTER THE EXHIBITION <span>↗</span></a>
          <span className="scroll-note">SCROLL TO INTERACT <span>↓</span></span>
        </div>
      </div>
      <div className="hero-side-note">MATTER IS MOSTLY<br/>A MATTER OF FIELDS.</div>
      <div className="hero-bottom"><span>01 — 04 / PARTICLE ATLAS</span><span>MOVE YOUR CURSOR. DISTURB SOMETHING.</span><span>EST. 10⁻¹⁸ M</span></div>
    </section>

    <section className="gallery" id="gallery">
      <div className="section-top"><span>01 / THE GALLERY</span><span>SELECT AN OBJECT TO INTERACT</span></div>
      <div className="gallery-intro">
        <div><div className="eyebrow">A SMALL COLLECTION OF STRANGE THINGS</div><h2>NOTHING<br/><i>STAYS</i> STILL.</h2></div>
        <p>These are not diagrams in a textbook. They're little windows into the machinery of the universe. Pull on something. See what happens.</p>
      </div>
      <div className="artwork-grid">
        <article className="artwork-card feature-card">
          <div className="card-head"><span>FIG. 001 — INTERACTION</span><span className="live-label"><i/> LIVE OBJECT</span></div>
          <ElasticDiagram/>
          <div className="card-foot"><div><h3>THE ELASTIC VERTEX</h3><p>A gluon-inspired interaction study</p></div><span className="object-number">01</span></div>
        </article>
        <article className="artwork-card stream-card">
          <div className="card-head"><span>FIG. 002 — TRAJECTORIES</span><span>FIELD STUDY</span></div>
          <div className="stream-art" aria-hidden="true">
            {Array.from({length:18},(_,i)=><span key={i} style={{'--i':i} as React.CSSProperties}/>)}
            <div className="stream-core"/>
          </div>
          <div className="card-foot"><div><h3>PASSING THROUGH</h3><p>Particle streams / velocity fields</p></div><span className="object-number">02</span></div>
        </article>
        <article className="artwork-card type-card">
          <div className="card-head"><span>FIG. 003 — TYPOGRAPHY</span><span>HOVER TO DECODE</span></div>
          <div className="type-art"><span className="type-symbol">∴</span><div className="scramble-line"><Scramble text="QUANTUM" /></div><span className="type-sub">A STATE OF POSSIBILITY</span></div>
          <div className="card-foot"><div><h3>UNRESOLVED</h3><p>Language in a superposition</p></div><span className="object-number">03</span></div>
        </article>
      </div>
    </section>
    <footer><a className="wordmark" href="#"><span className="brand-mark">P</span> PARTICLE<span className="wordmark-dot">.</span></a><span>THE UNIVERSE, WITH THE EDGES LEFT IN.</span><span>© 2026 / AN EXPERIMENT IN CURIOSITY</span></footer>
  </main>
}