import React, { useState, useEffect, useRef } from 'react';
import './Scene.css';

// 所有场景列表
const ALL_SCENES = ['scene1', 'scene2', 'scene3', 'scene4', 'scene5', 'scene6', 'scene7', 'scene8', 'scene9'];

// 根据播放时间获取应该显示的场景 - 《成都》时间轴
const getSceneForTime = (currentTime) => {
  // 时间单位：秒
  // 0:00-0:32: scene1（让我掉下眼泪 - 昨夜的酒）
  // 0:32-1:04: scene2（让我感到为难 - 挣扎的自由）
  // 1:04-1:43: scene3（分别总是在九月 - 垂柳）
  // 1:43-2:20: scene4（成都 带不走的 - 只有你）
  // 2:20-2:52: scene5（和我在成都的街头走一走）
  // 2:52-3:24: scene6（挽着衣袖 - 裤兜）
  // 3:24-3:56: scene7（玉林路的尽头）
  // 3:56-4:22: scene8（小酒馆的门口）
  // 4:22-结尾: scene9（灯都熄灭了）

  if (currentTime < 32) return 'scene1';
  if (currentTime < 64) return 'scene2';
  if (currentTime < 103) return 'scene3';
  if (currentTime < 140) return 'scene4';
  if (currentTime < 172) return 'scene5';
  if (currentTime < 204) return 'scene6';
  if (currentTime < 236) return 'scene7';
  if (currentTime < 262) return 'scene8';
  return 'scene9';
};

const Scene = ({ currentTime = 0 }) => {
  const [displayedScene, setDisplayedScene] = useState('scene1');
  const preloadDone = useRef(false);

  // 预加载所有图片（只执行一次）
  useEffect(() => {
    if (!preloadDone.current) {
      preloadDone.current = true;
      ALL_SCENES.forEach(scene => {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}${scene}.jpg`;
      });
      console.log('[Scene] All images preloaded');
    }
  }, []);

  // 只在场景真正变化时才更新DOM
  useEffect(() => {
    const newScene = getSceneForTime(currentTime);
    if (newScene !== displayedScene) {
      setDisplayedScene(newScene);
    }
  }, [currentTime, displayedScene]);

  return (
    <div className="scene-container">
      {/* 背景图片 */}
      <div
        key={displayedScene}
        className="scene-image"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}${displayedScene}.jpg')`
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
