import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal1";
import { uploadNoticeImage } from "../../../api/ImageUpload";
import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import "./index.scss";

export default function NoticeStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
    };
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, noticeImage);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="post-status-main">
      
      <div className="post-status">
        <img
          className="post-image"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Post A Notice
        </button>
      </div>

      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadNoticeImage={uploadNoticeImage}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />

      <div>
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} getEditData={getEditData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}