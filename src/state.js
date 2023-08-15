import { initQuiz } from "./quiz";


export const setState = (state = "{}") => {
    window.EASlides.state = state
}

export const changeState = (kind, slide, code) => {
    window.Courser.pageDone(slide, kind, code)
}

const getSlideKeyBy = (indexh, indexv) => indexh * 100 + indexv
export const getSlideKey = () =>
    getSlideKeyBy(window.EASlides.indexh, window.EASlides.indexv)

const setSlideState = (state) => {
    window.EASlides.state[getSlideKey()] = state
}

const getSlideState = () =>
    window.EASlides.state[getSlideKey()]

export const setListeners = () => {
    setRevealListeners()
    setAudioListeners()
    setCourserListeners()
}

// reveal event
const onSlide = (event) => {
    window.EASlides.indexh = event.indexh
    window.EASlides.indexv = event.indexv
    window.EASlides.slideIsDone = window.Courser.pageIsDone(getSlideKey())
    if (initQuiz(event.currentSlide))
        window.EASlides.type = "quiz"
    else
        window.EASlides.type = "audio"
    window.Reveal.layout()
}
const setRevealListeners = () => {
    window.Reveal.on('ready', onSlide)
    window.Reveal.on('slidechanged', onSlide)
}

// audio event
const setAudioListeners = () => {
    document.addEventListener("startplayback", (e) => {
        if (window.EASlides.type == "audio")
            setSlideState("start")
    })
    document.addEventListener("stopplayback", (e) => {
        if (e.ended) {
            if (getSlideState() == "start") {
                setSlideState("done")
                changeState("done", getSlideKey())
            }
        }
    })
    document.addEventListener("seekplayback", (e) => {
        if (getSlideState() == "start")
            setSlideState("")
    })
}

// courser event
const setCourserListeners = () => {
    document.addEventListener("resetSlide", () => {
        window.EASlides.state = {}
        window.Reveal.slide(0, 0, 0)
    })
}
