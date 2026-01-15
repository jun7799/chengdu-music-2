import React, { useMemo } from 'react';
import './Scene.css';

// 根据播放时间获取应该显示的场景
const getSceneForTime = (currentTime) => {
  // 时间单位：秒
  // 0:00-0:42: scene1（前奏）
  // 0:42-1:00: scene2（出发）
  // 1:00-1:16: scene3（甜蜜）
  // 1:16-1:29: scene4（追逐）
  // 1:29-1:51: scene5（间奏）
  // 1:51-2:08: scene6（思乡）
  // 2:08-2:24: scene7（梦境）
  // 2:24-2:36: scene8（无奈）
  // 2:36-2:57: scene8 继续显示
  // 2:57-3:10: scene4（复用追逐）
  // 3:10-3:14: scene4 结束
  // 3:14-3:27: scene8（复用无奈）
  // 3:27-4:11: scene8 继续显示
  // 4:11-结尾: scene9（结尾）

  if (currentTime < 42) return 'scene1';
  if (currentTime < 60) return 'scene2';
  if (currentTime < 76) return 'scene3';
  if (currentTime < 89) return 'scene4';
  if (currentTime < 111) return 'scene5';
  if (currentTime < 128) return 'scene6';
  if (currentTime < 144) return 'scene7';
  if (currentTime < 177) return 'scene8';  // 2:57
  if (currentTime < 190) return 'scene4';  // 3:10，复用追逐
  if (currentTime < 251) return 'scene8';  // 4:11，复用无奈
  return 'scene9';
};

const Scene = ({ currentTime = 0 }) => {
  const currentScene = useMemo(() => getSceneForTime(currentTime), [currentTime]);

  return (
    <div className="scene-container">
      {/* 背景图片 */}
      <div
        key={currentScene}
        className="scene-image"
        style={{
          backgroundImage: `url('/${currentScene}.jpg')`
        }}
      />
      {/* 老电影效果层 */}
      <div className="vintage-film-grain" />
      <div className="vintage-scanlines" />
      <div className="vintage-vignette" />
      {/* 渐变遮罩，让歌词更清晰 */}
      <div className="scene-overlay" />
    </div>
  );
};

export default Scene;
