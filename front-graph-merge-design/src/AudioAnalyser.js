/*global chrome*/
import React, { Component } from 'react';
import AudioVisualiserF from './AudioVisualiserF';
import * as tf from '@tensorflow/tfjs';

class AudioAnalyser extends Component {

    constructor(props) {
        super(props);
        this.state = { audioData: new Uint8Array(0),
          audioDataF: 1000,
          number : 0,
          max : true,
          x : 0 ,
          freqlist : []};

        this.tick = this.tick.bind(this);
        
      }
 
      componentDidMount = () => {

         var constraints = {
          audio: true,
          video: false,
        };

         chrome.tabCapture.capture(constraints, (stream) => {

          this.audioContext = new (window.AudioContext ||
            window.webkitAudioContext)({latencyHint: 'playback',
            sampleRate : 24000});

          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 2048;
          
          this.dataArrayF = new Float32Array(this.analyser.frequencyBinCount);
          
          
          this.source = this.audioContext.createMediaStreamSource(stream);
          this.source.connect(this.analyser).connect(this.audioContext.destination);
          this.rafId = requestAnimationFrame(this.tick);
          this.recid = setInterval(this.record, 100);
        });
        
      }


      record = () => {

          this.input_array = [];

          for(var i = 9; i < 171; i++){//to 430
            this.input_array.push(this.dataArrayF[i]);
          }

          const y = this.props.model.predict(tf.tensor2d(this.input_array, [1, 162]));
          
          this.setState({
            audioDataF : y
          });
          this.setState({ x : this.state.x + 1});
          if(this.state.x % 100 === 0){
            this.setState({
              x : 0
            })
          }
    
        }     
        
        
      


      tick = () => {
        this.analyser.getFloatFrequencyData(this.dataArrayF);

        this.rafId = requestAnimationFrame(this.tick);
      }

      componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        clearInterval(this.recid);
        this.analyser.disconnect();
        this.source.disconnect();
      }

      render() {

        return(
            <div>
              <AudioVisualiserF audioData = {this.state.audioDataF} x = {this.state.x}/>
            </div>
        ) 
      }



}

export default AudioAnalyser;