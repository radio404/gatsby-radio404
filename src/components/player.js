import React from "react"

class Player extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      playing: false,
      artist: '',
      track: '…',
      album:'',
      cover:'',
      like:'todo',
      muted:false,
      vote:false,
    };
    this.audio = React.createRef();
  }

  componentDidMount() {
    this.refreshNowPlaying();
  }

  refreshNowPlaying(){
    const self = this;
    fetch(`https://www.radioking.com/widgets/api/v1/radio/${this.props.radioking_radio_id}/track/current`,{})
      .then((res)=>res.json())
      .then((json)=>{
        console.log(json);
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
          volume:1
        });
      })
  }

  clickPlay(){
    const audio = this.audio.current,
          paused = audio.paused;
    if(paused !== this.state.playing){
      this.setState({
        playing:paused
      })
      if(paused){
        audio.play()
      }else{
        audio.pause();
        console.log(audio)
      }
    }
    console.log('clickPlay',[this.audio.current],this.state.playing);
  }
  clickLike(){
    console.log('clickLike');
    this.setState({
      vote:true
    })
    // le vote ne marche pas. regarder les CORS policies et sec fetch
    fetch(`https://www.radioking.com/widgets/api/v1/radio/${this.props.radioking_radio_id}/track/vote`,{
      method:'POST',
      dataType:'json',
      body:{vote:1}
    })

  }
  clickMute(){
    const audio = this.audio.current,
      muted = audio.muted;
    if(muted === this.state.muted){
      this.setState({
        muted:!muted
      })
      audio.muted = !muted;
    }
    console.log('clickMute',muted);
  }
  onVolumeDown(e){
    var self = this,
      audio = this.audio.current,
      currentTarget = e.currentTarget,
        volume = getVolumeFromXY(e.clientX,e.clientY);

    function getVolumeFromXY(x,y){
      var vy = (333-y)/88 ,
          vx = .1*(x-304-vy*44)/18,
          v = vx + vy;
      return Math.max(0,Math.min(v,1));
    }

    function onMouseMove(e){
      e.preventDefault();
      volume = getVolumeFromXY(e.clientX,e.clientY);
      //console.log('onMouseMove',volume);
      audio.volume = volume;
      self.setState({volume:volume});
    }
    function onMouseUp(e){
      //console.log('onMouseUp');
      window.removeEventListener('mousemove',onMouseMove);
      window.removeEventListener('mouseup',onMouseUp);
    }
    window.addEventListener('mousemove',onMouseMove)
    window.addEventListener('mouseup',onMouseUp)
    onMouseMove(e);
  }

  render(){
    return (<div className="player">
      <audio ref={this.audio} src={`https://listen.radioking.com/radio/${this.props.radioking_radio_id}/stream/${this.props.radioking_stream_hd_id}`} autoPlay={false} />
      <div className="player__buttons">
        <button type="button" className={`${this.state.playing?'playing':''} play-button player__button--icon`} onClick={this.clickPlay.bind(this)} />
        <button type="button" className={`${this.state.muted?'muted':''} mute-button player__button--icon`} onClick={this.clickMute.bind(this)} />
      </div>

      <div className="player__volume" onMouseDown={this.onVolumeDown.bind(this)}>
        <div className="player__volume__value" style={{height:`${100*Math.round(this.state.volume*13)/13}%`}}/>
      </div>

      <div className="cover">
        <img className={`now-playing__cover`} src={this.state.cover} alt={this.state.album} />
      </div>

      <div className="now-playing">
        <div className={`now-playing__track`} title={this.state.track}>{this.state.track}</div>
        <div className={`now-playing__artist`} title={this.state.artist}>{this.state.artist}</div>
        <button type="button" disabled={this.state.vote?'disabled':false} className={`like-state-${this.state.like} like-button player__button--icon`} onClick={this.clickLike.bind(this)} />
      </div>
    </div>
  )}
}

export default Player
