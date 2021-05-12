import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
  webkitSpeechGrammarList: any;
  webkitSpeechRecognitionEvent: any;
}
@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  styleUrls: ['./voice.component.css']
})
export class VoiceComponent implements OnInit {


  constructor() { }


  ngOnInit() {

  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('[name="voice"]');
  const options = Array.from(document.querySelectorAll('[type="range"], [name="text"]'));
  const speakButton = <HTMLButtonElement>document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');
  msg.text = (<HTMLTextAreaElement>document.querySelector('[name="text"]')).value;

  function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
  }

  function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
      speechSynthesis.speak(msg);
    }
  }

  function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  options.forEach(option => option.addEventListener('change', setOption));
  // speakButton.addEventListener('click', toggle);
  speakButton.addEventListener('click', (e: CustomEvent) => {
    // your code here
    toggle;
});
  stopButton.addEventListener('click', () => toggle(false));
  }

// another component

  speechSystem() {
      const webkitSpeechRecognition = window['webkitSpeechRecognition'];
      // const { webkitSpeechRecognition }: IWindow = this.window;

      // const { webkitSpeechGrammarList }: IWindow = <IWindow>window;
      // const { webkitSpeechRecognitionEvent }: IWindow = <IWindow>window;

      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      // var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
      // var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
      // window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;  //Sets the number of alternative potential matches that should be returned per result
      // SpeechRecognition.continuous =true;
      let p = document.createElement('p');
      const words = document.querySelector('.words');
      words.appendChild(p);

      //Receiving and handling results
      // recognition.onresult = function(event) {
      //   var last = event.results.length - 1;
      //   var color = event.results[last][0].transcript;
      //   diagnostic.textContent = 'Result received: ' + color + '.';
      //   bg.style.backgroundColor = color;
      //   console.log('Confidence: ' + event.results[0][0].confidence);
      // }

      recognition.addEventListener('result', e => {
        console.log(e.results, 'f');

        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
        p.textContent = poopScript;

        if (e.results[0].isFinal) {
          p = document.createElement('p');
          words.appendChild(p);
        }
      });

      recognition.addEventListener('end', recognition.start);
      recognition.start();  //'Ready to receive a  command
  }

}
