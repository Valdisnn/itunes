const audioPlayerInit = () => {
    // Переменные
    const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPlay = document.querySelector('.audio-button__play'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    // Функции
    const loadTrack = () => {
            const isPlayed = audioPlayer.paused,
                track = playlist[trackIndex];

            audioPlayer.src = `./audio/${track}.mp3`;
            audioImg.src = `./audio/${track}.jpg`;
            audioHeader.textContent = track.toLocaleUpperCase();

            if (isPlayed) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }
        },
        nextTrack = () => {
            if (trackIndex === playlist.length - 1) {
                trackIndex = 0;
            } else {
                trackIndex++;
            }

            loadTrack();
        },
        prevTrack = () => {
            if (trackIndex !== 0) {
                trackIndex--;
            } else {
                trackIndex = playlist.length - 1;
            }

            loadTrack();
        },
        addZero = n => n < 10 ? '0' + n : n;
    // События
    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toLocaleUpperCase();


            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();

            }
        } else if (target.classList.contains('audio-button__prev')) {
            prevTrack();

        } else if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }

        audioPlayer.addEventListener('ended', () => {
            nextTrack();
            audioPlayer.play();
        });

        audioPlayer.addEventListener('timeupdate', () => {
            const duration = audioPlayer.duration,
                currentTime = audioPlayer.currentTime,
                progress = (currentTime / duration) * 100;

            audioProgressTiming.style.width = progress + '%';

            let minutPassed = Math.floor(currentTime / 60) || '0',
                secondPassed = Math.floor(currentTime % 60) || '0',
                minutTotal = Math.floor(duration / 60) || '0',
                secondTotal = Math.floor(duration % 60) || '0';

            audioTimePassed.textContent = `${addZero(minutPassed)}:${addZero(secondPassed)}`;
            audioTimeTotal.textContent = `${addZero(minutTotal)}:${addZero(secondTotal)}`;
        });

        audioProgress.addEventListener('click', event => {
            const x = event.offsetX,
            allWidth = audioProgress.clientWidth,
            progress = (x/ allWidth) * audioPlayer.duration;

            audioPlayer.currentTime = progress;
        })
    });
}

export default audioPlayerInit;