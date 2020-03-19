import React from "react";
import Modal from "react-awesome-modal";
import { BackAndClose } from "./index";

const SearchPw = props => {
  const { _closeSearchModal, _backSearchModal, target } = props;

  return (
    <div>
      <Modal
        visible={props.search_pw_modal}
        width="400"
        height="300"
        effect="fadeInDown"
      >
        <BackAndClose
          _closeSearchModal={_closeSearchModal}
          _backSearchModal={_backSearchModal}
          target={target}
        />
        SEARCH_PW
      </Modal>
    </div>
  );
};

export default SearchPw;
