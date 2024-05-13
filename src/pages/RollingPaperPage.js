import { useCallback, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  delMessage,
  delPaper,
  getMessage,
  getPost,
  getReaction,
} from "apis/rollingPaperPage";
import { TOAST_DEFAULT_SETTING } from "constants/rollingPaperPage";
import ButtonList from "components/RollingPaperPage/ButtonList";
import Card, { FirstCard } from "components/RollingPaperPage/Card";
import Nav from "components/RollingPaperPage/Nav";
import styles from "./RollingPaperPage.module.scss";
import Loading from "components/common/Loading";

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
  const [reactions, setReactions] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [reactionLoadingError, setReactionLoadingError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // NOTE - 삭제할 메세지 id 목록
  const [deleteMessageIds, setDeleteMessageIds] = useState([]);
  // NOTE - 반응 목록, 이모지 피커, 드롭다운 보여줄지 여부
  const [isReactionHidden, setIsReactionHidden] = useState(true);
  const [isDropDownHidden, setIsDropDownHidden] = useState(true);
  const [isPickerHidden, setIsPickerHidden] = useState(true);

  // NOTE - edit 모드 여부 확인
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");

  // NOTE - 페이지 이동
  const navigate = useNavigate();

  // NOTE - 토스트 메세지 출력
  const notifyURLCopy = useCallback(
    () => toast.success("URL이 복사 되었습니다.", TOAST_DEFAULT_SETTING),
    []
  );

  const handleCheck = useCallback(
    (id, isChecked) => {
      // NOTE - type of id -> String
      // NOTE - input의 id 속성에  Number 타입을 속성값으로 주면 자동으로 String으로 형변환됨
      const numberId = Number(id);
      if (isChecked) {
        setDeleteMessageIds((prev) => [...prev, numberId]);
      } else {
        setDeleteMessageIds(
          deleteMessageIds.filter((item) => item !== numberId)
        );
      }
    },
    [deleteMessageIds]
  );

  const handleCheckAll = useCallback(
    (e) => {
      if (e.target.checked) {
        setDeleteMessageIds(messages.map((item) => item.id));
      } else {
        setDeleteMessageIds([]);
      }
    },
    [messages]
  );

  // NOTE - post 값 받아오는 함수
  const handlePostInfoLoad = useCallback(async () => {
    let postResult;
    try {
      setLoadingError(null);
      postResult = await getPost(postId);
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
      messageProfiles: recentMessages.map((message) => ({
        id: message.id,
        imgURL: message.profileImageURL,
      })),
    });
  }, [postId]);

  // NOTE - message 값 받아오는 함수
  const handleMessageLoad = useCallback(async () => {
    let messageResult;
    try {
      setLoadingError(null);
      messageResult = await getMessage(postId);
    } catch (e) {
      setLoadingError(e);
      return;
    }

    const { results: newMessages } = messageResult;
    setMessages(newMessages);
  }, [postId]);

  // NOTE - reaction 값 받아오는 함수
  const handleReactionLoad = useCallback(async () => {
    let reactionResult;
    try {
      setReactionLoadingError(null);
      reactionResult = await getReaction(postId);
    } catch (e) {
      setReactionLoadingError(e);
      return;
    }

    const { results: newReactions } = reactionResult;
    setReactions(newReactions);
  }, [postId]);

  const handleInitialLoad = useCallback(async () => {
    setIsLoading(true);
    Promise.all([handlePostInfoLoad(), handleMessageLoad()]).then(() => {
      setIsLoading(false);
    });
    handleReactionLoad();
  }, [handlePostInfoLoad, handleMessageLoad, handleReactionLoad]);

  // NOTE - 메세지 삭제하는 함수
  const handleDeleteMessage = useCallback(async () => {
    const confirmation = window.confirm(
      `${deleteMessageIds.length}개의 메세지를 삭제하시겠습니까?`
    );
    if (!confirmation) {
      return;
    }
    // NOTE -Promise 병렬 처리 : 여러 개의 비동기 작업을 동시에 처리
    try {
      setLoadingError(null);
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
    handleMessageLoad();
    // NOTE - 삭제 후, 삭제할 메세지 배열 초기화
    setDeleteMessageIds([]);
    // NOTE - 삭제 후, 페이지 이동
    navigate(`/post/${postId}`);
  }, [deleteMessageIds, handleMessageLoad, navigate, postId]);

  // NOTE - 롤링페이퍼 삭제하는 함수
  const handleDeletePaper = useCallback(async () => {
    const confirmation = window.confirm(
      `${postInfo.name}님의 롤링페이퍼를 삭제하시겠습니까?`
    );
    if (!confirmation) {
      return;
    }
    try {
      setLoadingError(null);
      await delPaper(postId);
    } catch (e) {
      setLoadingError(e);
      return;
    }

    // NOTE - 삭제 후, 페이지 이동
    navigate("/list");
  }, [navigate, postId, postInfo.name]);

  const handleDefaultClick = useCallback(() => {
    setIsReactionHidden(true);
    setIsDropDownHidden(true);
    setIsPickerHidden(true);
  }, []);

  const handleMoreReactionClick = useCallback((e) => {
    e.stopPropagation();
    setIsPickerHidden(true);
    setIsDropDownHidden(true);
    setIsReactionHidden((prevIsHidden) => !prevIsHidden);
  }, []);

  const handleEmojiButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsReactionHidden(true);
    setIsDropDownHidden(true);
    setIsPickerHidden((prevIsHidden) => !prevIsHidden);
  }, []);

  const handleDropDownClick = useCallback((e) => {
    e.stopPropagation();
    setIsReactionHidden(true);
    setIsPickerHidden(true);
    setIsDropDownHidden((prevIsHidden) => !prevIsHidden);
  }, []);

  useEffect(() => {
    handleInitialLoad();
  }, [handleInitialLoad]);

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
      onClick={handleDefaultClick}
    >
      <Nav
        postInfo={postInfo}
        reactions={reactions}
        isReactionHidden={isReactionHidden}
        isPickerHidden={isPickerHidden}
        isDropDownHidden={isDropDownHidden}
        reactionLoadingError={reactionLoadingError}
        onMoreReactionClick={handleMoreReactionClick}
        onEmojiClick={() => handleReactionLoad()}
        onEmojiButtonClick={handleEmojiButtonClick}
        onShareButtonClick={handleDropDownClick}
        onKakaoClick={handleDefaultClick}
        onURLClick={notifyURLCopy}
      />
      <section className={styles["card-section"]}>
        <ButtonList
          isEdit={isEdit}
          onDeleteMessages={handleDeleteMessage}
          deleteMessageIds={deleteMessageIds}
          messages={messages}
          onCheckAll={handleCheckAll}
          navigate={navigate}
          onDeletePaper={handleDeletePaper}
          postId={postId}
        />
        {/* // NOTE - 로딩 중 스피너 */}
        {isLoading ? (
          <Loading />
        ) : (
          <CardList
            isEdit={isEdit}
            messages={messages}
            onCheck={handleCheck}
            deleteMessageIds={deleteMessageIds}
          />
        )}
        {loadingError?.message ? <p>{loadingError.message}</p> : ""}
        <ToastContainer />
      </section>
    </main>
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

export default RollingPaperPage;
