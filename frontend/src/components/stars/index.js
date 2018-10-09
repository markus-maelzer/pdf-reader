import React, { Component } from 'react';


// https://codepen.io/lbebber/pen/xbZKvQ
export default class Stars extends Component {
  state = {
    stars: 800,
    r: 800,
  }

  renderStars = () => {
    const { stars, r } = this.state;
    const starArray = [];

    var s = 0.2 + (Math.random()*1);
    var curR = r + (Math.random()*300);

    for (var i = 0; i < stars; i++) {
      starArray.push(<Star key={i} style={{
        transformOrigin: `0 0 ${curR}px`,
        transform: `translate3d(0,0,-${curR}px) rotateY(${Math.random()*360}deg) rotateX(${ Math.random() * -50 }deg) scale(${s},${s})`
      }} />);
    }
    return starArray;
  }



  render() {
    return (
      <div className="stars">
        {this.renderStars()}
      </div>
    )
  }
}


const Star = ({ style }) => <div style={style} className="star"></div>;
