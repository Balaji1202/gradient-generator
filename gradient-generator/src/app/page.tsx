'use client';

import { ColorPicker as AntdColorPicker, Button, Space, Typography } from "antd";
import { Color } from "antd/es/color-picker";
import { useColorStore } from "./store";
import { useEffect, useState } from "react";
import { CheckCircleOutlined, CheckOutlined, CopyOutlined } from "@ant-design/icons";

export default function Home() {
  const {startColor, endColor, setStartColor, setEndColor} = useColorStore();

  const { undo, redo } = useColorStore.temporal.getState();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey && event.key === 'z') {
        undo();
        event.preventDefault();

      } else if (event.ctrlKey || event.metaKey && event.key === 'y') {
        redo();
        event.preventDefault();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo, redo]);

  const onStartGradientChangeComplete = (value: string) => {
    setStartColor(value);
  }

  const onEndGradientChangeComplete = (value: string) => {
    setEndColor(value);
  }

  const onStartGradientChange = (value: string) => {
    document.documentElement.style.setProperty("--background-start-rgb", value);
  }

  const onEndGradientChange = (value: string) => {
    document.documentElement.style.setProperty("--background-end-rgb", value);
  }

  useEffect(() => {
    onStartGradientChange(startColor);
  }, [startColor])


  useEffect(() => {
    onEndGradientChange(endColor);
  }, [endColor])

  const [isCopyClicked, setisCopyClicked] = useState(false);

  const onCopy =() => {
    navigator.clipboard.writeText(`background-image: linear-gradient(${startColor}, ${endColor})`);

    setisCopyClicked(true);

    setTimeout(() => {
      setisCopyClicked(false);
    }, 2000);
  }


  return (
    <>
      <main>
        <Space size={16} direction="vertical" className="copy-wrapper">
          <Space>
            <ColorPicker value={startColor} defaultValue={startColor}
              onChangeComplete={(color) => onStartGradientChangeComplete(color.toHexString())}
              onChange={(color) => onStartGradientChange(color.toHexString())}/>
            <ColorPicker value={endColor} defaultValue={endColor}
              onChangeComplete={(color) => onEndGradientChangeComplete(color.toHexString())}
              onChange={(color) => onEndGradientChange(color.toHexString())}/>
          </Space>

          {!isCopyClicked ?
            <Button onClick={onCopy} type="text" icon={<CopyOutlined/>}>Copy CSS</Button> :
            <Button onClick={onCopy} type="text" icon={<CheckOutlined/>}>Copied</Button>
          }

        </Space>
      </main>
      <div className="footer">
        <Typography.Text>
          Try to undo/redo with <kbd>Ctrl/Cmd</kbd> + <kbd>Z</kbd> / <kbd>Ctrl/Cmd</kbd> + <kbd>Y</kbd> in case you want to go back and forth in time.
        </Typography.Text>
      </div>
    </>
  )
}

const ColorPicker = ({defaultValue, value, onChangeComplete, onChange}: {defaultValue: string, value: string; onChangeComplete: (color: Color) => void, onChange: (color: Color) => void}) => {
  return (
    <AntdColorPicker value={value} defaultValue={defaultValue} onChangeComplete={onChangeComplete} onChange={onChange} showText/>
  )
}
