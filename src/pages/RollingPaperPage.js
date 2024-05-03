import { useParams, useLocation, Link } from "react-router-dom";
import { getMessage } from "apis/rollingPaperPage";
import Nav from "components/RollingPaperPage/Nav";
import style from "./RollingPaperPage.module.scss";
import Card, { FirstCard } from "components/RollingPaperPage/Card";
import { useCallback, useEffect, useState } from "react";

function RollingPaperPage() {
  const { postId } = useParams();

  const [messages, setMessages] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");

  const handleLoad = useCallback(async () => {
    let result;
    try {
      setLoadingError(null);
      result = await getMessage(postId);
    } catch (e) {
      setLoadingError(e);
      return;
    }

    const { results: newMessages } = result;
    setMessages(newMessages);
  }, [postId, setMessages]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <main className={style["page-main"]}>
      <Nav />
      <section className={style["card-section"]}>
        <ButtonList isEdit={isEdit} />
        <CardList isEdit={isEdit} messages={messages} />
        {loadingError?.message ? <p>{loadingError.message}</p> : ""}
      </section>
    </main>
  );
}

function ButtonList({ isEdit }) {
  return (
    <div className={style["button-wrapper"]}>
      {isEdit ? (
        <button className={"button width-92 align-center font-16"}>
          삭제하기
        </button>
      ) : (
        <Link to="edit" className={"button width-92 align-center font-16"}>
          수정하기
        </Link>
      )}
    </div>
  );
}

function CardList({ isEdit, messages }) {
  return (
    <ol className={style["card-list"]}>
      {!isEdit && (
        <li>
          <FirstCard />
        </li>
      )}
      {messages.map((message) => (
        <li key={message.id}>
          <Card message={message} />
        </li>
      ))}
    </ol>
  );
}

export default RollingPaperPage;
