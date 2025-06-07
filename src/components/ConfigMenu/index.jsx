import React, { useState } from 'react';
import { Popover, Position, Icon } from 'evergreen-ui';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import MenuContent from './MenuContent';
const MenuWrapper = styled.div`
  position: absolute;
  left: 30px;
  bottom: 20px;
  z-index: 1000;
`;

const MenuButton = styled(Icon)`
  opacity: 0.6;
  cursor: pointer;
  transition: all 300ms ease;
  transform-origin: 50% 50%;

  &:hover {
    opacity: 1;
  }

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      transform: rotate(45deg) scale(1.1);
    `}
`;

const ConfigMenu = ({
  showQuickLinks,
  onQuickLinksVisibilityChange,
  quickLinks,
  onQuickLinksUpdate,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnOpen = () => {
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <MenuWrapper>
      <Popover
        position={Position.BOTTOM_LEFT}
        onOpen={handleOnOpen}
        onClose={handleOnClose}
        content={
          <MenuContent
            {...props}
            showQuickLinks={showQuickLinks}
            onQuickLinksVisibilityChange={onQuickLinksVisibilityChange}
            quickLinks={quickLinks}
            onQuickLinksUpdate={onQuickLinksUpdate}
          />
        }
      >
        <MenuButton id="menu-button" icon="cog" size={20} color="white" isOpen={isOpen} />
      </Popover>
    </MenuWrapper>
  );
};

ConfigMenu.propTypes = {
  showQuickLinks: PropTypes.bool,
  onQuickLinksVisibilityChange: PropTypes.func,
  quickLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  onQuickLinksUpdate: PropTypes.func,
};

export default ConfigMenu;
