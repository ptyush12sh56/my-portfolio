import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [follower, setFollower] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const followerRef = useRef({ x: -100, y: -100 })
  const posRef = useRef({ x: -100, y: -100 })
  const frameRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) { setIsTouch(true); return }
    const handleMove = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; setPos({ x: e.clientX, y: e.clientY }) }
    const handleDown = () => setClicking(true)
    const handleUp = () => setClicking(false)
    const handleOver = (e) => {
      const el = e.target
      setHovering(!!(el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a') || el.closest('button')))
    }
    const animate = () => {
      followerRef.current.x += (posRef.current.x - followerRef.current.x) * 0.1
      followerRef.current.y += (posRef.current.y - followerRef.current.y) * 0.1
      setFollower({ x: followerRef.current.x, y: followerRef.current.y })
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('mouseover', handleOver)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [])

  if (isTouch) return null
  return (
    <>
      <div className="cursor" style={{ left: pos.x - 6, top: pos.y - 6, transform: `scale(${clicking ? 0.5 : hovering ? 2.5 : 1})`, background: hovering ? '#9B59FF' : '#4F8EF7', transition: 'transform 0.15s ease, background 0.2s ease' }} />
      <div className="cursor-follower" style={{ left: follower.x - 18, top: follower.y - 18, width: hovering ? 52 : 36, height: hovering ? 52 : 36, borderColor: hovering ? 'rgba(155,89,255,0.6)' : 'rgba(79,142,247,0.4)', transform: `scale(${clicking ? 0.8 : 1})`, transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, transform 0.15s ease' }} />
    </>
  )
}
