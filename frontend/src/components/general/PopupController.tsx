import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePopupContext } from "../../context/PopupContext";

function PopupController() {
  const location = useLocation();
  const { clearMessages } = usePopupContext();
  useEffect(() => {
    clearMessages();
  }, [location]);
  return <div className="hidden" />;
}

export default PopupController;
