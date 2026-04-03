const PETAL_COLORS = ['#FF6B9D', '#FFB7C5', '#FADADD', '#FFC0CB', '#FF69B4']

const petals = Array.from({ length: 25 }, (_, i) => {
  const size = 8 + ((i * 7 + 3) % 13)
  const left = ((i * 17 + 5) % 100)
  const fallDuration = 10 + ((i * 5 + 2) % 16)
  const swayDuration = 3 + ((i * 3) % 5)
  const spinDuration = 4 + ((i * 2) % 7)
  const delay = ((i * 1.3) % 15).toFixed(1)
  const opacity = (0.2 + ((i * 4) % 7) * 0.09).toFixed(2)
  const color = PETAL_COLORS[i % PETAL_COLORS.length]
  const swayDir = i % 2 === 0 ? 'normal' : 'reverse'

  return { id: i, size, left, fallDuration, swayDuration, spinDuration, delay, opacity, color, swayDir }
})

const petalStyles = `
.cherry-blossoms {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.petal {
  position: absolute;
  top: -30px;
  border-radius: 50% 0 50% 0;
  will-change: transform, opacity;
}

.petal::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50% 0 50% 0;
  background: inherit;
  transform: rotate(90deg) scale(0.8);
  opacity: 0.6;
}

@keyframes petalFall {
  0% {
    transform: translateY(-5vh);
    opacity: var(--petal-opacity, 0.5);
  }
  85% {
    opacity: var(--petal-opacity, 0.5);
  }
  100% {
    transform: translateY(110vh);
    opacity: 0;
  }
}

@keyframes petalSway {
  0%, 100% { margin-left: 0; }
  25% { margin-left: 25px; }
  50% { margin-left: -20px; }
  75% { margin-left: 30px; }
}

@keyframes petalSpin {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  25% { transform: rotateX(90deg) rotateY(45deg) rotateZ(90deg); }
  50% { transform: rotateX(180deg) rotateY(90deg) rotateZ(180deg); }
  75% { transform: rotateX(270deg) rotateY(135deg) rotateZ(270deg); }
  100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
}
`

function CherryBlossoms() {
  return (
    <>
      <style>{petalStyles}</style>
      <div className="cherry-blossoms" aria-hidden="true">
        {petals.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: '-30px',
            }}
          >
            <div
              className="petal"
              style={{
                position: 'relative',
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                '--petal-opacity': p.opacity,
                animation: `
                  petalFall ${p.fallDuration}s linear ${p.delay}s infinite,
                  petalSway ${p.swayDuration}s ease-in-out ${p.delay}s infinite ${p.swayDir},
                  petalSpin ${p.spinDuration}s linear ${p.delay}s infinite
                `,
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default CherryBlossoms
