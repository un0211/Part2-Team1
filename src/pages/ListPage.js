import React, { useEffect, useState } from "react";
import { getList } from "apis/ListPage";
import Carousel from "../components/ListPage/Carousel";
import "./ListPage.module.scss";
import styles from "./ListPage.module.scss";
import "styles/global.css";
import "styles/button.scss";
import LinkButton from "components/common/LinkButton";

function ListPage() {
  const [bestItems, setBestItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getList();
        const items = response.results;
        const sortedBest = items
          .slice()
          .sort((a, b) => b.messageCount - a.messageCount);
        const sortedRecent = items
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBestItems(sortedBest);
        setRecentItems(sortedRecent);
      } catch (error) {
        console.error("Error fetching slide items:", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <Carousel
          title="인기 롤링 페이퍼🔥"
          slideItems={bestItems}
          isLoading={isLoading}
        />
        <Carousel
          title="최근에 만든 롤링 페이퍼⭐"
          slideItems={recentItems}
          isLoading={isLoading}
        />
        <div className={styles[`button-wrapper`]}>
          <LinkButton
            className={styles.custom}
            text="나도 만들어 보기"
            url="/post"
          ></LinkButton>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
