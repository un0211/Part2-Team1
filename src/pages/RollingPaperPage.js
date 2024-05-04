import { useParams, useLocation, Link } from "react-router-dom";
import { getMessage, getPost } from "apis/rollingPaperPage";
import Nav from "components/RollingPaperPage/Nav";
import style from "./RollingPaperPage.module.scss";
import Card, { FirstCard } from "components/RollingPaperPage/Card";
import { useCallback, useEffect, useState } from "react";

function RollingPaperPage() {
  // NOTE - id 받아오는 작업
  const { postId } = useParams();

  // NOTE - post, message, reaction, error 정보 관리
  const [postInfo, setPostInfo] = useState({
    name: "",
    backgroundColor: "",
    backgroundImageURL: null,
  });
  const [messages, setMessages] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  // NOTE - edit 모드 여부 확인
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");

  // NOTE - post, message, reaction 값 받아오는 함수
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

// NOTE
/* - 기본모드: 수정하기 버튼
 * - 수정모드: 수정완료, 전체삭제 버튼
 */
function ButtonList({ isEdit }) {
  return (
    <div className={style["button-wrapper"]}>
      {isEdit ? (
        <button className={"button width-92 align-center font-16"}>
          삭제하기
        </button>
      ) : (
        // <Link to="edit" className={"button width-92 align-center font-16"}>
        <Link to="edit" className="button width-92 font-16">
          수정하기
        </Link>
      )}
    </div>
  );
}

// NOTE - 기본 모드에서만 메세지 추가 카드가 보인다.
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
