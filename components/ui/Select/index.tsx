'use client';

import { useState, useRef, useCallback, useId, createContext, useContext } from 'react';
import ReactSelect, {
  components,
  type StylesConfig,
  type DropdownIndicatorProps,
  type PlaceholderProps,
  type SingleValueProps,
} from 'react-select';
import styles from './Select.module.scss';
import { IconChevron } from '@/public/icons';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: SelectOption | null) => void;
  value?: SelectOption | null;
}

type HoverState = 'idle' | 'entering' | 'leaving';

interface HoverContextValue {
  hoverState: HoverState;
  animKey: number;
}

const CLOSE_DURATION = 200;

const HoverContext = createContext<HoverContextValue>({ hoverState: 'idle', animKey: 0 });

const AnimatedLabel = ({ children }: { children: React.ReactNode }) => {
  const { hoverState, animKey } = useContext(HoverContext);
  return (
    <span
      key={animKey}
      className={`${styles.label} ${hoverState === 'entering' ? styles.entering : ''} ${hoverState === 'leaving' ? styles.leaving : ''}`}
    >
      {children}
    </span>
  );
};

const Placeholder = (props: PlaceholderProps<SelectOption, false>) => (
  <components.Placeholder {...props}>
    <AnimatedLabel>{props.children}</AnimatedLabel>
  </components.Placeholder>
);

const SingleValue = (props: SingleValueProps<SelectOption, false>) => (
  <components.SingleValue {...props}>
    <AnimatedLabel>{props.children}</AnimatedLabel>
  </components.SingleValue>
);

const DropdownIndicator = (props: DropdownIndicatorProps<SelectOption, false>) => (
  <components.DropdownIndicator {...props}>
    <IconChevron className={styles.arrow} />
  </components.DropdownIndicator>
);

const selectComponents = { DropdownIndicator, Placeholder, SingleValue };

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base) => ({
    ...base,
    width: 240,
    height: 51,
    minHeight: 51,
    background: 'var(--color-blue)',
    border: 'none',
    borderRadius: 100,
    boxShadow: 'none',
    cursor: 'pointer',
    padding: '0 20px',
    '&:hover': { border: 'none' },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    height: '100%',
    width: 162,
    flexShrink: 0,
    overflow: 'hidden',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--color-white)',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '0.08em',
    margin: 0,
    overflow: 'visible',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--color-white)',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '0.08em',
    margin: 0,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0 0 0 12px',
    '&:hover': { color: 'inherit' },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    marginTop: 8,
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    border: 'none',
  }),
  menuList: (base) => ({ ...base, padding: 0 }),
  option: (base, state) => ({
    ...base,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '0.08em',
    padding: '12px 20px',
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? 'var(--color-blue)'
      : state.isFocused
        ? 'var(--color-gray)'
        : 'var(--color-white)',
    color: state.isSelected ? 'var(--color-white)' : 'var(--color-dark)',
    '&:active': { backgroundColor: 'var(--color-blue)', color: 'var(--color-white)' },
  }),
};

export const Select = ({ options, placeholder = 'Выбрать', onChange, value }: SelectProps) => {
  const id = useId();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isVisuallyOpen, setIsVisuallyOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hoverState, setHoverState] = useState<HoverState>('idle');
  const [animKey, setAnimKey] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const triggerEnter = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setAnimKey((k) => k + 1);
    setHoverState('entering');
  }, []);

  const handleMenuOpen = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsClosing(false);
    setIsVisuallyOpen(true);
    setMenuIsOpen(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsVisuallyOpen(false);
    setIsClosing(true);
    closeTimer.current = setTimeout(() => {
      setMenuIsOpen(false);
      setIsClosing(false);
    }, CLOSE_DURATION);
  }, []);

  const handleMouseEnter = useCallback(() => {
    triggerEnter();
  }, [triggerEnter]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setAnimKey((k) => k + 1);
    setHoverState('leaving');
    hoverTimer.current = setTimeout(() => setHoverState('idle'), 500);
  }, []);

  return (
    <HoverContext.Provider value={{ hoverState, animKey }}>
      <div
        className={`${styles.wrapper} ${isVisuallyOpen ? styles.open : ''} ${isClosing ? styles.closing : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ReactSelect
          instanceId={id}
          inputId={`${id}-input`}
          classNamePrefix="rselect"
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          menuIsOpen={menuIsOpen}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          isSearchable={false}
          components={selectComponents}
          styles={selectStyles}
        />
      </div>
    </HoverContext.Provider>
  );
};
