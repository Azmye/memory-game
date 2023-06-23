'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default function Card(props: any) {
  const handleOnClick = () => {
    if (!props.flipped) {
      props.handleChoice(props.card);
    }
  };

  return (
    <div className="w-full" onClick={handleOnClick}>
      {props.flipped && (
        <motion.div initial={{ scaleX: 0 }} animate={props.flipped ? { scaleX: 1, rotateY: '0deg' } : { scaleX: 1, rotateY: '90deg' }} exit={{ scaleX: 0 }} transition={{ duration: 0.3 }}>
          <Image width={100} height={100} className="w-full" src={props.card.src} alt="card image" />
        </motion.div>
      )}
      {!props.flipped && (
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.3 }}>
          <Image width={100} height={100} className="w-full" src="/img/cover.png" alt="cover image" />
        </motion.div>
      )}
    </div>
  );
}
