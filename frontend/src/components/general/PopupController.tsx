import React, { useEffect } from "react";
import { usePopupContext } from "../../context/PopupContext";
import { AnimatePresence } from "framer-motion";
import MessagePopup from "./MessagePopup";

function PopupController() {
  const { clearMessages, infoMessage, errorMessage } = usePopupContext();

  useEffect(() => {
    clearMessages();
  }, []);

  return (
    <>
      <AnimatePresence>
        {infoMessage && <MessagePopup message={infoMessage} />}
        {errorMessage && (
          <MessagePopup variant={"error"} message={errorMessage} />
        )}
      </AnimatePresence>
    </>
  );
}

export default PopupController;
