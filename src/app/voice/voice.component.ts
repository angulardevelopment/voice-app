import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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

}
