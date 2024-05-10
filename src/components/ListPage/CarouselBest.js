import React, { useState, useEffect } from "react";
import { getList } from "apis/ListPage";
import Slider from "react-slick";
import styles from "./Carousel.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image_prev from "assets/icons/arrow_prev.png";
import image_next from "assets/icons/arrow_next.png";
import CardList from "./CardList";

function CarouselBest({ title }) {
  const [slideItems, setSlideItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getList();
        const sortedItems = response.results.sort((a, b) => b.messageCount - a.messageCount);
        setSlideItems(sortedItems); 
      } catch (error) {
        console.error("Error fetching slide items:", error);
      }
    };
  
    fetchData();
  }, []);

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
    <div className={styles.container}>
      <h1>{title}</h1>
      <Slider {...settings}>
        {slideItems?.map((item) => (
          <CardList key={item.id} slideItems={item} />
        ))}
      </Slider>
    </div>
  );
}

function NextArrow(props) {
  const { className, styles, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...styles,
        display: "block",
        width: "40px",
        height: "40px",
        right: "-1140px",
        top: "-150px",
        borderRadius: "50%",
        position: "relative",
      }}
      
      onClick={onClick}
      
    >
      <img
        src={image_next}
        alt="Next Arrow"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
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
        display: "block",
        width: "40px",
        height: "40px",
        left: "-30px",
        top: "150px",
        borderRadius: "50%",
        position: "relative",
        zIndex: "3",
      }}
      onClick={onClick}
    >
      <img
        src={image_prev}
        alt="Previous Arrow"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default CarouselBest;