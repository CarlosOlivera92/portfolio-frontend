import React, { useEffect, useRef, useState } from 'react';
import styles from './spinner.module.css';
import { gsap } from 'gsap';

const Spinner = ({ isOpen }) => {
  const spinnerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(isOpen);
  const fadeInTimelineRef = useRef(null);

  useEffect(() => {
    const spinner = spinnerRef.current;

    // Lista de colores de Material Design
    const colors = ['#a63f50', '#f06292', '#ffca28', '#64b5f6'];

    // Animación de rotación del spinner
    const rotationTimeline = gsap.timeline({ repeat: -1 })
      .to(spinner, { rotation: '+=360', transformOrigin: 'center', duration: 1, ease: 'none' });

    // Animación de entrada del spinner
    fadeInTimelineRef.current = gsap.timeline({ paused: true })
      .fromTo(spinner, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.inOut' });

    // Animación de cambio de color del borde
    const colorChangeTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    for (let i = 0; i < colors.length; i++) {
      colorChangeTimeline.to(spinner, { borderBottomColor: colors[i], duration: 0.5 });
    }

    // Controlar la visibilidad y animación del spinner
    if (isOpen) {
      setIsVisible(true);
      fadeInTimelineRef.current.play(); // Reproducir la animación de entrada si está abierto
      colorChangeTimeline.play(); // Reproducir la animación de cambio de color del borde
    } else {
      // Ocultar el spinner inmediatamente si está cerrado
      setIsVisible(false);
      console.log(spinner)
      spinner.style.visibility = 'hidden';
    }

    return () => {
      // Detener las animaciones al desmontar el componente
      rotationTimeline.kill();
      fadeInTimelineRef.current.kill();
      colorChangeTimeline.kill();
    };
  }, [isOpen]);

  useEffect(() => {
    // Controlar la animación de salida cuando isOpen cambia a false
    if (!isOpen) {
      const fadeOutTimeline = gsap.timeline()
        .to(spinnerRef.current, { autoAlpha: 0, scale: 0, duration: 0.5, ease: 'power2.inOut' });
    }
  }, [isOpen]);

  return (
    <>
      {isVisible && (
        <div className={styles.spinnerContainer}>
          <div ref={spinnerRef} className={styles.spinner}></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
