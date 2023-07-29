import { initQuiz } from "./quiz";


export const setState = (state = "{}") => {
    window.EASlides.state = state
}

const changeState = (kind, slide) => {
    // kind:
    // audio: done
    // quiz: pass, fail
    var saveEvent = new CustomEvent("changeState")
    saveEvent.kind = kind
    saveEvent.slide = slide
    document.dispatchEvent(saveEvent)
}

const getSlideKeyBy = (indexh, indexv) => indexh * 100 + indexv
const getSlideKey = () =>
    getSlideKeyBy(window.EASlides.indexh, window.EASlides.indexv)

const setSlideState = (state) => {
    window.EASlides.state[getSlideKey()] = state
    // console.log(window.EASlides)
}

const getSlideState = () =>
    window.EASlides.state[getSlideKey()]

export const setListeners = () => {
    setRevealListeners()
    setAudioListeners()
    document.addEventListener("quizDone", (e) => {
        setSlideState(e.state)
        if (e.state)
            changeState("pass", getSlideKey())
        else
            changeState("fail", getSlideKey())
    });
    document.addEventListener("resetSlide", (e) => {
        setState()        
    });
};

// reveal event
const onSlide = (event) => {
    window.EASlides.indexh = event.indexh
    window.EASlides.indexv = event.indexv
    if (initQuiz(event.currentSlide))
        window.EASlides.type = "quiz"
    else
        window.EASlides.type = "audio"
    window.Reveal.layout()
}
const setRevealListeners = () => {
    window.Reveal.on('ready', (event) => {
        onSlide(event)
        var readyEvent = new CustomEvent("revealReady")
        readyEvent.nSlides = window.Reveal.getTotalSlides();
        document.dispatchEvent(readyEvent)
    })
    window.Reveal.on('slidechanged', onSlide)
}

// audio event
const setAudioListeners = () => {
    document.addEventListener("startplayback", (e) => {
        if (window.EASlides.type == "audio")
            setSlideState("start");
    });
    document.addEventListener("stopplayback", (e) => {
        if (e.ended) {
            if (getSlideState() == "start") {
                setSlideState("done");
                changeState("done", getSlideKey())
            }
        }
    });
    document.addEventListener("seekplayback", (e) => {
        if (getSlideState() == "start")
            setSlideState("");
    });
}


