'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './VideoBlock.module.scss';
import { Typography } from '@/shared/ui';
import { IconPlay, IconClose } from '@/assets/icons';
import { colors } from '@/constants/colors';
import { useVideoDuration } from '@/shared/hooks/useVideoDuration';
import { RUTUBE_ID, EMBED_URL } from '@/constants/rutube';

export const VideoBlock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const duration = useVideoDuration(RUTUBE_ID);

  const open = useCallback(() => {
    setIsOpen(true);
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ type: 'player:play', data: {} }),
          '*',
        );
      };
      iframeRef.current.src = EMBED_URL;
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (iframeRef.current) {
      iframeRef.current.onload = null;
      iframeRef.current.src = '';
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  return (
    <>
      <div className={styles.trigger}>
        <div className={styles.titleRow}>
          <div className={styles.labelGroup}>
            <Typography color={colors.dark} weight={600} className={styles.title}>
              ВИДЕО О ПРОЕКТЕ
            </Typography>
            {duration && (
              <Typography color={colors.dark} weight={300} className={styles.duration}>
                {duration} минут
              </Typography>
            )}
          </div>
          <div className={styles.separator} />
          <div className={styles.thumb} aria-label="Видео о проекте" onClick={open}>
            <Image
              src="/images/video-start.png"
              alt="Видео о проекте"
              fill
              sizes="80px"
              className={styles.thumbImg}
            />
            <div className={styles.cirlce} />
            <div className={styles.play}>
              <IconPlay />
              <Typography color={colors.white} size="18px">
                PLAY
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <div className={`${styles.overlay} ${isOpen ? styles.visible : ''}`} onClick={close}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={close} aria-label="Закрыть">
              <IconClose />
            </button>
            <iframe
              ref={iframeRef}
              className={styles.iframe}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
