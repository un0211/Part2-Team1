import { useParams, useLocation, Link } from "react-router-dom";
import { delMessage, getMessage, getPost } from "apis/rollingPaperPage";
import Nav from "components/RollingPaperPage/Nav";
import styles from "./RollingPaperPage.module.scss";
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

  // NOTE - 삭제할 메세지 id 목록
  const [deleteMessageIds, setDeleteMessageIds] = useState([]);

  const handleCheck = (id, isChecked) => {
    const numberId = Number(id);
    // NOTE - id는 String이고, deleteMessageIds 배열 요소는 Number
    if (isChecked) {
      setDeleteMessageIds((prev) => [...prev, numberId]);
    } else {
      setDeleteMessageIds(deleteMessageIds.filter((item) => item !== numberId));
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      // NOTE - messages 객체의 id 속성이 Number임 !
      setDeleteMessageIds(messages.map((item) => item.id));
    } else {
      setDeleteMessageIds([]);
    }
  };

  const handleDeleteMessage = async () => {
    let deleteResult;
    try {
      deleteResult = await delMessage(deleteMessageIds);
    } catch (e) {
      setLoadingError(null);
      return;
    }
  };

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

  useEffect(() => {
    console.log("useEffect: " + deleteMessageIds);
  }, [deleteMessageIds]);

  return (
    <main
      className={`${styles[postInfo.backgroundColor]} ${
        postInfo.backgroundImageURL ? styles[postInfo.backgroundImageURL] : ""
      } ${styles["page-main"]}`}
    >
      <Nav postInfo={postInfo} />
      <section className={styles["card-section"]}>
        {isEdit && (
          <SelectAll
            onCheckAll={handleCheckAll}
            deleteMessageIds={deleteMessageIds}
            messages={messages}
          />
        )}
        <ButtonList isEdit={isEdit} />
        <CardList
          isEdit={isEdit}
          messages={messages}
          onCheck={handleCheck}
          deleteMessageIds={deleteMessageIds}
        />
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
    <div className={styles["button-wrapper"]}>
      {isEdit ? (
        <button className="button width-92 font-16">삭제하기</button>
      ) : (
        <Link to="edit" className="button width-92 font-16">
          수정하기
        </Link>
      )}
    </div>
  );
}

// NOTE - 기본 모드에서만 메세지 추가 카드가 보인다.
function CardList({ isEdit, messages, onCheck, deleteMessageIds }) {
  return (
    <ol className={styles["card-list"]}>
      {!isEdit && (
        <li>
          <FirstCard />
        </li>
      )}
      {messages.map((message) => (
        <li key={message.id}>
          <Card
            message={message}
            isEdit={isEdit}
            onCheck={onCheck}
            isChecked={deleteMessageIds.includes(message.id)}
          />
        </li>
      ))}
    </ol>
  );
}

function SelectAll({ onCheckAll, deleteMessageIds, messages }) {
  return (
    <div className={styles["select-all-container"]}>
      <input
        type="checkbox"
        id="selectAll"
        onChange={onCheckAll}
        checked={deleteMessageIds.length === messages.length}
      />
      <label className="font-20" htmlFor="selectAll">
        전체 선택
      </label>
    </div>
  );
}

export default RollingPaperPage;
