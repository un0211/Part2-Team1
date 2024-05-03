import React, { Component } from 'react';
import Slider from 'react-slick';
import styles from './Carousel.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image_prev from '../../assets/images/arrow_prev.png'
import image_next from '../../assets/images/arrow_next.png'


function NextArrow(props) {
  const { className, styles, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...styles,
        display: 'block',
        // background: 'gray',
        width: '40px',
        height: '40px',
        right: '-1140px',
        top: '-150px',
        borderRadius: '50%',
        position: 'relative',
      }}
      
      onClick={onClick}
      
    >
      <img
        src={image_next}
        alt="Next Arrow"
        style={{
          width: '60px', // 이미지를 컨테이너에 꽉 차게 설정
          height: '60px', // 이미지를 컨테이너에 꽉 차게 설정
          borderRadius: '50%', // 원형 이미지로 설정
          objectFit: 'cover', // 이미지를 비율 유지하며 가운데 정렬
        }}
      />
    </div>
  );
}

function PrevArrow(props) {
  const { className, styles, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...styles,
        display: 'block',
        // background: 'gray',
        width: '40px',
        height: '40px',
        left: '-30px',
        top: '150px',
        borderRadius: '50%',
        position: 'relative',
      }}
      onClick={onClick}
    >
      <img
        src={image_prev}
        alt="Previous Arrow"
        style={{
          width: '60px', // 이미지를 컨테이너에 꽉 차게 설정
          height: '60px', // 이미지를 컨테이너에 꽉 차게 설정
          borderRadius: '50%', // 원형 이미지로 설정
          objectFit: 'cover', // 이미지를 비율 유지하며 가운데 정렬
        }}
      />
    </div>
  );
}

export default class Carousel extends Component {
  state = {
    slideItems: [
      {
        id: 1,
        name: 'Sowon',
        people: 30,
        emoji: '000',
      },
      {
        id: 2,
        name: 'Sowon',
        people: 30,
        emoji: '111',
      },
      {
        id: 3,
        name: 'Sowon ',
        people: 30,
        emoji: '222',
      },
      {
        id: 4,
        name: 'Sowon ',
        people: 30,
        emoji: '333',
      },
      {
        id: 5,
        name: 'Sowon ',
        people: 30,
        emoji: '444',
      },
      {
        id: 6,
        name: 'Sowon ',
        people: 30,
        emoji: '555',
      },
      {
        id: 7,
        name: 'Sowon ',
        people: 30,
        emoji: '666',
      },
      {
        id: 8,
        name: 'Sowon ',
        people: 30,
        emoji: '777',
      },
      {
        id: 9,
        name: 'Sowon ',
        people: 30,
        emoji: '888',
      },
    ],
  };
  render() {
    const { slideItems } = this.state;
    const { title } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 4,
      slidesToScroll: 2,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      
    };
    return (
      <div className={styles.pa_container}>
        <h1>{title}</h1>
        <Slider {...settings}>
          {slideItems.map((item) => (
            <div key={item.id} className={styles.slide_item}>
              <div className={styles.slide_img}>
                <img src={item.imgSrc} />
              </div>
              <h3>To. {item.name}</h3>
              <p>{item.people}명이 작성했어요!</p>
              <div>
                <span>{item.emoji}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
