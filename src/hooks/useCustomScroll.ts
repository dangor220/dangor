import { useCallback, useEffect, useRef } from 'react';

const ANIMATION_MS: number = 500; // 0 = мгновенное переключение
const GESTURE_GAP_MS = 100; // пауза между событиями колеса, после которой начинается новый жест
const POST_ANIMATION_MS = 120; // короткая «глушилка» после анимации, чтобы отсечь хвост инерции
const WHEEL_THRESHOLD = 30; // суммарный путь колеса (px) в рамках одного жеста, после которого переключаем блок
const SWIPE_THRESHOLD = 40;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// на время анимации отключаем нативные механизмы, которые перебивают программный скролл
const setNativeScroll = (enabled: boolean) => {
  [document.documentElement, document.body].forEach((el) => {
    el.style.scrollSnapType = enabled ? '' : 'none';
    el.style.scrollBehavior = enabled ? '' : 'auto';
  });
};

const FORWARD_KEYS = ['ArrowDown', 'PageDown', ' '];
const BACKWARD_KEYS = ['ArrowUp', 'PageUp'];
const FORM_KEYS = [' ', 'ArrowDown', 'ArrowUp'];

export default function useCustomScroll(popup: string, isFormFocus: boolean) {
  const coords = useRef<number[]>([]);
  const current = useRef(0);
  const locked = useRef(false);
  const rafId = useRef(0);
  const lastWheel = useRef(0);
  const wheelAcc = useRef(0);
  const wheelHandled = useRef(false);
  const unlockedAt = useRef(0);
  const touchStartY = useRef(0);

  // актуальные значения пропсов доступны обработчикам без пересоздания слушателей
  const popupRef = useRef(popup);
  const formFocusRef = useRef(isFormFocus);
  useEffect(() => {
    popupRef.current = popup;
    formFocusRef.current = isFormFocus;
  }, [popup, isFormFocus]);

  const measure = useCallback(() => {
    coords.current = Array.from(document.querySelectorAll<HTMLElement>('[data-anchor]')).map(
      (el) => el.getBoundingClientRect().top + window.scrollY,
    );
  }, []);

  const jump = (top: number) => window.scrollTo({ top, behavior: 'instant' });

  const goTo = useCallback((index: number, animate = true) => {
    const list = coords.current;
    if (!list.length) return;

    const next = Math.max(0, Math.min(index, list.length - 1));
    const from = window.scrollY;
    const to = list[next];

    current.current = next;
    sessionStorage.setItem('userView', String(next));
    cancelAnimationFrame(rafId.current);

    if (!animate || ANIMATION_MS === 0 || from === to) {
      locked.current = false;
      setNativeScroll(true);
      jump(to);
      return;
    }

    locked.current = true;
    setNativeScroll(false);
    const startTime = performance.now();

    const frame = (now: number) => {
      // now из rAF может быть чуть меньше startTime, поэтому зажимаем в [0, 1]
      const t = Math.min(Math.max((now - startTime) / ANIMATION_MS, 0), 1);
      jump(from + (to - from) * easeInOutCubic(t));

      if (t < 1) {
        rafId.current = requestAnimationFrame(frame);
      } else {
        locked.current = false;
        unlockedAt.current = performance.now();
        setNativeScroll(true);
      }
    };

    rafId.current = requestAnimationFrame(frame);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (locked.current || popupRef.current !== 'hidden') return;
      goTo(current.current + dir);
    },
    [goTo],
  );

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const remeasure = () => {
      measure();
      if (!locked.current) jump(coords.current[current.current] ?? 0);
    };

    const init = () => {
      measure();
      goTo(Number(sessionStorage.getItem('userView')) || 0, false);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || popupRef.current !== 'hidden') return;
      e.preventDefault();

      // пока идёт анимация (и сразу после неё) события колеса гасим и сбрасываем жест:
      // иначе непрерывное кручение «растягивает» жест, и следующий блок не переключается
      if (locked.current || performance.now() - unlockedAt.current < POST_ANIMATION_MS) {
        lastWheel.current = 0;
        wheelAcc.current = 0;
        wheelHandled.current = false;
        return;
      }

      // приводим строки и страницы к пикселям (Firefox и часть мышей отдают deltaMode 1 или 2)
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const delta = e.deltaY * unit;

      // одно деление колеса или инерция трекпада = серия событий; считаем их одним жестом
      const now = performance.now();
      const isNewGesture = now - lastWheel.current > GESTURE_GAP_MS;
      lastWheel.current = now;

      if (isNewGesture) {
        wheelAcc.current = 0;
        wheelHandled.current = false;
      }
      if (wheelHandled.current) return;

      // смена направления внутри жеста сбрасывает накопленное
      if (wheelAcc.current !== 0 && Math.sign(delta) !== Math.sign(wheelAcc.current)) {
        wheelAcc.current = 0;
      }
      wheelAcc.current += delta;

      if (Math.abs(wheelAcc.current) >= WHEEL_THRESHOLD) {
        wheelHandled.current = true;
        step(wheelAcc.current > 0 ? 1 : -1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest('header')) {
        e.preventDefault();
        return;
      }
      if (popupRef.current !== 'hidden') return;
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (delta > SWIPE_THRESHOLD) step(1);
      else if (delta < -SWIPE_THRESHOLD) step(-1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const forward = FORWARD_KEYS.includes(e.key);
      const backward = BACKWARD_KEYS.includes(e.key);
      if (!forward && !backward) return;
      if (formFocusRef.current && FORM_KEYS.includes(e.key)) return;
      if (popupRef.current !== 'hidden') return;

      e.preventDefault();
      if (!e.repeat) step(forward ? 1 : -1);
    };

    // пользователь потянул за полосу прокрутки или сработал якорь: синхронизируем текущий блок
    const onScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (locked.current || !coords.current.length) return;
        const y = window.scrollY;
        let idx = 0;
        let best = Infinity;
        coords.current.forEach((c, i) => {
          const d = Math.abs(c - y);
          if (d < best) {
            best = d;
            idx = i;
          }
        });
        current.current = idx;
        sessionStorage.setItem('userView', String(idx));
      }, 150);
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(remeasure, 150);
    };

    if (document.readyState === 'complete') init();
    else window.addEventListener('load', init, { once: true });

    // контент мог догрузиться (шрифты, переводы, картинки), поэтому следим за высотой страницы
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);

    window.addEventListener('resize', onResize);
    document.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll);

    return () => {
      cancelAnimationFrame(rafId.current);
      setNativeScroll(true);
      clearTimeout(scrollTimer);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener('load', init);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [goTo, measure, step]);
}
