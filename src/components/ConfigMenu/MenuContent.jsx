import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  Menu,
  Tablist,
  Switch,
  SidebarTab,
  SegmentedControl,
  Spinner,
  Text,
  InlineAlert,
  TextInput,
  IconButton,
  Card,
} from 'evergreen-ui';
import styled from 'styled-components';
import { WAVES } from '../../constants/appConstants';

const ScrollableMenuWrapper = styled.div`
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
  padding-bottom: 24px;
  position: relative;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
import Legal from './Legal';
import FontStatement from './FontStatement';
import SaveBgMenuItem from './SaveBgMenuItem';

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SegmentedControlWrapper = styled.div`
  margin-left: 16px;
`;

const QuickLinksForm = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const QuickLinkItem = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const StyledTextInput = styled(TextInput)`
  width: 120px;
`;

const titleStyle = {
  margin: 0,
  marginBottom: 8,
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
};

const MenuContent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    isPlaying,
    onPlayPauseSelect,
    showSearchBarChecked,
    onShowSearchBarChange,
    defaultPlayChecked,
    verticalVersesChecked,
    onVerticalVersesChange,
    onDefaultPlayChange,
    colorStayChecked,
    onColorStayChange,
    selected,
    onBgOptionChange,
    engineOption,
    onEngineOptionChange,
    colorMode,
    onColorModeOptionChange,
    fontName,
    onFontTypeChange,
    isFontLoading,
    waveColor,
    showQuickLinks,
    onQuickLinksVisibilityChange,
    quickLinks,
    onQuickLinksUpdate,
  } = props;

  const bgOptions = [
    { label: 'Waves', value: 'waves' },
    { label: 'Blobs', value: 'blobs' },
  ];

  const engineOptions = [
    {
      label: 'Google',
      value: 'https://www.google.com/search?q=',
    },
    { label: 'Baidu', value: 'https://www.baidu.com/s?wd=' },
    {
      label: 'Bing',
      value: 'https://www.bing.com/search?q=',
    },
  ];

  const colorModeOptions = [
    {
      label: '白天',
      value: 'light',
    },
    {
      label: '黑夜',
      value: 'dark',
    },
    {
      label: '跟随系统',
      value: 'os',
    },
  ];

  const fontOptions = [
    { label: '江西拙楷', value: 'JXZhuoKai' },
    { label: '欣意吉祥宋', value: 'JiXiangSong' },
    { label: '方正细金陵', value: 'FZXiJinLJW' },
  ];

  const switchOptions = [
    // {
    //   name: '黑夜模式',
    //   checkedState: darkModeChecked,
    //   onChangeFunc: onDarkModeChange,
    // },
    {
      name: '竖版诗词',
      checkedState: verticalVersesChecked,
      onChangeFunc: onVerticalVersesChange,
    },
    {
      name: '默认播放动画',
      checkedState: defaultPlayChecked,
      onChangeFunc: onDefaultPlayChange,
    },
    {
      name: '显示搜索框',
      checkedState: showSearchBarChecked,
      onChangeFunc: onShowSearchBarChange,
    },
    {
      name: '保留颜色名称',
      checkedState: colorStayChecked,
      onChangeFunc: onColorStayChange,
    },
    {
      name: '快捷链接栏',
      checkedState: showQuickLinks,
      onChangeFunc: onQuickLinksVisibilityChange,
    },
  ];

  const tabs = [
    {
      tabName: '设置',
      tabContent: (
        <ScrollableMenuWrapper>
          <Menu.Group title="偏好">
            {switchOptions.map((option) => {
              if (selected !== WAVES && option.name === '保留颜色名称') return;
              return (
                <Menu.Item key={option.name}>
                  <SwitchWrapper>
                    {option.name}
                    <Switch checked={option.checkedState} onChange={option.onChangeFunc} />
                  </SwitchWrapper>
                </Menu.Item>
              );
            })}
          </Menu.Group>
          <Menu.Divider />

          <Menu.Group title="搜索引擎">
            <SegmentedControlWrapper>
              <SegmentedControl
                width={280}
                options={engineOptions}
                value={engineOption}
                onChange={onEngineOptionChange}
              />
            </SegmentedControlWrapper>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Card elevation={0} padding={15} style={{ width: '100%' }}>
              <div
                className="menu-item"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <p style={titleStyle}>快捷链接栏</p>
              </div>
              {showQuickLinks && (
                <QuickLinksForm>
                  {quickLinks.map((link, index) => (
                    <QuickLinkItem key={index}>
                      <StyledTextInput
                        value={link.name}
                        placeholder="名称"
                        onChange={(e) => {
                          const newLinks = [...quickLinks];
                          newLinks[index] = { ...link, name: e.target.value };
                          onQuickLinksUpdate(newLinks);
                        }}
                      />
                      <StyledTextInput
                        value={link.url}
                        placeholder="URL"
                        onChange={(e) => {
                          const newLinks = [...quickLinks];
                          newLinks[index] = { ...link, url: e.target.value };
                          onQuickLinksUpdate(newLinks);
                        }}
                      />
                      <IconButton
                        icon="trash"
                        intent="danger"
                        onClick={() => {
                          const newLinks = quickLinks.filter((_, i) => i !== index);
                          onQuickLinksUpdate(newLinks);
                        }}
                      />
                    </QuickLinkItem>
                  ))}
                  <IconButton
                    icon="plus"
                    appearance="minimal"
                    onClick={() => {
                      const newLinks = [...quickLinks, { name: '', url: '' }];
                      onQuickLinksUpdate(newLinks);
                    }}
                  />
                </QuickLinksForm>
              )}
            </Card>
          </Menu.Group>
        </ScrollableMenuWrapper>
      ),
    },
    {
      tabName: '背景',
      tabContent: (
        <>
          <Menu.Group title="动画效果">
            <Menu.OptionsGroup
              options={bgOptions}
              selected={selected}
              onChange={onBgOptionChange}
            />
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group title="颜色模式">
            <SegmentedControlWrapper>
              <SegmentedControl
                width={280}
                options={colorModeOptions}
                value={colorMode}
                onChange={onColorModeOptionChange}
              />
            </SegmentedControlWrapper>
          </Menu.Group>
        </>
      ),
    },
    {
      tabName: '操作',
      tabContent: (
        <Menu.Group>
          <SaveBgMenuItem />
          <Menu.Item
            icon={isPlaying ? 'pause' : 'play'}
            intent="success"
            onSelect={onPlayPauseSelect}
            secondaryText="Space"
          >
            {isPlaying ? '暂停动画' : '播放动画'}
          </Menu.Item>
          <InlineAlert intent="none" marginRight={15} marginLeft={15}>
            <p>波纹背景下使用左右键可以随机切换颜色</p>
          </InlineAlert>
        </Menu.Group>
      ),
    },

    {
      tabName: '字体',
      tabContent: (
        <Menu.Group title="选择字体">
          <SegmentedControlWrapper>
            <SegmentedControl
              width={280}
              options={fontOptions}
              value={fontName}
              onChange={onFontTypeChange}
            />
            {isFontLoading ? (
              <Pane height={30} width={280} marginBottom={-10} marginTop={10} display="flex">
                <Spinner size={20} marginRight={5} />
                <Text>远程加载中……</Text>
              </Pane>
            ) : (
              <FontStatement fontName={fontName} />
            )}
          </SegmentedControlWrapper>
        </Menu.Group>
      ),
    },
    { tabName: '关于', tabContent: <Legal waveColor={waveColor} selected={selected} /> },
  ];

  return (
    <Pane display="flex" height={300}>
      <Tablist width={80} margin={10}>
        {tabs.map(({ tabName }, index) => (
          <SidebarTab
            key={tabName}
            id={tabName}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            aria-controls={`panel-${tabName}`}
          >
            {tabName}
          </SidebarTab>
        ))}
      </Tablist>
      <Pane width={350} background="tint1">
        {tabs.map(({ tabName, tabContent }, index) => (
          <Pane
            key={tabName}
            id={`panel-${tabName}`}
            role="tabpanel"
            aria-labelledby={tabName}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
          >
            {tabContent}
          </Pane>
        ))}
      </Pane>
    </Pane>
  );
};

MenuContent.propTypes = {
  children: PropTypes.any,
  showSearchBarChecked: PropTypes.bool,
  onShowSearchBarChange: PropTypes.func,
  onPlayPauseSelect: PropTypes.func.isRequired,
  onVerticalVersesChange: PropTypes.func.isRequired,
  verticalVersesChecked: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  defaultPlayChecked: PropTypes.bool.isRequired,
  onDefaultPlayChange: PropTypes.func.isRequired,
  colorStayChecked: PropTypes.bool.isRequired,
  onColorStayChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
  onBgOptionChange: PropTypes.func,
  engineOption: PropTypes.string,
  onEngineOptionChange: PropTypes.func,
  colorMode: PropTypes.string,
  onColorModeOptionChange: PropTypes.func,
  fontName: PropTypes.string,
  onFontTypeChange: PropTypes.func,
  isFontLoading: PropTypes.bool,
  waveColor: PropTypes.object,
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

export default MenuContent;
