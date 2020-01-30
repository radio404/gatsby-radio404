import React from "react"
import {Howl} from "howler"
import PlayerLabel from "./player-label";
import twemoji from "twemoji";

class Player extends React.Component {

  constructor(props) {
    super(props);
    const isSSR = typeof window === "undefined"
    this.state = {
      loaded: 'never',
      playing: false,
      artist: '',
      track: '…',
      album:'',
      cover:'',
      like:'todo',
      volume:1,
      muted:false,
      vote:false,
    };
    if(!isSSR) this.refreshNowPlaying();
  }

  refreshNowPlaying(){
    const self = this;
    fetch(`${this.props.radioking_api_endpoint}/radio/${this.props.radioking_radio_id}/track/current`)
      .then((res)=>res.json())
      .then((json)=>{
        let next_track = json.next_track,
            timeout = Math.min(8 * 60000,Math.max(5000,new Date(next_track) - new Date()));
        setTimeout(self.refreshNowPlaying.bind(self),timeout);
        const vote = json.id === self.state.track_id && self.state.vote;
        self.setState({
          track:`${json.title} – ${json.album}`,
          track_id:json.id,
          artist:json.artist,
          title:json.title,
          cover:json.cover,
          album:json.album,
          vote:vote,
        });
      })
      .catch(err=>{
        self.setState({
          title:err.toString(),
        });
      })
  }

  getAudio(){
    const self = this;
    let {audio} = self;
    if(!audio){
      const props = self.props,
        stream_src = props.radioking_mp3_stream_url
          .replace("{id_radio}",props.radioking_radio_id)
          .replace("{id_stream}",props.radioking_stream_hd_id)
      ;
      audio = self.audio = new Howl({
        src: [stream_src],
        format: ['mp3'],
        html5: true,
        autoplay:true,
        preload:false,
        volume:self.state.volume,
      });
      [
        'load',
        'loaderror',
        'playerror',
        'play',
        'end',
        'pause',
        'stop',
        'mute',
        'volume',
        'rate',
        'seek',
        'fade',
        'unlock'
      ].forEach((eventName)=>{
        audio.on(eventName,self.onAudioEvent.bind(self));
      })
      audio.mute(self.state.muted)

      self.onAudioEvent();
    }
    return audio;
  }

  onAudioEvent(){
    const self = this;
    const {audio} = this,
          playing = audio.playing(),
          state = audio.state();
    self.setState({
      loaded:state,
      playing:playing
    })
  }

  clickPlay(){
    const audio = this.getAudio(),
          playing = audio.playing(),
          state = audio.state();
    if(state === 'unloaded'){
        audio.load();
    }
    if(playing){
      audio.stop();
    }else{
      this.setState({loaded:'unloaded'});
      audio.play();
    }
    console.log('clickPlay',audio,state,playing,this.state.playing);
  }
  clickLike(){
    console.log('clickLike');
    this.setState({
      vote:true
    })
    // le vote ne marche pas. regarder les CORS policies et sec fetch
    fetch(`${this.props.radioking_api_endpoint}/radio/${this.props.radioking_radio_id}/track/vote`,{
      method:'POST',
      dataType:'json',
      body:{vote:1}
    })

  }
  clickMute(){
    const {audio} = this,
    muted = this.state.muted;
    this.setState({
      muted:!muted
    })
    if(audio){
      audio.mute(!muted);
    }
    console.log('clickMute',!muted);
  }
  onChangeVolume(e){
    const self = this,
      volume = e.currentTarget.value,
      {audio} = self;
    if(audio){
      audio.volume(volume);
    }
    self.setState({volume:volume});
  }

  render(){
    return (<div className="player">

      <div className="player__buttons">
        <button type="button" className={`play-button--${this.state.playing?'playing':'paused'} play-button--${this.state.loaded} play-button player__button--icon`} onClick={this.clickPlay.bind(this)} />
        <button type="button" className={`${this.state.muted?'muted':''} mute-button player__button--icon`} onClick={this.clickMute.bind(this)} />
      </div>

      <div className="player__volume">
        <div className="player__volume__value" style={{height:`${100*Math.round(this.state.volume*13)/13}%`}}/>
        <input className="player__volume__zone" type="range" min="0" max="1" step="0.01" onChange={this.onChangeVolume.bind(this)} value={this.state.audio} />
      </div>

      <div className="cover">
        <img className={`now-playing__cover`} src={this.state.cover} alt={this.state.album} />
      </div>

      <div className="now-playing">
        <PlayerLabel className={`now-playing__track`} title={this.state.track}>{this.state.track}</PlayerLabel>
        <PlayerLabel className={`now-playing__artist`} title={this.state.artist}>{this.state.artist}</PlayerLabel>
        <div className="like-buttons">
          <div className="like-buttons__alts">
            {['😀','👍','🤘','🤟','💩','🤬','🙉'].map((emoji,k)=>(
              <button dangerouslySetInnerHTML={{__html: twemoji.parse(emoji, {
                folder: 'svg',
                ext: '.svg'
              })}} key={k} type="button" disabled={this.state.vote?'disabled':false} className={`like-state-${this.state.like} like-button--alt like-button player__button--icon`} onClick={this.clickLike.bind(this)} value={emoji} >
              </button>
            ))}
          </div>
          <button type="button" disabled={this.state.vote?'disabled':false} className={`like-state-${this.state.like} like-button like-button--default player__button--icon`} onClick={this.clickLike.bind(this)} value="❤️" />
        </div>
      </div>
    </div>
  )}
}

export default Player
