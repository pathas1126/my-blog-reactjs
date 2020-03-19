import React from "react";

const BackAndClose = props => {
  const { _resetIDResult, _closeSearchModal, _backSearchModal, target } = props;

  const close =
    "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-x-mark-2.png&r=0&g=0&b=0";
  const back =
    "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-undo-1.png&r=0&g=0&b=0";

  // 닫기, 뒤로가기 컨트롤러
  const _controller = (target, type) => {
    if (target === "id") {
      _resetIDResult();
    }
    if (type === "back") {
      _backSearchModal(target);
    } else if (type === "close") {
      _closeSearchModal(target);
    }
  };

  return (
    <div className="back_and_close">
      <div className="back_icon">
        <img
          src={back}
          alt="back_img"
          onClick={() => _controller(target, "back")}
        />
      </div>
      <div className="close_icon">
        <img
          src={close}
          alt="close_img"
          onClick={() => _controller(target, "close")}
        />
      </div>
    </div>
  );
};

export default BackAndClose;
