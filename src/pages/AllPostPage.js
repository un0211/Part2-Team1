import { useEffect, useState, useCallback } from "react";
import { getList } from "apis/recipients";
import CardList from "components/ListPage/CardList";
import styles from "./AllPostPage.module.scss";
import Loading from "components/common/Loading";

function AllPostPage() {
  const [itemInfo, setItemInfo] = useState({
    items: [],
    ids: [],
    count: 0,
    offset: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleInitLoad = useCallback(async () => {
    let response;
    try {
      setLoadingError(null);
      setIsLoading(true);
      response = await getList();
    } catch (e) {
      setLoadingError(e);
      return;
    }

    setIsLoading(false);
    const { results: newItems, count } = response;
    setItemInfo({
      items: newItems,
      ids: newItems.map((item) => item.id),
      count,
      offset: newItems.length, // NOTE - 다음에 여기부터 받으면 된다
    });
  }, []);

  useEffect(() => {
    handleInitLoad();
  }, [handleInitLoad]);

  return (
    <main>
      <section className={styles["card-section"]}>
        <ol className={styles["card-list"]}>
          {itemInfo.items.map((item) => (
            <li key={item.id}>
              <CardList slideItems={item} />
            </li>
          ))}
        </ol>
        {isLoading && <Loading />}
        {loadingError?.message ? <p>{loadingError.message}</p> : ""}
      </section>
    </main>
  );
}

export default AllPostPage;
