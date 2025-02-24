import { useState } from 'react';
import "../styles/TranslateApp.css"

const TranslateForm = () => {
    const [languageInicial, setLanguageInicial] = useState("en");
    const [languageFinal, setLanguageFinal] = useState("fr");
    const [caracteres, setCaracteres] = useState(19);
    const [text, setText] = useState("bonjour, comment allez-vous?");

    const textChange = () => {

        document.getElementById('text-translate').value = "Translating...";

        fetch(`/translate/get?q=${document.getElementById("text").value}&langpair=${languageInicial}|${languageFinal}`)
            .then((response) => response.json())
            .then((data) => {
                document.getElementById('text-translate').value = data.responseData.translatedText;
                setText(data.responseData.translatedText);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
    }

    const changeLanguageFinal = (language) => {
        setLanguageFinal(language);
        document.querySelector(".active").classList.remove('active');
        document.querySelector(`.${language}-final`).classList.add('active');
    }

    const changeLanguageInicial = (language) => {
        setLanguageInicial(language);
        document.querySelector(".active-inicial").classList.remove('active-inicial');
        document.querySelector(`.${language}-inicial`).classList.add('active-inicial');
    }

    const interchangeLanguage = () => {
        const li = languageInicial;
        const lf = languageFinal;
        setLanguageInicial(lf);
        setLanguageFinal(li);

        document.querySelector(".active-inicial").classList.remove('active-inicial');
        document.querySelector(`.${lf}-inicial`).classList.add('active-inicial');
        document.querySelector(".active").classList.remove('active');
        document.querySelector(`.${li}-final`).classList.add('active');

    }

    const speakText = (cadena) => {
        let language = "";
        let text = ""
        if (cadena === "inicial"){
            text = document.getElementById("text").value;
            language = languageInicial.toLocaleLowerCase()-languageInicial.toLocaleUpperCase();
        } else{
            text = document.getElementById("text-translate").value;
            language = languageFinal.toLocaleLowerCase()-languageFinal.toLocaleUpperCase();
        }
        if (text.trim() !== "") {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            window.speechSynthesis.speak(utterance);
            
            } else {
            alert("Por favor, ingresa algún texto.");
            }
    
    }

    const copy = (cadena) => {
        if (cadena === "inicial") {
            let texto = document.getElementById('text').value;
            navigator.clipboard.writeText(texto);
        } else{
            let texto = document.getElementById('text-translate').value;
            navigator.clipboard.writeText(texto);
        }
        

    }

    return(
        <>
            <img className='logo' src="resources/logo.svg" alt="logo" />
            <main className='main'>
                <div className="container antes">
                    <div className="navegacion">
                        <p className='detected'>Detect language</p>
                        <button className='boton-idioma en-inicial active-inicial' onClick={() => changeLanguageInicial("en")}>English</button>
                        <button className='boton-idioma fr-inicial' onClick={() => changeLanguageInicial("fr")}>French</button>
                        <button className='boton-idioma es-inicial' onClick={() => changeLanguageInicial("es")}>Spanish <img src="resources/Expand_down.svg" alt="mas" /></button>
                    </div>
                    <div className='traduccion'>
                        <form className='formulario'>
                            <textarea className='text-area' spellCheck="false" maxLength={500} onChange={() => setCaracteres(document.getElementById("text").value.length)} name="textArea" id="text" defaultValue={"Hello, how are you?"}></textarea>
                        </form>
                        <div className='botones'>
                            <div className='botones-pantalla-sonido'>
                                <button className='boton-sonido' onClick={() => speakText("inicial")}><img src="resources/sound_max_fill.svg" alt="sonido" /></button>
                                <button className='boton-sonido' onClick={() => copy("inicial")}><img src="resources/Copy.svg" alt="sonido" /></button>
                                <span className='contador-caracteres'>{caracteres}/500</span>
                            </div>
                            <div className='boton-pantalla'>
                                <button className='boton-translate' onClick={() => textChange()}><img src="resources/Sort_alfa.svg" alt="A" />Translate</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container despues">
                    <div className="navegacion-despues">
                        <div>
                            <button className='boton-idioma-final en-final' onClick={() => changeLanguageFinal("en")}>English</button>
                            <button className='boton-idioma-final fr-final active' onClick={() => changeLanguageFinal("fr")}>French</button>
                            <button className='boton-idioma-final es-final' onClick={() => changeLanguageFinal("es")}>Spanish</button>
                        </div>
                        <div>
                            <button className='boton-sonido' onClick={() => interchangeLanguage()}><img src="resources/Horizontal_top_left_main.svg" alt="change" /></button>
                        </div>
                    </div>
                    <div className='traduccion'>
                        <form className='formulario'>
                            <textarea className='text-area' maxLength={500} spellCheck="false" readOnly name="texto" id="text-translate"  value={text}></textarea>
                        </form>
                        <div className='botones-despues'>
                            <button className='boton-sonido' onClick={() => speakText("final")}><img src="resources/sound_max_fill.svg" alt="sonido" /></button>
                            <button className='boton-sonido' onClick={() => copy("final")}><img src="resources/Copy.svg" alt="sonido" /></button>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </main>
        </>
    );
}

export default TranslateForm;