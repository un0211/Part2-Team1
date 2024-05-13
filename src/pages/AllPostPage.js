import React, { useEffect, useState } from "react";
import { getList } from "apis/ListPage";
import styles from "./AllPostPage.module.scss";
import "styles/global.css";
import "styles/button.scss";
import CardList from "components/ListPage/CardList";
import { Link } from "react-router-dom";

function AllPostPage(){
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getList();
        const items = response.results;
        setAllItems = items;

      } catch (error) {
        console.error("Error fetching slide items:", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return(
    <div className={styles.wrapper}>
      {allItems?.map((item) => (
        <CardList key={item.id} slideItems={item}/>
      ))}

    </div>

  )
}

export default AllPostPage;
