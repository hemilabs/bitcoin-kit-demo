import { ComponentProps, MutableRefObject, ReactNode, useState } from 'react';
import {
  type NetworkType,
  networkTypes,
  useNetworkType,
} from 'hooks/useNetworkType';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { CheckMarkIcon } from 'icons/checkMark';
import { Chevron } from 'icons/chevron';
import { Menu } from './menu';
import { useUmami } from 'analyticsEvents';

type Props = {
  rightSection?: ReactNode;
  text: string;
};

type Selectable = { selected?: boolean };

const MenuContainer = ({
  children,
  isOpen,
  refProp,
  ...props
}: { children: ReactNode } & {
  isOpen: boolean;
  refProp: React.RefObject<HTMLDivElement> | MutableRefObject<HTMLDivElement>;
} & ComponentProps<'div'>) => (
  <div
    {...props}
    className={`cursor-pointer rounded-lg border border-neutral-300 p-2 transition-colors duration-300 hover:bg-neutral-100 ${
      isOpen ? 'rounded-lg' : ''
    }`}
    ref={refProp}
  >
    {children}
  </div>
);

const ItemText = ({
  selected = false,
  text,
}: Pick<Props, 'text'> & Selectable) => (
  <span
    className={`text-base font-medium capitalize transition-colors duration-300
      group-hover/item:text-neutral-950 md:text-sm ${
        selected ? 'text-neutral-950' : 'text-neutral-600'
      }`}
  >
    {text}
  </span>
);

const Row = (props: { children: ReactNode } & ComponentProps<'div'>) => (
  <div className="flex items-center gap-x-2" {...props} />
);

export const NetworkSwitch = function () {
  const [networkType, setNetworkType] = useNetworkType();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const { track } = useUmami();

  const selectNetwork = function (type: NetworkType) {
    setNetworkType(type);
    setIsOpen(false);
    track?.(`Switch to ${type}`);
  };

  return (
    <MenuContainer
      isOpen={isOpen}
      onClick={() => setIsOpen(true)}
      refProp={ref}
    >
      <div className="relative">
        <Row onClick={() => setIsOpen(!isOpen)}>
          <ItemText selected={isOpen} text={networkType} />
          {isOpen ? (
            <Chevron.Up className="ml-auto text-neutral-400" />
          ) : (
            <Chevron.Bottom className="ml-auto text-neutral-400" />
          )}
        </Row>
        {isOpen && (
          <div className="absolute right-0 top-0 z-50 translate-x-3 translate-y-8">
            <Menu
              items={networkTypes.map(function (type) {
                const selected = type === networkType;
                return {
                  content: (
                    <button
                      className={`flex items-center gap-x-2 ${
                        selected ? 'text-neutral-950' : ''
                      }`}
                      disabled={selected}
                      key={type}
                      onClick={function (e) {
                        e.stopPropagation();
                        selectNetwork(type);
                      }}
                    >
                      <span className="capitalize">{type}</span>
                      <div className={selected ? 'block' : 'invisible'}>
                        <CheckMarkIcon className="[&>path]:stroke-emerald-500" />
                      </div>
                    </button>
                  ),
                  id: type,
                };
              })}
            />
          </div>
        )}
      </div>
    </MenuContainer>
  );
};
