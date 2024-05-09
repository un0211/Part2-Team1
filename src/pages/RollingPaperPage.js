import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
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
    style: null,
    messageCount: 0,
    messageProfiles: [],
  });
  const [messages, setMessages] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  // NOTE - edit 모드 여부 확인
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");

  // NOTE - 페이지 이동
  const navigate = useNavigate();

  // NOTE - 삭제할 메세지 id 목록
  const [deleteMessageIds, setDeleteMessageIds] = useState([]);

  const handleCheck = (id, isChecked) => {
    // NOTE - type of id -> String
    // NOTE - input의 id 속성에  Number 타입을 속성값으로 주면 자동으로 String으로 형변환됨
    const numberId = Number(id);
    if (isChecked) {
      setDeleteMessageIds((prev) => [...prev, numberId]);
    } else {
      setDeleteMessageIds(deleteMessageIds.filter((item) => item !== numberId));
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setDeleteMessageIds(messages.map((item) => item.id));
    } else {
      setDeleteMessageIds([]);
    }
  };

  // NOTE - post, message, reaction 값 받아오는 함수
  const handleLoad = async () => {
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

    const {
      name,
      backgroundColor,
      backgroundImageURL,
      messageCount,
      recentMessages,
    } = postResult;
    setPostInfo({
      name,
      backgroundColor,
      style: backgroundImageURL
        ? { backgroundImage: `url(${backgroundImageURL})` }
        : null,
      messageCount,
      messageProfiles: recentMessages.map((message) => message.profileImageURL),
    });

    const { results: newMessages } = messageResult;
    setMessages(newMessages);
  };

  // NOTE - 메세지 삭제하는 함수
  const handleDeleteMessage = async () => {
    const confirmation = window.confirm(
      `${deleteMessageIds.length}개의 메세지를 삭제하시겠습니까?`
    );
    if (!confirmation) {
      return;
    }
    // NOTE -Promise 병렬 처리 : 여러 개의 비동기 작업을 동시에 처리
    try {
      await Promise.all(
        deleteMessageIds.map(async (messageId) => {
          await delMessage(messageId);
        })
      );
    } catch (e) {
      setLoadingError(e);
      return;
    }
    // NOTE - 삭제 후 데이터 다시 받아오는 작업
    handleLoad();
    // NOTE - 삭제 후, 삭제할 메세지 배열 초기화
    setDeleteMessageIds([]);
    // NOTE - 삭제 후, 페이지 이동
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    // NOTE - 페이지 이동할 때 deleteMessageIds를 초기화
    return () => {
      setDeleteMessageIds([]);
    };
  }, [location.pathname]);

  return (
    <main
      className={`${styles[postInfo.backgroundColor]} ${styles["page-main"]}`}
      style={postInfo.style ?? {}}
    >
      <Nav postInfo={postInfo} />
      <section className={styles["card-section"]}>
        <div className={styles["button-list-container"]}>
          <ButtonList
            isEdit={isEdit}
            onDeleteMessages={handleDeleteMessage}
            deleteMessageIds={deleteMessageIds}
            messages={messages}
            onCheckAll={handleCheckAll}
            navigate={navigate}
          />
        </div>
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
function ButtonList({
  isEdit,
  onDeleteMessages,
  deleteMessageIds,
  onCheckAll,
  messages,
  navigate,
}) {
  // NOTE - 뒤로가기
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button
        onClick={handleGoBack}
        className={`font-20-20-20 ${styles["go-back-button"]}`}
      >
        ← 뒤로가기
      </button>
      {isEdit ? (
        <div className={styles["checkbox-button-container"]}>
          <SelectAll
            onCheckAll={onCheckAll}
            deleteMessageIds={deleteMessageIds}
            messages={messages}
          />
          <button
            className="button width-92 font-16"
            onClick={onDeleteMessages}
            disabled={!deleteMessageIds.length}
          >
            삭제하기
          </button>
        </div>
      ) : (
        <Link to="edit" className="button width-92 font-16">
          수정하기
        </Link>
      )}
    </>
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
