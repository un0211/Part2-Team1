import { useParams, useLocation, Link } from "react-router-dom";
import { getMessage, getPost } from "apis/rollingPaperPage";
import Nav from "components/RollingPaperPage/Nav";
import style from "./RollingPaperPage.module.scss";
import Card, { FirstCard } from "components/RollingPaperPage/Card";
import { useCallback, useEffect, useState } from "react";

function RollingPaperPage() {
  const { postId } = useParams();

  const [postInfo, setPostInfo] = useState({
    name: "",
    backgroundColor: "",
    backgroundImageURL: null,
  });
  const [messages, setMessages] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");

  const handleLoad = useCallback(async () => {
    let postResult;
    let messageResult;
    try {
      setLoadingError(null);
      postResult = await getPost(postId);
      messageResult = await getMessage(postId);
    } catch (e) {
      setLoadingError(e);
      return;
    }

    const { name, backgroundColor, backgroundImageURL } = postResult;
    setPostInfo({
      name,
      backgroundColor,
      backgroundImageURL,
    });

    const { results: newMessages } = messageResult;
    setMessages(newMessages);
  }, [postId]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <main
      className={`${style[postInfo.backgroundColor]} ${
        postInfo.backgroundImageURL ? style[postInfo.backgroundImageURL] : ""
      } ${style["page-main"]}`}
    >
      <Nav postInfo={postInfo} />
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
        <>{/* TODO: 서영님 edit page의 버튼 */}</>
      ) : (
        <Link to="edit" className={style.button}>
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
