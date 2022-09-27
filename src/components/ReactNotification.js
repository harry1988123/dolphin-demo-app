import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactNotificationComponent = ({ title, body, senderEmailId }) => {
  let hideNotif = title === "";
  const Display = () => {
    return (
      <div>
        <h4>
          {senderEmailId} Inviting you for join the {title}
        </h4>
        <a href={body}>Accept the call</a>
        <p>Reject</p>
      </div>
    );
  };

  if (!hideNotif) {
    toast.info(<Display />);
  }

  return (
    <ToastContainer
      autoClose={false}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
  );
};

ReactNotificationComponent.defaultProps = {
  title: "Dolphin VC",
  body: "Some body",
  senderEmailId: "",
};

ReactNotificationComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  senderEmailId: PropTypes.string,
};

export default ReactNotificationComponent;
