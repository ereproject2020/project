/*global chrome*/
import React, { Component } from 'react';
import AudioVisualiserF from './AudioVisualiserF';
import * as tf from '@tensorflow/tfjs';
import './App.css';
import CircularProgress from './CircularProgress'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          audioDataF: 0,
          x : 0 ,
          load : false,
          start : false,
          highest : 0,
        };

        this.tick = this.tick.bind(this);
        
      }
 
      componentDidMount = () => {

         const model_load = async () => {
             this.model1 = await tf.loadLayersModel('model/DN_Tanh_relu_model/model.json');
             this.model2 = await tf.loadLayersModel('model/DN_high_model/model.json');
             this.setState({
                 load : true
             })
         }

         model_load();

         this.mean = [-52.27007024, -52.938925  , -53.56559578, -53.90618572,
            -53.79196543, -53.46626892, -53.31729142, -52.87126316,
            -52.25744557, -52.09871372, -52.25074398, -51.96355579,
            -52.00308529, -52.87311661, -53.70233459, -53.57958439,
            -53.22900316, -53.19158256, -53.41915177, -53.73296305,
            -53.90589199, -54.48180578, -54.80650817, -55.72883078,
            -56.06676781, -56.42977897, -56.79298459, -57.29232911,
            -57.46812205, -57.90066959, -57.32603498, -58.07082582,
            -57.32217724, -58.22767767, -58.58868808, -59.32457046,
            -60.21758686, -60.28912248, -60.92295592, -61.22150023,
            -60.59546867, -60.16760878, -60.61298704, -60.63220579,
            -60.26275087, -61.10372863, -61.46184802, -60.87173495,
            -61.58037144, -62.62385248, -61.68702665, -61.50063199,
            -62.85292143, -62.31804074, -60.92715814, -61.89275815,
            -63.75533177, -62.39440905, -61.37506834, -62.94463077,
            -64.73697929, -62.99541437, -62.05075185, -63.59901587,
            -65.52552773, -63.77131061, -62.20235949, -63.1074798 ,
            -65.31871905, -64.70905061, -62.35461513, -62.21047477,
            -64.51986072, -66.60433172, -64.78322497, -62.87756369,
            -63.58012166, -66.31694199, -67.7773634 , -65.91611806,
            -64.22661963, -64.79781003, -67.0966903 , -68.49127627,
            -67.24934688, -65.26496203, -65.01996537, -66.92266185,
            -69.06029753, -68.74145906, -66.5852013 , -64.83988142,
            -65.48989963, -68.16117629, -70.09742123, -69.26401351,
            -66.80125769, -65.14148259, -65.99242766, -68.59639045,
            -70.5000316 , -70.08589155, -68.18715042, -66.21765715,
            -66.12151381, -68.02133798, -70.28703803, -70.57064378,
            -69.12033513, -66.96944385, -65.69285705, -66.36283042,
            -68.59079523, -70.50928494, -70.40338501, -69.03227202,
            -67.00859391, -65.59045444, -65.91442739, -67.99385416,
            -70.18065615, -70.63427089, -69.7203278 , -68.09196799,
            -66.4917439 , -66.04854012, -67.20566881, -69.30942017,
            -70.59910358, -70.46320496, -69.51111916, -67.99033093,
            -66.78693216, -66.62784305, -67.84242278, -69.91559235,
            -71.24925022, -71.28943245, -70.39332074, -68.94809719,
            -67.58323962, -66.85751463, -67.23689847, -68.91719678,
            -70.99870317, -71.87662183, -71.67995949, -70.81913266,
            -69.48005314, -68.15132703, -67.53186848, -67.96685435,
            -69.61241217, -71.6562646 , -72.71218372, -72.79051526,
            -72.25642123, -71.0652246 , -69.8385594 , -69.10909644,
            -69.0078839 , -69.83843799];

            this.std = 13.983622816358578;
        
      }

      measureStart = () => {
        var constraints = {
            audio: true,
            video: false,
          };
  
           chrome.tabCapture.capture(constraints, (stream) => {
  
            this.audioContext = new (window.AudioContext ||
              window.webkitAudioContext)({latencyHint: 'playback',
              sampleRate : 24000});

            this.stream = stream;
  
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            
            this.dataArrayF = new Float32Array(this.analyser.frequencyBinCount);
            
            
            this.source = this.audioContext.createMediaStreamSource(this.stream);
            this.source.connect(this.analyser).connect(this.audioContext.destination);
            this.rafId = requestAnimationFrame(this.tick);
            this.timerid = setTimeout(this.record, 200);
            
            this.setState({
                start : true
            })

          });
      }

      measureStop = () => {
        this.setState({
          audioDataF: 0,
        })
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
        this.stream.getAudioTracks()[0].stop();
        clearTimeout(this.timerid);
      }


      record = () => {

          this.input_array = [];

          for(var i = 9; i < 171; i++){//to 430
            var value = (this.dataArrayF[i] - this.mean[i - 9]) / this.std;
            this.input_array.push(value);
          }
          
          const measure = async () => {
              let label = 0;
              let result = await this.model1.predict(tf.tensor2d(this.input_array, [1, 162])).dataSync();

              let idx = 0;
              for(var i = 1; i < 12; i++){
                if(result[i] > result[idx]){
                    idx = i;
                }
              }

              label = idx;

              let y_high = await this.model2.predict(tf.tensor2d(this.input_array, [1, 162])).dataSync();
              y_high += 100;

              if(label >= 7 && y_high >= 550){
                if(y_high <= 630){
                    label = 7;
                }

                else if(y_high <= 690){
                    label = 8;
                }

                else if(y_high <= 750){
                    label = 9;
                }

                else{
                    label = 10;
                }
              }

              else if(label < 2 && y_high >= 550){
                  if(this.state.audioDataF > 6){
                    if(y_high <= 630){
                        label = 7;
                    }
    
                    else if(y_high <= 690){
                        label = 8;
                    }
    
                    else if(y_high <= 750){
                        label = 9;
                    }
    
                    else{
                        label = 10;
                    }
                  }
              }

              this.setState({
                audioDataF : label,
                x : this.state.x + 1
              });

              if(this.state.x > 25){
                this.setState({
                  x: 25
                })
              }

              this.timerid = setTimeout(this.record, 200);
          }

          measure();
          
    
        }     
        
        
      


      tick = () => {
        this.analyser.getFloatFrequencyData(this.dataArrayF);

        this.rafId = requestAnimationFrame(this.tick);
      }

      componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        //clearInterval(this.recid);
        this.analyser.disconnect();
        this.source.disconnect();
      }

      render() {

        let view = null;
        if(!this.state.start){
            view =
            ( 
            <>
            <div className="titlebox">App Name</div>
            <div className = 'Progress'>
              <CircularProgress onclick = {this.measureStart} modelComplete = {this.state.load}/>
            </div>
            </>
            )
        }

        else{
            view = <div><AudioVisualiserF audioData = {this.state.audioDataF} x = {this.state.x} onStop = {this.measureStop} onPlay = {this.measureStart}/></div>
        }

        return(
            <div className = 'App-header'>
              {view}
            </div>
        ) 
      }
}

export default App;