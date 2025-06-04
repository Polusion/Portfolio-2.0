

function playAll() {
    document.querySelector('.container').classList.add('playing');
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
      audio.play();
    });
  
  }



  