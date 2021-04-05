import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { EventContext, Styled } from 'direflow-component';
import styles from './App.css';
import Jitsi from "react-jitsi";


const App = (props) => {
  const dispatch = useContext(EventContext);

  const handleClick = () => {
    const event = new Event('my-event');
    dispatch(event);
  };


  const [meeting, setMeeting] = useState(false);
  const toggleMeeting = () => {
    console.log(meeting);
    setMeeting(!meeting);
  };

  return (
    <Styled styles={styles}>
      <div className='app'>
        {!meeting && <button onClick={toggleMeeting}>Start Class</button>}
        {meeting && <button onClick={toggleMeeting}>Stop Class</button>}
        {meeting && <WliVideoConfig />}
      </div>
    </Styled>
  );
};

App.defaultProps = {
  componentTitle: 'Myjitsi Component',
  sampleList: [
    'Create with React',
    'Build as Web Component',
    'Use it anywhere!',
  ],
}

App.propTypes = {
  componentTitle: PropTypes.string,
  sampleList: PropTypes.array,
};


const WliVideoConfig = () => {
  const handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand("toggleVideo");
  };

  return (
    <>
      <Jitsi
        domain="meet.jit.si"
        onAPILoad={handleAPI}
        roomName={"wli-class-IELTS-with-teacher-x"}
        displayName={"Teacher"}
        interfaceConfig={interfaceConfig}
        config={config}
      />
    </>
  );
};

const interfaceConfig = {
  LANG_DETECTION: false,
  lang: "es",
  APP_NAME: "WLI",
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  HIDE_INVITE_MORE_HEADER: true,
  MOBILE_APP_PROMO: false,
  SHOW_CHROME_EXTENSION_BANNER: false,
  TOOLBAR_BUTTONS: [
    "microphone",
    "camera",
    "fullscreen",
    "fodeviceselection",
    "hangup",
    "profile",
    "chat",
    "settings",
    "videoquality",
    "tileview",
    "download",
    "help",
    "mute-everyone",
    // 'security'
  ],
};

const config = {
  defaultLanguage: "es",
  prejoinPageEnabled: false,
};

export default App;
