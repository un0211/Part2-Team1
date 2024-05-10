import { Link } from "react-router-dom";
import styles from "./ButtonList.module.scss";

// NOTE
/* - 기본모드: 목록으로 | 페이지 삭제, 수정하기
 * - 수정모드: 취소    | 전체 선택, 삭제하기
 */
function ButtonList({
  isEdit,
  onDeleteMessages,
  deleteMessageIds,
  onCheckAll,
  messages,
  navigate,
  onDeletePaper,
}) {
  // NOTE - 뒤로가기
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles["button-list-container"]}>
      <button
        onClick={handleGoBack}
        className={`font-20-20-20 ${styles["go-back-button"]}`}
      >
        ← 뒤로가기
      </button>
      <div className={styles["checkbox-button-container"]}>
        {isEdit ? (
          <>
            <SelectAll
              onCheckAll={onCheckAll}
              deleteMessageIds={deleteMessageIds}
              messages={messages}
            />
            <button
              className="button width-92 font-16-16-16"
              onClick={onDeleteMessages}
              disabled={!deleteMessageIds.length}
            >
              삭제하기
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onDeletePaper}
              className={`font-16-16-16 ${styles["delete-paper-button"]}`}
            >
              페이지 삭제
            </button>
            <Link to="edit" className="button width-92 font-16-16-16">
              수정하기
            </Link>
          </>
        )}
      </div>
    </div>
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
      <label className="font-20-20-18" htmlFor="selectAll">
        전체 선택
      </label>
    </div>
  );
}

export default ButtonList;
