import React from "react";

import Link from "next/link";

interface EditHistoryView {}

const EditHistory = (view: EditHistoryView) => {
  return (
    <div className="history">
      <div className="timeline">
        <div className="event">
          <div className="left-guts">
            <div className="avatar">
              <img
                src="https://pbs.twimg.com/profile_images/1251260906220052480/cOMgsw0X_400x400.jpg"
                className="temp-small-avatar"
              />
            </div>
            <div className="line"></div>
          </div>

          <div className="right-guts">
            <div className="event-header">
              <Link href="/account">
                <a className="name">jimmithy.eth</a>
              </Link>
              <span className="event-title">edited</span>
              <span className="timeago">2 days ago</span>
            </div>

            <div className="event-content">
              Context: this is a change in context
              <br />
              Body: ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia curae; Nam id libero faucibus, maximus nunc eget, sagittis
              erat. Fusce libero diam, egestas non feugiat ut, volutpat ac
              metus. Curabitur augue neque, condimentum in justo eget, dictum
              vulputate nibh. Nunc tempor ornare tristique. Cras tell
            </div>
          </div>
        </div>

        <div className="event">
          <div className="left-guts">
            <div className="avatar">
              <img
                src="https://tr.rbxcdn.com/e68da1ef7db4f144f4ab97a71db7854f/420/420/Decal/Png"
                className="temp-small-avatar"
              />
            </div>
            <div className="line"></div>
          </div>

          <div className="right-guts">
            <div className="event-header">
              <Link href="/account">
                <a className="name">0x0456F</a>
              </Link>
              <span className="event-title">Created</span>
              <span className="timeago">5 days ago</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline {
          padding: 0.5rem 0;
        }

        .event {
          display: flex;
          flex-direction: row;
        }

        .left-guts {
          margin-right: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          flex-basis: 25px;
        }

        .left-guts .avatar {
          width: 100%;
          height: 25px;
        }

        .left-guts .avatar .temp-small-avatar {
          width: 25px;
          height: 25px;
          border-radius: 100%;
        }

        .left-guts .line {
          display: flex;
          width: 2px;
          margin: 0 auto;
          flex-grow: 1;
          background: rgba(0, 0, 0, 0.1);
        }

        .right-guts .event-header {
          display: flex;
          flex-direction: row;
          justify-content: left;
          align-items: center;
        }
        .right-guts .event-header .name {
          color: rgba(0, 0, 0, 1);
          text-decoration: none;
        }
        .right-guts .event-header .timeago {
          margin-left: 0.5rem;
          font-size: 0.9rem;
          color: rgba(0, 0, 0, 0.3);
        }
        .right-guts .event-header .event-title {
          margin-left: 0.5rem;
          font-size: 0.9rem;
          font-weight: bold;
        }

        .right-guts .event-content {
          padding: 0.3rem 0 1.25rem;
        }
      `}</style>
    </div>
  );
};

export default EditHistory;
