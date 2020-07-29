export const radioPlayerInit = () => {
    const radio = document.querySelector(".radio");
    const radioCoverImg = document.querySelector(".radio-cover__img");
    const radioNavigation = document.querySelector(".radio-navigation");
    const radioHeaderBig = document.querySelector(".radio-header__big");
    const radioItem = document.querySelectorAll(".radio-item");
    const radioStop = document.querySelector(".radio-stop");
    const radioVolum = document.querySelectorAll(".radio-volum");
    const radioVolumPercent = document.querySelector(".radio-volum__percent");

    const radioVolumPercentRender = (n) => {
        radioVolumPercent.textContent = (n*100)+'%';
    }

    const audio = new Audio();
    audio.type = "audio/aac";
    audio.volume = 0.2;
    radioVolumPercentRender(audio.volume);

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if(audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    } 

    radioNavigation.addEventListener('change', (event) => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;


        radioStop.disabled = false;

        audio.src = target.dataset.radioStantion;;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolum.forEach(item => {
        item.addEventListener('click', (event) => {
            if(event.target.classList.contains('fa-plus')) {
                if(audio.volume < 1) {
                    audio.volume = (audio.volume + 0.1).toFixed(1);
                }
            } else {
                if(audio.volume > 0) {
                    audio.volume = (audio.volume - 0.1).toFixed(1);
                }
            }
            radioVolumPercentRender(audio.volume);
        });
    });

}