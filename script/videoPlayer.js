const videoPlayerInit = () => {
    // переменные
    const videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoButtonStop = document.querySelector('.video-button__stop'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgress = document.querySelector('.video-progress'),
        videoTimeTotal = document.querySelector('.video-time__total'),
        videoFullScreen = document.querySelector('.video-full__screen'),
        videoVolume = document.querySelector('.video-volume'),
        videoVolumeDown = document.querySelector('.video-volume-down'),
        videoVolumeUp = document.querySelector('.video-volume-up');

    // функции
    const toggleIcon = () => {
            if (videoPlayer.paused) {
                videoButtonPlay.classList.remove('fa-pause');
                videoButtonPlay.classList.add('fa-play');
            } else {
                videoButtonPlay.classList.add('fa-pause');
                videoButtonPlay.classList.remove('fa-play');
            };
        },
        playVideo = () => {
            if (videoPlayer.paused) {
                videoPlayer.play();
            } else {
                videoPlayer.pause();
            };

            toggleIcon();
        },
        stopPlay = () => {
            videoPlayer.pause();
            videoPlayer.currentTime = 0;

            toggleIcon();
        },
        addZero = n => n < 10 ? '0' + n : n,
        changeVolume = n => videoPlayer.volume = n / 100;

    // события
    videoPlayer.addEventListener('click', playVideo);

    videoButtonPlay.addEventListener('click', playVideo);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime,
            duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutPassed = Math.floor(currentTime / 60),
            secondPassed = Math.floor(currentTime % 60),
            minutTotal = Math.floor(duration / 60),
            secondTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutPassed)}:${addZero(secondPassed)}`;
        videoTimeTotal.textContent = `${addZero(minutTotal)}:${addZero(secondTotal)}`;

        if (currentTime === duration) {
            stopPlay();
        };
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration,
            value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoVolume.addEventListener('input', () => {
        changeVolume(videoVolume.value);
    });

    videoVolumeDown.addEventListener('click', () => {
        if (videoVolume.value === 100) {
            videoVolumeUp.disabled = true; 
        } else if (videoVolume.value === 0) {
            videoVolumeDown.disabled = true;
        } else {
            videoVolumeUp.disabled = false;
            videoVolumeDown.disabled =false;
        };

        videoVolume.value -= 10;
        changeVolume(videoVolume.value);
    });
    videoVolumeUp.addEventListener('click', () => {
        if (videoVolume.value === 100) {
            videoVolumeUp.disabled = true; 
        } else if (videoVolume.value === 0) {
            videoVolumeDown.disabled = true;
        } else {
            videoVolumeUp.disabled = false;
            videoVolumeDown.disabled =false;
        };
        
        videoVolume.value += 10;
        changeVolume(videoVolume.value);
    });
}

export default videoPlayerInit;