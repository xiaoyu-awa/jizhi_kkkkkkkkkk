import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuickLinksContainer = styled.div`
  position: fixed;
  top: 75%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  gap: 10px;
  z-index: 1000;
`;

const LinkItem = styled.a`
  background: ${(props) => (props.isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)')};
  color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
  padding: 12px;
  border-radius: 12px;
  text-decoration: none;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80px;
  height: 80px;

  &:hover {
    transform: translateY(-5px);
    background: ${(props) =>
      props.isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const LinkText = styled.span`
  font-size: 12px;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const QuickLinks = ({ links, isDarkMode }) => {
  return (
    <QuickLinksContainer>
      {links.map((link, index) => (
        <LinkItem
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          isDarkMode={isDarkMode}
        >
          <IconWrapper>
            <img
              src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`}
              alt={link.name}
            />
          </IconWrapper>
          <LinkText>{link.name}</LinkText>
        </LinkItem>
      ))}
    </QuickLinksContainer>
  );
};

QuickLinks.propTypes = {
  links: PropTypes.array.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default QuickLinks;
