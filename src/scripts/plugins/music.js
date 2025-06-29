/**
 * 背景音乐控制插件
 */
export const initMusicPlayer = () => {
  const audio = document.getElementById('bg-music');
  const control = document.getElementById('music-control');
  let isPlaying = false;

  // 尝试自动播放（受浏览器策略限制）
  const tryAutoPlay = () => {
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          updateControl();
        })
        .catch(error => {
          console.log('自动播放被阻止:', error);
          control.style.display = 'flex'; // 显示播放按钮
        });
    }
  };

  // 更新控制按钮状态
  const updateControl = () => {
    if (isPlaying) {
      control.innerHTML = '<i class="fas fa-pause"></i>';
      control.classList.remove('paused');
      createWaveEffect();
    } else {
      control.innerHTML = '<i class="fas fa-play"></i>';
      control.classList.add('paused');
    }
  };

  // 创建音波动画
  const createWaveEffect = () => {
    const wave = document.createElement('div');
    wave.className = 'music-wave';
    control.appendChild(wave);
    
    setTimeout(() => {
      wave.remove();
    }, 2000);
  };

  // 点击事件控制
  control.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play()
        .then(() => {
          isPlaying = true;
          updateControl();
        })
        .catch(error => {
          console.log('播放失败:', error);
        });
    }
    isPlaying = !isPlaying;
    updateControl();
  });

  // 音频事件监听
  audio.addEventListener('play', () => {
    isPlaying = true;
    updateControl();
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    updateControl();
  });

  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
  });

  // 页面可见性变化处理
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
      audio.pause();
    }
  });

  // 初始化尝试播放
  tryAutoPlay();
};

// 音乐可视化数据获取（示例）
export const getAudioData = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  
  const audio = document.getElementById('bg-music');
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  return {
    analyser,
    bufferLength,
    dataArray,
    update: () => {
      analyser.getByteFrequencyData(dataArray);
      return dataArray;
    }
  };
};
