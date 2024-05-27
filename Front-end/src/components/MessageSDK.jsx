import React, { useEffect } from "react";

const MessengerSDK = ({ pageId }) => {
  useEffect(() => {
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    // Initialize the SDK once it's loaded
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "API-VERSION", // Replace with your API version
      });
    };
  }, []); // Empty array ensures this effect only runs once

  return (
    <div>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat">
        <script>
          var chatbox = document.getElementById('fb-customer-chat');
          chatbox.setAttribute("page_id", pageId);
          chatbox.setAttribute("attribution", "biz_inbox");
        </script>
      </div>
    </div>
  );
};

export default MessengerSDK;
