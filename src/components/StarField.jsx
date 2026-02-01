import React, { useEffect, useRef } from 'react';
import '../styles/StarField.css';

const StarField = ({ currentPage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse position
    const mouse = {
      x: null,
      y: null,
      radius: 150
    }

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Star particles
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update() {
        if (currentPage === 'home') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = centerX - this.x;
          const dy = centerY - this.y;
          const distanceToLogo = Math.sqrt(dx * dx + dy * dy);
          const logoRadius = 200; // Radius around the logo

          if (distanceToLogo < logoRadius) {
            // Attract to logo
            const force = Math.log(distanceToLogo) / 1000;
            this.speedX += (dx / distanceToLogo) * force;
            this.speedY += (dy / distanceToLogo) * force;
          } else {
            // Repel from mouse
            this.repelFromMouse();
          }
        } else {
          // Repel from mouse on other pages
          this.repelFromMouse();
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Reset stars that go off-screen
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }

        // Twinkling effect
        this.twinklePhase += this.twinkleSpeed;
      }

      repelFromMouse() {
        if (mouse.x === null) return;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }

      draw() {
        const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * twinkle})`;
        ctx.fill();
      }
    }

    // Create stars
    const stars = Array.from({ length: 300 }, () => new Star());

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentPage]);

  return <canvas ref={canvasRef} className="star-field" />;
};

export default StarField;
