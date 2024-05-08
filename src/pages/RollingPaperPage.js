import { useParams, useLocation, Link } from "react-router-dom";
import { delMessage, getMessage, getPost } from "apis/rollingPaperPage";
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

  // NOTE - 메세지 삭제하는 함수
  const handleDeleteMessage = async () => {
    if (deleteMessageIds.length === 0) {
      alert("삭제할 메세지를 선택해주세요.");
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
    // NOTE - 삭제 후 처리되면 삭제한 메세지 제외한 메시지 목록 업데이트
    setMessages((prev) =>
      prev.filter((message) => !deleteMessageIds.includes(message.id))
    );
    // NOTE - 삭제 후, 삭제할 메세지 배열 초기화
    setDeleteMessageIds([]);
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

  return (
    <main
      className={`${style[postInfo.backgroundColor]} ${
        postInfo.backgroundImageURL ? style[postInfo.backgroundImageURL] : ""
      } ${style["page-main"]}`}
    >
      <Nav postInfo={postInfo} />
      <section className={style["card-section"]}>
        <div className={style["checkbox-button-container"]}>
          {isEdit && (
            <SelectAll
              onCheckAll={handleCheckAll}
              deleteMessageIds={deleteMessageIds}
              messages={messages}
            />
          )}
          <ButtonList isEdit={isEdit} onDeleteMessages={handleDeleteMessage} />
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
function ButtonList({ isEdit, onDeleteMessages }) {
  return (
    <div className={style["button-wrapper"]}>
      {isEdit ? (
        <button className="button width-92 font-16" onClick={onDeleteMessages}>
          삭제하기
        </button>
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
    <ol className={style["card-list"]}>
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
    <div className={style["select-all-container"]}>
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
