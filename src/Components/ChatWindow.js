import React, { useState } from 'react'
import styles from '../styles/ChatWindow.module.css'
import { MdEmojiEmotions, MdAttachFile, MdMic, MdSearch, MdMoreVert } from "react-icons/md";


function ChatWindow() {
    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input)
    }

    const handleKeyDown = (e) => {
        if (input && e.key === 'Enter') {
            sendMessage(e);
        }
    }

    return (
        <div className={styles.chatWindow}>
            <div className={styles.cwHeader}>
                <div className={styles.windowTitle}>
                    <div className={styles.userDP}></div>
                    <div className={styles.chatTitle}>Tom Cruise</div>
                </div>
                <div className={styles.headerActions}>
                    <MdSearch />
                    <MdMoreVert />
                </div>
            </div>

            <div className={styles.chat}>
                <div className={`${styles.sent}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.received}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.sent}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.received}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.sent}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.received}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.sent}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.received}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomInputBar}>
                <MdEmojiEmotions className={styles.bottomIcons} />
                <MdAttachFile className={styles.bottomIcons} />
                <input placeholder='Type a message' value={input} onChange={(e) => {setInput(e.target.value)}} onKeyDown={(e) => {handleKeyDown(e)}} />
                <MdMic className={styles.bottomIcons} onClick={sendMessage} />

            </div>

        </div>
    )
}

export default ChatWindow